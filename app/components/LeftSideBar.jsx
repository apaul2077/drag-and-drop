import { useDraggable } from "@dnd-kit/core";

const DRAGGABLE_COMPONENTS = [
  { id: "text", label: "Text Input" },
  { id: "textarea", label: "Textarea" },
  { id: "dropdown", label: "Dropdown" },
  { id: "checkbox", label: "Checkbox" },
  { id: "date", label: "Date Picker" },
];

function DraggableItem({ id, label }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-move px-4 py-2 rounded-md bg-white dark:bg-zinc-700 shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-600 text-sm font-medium dark:text-white border border-gray-200 dark:border-zinc-600"
    >
      {label}
    </div>
  );
}

export default function LeftSidebar() {
  return (
    <div className="w-64 bg-gray-100 dark:bg-zinc-800 p-4 border-r border-gray-300 dark:border-zinc-700 flex flex-col rounded-md">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Components</h2>
      <div className="flex flex-col gap-3">
        {DRAGGABLE_COMPONENTS.map((item) => (
          <DraggableItem key={item.id} id={item.id} label={item.label} />
        ))}
      </div>
    </div>
  );
}
