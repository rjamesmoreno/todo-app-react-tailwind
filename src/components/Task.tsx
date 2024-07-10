import { IconCheck, IconTrash, IconEdit } from "@tabler/icons-react";

type TaskProps = {
    task: {
      id: number;
      name: string;
      isFinished: boolean;
    };
    isEditing: number | null;
    editTaskName: string;
    setEditTaskName: React.Dispatch<React.SetStateAction<string>>;
    handleUpdateTask: (id: number) => void;
    handleDeleteTask: (id: number) => void;
    handleEditTask: (id: number, name: string) => void;
    handleSaveEditTask: (id: number) => void;
  };
  

export default function Task({
    task,
    isEditing,
    editTaskName,
    setEditTaskName,
    handleUpdateTask,
    handleDeleteTask,
    handleEditTask,
    handleSaveEditTask,
  }: TaskProps) {
    return (
        <li
          key={task.id}
          className="flex justify-between items-center bg-[#183075] rounded py-2 px-5 mb-2 text-white"
        >
          {isEditing === task.id ? (
            <>
              <input
                type="text"
                value={editTaskName}
                onChange={(e) => setEditTaskName(e.target.value)}
                className="py-2 px-4 w-full rounded-full bg-[#183075] text-white"
              />
              <button
                onClick={() => handleSaveEditTask(task.id)}
                className="mr-2 text-green-500 border-2 border-transparent hover:border-white transition-all duration-300 rounded"
              >
                <IconCheck stroke={2} />
              </button>
            </>
          ) : (
            <>
              <span className={task.isFinished ? "line-through" : ""}>
                {task.name}
              </span>
              <div>
                <button
                  onClick={() => handleUpdateTask(task.id)}
                  className="mr-2 text-green-500 border-2 border-transparent hover:border-white transition-all duration-300 rounded"
                >
                  <IconCheck stroke={2} />
                </button>
                <button
                  onClick={() => handleEditTask(task.id, task.name)}
                  className="mr-2 text-yellow-500 border-2 border-transparent hover:border-white transition-all duration-300 rounded"
                >
                  <IconEdit stroke={2} />
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500 border-2 border-transparent hover:border-white transition-all duration-300 rounded"
                >
                  <IconTrash stroke={2} />
                </button>
              </div>
            </>
          )}
        </li>
      );
    }