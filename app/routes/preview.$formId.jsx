import { useEffect, useState } from "react";
import { useParams } from "@remix-run/react";
import { MainForm } from "../components/MainForm";
import {
  TextInput,
  TextArea,
  Dropdown,
  CheckboxGroup,
  DateInput,
} from "../components/FormComponents";

const componentMap = { text: TextInput, textarea: TextArea, dropdown: Dropdown, checkbox: CheckboxGroup, date: DateInput };

export default function PreviewPage() {
  const { formId } = useParams();
  const [formObj, setFormObj] = useState(null);

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
    setFormObj(found || null);
  }, [formId]);

  if (formObj === null) {
    return <p className="p-4 dark:text-white">Loading or form not found.</p>;
  }

  const page0 = formObj.form[0] || [];

  const renderFormComponents = (fields) =>
    fields.map((comp) => {
      const Component = componentMap[comp.type];
      return <Component key={comp.id} {...comp.props} />;
    });

  return (
    <div id="main-form" className="flex-1 p-4 overflow-auto bg-white dark:bg-zinc-900">
      <MainForm title={formObj.name}>
        {page0.length > 0 ? renderFormComponents(page0) : <p className="text-gray-500 dark:text-gray-400">No fields to display.</p>}
      </MainForm>
    </div>
  );
}
