import { Routes, Route } from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import TaskForm from "./pages/TaskForm";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./components/NavBar";
import TaskProvider from "./context/TaskProvider";

function App() {
  return (
    <TaskProvider>
      <div className="flex flex-col min-h-screen">
        <header className="bg-slate-200 dark:bg-slate-800 border-b border-slate-500">
          <NavBar></NavBar>
        </header>
        <main className="flex-1 bg-slate-600 p-4">
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<TasksPage></TasksPage>}></Route>
              <Route path="/new" element={<TaskForm></TaskForm>}></Route>
              <Route path="/edit/:id" element={<TaskForm></TaskForm>}></Route>
              <Route path="/*" element={<NotFoundPage></NotFoundPage>}></Route>
            </Routes>
          </div>
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;
