import { addTodo, completedTodo, getAllTdodos, removeTodo } from '../redux/actions.js'
import { addTodoAction, completedTodoAction, getALLTodosAction, removeTodoAction } from '../redux/actionsCreator.js'

const addTodoBtn = document.getElementById('add-todo')
const todoInput = document.getElementById('todo-input')

window.removeTodoHandler = removeTodoHandler
window.completedTodoHandler = completedTodoHandler

const shirTodolistReducer = (state = [], action) => {
    switch (action.type) {
        case addTodo: {
            const newState = [...state]
            const newTodo = {
                id: crypto.randomUUID(),
                title: action.title,
                isCompleted: false
            }
            newState.push(newTodo)
            return newState
        }
        case removeTodo: {
            const copyState = [...state]
            const newState = copyState.filter(todo => todo.id !== action.id)
            return newState
        }
        case completedTodo: {
            const copyState = [...state]
            const newState = copyState.map(todo => {
                if (todo.id === action.id) {
                    todo.isCompleted = !todo.isCompleted
                }
                return todo
            })
            return newState
        }
        case getAllTdodos: {
            return state
        }
        default: {
            return state
        }
    }
}

const store = Redux.createStore(shirTodolistReducer)

function removeTodoHandler(id) {
    store.dispatch(removeTodoAction(id))

    const todos = store.getState()
    showtodos(todos)
}

function completedTodoHandler(id) {
    store.dispatch(completedTodoAction(id))

    const todos = store.getState()
    showtodos(todos)
}

function showtodos(todos) {
    document.querySelector('.todos-container').innerHTML = ''

    todos.map(todo => {
        document.querySelector('.todos-container').innerHTML += `
        <div class="todo">
            <div class="todo-title" ${todo.isCompleted && 'style="text-decoration: line-through;"'}>
                <p>${todo.title}</p>
            </div>
            <button class="completed" onclick=completedTodoHandler('${todo.id}')>completed</button>
            <button class="remove" onclick=removeTodoHandler('${todo.id}')>remove</button>
        </div>
        `
    })
}

addTodoBtn.addEventListener('click', () => {
    const inputValue = todoInput.value
    if (inputValue) {
        store.dispatch(addTodoAction(inputValue))
        todoInput.value = ''
        const todos = store.getState()
        showtodos(todos)
    }
})

document.querySelector('select').addEventListener('change', (e) => {
    store.dispatch(getALLTodosAction())

    if (e.target.value === 'all') {
        const todos = store.getState()
        showtodos(todos)
    } else if (e.target.value === 'completed') {
        const allTodos = store.getState()
        const todos = allTodos.filter(todo => todo.isCompleted)
        showtodos(todos)
    } else if (e.target.value === 'incompleted') {
        const allTodos = store.getState()
        const todos = allTodos.filter(todo => !todo.isCompleted)
        showtodos(todos)
    }
})