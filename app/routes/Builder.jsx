import { useState } from "react";
import { MainForm } from "../components/MainForm";
import {
  TextInput,
  TextArea,
  Dropdown,
  CheckboxGroup,
  DateInput,
} from "../components/FormComponents";

const componentMap = {
  text: TextInput,
  textarea: TextArea,
  dropdown: Dropdown,
  checkbox: CheckboxGroup,
  date: DateInput,
};

export default function Builder() {
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

  function renderFormComponents(form) {
    return form.map((comp) => {
      const Component = componentMap[comp.type];
      if (!Component) return null;
      return <Component key={comp.id} {...comp.props} />;
    });
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-100 dark:bg-zinc-800 p-4">Sidebar</div>

      <div className="flex-1 p-4 overflow-auto">
        <MainForm title="Form 1" form={renderFormComponents(forms[0])}/>
      </div>

      <div className="w-1/5 bg-gray-100 dark:bg-zinc-800 p-4">Properties</div>
    </div>
  );
}
