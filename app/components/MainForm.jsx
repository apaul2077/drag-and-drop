export const MainForm = ({ title = "Untitled Form", form }) => {
  return (
    <div className="flex flex-col w-full p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm">
      <h1 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-white">
        {title}
      </h1>
      {form}
    </div>
  );
};
