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
  const {formId} = useParams();
  const [currentSelectedComponent, setCurrentSelectedComponent] = useState(null);
  const [forms, setForms] = useState({
    id: formId,
    name: `Untitled Form`,
    isPublsihed: false,
    form: [[
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
    ]]
});

 useEffect(() => {
    // 1. Grab the array under "forms"
    const raw = localStorage.getItem("forms") || "[]";
    let registry = [];
    try {
      registry = JSON.parse(raw);
    } catch {
      console.error("Invalid JSON in forms registry");
      registry = [];
    }

    // 2. Find the one we need
    const found = registry.find((f) => f.id === formId);
    if (found) {
      setForms(found);
    } else {
      // optionally, redirect or show error
      console.error("Form not found:", formId);
    }
  }, [formId]);




  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: undefined,
    })
  );

  function handleDragEnd(event) {
  const { active, over } = event;
  const currentItems = forms.form[0].map((c) => c.id);

  // Reorder logic
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

  // Insert logic
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

    // 1. Load existing registry
    const raw = localStorage.getItem("forms") || "[]";
    let registry = [];
    try {
      registry = JSON.parse(raw);
    } catch {
      registry = [];
    }

    // 2. Replace or append our form object
    const idx = registry.findIndex((f) => f.id === formId);
    if (idx >= 0) {
      registry[idx] = forms;
    } else {
      registry.push(forms);
    }

    // 3. Persist it
    localStorage.setItem("forms", JSON.stringify(registry));

    // 4. Ensure responses array exists
    if (!localStorage.getItem(`responses-${formId}`)) {
      localStorage.setItem(`responses-${formId}`, JSON.stringify([]));
    }

    // 5. Navigate on save if you like
    // navigate(`/preview/${formId}`);
  };


  const renderFormComponents = (form) => {
    return (
    <SortableContext
      items={form.map((c) => c.id)}
      strategy={verticalListSortingStrategy}
    >
      {form.map((comp) => {
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
    </SortableContext>)
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Save Form
        </button>
        <LeftSidebar />

        <div
          id="main-form"
          className="flex-1 p-4 overflow-auto bg-white dark:bg-zinc-900"
        >
          <MainForm title="Form 1">
            {forms.form ? renderFormComponents(forms.form[0]) : null}
          </MainForm>
        </div>

        <RightSidebar
          selectedId={currentSelectedComponent}
          forms={forms}
          setForms={setForms}
        />
      </div>
    </DndContext>
  );
}
