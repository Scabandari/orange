import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BiEdit } from 'react-icons/bi';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';

import { UPDATE_TODO } from '../reducers/types';

const SmallBottomMargin = styled.div`
	margin-bottom: 0.5rem;
`;

const UpdateTodoModal = ({ todo }) => {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [alreadyExistsError, setAlreadyExistsError] = useState(false);
	const [formValue, setFormValue] = useState(todo);

	const handleClose = () => {
		setShow(false);
		setShowSuccess(false);
	};
	const handleShow = () => setShow(true);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (formValue === todo) {
			setAlreadyExistsError(true);
			return;
		} else {
			setAlreadyExistsError(false);
		}
		dispatch({
			type: UPDATE_TODO,
			payload: { todoBeingReplaced: todo, replacementTodo: formValue }
		});
		setShowSuccess(true);
		setFormValue('');
	};

	const handleChange = (e) => {
		const { value } = e.target;
		if (todo !== value) {
			setAlreadyExistsError(false);
		}
		setFormValue(value);
	};

	const renderAlreadyExistsError = () => (
		<SmallBottomMargin>
			<Badge pill bg="danger">
				This todo already exists!
			</Badge>
		</SmallBottomMargin>
	);

	const renderModalBody = () => {
		return showSuccess ? (
			<h1>
				<Badge bg="success">Success!</Badge>
			</h1>
		) : (
			<Form onSubmit={handleSubmit}>
				{alreadyExistsError && renderAlreadyExistsError()}
				<Form.Group className="mb-3">
					<Form.Control value={formValue} onChange={handleChange} />
				</Form.Group>
				<Button type="submit" disabled={alreadyExistsError || formValue === ''}>
					Submit
				</Button>
			</Form>
		);
	};
	return (
		<>
			<Button variant="secondary" size="sm" onClick={handleShow}>
				<BiEdit />
			</Button>
			<Modal
				show={show}
				onHide={handleClose}
				onShow={() => {
					setFormValue(todo);
					setAlreadyExistsError(false);
				}}
			>
				<Modal.Header closeButton>
					<Modal.Title>Update Todo</Modal.Title>
				</Modal.Header>
				<Modal.Body>{renderModalBody()}</Modal.Body>
			</Modal>
		</>
	);
};

export default UpdateTodoModal;
