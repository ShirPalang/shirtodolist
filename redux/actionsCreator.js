import { addTodo, removeTodo, completedTodo, getAllTdodos } from "./actions.js"

const addTodoAction = (title) => {
    return {
        type: addTodo,
        title
    }
}

const removeTodoAction = (id) => {
    return {
        type: removeTodo,
        id
    }
}

const completedTodoAction = (id) => {
    return {
        type: completedTodo,
        id
    }
}

const getALLTodosAction = () => {
    return {
        type: getAllTdodos
    }
}

export { addTodoAction, removeTodoAction, completedTodoAction, getALLTodosAction }