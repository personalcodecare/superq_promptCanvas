import { useMemo, useState, type FormEvent } from 'react'

type Task = {
  id: string
  title: string
  status: 'open' | 'done'
  category: 'planning' | 'build' | 'review'
}

const createId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: createId(),
      title: 'Draft interface skeleton',
      status: 'done',
      category: 'planning',
    },
    {
      id: createId(),
      title: 'Hook up prompt mapping logic',
      status: 'open',
      category: 'build',
    },
    {
      id: createId(),
      title: 'Polish accessibility pass',
      status: 'open',
      category: 'review',
    },
  ])
  const [filter, setFilter] = useState<'all' | 'open' | 'done'>('all')
  const [newTask, setNewTask] = useState('')

  const filteredTasks = useMemo(() => {
    if (filter === 'all') return tasks
    return tasks.filter((task) => task.status === filter)
  }, [filter, tasks])

  const handleToggle = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === 'done' ? 'open' : 'done' }
          : task
      )
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = newTask.trim()
    if (!trimmed) return
    setTasks((prev) => [
      { id: createId(), title: trimmed, status: 'open', category: 'build' },
      ...prev,
    ])
    setNewTask('')
  }

  const completed = tasks.filter((task) => task.status === 'done').length

  return (
    <div className="panel">
      <div className="canvas-header">
        <div>
          <h2>Task Manager</h2>
          <p>Stay focused with quick add + status toggles.</p>
        </div>
        <div className="button-row" role="group" aria-label="Filter tasks">
          {(['all', 'open', 'done'] as const).map((option) => (
            <button
              key={option}
              className={`button ghost${filter === option ? ' is-active' : ''}`}
              type="button"
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
            >
              {option === 'all' ? 'All' : option === 'open' ? 'Open' : 'Done'}
            </button>
          ))}
        </div>
      </div>

      <div className="stats" aria-label="Task statistics">
        <span className="stat">{tasks.length} total</span>
        <span className="stat">{completed} completed</span>
        <span className="stat">{tasks.length - completed} remaining</span>
      </div>

      <form className="prompt-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="task-input">
          Add task
        </label>
        <input
          id="task-input"
          className="prompt-input"
          placeholder="Add a new task"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button className="button" type="submit">
          Add task
        </button>
      </form>

      <div className="list" role="list">
        {filteredTasks.map((task) => (
          <label className="list-item" key={task.id}>
            <div>
              <input
                type="checkbox"
                checked={task.status === 'done'}
                onChange={() => handleToggle(task.id)}
                aria-label={`Toggle ${task.title}`}
              />
              <span style={{ marginLeft: '0.5rem' }}>{task.title}</span>
            </div>
            <span className="pill">{task.category}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default TaskManager

