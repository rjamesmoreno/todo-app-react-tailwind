import { IconLoader2, IconPlus } from "@tabler/icons-react";
import { FormEvent, useState } from "react";
import Task from "./Task";

type TaskType = {
  id: number;
  name: string;
  isFinished: boolean;
};

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

export default function Dashboard() {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>("tasks", []);
  const [taskName, setTaskName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editTaskName, setEditTaskName] = useState("");

  async function handleCreateTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!taskName.trim()) return;

    setLoading(true);

    const newTask: TaskType = {
      id: Date.now(),
      name: taskName,
      isFinished: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskName("");
    setLoading(false);
  }

  function handleUpdateTask(id: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isFinished: !task.isFinished } : task
      )
    );
  }

  function handleDeleteTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function handleEditTask(id: number, name: string) {
    setIsEditing(id);
    setEditTaskName(name);
  }

  function handleSaveEditTask(id: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, name: editTaskName } : task
      )
    );
    setIsEditing(null);
    setEditTaskName("");
  }

  return (
    <div className="w-full md:w-[70vw] p-4 md:p-12 bg-[#3450A1] rounded-xl min-h-[80vh]">
      <div className="grid grid-flow-row justify-center">
        <h1 className="text-xl md:text-2xl text-white pt-5 text-center">
          To-do List
        </h1>
        <div className="relative p-4">
          <form onSubmit={handleCreateTask}>
            <input
              className="py-2 px-4 w-full md:w-[30vw] rounded-full bg-[#183075] text-white"
              placeholder="Enter Task"
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <button
              type="submit"
              className="btn bg-[#EB06FF] active:bg-[#C617D5] text-white text-xl font-black text-center rounded-[100%] size-8 absolute ml-[-35px] top-5 border-2 border-transparent hover:border-white transition-all duration-300"
              disabled={loading}
            >
              {loading ? (
                <IconLoader2 stroke={2} className="ml-1 animate-spin" />
              ) : (
                <IconPlus stroke={2} className="ml-[2px]" />
              )}
            </button>
          </form>
        </div>
        <section>
          <h2 className="text-white px-4 text-lg">Tasks To Do</h2>
          <ul className="h-[30vh] overflow-y-auto">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  isEditing={isEditing}
                  editTaskName={editTaskName}
                  setEditTaskName={setEditTaskName}
                  handleUpdateTask={handleUpdateTask}
                  handleDeleteTask={handleDeleteTask}
                  handleEditTask={handleEditTask}
                  handleSaveEditTask={handleSaveEditTask}
                />
              ))
            ) : (
              <p className="grid place-items-center text-gray-500 text-xl">
                No tasks
              </p>
            )}
          </ul>
        </section>
        <section className="my-2 h-[15vh] flex flex-col items-center justify-center">
          <div className="py-2 px-4 w-full md:w-[30vw] rounded bg-[#5C76BD] mb-2 flex justify-between">
            <p className="grid place-items-center">All Tasks</p>
            <p className="py-1 px-5 bg-[#23366D] rounded text-red-500">
              {tasks.length}
            </p>
          </div>
          <div className="py-2 px-4 w-full md:w-[30vw] rounded bg-[#5C76BD] flex justify-between">
            <p className="grid place-items-center">Completed Tasks</p>
            <p className="py-1 px-5 bg-[#23366D] rounded text-red-500">
              {tasks.filter((task) => task.isFinished).length}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
