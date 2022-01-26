import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { MdDeleteForever } from 'react-icons/md';

import { REMOVE_TODO } from '../reducers/types';
import { CreateTodoModal, UpdateTodoModal } from '.';

const GridContainer = styled.div`
	display: grid;
	grid-template-columns 1fr;
	margin: 3rem;
    max-width: 40rem;
`;

const Flex = styled.div`
	display: flex;
`;

const SmallButtonMargins = styled.div`
	margin-bottom: 1rem;
	margin-left: 0.2rem;
`;

const SmallMarginLeft = styled.div`
	margin-left: 3rem;
`;

const Todos = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todo.todos);

	const renderDeleteButton = (todo) => {
		return (
			<Button
				size="sm"
				variant="danger"
				onClick={() => dispatch({ type: REMOVE_TODO, payload: todo })}
			>
				<MdDeleteForever />
			</Button>
		);
	};

	const renderTodos = () => (
		<ul>
			{todos.map((todo) => (
				<Flex key={todo}>
					<SmallButtonMargins>{renderDeleteButton(todo)}</SmallButtonMargins>
					<SmallButtonMargins>
						<UpdateTodoModal todo={todo} />
					</SmallButtonMargins>

					<SmallMarginLeft>
						<li>{todo}</li>
					</SmallMarginLeft>
				</Flex>
			))}
		</ul>
	);

	return (
		<GridContainer>
			<div>
				<h1>Todos List</h1>
				{renderTodos()}
				<CreateTodoModal variant="primary" size="lg" />
			</div>
		</GridContainer>
	);
};

export default Todos;
