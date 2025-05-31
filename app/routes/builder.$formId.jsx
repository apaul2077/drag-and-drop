import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import LeftSidebar from "../components/LeftSidebar";
import SortableComponent from "../components/SortableComponent";
import { MainForm } from "../components/MainForm";
import {
  TextInput,
  TextArea,
  Dropdown,
  CheckboxGroup,
  DateInput,
} from "../components/FormComponents";
import RightSidebar from "../components/RightSideBar";
import { useParams } from "@remix-run/react";

const componentMap = {
  text: TextInput,
  textarea: TextArea,
  dropdown: Dropdown,
  checkbox: CheckboxGroup,
  date: DateInput,
};

export default function FormBuilderPage() {
  const { formId } = useParams();
  const [currentSelectedComponent, setCurrentSelectedComponent] = useState(null);

  const [forms, setForms] = useState({
    id: formId,
    name: `Untitled Form`,
    isPublished: false,
    form: [
      [
        {
          id: "comp1",
          type: "text",
          props: { label: "Name", placeholder: "Enter your name" },
        },
        {
          id: "comp2",
          type: "date",
          props: { label: "DOB" },
        },
      ],
    ],
  });

  useEffect(() => {
    const raw = localStorage.getItem("forms") || "[]";
    let registry = [];
    try {
      registry = JSON.parse(raw);
    } catch {
      console.error("Invalid JSON in forms registry");
      registry = [];
    }

    const found = registry.find((f) => f.id === formId);
    if (found) {
      setForms(found);
    } else {
      console.error("Form not found:", formId);
    }
  }, [formId]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    const currentItems = forms.form[0].map((c) => c.id);

    if (
      over &&
      currentItems.includes(active.id) &&
      currentItems.includes(over.id) &&
      active.id !== over.id
    ) {
      const oldIndex = currentItems.indexOf(active.id);
      const newIndex = currentItems.indexOf(over.id);

      setForms((prev) => {
        const updatedPages = [...prev.form];
        updatedPages[0] = arrayMove(updatedPages[0], oldIndex, newIndex);
        return { ...prev, form: updatedPages };
      });
      return;
    }

    if (over && !currentItems.includes(active.id)) {
      const newType = active.id;
      const newId = `${newType}-${Date.now()}`;
      const newComp = {
        id: newId,
        type: newType,
        props: { label: newType, placeholder: "" },
      };
      if (newType === "checkbox" || newType === "dropdown") {
        newComp.props.options = ["Option 1", "Option 2"];
      }

      setForms((prev) => {
        const updatedPages = [...prev.form];
        const components = [...updatedPages[0]];
        const dropIndex = components.findIndex((c) => c.id === over.id);
        if (dropIndex === -1) {
          components.push(newComp);
        } else {
          components.splice(dropIndex + 1, 0, newComp);
        }
        updatedPages[0] = components;
        return { ...prev, form: updatedPages };
      });
    }
  }
  const handleSave = () => {
    if (!forms) return;
    const raw = localStorage.getItem("forms") || "[]";
    let registry = [];
    try {
      registry = JSON.parse(raw);
    } catch {
      registry = [];
    }

    const idx = registry.findIndex((f) => f.id === formId);
    if (idx >= 0) {
      registry[idx] = forms;
    } else {
      registry.push(forms);
    }

    localStorage.setItem("forms", JSON.stringify(registry));

    if (!localStorage.getItem(`responses-${formId}`)) {
      localStorage.setItem(`responses-${formId}`, JSON.stringify([]));
    }

  };

  const renderFormComponents = (formArray) => (
    <SortableContext
      items={formArray.map((c) => c.id)}
      strategy={verticalListSortingStrategy}
    >
      {formArray.map((comp) => {
        const Component = componentMap[comp.type];
        return (
          <SortableComponent
            key={comp.id}
            id={comp.id}
            onClick={() => setCurrentSelectedComponent(comp.id)}
            setForms={setForms}
          >
            <Component {...comp.props} />
          </SortableComponent>
        );
      })}
    </SortableContext>
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 p-4">
          <input
            type="text"
            value={forms.name}
            onChange={(e) =>
              setForms((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter form title..."
            className="flex-1 px-3 py-2 mr-4 border bg-white rounded dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
          />

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Save Form
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <LeftSidebar />

          <div
            id="main-form"
            className="flex-1 p-4 overflow-auto bg-white dark:bg-zinc-900"
          >
            <MainForm title={forms.name}>
              {forms.form?.[0]?.length > 0
                ? renderFormComponents(forms.form[0])
                : null}
            </MainForm>
          </div>

          <RightSidebar
            selectedId={currentSelectedComponent}
            forms={forms}
            setForms={setForms}
          />
        </div>
      </div>
    </DndContext>
  );
}
