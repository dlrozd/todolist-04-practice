import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
import type {FilterValues, Task} from './App'
import {Button} from './Button'

type Props = {
  title: string
  tasks: Task[]
  filter: FilterValues
  deleteTask: (taskId: string) => void
  changeFilter: (filter: FilterValues) => void
  createTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask, changeTaskStatus, filter}: Props) => {
  const [taskTitle, setTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)


  const createTaskHandler = () => {
    const trimmedTaskTitle = taskTitle.trim()
    if (trimmedTaskTitle.trim() !== '') {
      createTask(trimmedTaskTitle)
      setTaskTitle('')
    } else {
      setError('Title can not be empty')
    }
  }

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
    setError(null)
  }

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTaskHandler()
    }
  }

  const changeTaskStatusHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    changeTaskStatus(taskId, newStatusValue)
  }

  return (
      <div>
        <h3>{title}</h3>
        <div>
          <input className={error ? 'error' : '' } value={taskTitle}
                 onChange={changeTaskTitleHandler}
                 onKeyDown={createTaskOnEnterHandler}/>
          <Button title={'+'} onClick={createTaskHandler}/>
          {error && <div className={'error-message'}>{error}</div>}
        </div>
        {tasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <ul>
              {tasks.map(task => {
                const deleteTaskHandler = () => {
                  deleteTask(task.id)
                }

                return (
                    <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                      <input type="checkbox" checked={task.isDone} onChange={(e) => changeTaskStatusHandler(task.id, e)}/>
                      <span>{task.title}</span>
                      <Button title={'x'} onClick={deleteTaskHandler} />
                    </li>
                )
              })}
            </ul>
        )}
        <div>
          <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'} onClick={() => changeFilter('all')}/>
          <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'} onClick={() => changeFilter('active')}/>
          <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'} onClick={() => changeFilter('completed')}/>
        </div>
      </div>
  )
}
