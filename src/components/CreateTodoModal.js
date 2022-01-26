import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';

import { ADD_TODO } from '../reducers/types';

const BottomMarginBadge = styled(Badge)`
	margin-bottom: 0.5rem;
`;

const CreateTodoModal = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todo.todos);
	const [show, setShow] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [alreadyExistsError, setAlreadyExistsError] = useState(false);
	const [formValue, setFormValue] = useState('');

	const handleClose = () => {
		setShow(false);
		setShowSuccess(false);
	};
	const handleShow = () => setShow(true);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch({ type: ADD_TODO, payload: formValue });
		setShowSuccess(true);
		setFormValue('');
	};
	const handleChange = (e) => {
		const { value } = e.target;
		const alreadyExists = todos
			.map((todo) => todo.toLowerCase())
			.includes(value.toLowerCase());
		if (alreadyExists) {
			setAlreadyExistsError(true);
		} else {
			setAlreadyExistsError(false);
		}
		setFormValue(value);
	};

	const renderAlreadyExistsError = () => (
		<BottomMarginBadge pill bg="danger">
			This todo already exists!
		</BottomMarginBadge>
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
			<Button variant="primary" onClick={handleShow}>
				Create Todo
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create Todo</Modal.Title>
				</Modal.Header>
				<Modal.Body>{renderModalBody()}</Modal.Body>
			</Modal>
		</>
	);
};

export default CreateTodoModal;
