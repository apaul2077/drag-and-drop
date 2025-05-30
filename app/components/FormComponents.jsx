
export const TextInput = ({ label, placeholder }) => {
  const displayLabel = label ?? "Label";
  return (
    <div className="p-4 rounded-xl bg-gray-100 dark:bg-zinc-800 shadow-sm">
      <label className="w-full block text-sm font-medium mb-1 break-words text-wrap dark:text-white">
        {displayLabel}
      </label>
      <input
        type="text"
        placeholder={placeholder ?? "Enter text here..."}
        className="bg-white w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
      />
    </div>

  )

};

export const TextArea = ({ label, placeholder }) => {
  const displayLabel = label ?? "Label";
  return (
    <div className="p-4 rounded-xl bg-gray-100 dark:bg-zinc-800 shadow-sm">
      <label className="w-full block text-sm font-medium mb-1 break-words text-wrap dark:text-white">
        {displayLabel}
      </label>
      <textarea
        placeholder={placeholder ?? "Enter text here..."}
        className="w-full bg-white rounded-md border border-gray-300 px-3 py-2 text-sm dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
        rows="4"
      />
    </div>
  )
};

export const Dropdown = ({ label, options = ["Option 1", "Option 2"] }) => {
  const displayLabel = label ?? "Label";
  return(
  <div className="p-4 rounded-xl bg-gray-100 dark:bg-zinc-800 shadow-sm">
    <label className="w-full block text-sm font-medium mb-1 break-words text-wrap dark:text-white">
        {displayLabel}
      </label>
    <select
      className="bg-white w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
    >
      {options.map((option, idx) => (
        <option key={idx} value={option}>{option}</option>
      ))}
    </select>
  </div>);
};

export const CheckboxGroup = ({ label, options = ["Option 1", "Option 2"] }) => {
  const displayLabel = label ?? "Label";

  return (
    <div className="p-4 rounded-xl bg-gray-100 dark:bg-zinc-800 shadow-sm">
      <label className="w-full block text-sm font-medium mb-1 break-words text-wrap dark:text-white">
        {displayLabel}
      </label>
      <div className="space-y-2">
        {options.map((option, idx) => {
          const id = `checkbox-${idx}`;
          return (
            <div key={idx} className="relative flex items-start gap-2">
              <input
                id={id}
                type="checkbox"
                className="
                  peer appearance-none shrink-0 w-4 h-4 border-2 border-gray-300 rounded-sm mt-1 bg-white
                  focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
                  checked:bg-blue-500 checked:border-0
                  dark:bg-zinc-700 dark:border-zinc-600 dark:checked:bg-blue-500
                "
              />
              <svg
                className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block stroke-white mt-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <label htmlFor={id} className="text-sm text-black dark:text-white">
                {option}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export const DateInput = ({ label }) => {
  const displayLabel = label ?? "Label";

  return (
    <div className="p-4 rounded-xl bg-gray-100 dark:bg-zinc-800 shadow-sm">
      <label className="w-full block text-sm font-medium mb-1 break-words text-wrap dark:text-white">
        {displayLabel}
      </label>
      <input
        type="date"
        placeholder="DD/MM/YYYY"
        className="w-full bg-white rounded-md border border-gray-300 px-3 py-2 text-sm dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
      />
    </div>
  );
};

