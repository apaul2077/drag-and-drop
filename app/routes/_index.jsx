import { CheckboxGroup, DateInput, Dropdown, TextArea, TextInput } from "../components/FormComponents.jsx";
import LeftSidebar from "../components/LeftSideBar.jsx";
import { MainForm } from "../components/MainForm.jsx";

export const meta = () => {
  return [
    { title: "My App" },
    { name: "description", content: "Welcome to my custom Remix app" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-[90%] bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to the Form Builder
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">
          Create custom forms with drag-and-drop ease. Preview them instantly.
        </p>
        <a
          href="/builder"
          className="inline-block px-6 py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition dark:text-white"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
