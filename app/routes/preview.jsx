import { useNavigate, Outlet } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function PreviewLayout() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("forms") || "[]");
    setForms(stored);
  }, []);

  const handleSelect = (e) => {
    const id = e.target.value;
    if (id) navigate(`/preview/${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      {forms.length > 0 ? (
        <select
          onChange={handleSelect}
          defaultValue=""
          className="rounded border px-3 py-2 text-sm dark:bg-zinc-800 dark:text-white bg-white mr-2"
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

      <Outlet />
    </div>
  );
}
