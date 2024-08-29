/**
 * v0 by Vercel.
 * @see https://v0.dev/t/RLuWvdDONww
 */
"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { TrashIcon } from "@/components/ui/trashIcon"
import todoService, { Task } from "@/services/todoService"
import { useEffect, useState } from "react"

export default function Component() {
  const [tasks, setTasks] = useState<Task[]>([] as Task[]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    todoService.getTodos().then((tasks) => {
      setTasks(tasks)
    })
  }, []);

  async function handleChange(id: number) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const newTask = {
      ...task,
      completed: !task.completed,
    };

    await todoService.updateTask(newTask);
    const tasks2 = await todoService.getTodos();
    setTasks(tasks2);
  }

  async function handleDelete(id: number) {
    await todoService.deleteTask(id);

    const tasks = await todoService.getTodos();
    setTasks(tasks);
  }

  async function handleCreate() {
    if (title === "") return;
    const task = {
      title: title,
      description: "",
      completed: false,
    } as Task;

    await todoService.createTask(task);
    const tasks = await todoService.getTodos();
    setTasks(tasks);
    setTitle("");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center dark:text-white">Todo App</h1>
        <div className="flex flex-row items-center gap-2">
          <input
            className="flex-grow border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ color: "black" }}
            placeholder="Add a new task"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Button className="h-8 w-8" size="icon" variant="outline" onClick={handleCreate} >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span className="sr-only">Add task</span>
          </Button>
        </div>

        <div className="space-y-4">
          {tasks.map((task: Task) => (
            <Card>
              <CardContent className="flex flex-row items-start gap-2 p-4">
                <Checkbox checked={task.completed} onClick={() => handleChange(task.id)} />
                <div className="space-y-1 leading-none flex-grow">
                  <Label className="text-lg font-semibold dark:text-gray-200" htmlFor={task.id as unknown as string}>
                    {task.title}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
                </div>
                <Button className="ml-auto h-8 w-8" size="icon" variant="outline" onClick={() => handleDelete(task.id)} >
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Delete task</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}


