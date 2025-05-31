import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiTrash2, FiMove } from "react-icons/fi";

export default function SortableComponent({ id, children, onClick, forms, setForms }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setForms((prev) => {
  // copy the pages array
  const updatedPages = [...prev.form];
  // remove from page 0
  updatedPages[0] = updatedPages[0].filter((comp) => comp.id !== id);
  // return a new object
  return { ...prev, form: updatedPages };
});

  };

  return (
    <div
      style={style}
      className="mb-4 relative bg-white dark:bg-zinc-700 p-1 rounded-xl shadow group"
      onPointerDownCapture={() => onClick?.(id)}
    >
      {/* Delete Icon */}
      <button
        onClick={handleDelete}
        className="absolute top-7 right-5 z-10 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition"
        title="Delete field"
      >
        <FiTrash2 />
      </button>

      {/* Drag Handle */}
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 cursor-grab text-gray-400 hover:text-gray-600"
        title="Drag to move"
      >
        <FiMove />
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
