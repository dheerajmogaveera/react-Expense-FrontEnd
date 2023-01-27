import { useContext, useEffect } from 'react';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import ExpenseContext from '../context/ExpenseContext';
import '../css/Expenses.css';
import { getExpenses } from '../services/ExpenseTrackerService';
import Expense from './Expense';
import ExpenseForm from './ExpenseForm';
const Expenses = () => {
	const context = useContext(ExpenseContext);
	const expenseList = [];
	useEffect(
		() => {
			getExpenses().then(res => {
				context.update(res);
			});
		},
		[context.reload],
	);
	context.expense.expenseArray.map((item, index) => {
		expenseList.push(<Expense key={index} obj={item} />);
	});

	const modalFunction = () => {
		const modal = document.getElementById('modal');
		context.setTitle("");
		context.setAmount("");
		context.setCategories([]);
		context.setNote("");
		modal.style.display = 'block';
	};

	return (
    <div>
      
			<Button
				startIcon={<AddIcon />}
				variant="contained"
				onClick={modalFunction}
			>
				Expense
			</Button>
			<div className="modalCenter">
				<div id="modal" className="Modal">
					<Button
						color="error"
						variant="contained"
						startIcon={<CloseIcon />}
						onClick={() => {
							{
								modal.style.display = 'none';
							}
						}}
						style={{ marginLeft: '85%' }}
					/>
					<ExpenseForm type="add" />
				</div>
			</div>
			{expenseList}
		</div>
	);
};

export default Expenses;
