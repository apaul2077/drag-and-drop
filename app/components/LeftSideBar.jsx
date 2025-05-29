const DRAGGABLE_COMPONENTS = [
  { id: "text", label: "Text Input" },
  { id: "textarea", label: "Textarea" },
  { id: "dropdown", label: "Dropdown" },
  { id: "checkbox", label: "Checkbox" },
  { id: "date", label: "Date Picker" },
];

const LeftSidebar = () => {
  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div className="w-64 bg-gray-100 dark:bg-zinc-800 p-4 border-gray-300 dark:border-zinc-700 flex flex-col rounded-md">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Components</h2>
      <div className="flex flex-col gap-3">
        {DRAGGABLE_COMPONENTS.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            className="cursor-move px-4 py-2 rounded-md bg-white dark:bg-zinc-700 shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-600 text-sm font-medium dark:text-white border border-gray-200 dark:border-zinc-600"
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
