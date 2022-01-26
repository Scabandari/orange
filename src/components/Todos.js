import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const GridContainer = styled.div`
	border: 2px solid red;
	display: grid;
	grid-template-columns 1fr 1fr;
	margin: 3rem;
    max-width: 40rem;
`;

const Todos = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todo.todos);

	const renderTodos = () => (
		<ul>
			{todos.map((todo) => (
				<li>{todo}</li>
			))}
		</ul>
	);

	return (
		<GridContainer>
			<div>
				<h1>Todos List</h1>
				{renderTodos()}
			</div>
		</GridContainer>
	);
};

export default Todos;
