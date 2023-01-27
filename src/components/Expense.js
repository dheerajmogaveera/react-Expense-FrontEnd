import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Typography } from '@mui/material';
import { useContext, useRef } from 'react';
import ExpenseContext from '../context/ExpenseContext';
import '../css/Expenses.css';
import { deleteExpenseById } from '../services/ExpenseTrackerService';
import ExpenseForm from './ExpenseForm';

const Expense = props => {
	const context = useContext(ExpenseContext);
	const deleteExpense = () => {
		deleteExpenseById(props.obj.id).then(() => {
			context.setReload(!context.reload);
		});
	};
	const modal = useRef();
	const modalClose = () => {
		modal.current.style.display = 'none';
	};
	const inputFormStyle = {
		display: 'inline-block',
		color: 'text.primary',

		width: '50%',
		height: 'max-content',
		margin: '10px',
		border: 3,
		borderColor: 'grey.500',

		borderRadius: 1,
		boxShadow: 3,
		typography: 'body1',
		':hover': { border: 2, borderColor: 'blue' },
	};
	return (
		<div className="Expense">
			<div className="modalCenter">
				<div id="modal1" ref={modal} className="Modal">
					<Button
						color="error"
						variant="contained"
						startIcon={<CloseIcon />}
						onClick={modalClose}
						style={{ marginLeft: '85%' }}
					/>
					<ExpenseForm Object={props.obj} type="update" />
				</div>
			</div>
			<Box component={'div'} sx={inputFormStyle}>
				<div className="Expense">
					<Button
						variant="contained"
						size="small"
						color="error"
						component="label"
						startIcon={<DeleteIcon />}
						onClick={deleteExpense}
					/>
					<Button
						variant="contained"
						size="small"
						component="label"
						startIcon={<CreateIcon />}
						onClick={event => {
							context.setTitle(props.obj.title);
							context.setAmount(props.obj.amount);
							context.setCategories([...props.obj.categories]);
							context.setNote(props.obj.note);
							modal.current.style.display = 'block';
						}}
						sx={{ ml: 1 }}
					/>
					<br />
					<Typography variant="h6">
						<span className="text">
							{props.obj.title}
						</span>
					</Typography>
					<Typography variant="h6" color={'green'} fontWeight="bold">
						<span className="text">
							${props.obj.amount}
						</span>
					</Typography>
					<Typography variant="h6">
						<span className="text">
							{props.obj.categories}
						</span>
					</Typography>
					<Typography variant="h6">
						<span className="text">
							{props.obj.note}
						</span>
					</Typography>
				</div>
			</Box>
		</div>
	);
};

export default Expense;
