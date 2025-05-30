import { useNavigate, Outlet } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function BuilderLayout() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("forms") || "[]");
    setForms(stored);
  }, []);

  const handleSelect = (e) => {
    const id = e.target.value;
    if (id) navigate(`/builder/${id}`);
  };

  const createNewForm = () => {
    const newId = `form-${Date.now()}`;
    const newForm = {
      id: newId,
      name: `Untitled Form`,
      form: [[]], // Correct structure: outer array with one inner array
      isPublsihed: false
    };

    const updatedForms = [...forms, newForm];
    setForms(updatedForms);
    localStorage.setItem("forms", JSON.stringify(updatedForms));
    navigate(`/builder/${newId}`);
  };

  return (
    <div className="p-6 space-y-6">
      {forms.length > 0 ? (
        <select
          onChange={handleSelect}
          defaultValue=""
          className="rounded border px-3 py-2 text-sm dark:bg-zinc-800 dark:text-white"
        >
          <option value="" disabled>
            Select a form to edit
          </option>
          {forms.map((form, idx) => (
            <option key={form.id || idx} value={form.id || idx}>
              {form.name || `Form ${idx + 1}`}
            </option>
          ))}
        </select>
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          No forms available. Please create one.
        </p>
      )}

      <button
        onClick={createNewForm}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
      >
        + Create New Form
      </button>

      <Outlet />
    </div>
  );
}
