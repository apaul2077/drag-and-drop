export default function RightSidebar({ selectedId, forms, setForms }) {
  if (!forms?.form?.[0]?.length) {
    return null;
  }
  const form = forms.form[0];
  const compIndex = form.findIndex((c) => c.id === selectedId);
  const comp = compIndex === -1 ? null : form[compIndex];

  function updateProp(key, value) {
  setForms((prev) => {
    const updatedPages = [...prev.form];
    const updatedComponents = [...updatedPages[0]];

    updatedComponents[compIndex] = {
      ...updatedComponents[compIndex],
      props: { ...updatedComponents[compIndex].props, [key]: value },
    };

    updatedPages[0] = updatedComponents;

    return {
      ...prev,
      form: updatedPages,
    };
  });
}

  if (!comp) {
    return (
      <div className="w-64 bg-gray-50 dark:bg-zinc-800 p-4">
        <p className="text-gray-500 dark:text-gray-400">
          Select a field to edit properties
        </p>
      </div>
    );
  }

  const { type, props } = comp;
  const { label = "", placeholder = "", options = [], required = false, helpText = "", minLength = "", maxLength = "", inputType = "text" } = props;

  return (
    <div className="w-64 bg-gray-50 dark:bg-zinc-800 p-4 space-y-4 overflow-auto rounded-md">
      <h2 className="text-lg font-semibold dark:text-white">Field Properties</h2>

      <div>
        <label className="block text-sm font-medium dark:text-gray-200">Label</label>
        <input
          type="text"
          value={label}
          onChange={(e) => updateProp("label", e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 bg-white text-sm dark:bg-zinc-700 dark:text-white"
        />
      </div>

      {type !== "checkbox" && (
        <div>
          <label className="block text-sm font-medium dark:text-gray-200">Placeholder</label>
          <input
            type="text"
            value={placeholder}
            onChange={(e) => updateProp("placeholder", e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 bg-white text-sm dark:bg-zinc-700 dark:text-white"
          />
        </div>
      )}

      {(type === "dropdown" || type === "checkbox") && (
        <div>
          <label className="block text-sm font-medium dark:text-gray-200">Options (one per line)</label>
          <textarea
            value={options.join("\n")}
            onChange={(e) =>
              updateProp(
                "options",
                e.target.value.split(/\r?\n/)
              )
            }
            rows={4}
            className="mt-1 whitespace-pre-wrap block w-full rounded border-gray-300 bg-white text-sm dark:bg-zinc-700 dark:text-white"
          />
        </div>
      )}

      <div className="flex items-center">
        <input
          id="required"
          type="checkbox"
          checked={required}
          onChange={(e) => updateProp("required", e.target.checked)}
          className="mr-2 h-4 w-4 text-blue-600 dark:bg-zinc-700 dark:border-zinc-600"
        />
        <label htmlFor="required" className="text-sm dark:text-gray-200">
          Required
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium dark:text-gray-200">Help Text</label>
        <input
          type="text"
          value={helpText}
          onChange={(e) => updateProp("helpText", e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 bg-white text-sm dark:bg-zinc-700 dark:text-white"
        />
      </div>

      {type === "text" && (
        <div>
          <label className="block text-sm font-medium dark:text-gray-200">Input Type</label>
          <select
            value={inputType}
            onChange={(e) => updateProp("inputType", e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 bg-white text-sm dark:bg-zinc-700 dark:text-white"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="tel">Phone</option>
          </select>
        </div>
      )}

      {((type === "text" && inputType === "text") || type === "textarea") && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium dark:text-gray-200">Min Length</label>
            <input
              type="number"
              value={minLength}
              onChange={(e) => updateProp("minLength", e.target.value)}
              className="mt-1 block w-full rounded border-gray-300 bg-white text-sm dark:bg-zinc-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-200">Max Length</label>
            <input
              type="number"
              value={maxLength}
              onChange={(e) => updateProp("maxLength", e.target.value)}
              className="mt-1 block w-full rounded border-gray-300 bg-white text-sm dark:bg-zinc-700 dark:text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}
