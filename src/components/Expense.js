import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Typography } from '@mui/material';
import { useContext, useRef } from 'react';
import ExpenseContext from '../context/ExpenseContext';
import '../css/Expenses.css';
import { deleteExpenseById } from '../services/ExpenseTrackerService';
import ExpenseForm from './ExpenseForm';
import {
	inputFormStyle,
	openUpdateForm,
} from '../services/ExpenseTrackerUtils';

const Expense = props => {
	const context = useContext(ExpenseContext);
	const deleteExpense = () => {
		deleteExpenseById(props.obj.id).then(() => {
			context.setReload(!context.reload);
		});
	};

	const modal = useRef();
	const updateClick = () => {
		openUpdateForm(props, context, modal);
	};
	const modalClose = () => {
		modal.current.style.display = 'none';
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
				<div className="Expense" id="id1">
					<Button
						id="delete"
						variant="contained"
						size="small"
						color="error"
						startIcon={<DeleteIcon />}
						onClick={deleteExpense}
					/>
					<Button
						className="update"
						id="update"
						variant="contained"
						size="small"
						startIcon={<CreateIcon />}
						onClick={updateClick}
						sx={{ ml: 1 }}
					/>
					<br />
					<Typography variant="h6">
						<span className="title">
							{props.obj.title}
						</span>
					</Typography>
					<Typography variant="h6" color={'green'} fontWeight="bold">
						<span className="amount">
							${props.obj.amount}
						</span>
					</Typography>
					<Typography variant="h6">
						<span className="categories">
							{props.obj.categories}
						</span>
					</Typography>
					<Typography variant="h6">
						<span className="note">
							{props.obj.note}
						</span>
					</Typography>
				</div>
			</Box>
		</div>
	);
};

export default Expense;
