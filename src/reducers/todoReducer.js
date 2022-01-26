import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from './types';
import { loadState, saveState } from '../utils';

const localStorage = loadState('todos');

const initState = localStorage ? localStorage : { todos: ['Finish Project'] };

export default function (state = initState, { type, payload }) {
	const { todos } = state;
	let newTodos;
	let newState;
	switch (type) {
		case ADD_TODO:
			newTodos = [...todos, payload];
			newState = { ...state, todos: newTodos };
			saveState('todos', newState);
			return newState;
		case UPDATE_TODO:
			const { todoBeingReplaced, replacementTodo } = payload;
			newTodos = todos.filter(
				(oldStateTodo) => oldStateTodo !== todoBeingReplaced
			);
			newState = { ...state, todos: [...newTodos, replacementTodo] };
			saveState('todos', newState);
			return newState;
		case REMOVE_TODO:
			newTodos = todos.filter((oldStateTodo) => oldStateTodo !== payload);
			newState = { ...state, todos: newTodos };
			saveState('todos', newState);
			return newState;
		default:
			return state;
	}
}
