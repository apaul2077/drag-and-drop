import { useState } from "react";
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

const componentMap = {
  text: TextInput,
  textarea: TextArea,
  dropdown: Dropdown,
  checkbox: CheckboxGroup,
  date: DateInput,
};

export default function Builder() {
  const [currentSelectedComponent, setCurrentSelectedComponent] = useState(null);
  const [forms, setForms] = useState([
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
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: undefined,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    const currentItems = forms[0].map((c) => c.id);

    if (
      over &&
      currentItems.includes(active.id) &&
      currentItems.includes(over.id) &&
      active.id !== over.id
    ) {
      setForms((prev) => {
        const updated = [...prev];
        const items = [...updated[0]];
        const oldIndex = items.findIndex((c) => c.id === active.id);
        const newIndex = items.findIndex((c) => c.id === over.id);
        updated[0] = arrayMove(items, oldIndex, newIndex);
        return updated;
      });
      return;
    }

    if (over && !currentItems.includes(active.id)) {
      const newType = active.id;
      const newId = `${newType}-${Date.now()}`;
      const newComp = {
        id: newId,
        type: newType,
        props: { label: newType, placeholder: ""},
      };
      if(newType === "checkbox" || newType === "dropdown"){
        newComp.props = {...newComp.props, options: ["Option 1", "Option 2"]}
      };

      setForms((prev) => {
        const updated = [...prev];
        const items = [...updated[0]];
        const dropIndex = items.findIndex((c) => c.id === over.id);
        if (dropIndex === -1) {
          items.push(newComp);
        } else {
          items.splice(dropIndex + 1, 0, newComp);
        }
        updated[0] = items;
        return updated;
      });
    }
  }


  const renderFormComponents = (form) => (
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
    </SortableContext>
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen">
        <LeftSidebar />

        <div
          id="main-form"
          className="flex-1 p-4 overflow-auto bg-white dark:bg-zinc-900"
        >
          <MainForm title="Form 1">
            {renderFormComponents(forms[0])}
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
