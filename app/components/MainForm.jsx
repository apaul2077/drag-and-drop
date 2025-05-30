import { useDroppable } from "@dnd-kit/core";

export const MainForm = ({ title = "Untitled Form", children}) => {
  const { setNodeRef } = useDroppable({ id: "main-form" });
  return (
    <div ref={setNodeRef} className="grid grid-cols-1 gap-2 w-full p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm">
      <h1 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">
        {title}
      </h1>
      {children}
    </div>
  );
};
