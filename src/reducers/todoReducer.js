import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from './types';
import { loadState, saveState } from '../utils';

const localStorage = loadState('todos');

const initState = localStorage ? localStorage : { todos: ['Finish Project'] };
//const initState = { todos: [] };

export default function (state = initState, { type, payload }) {
	switch (type) {
		/*
		case SET_AUTH:
			const newState = { ...state, token: payload };
			saveState("auth", newState);
			return newState;
            */
		default:
			return state;
	}
}
