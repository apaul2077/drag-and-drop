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
    <div>
        <MainForm/>
    </div>
  );
}
