import "./App.css";

// components
import ListTodo from "./components/ListTodo";

function App() {
  return (
    <div className="flex justify-center items-center h-[100vh] ">
      <div className="bg-[#D9D9D9] w-[85vw] xl:w-[40vw]  h-[60vh] lg:h-[80vh] rounded-[30px] px-[80px] pt-[30px]  flex flex-col  items-center overflow-hidden">
        <ListTodo />
      </div>
    </div>
  );
}

export default App;
