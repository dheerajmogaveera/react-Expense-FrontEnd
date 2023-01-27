import {
	Button,
	FormControl,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from '@mui/material';
import React, { useContext, useEffect } from 'react';
import ExpenseContext from '../context/ExpenseContext';
import '../css/ExpenseForm.css';
import { addExpense, updateExpense } from '../services/ExpenseTrackerService';

const ExpenseForm = props => {
	const context = useContext(ExpenseContext);
	let body = {
		title: context.title,
		amount: context.amount,
		categories: context.categories,
		note: context.note,
	};
	const addOrUpDateExpense = () => {
		if (props.type === 'add') {
			addExpense(body)
				.then(res => {
					return res.json();
				})
				.then(res => context.addExpense(res));
		} else {
			body.id = props.Object.id;
			updateExpense(body).then(res => {
				context.setReload(!context.reload);
			});
		}
	};

	useEffect(
		() => {
			context.setTitle(context.title);
			context.setAmount(context.amount);
			context.setCategories(context.categories);
			context.setNote(context.note);
		},
		[context.title],
	);

	return (
		<div className="TestRoute">
			<FormControl fullWidth sx={{ m: 1 }} variant="filled">
				<InputLabel htmlFor="title">Title</InputLabel>
				<OutlinedInput
					type="text"
					sx={{ border: 2 }}
					value={context.title}
					required
					onChange={context.titleChange}
					id="title"
					endAdornment={<InputAdornment position="start" />}
				/>
			</FormControl>

			<FormControl fullWidth sx={{ m: 1 }} variant="filled">
				<InputLabel htmlFor="amount">Amount</InputLabel>
				<OutlinedInput
					type="number"
					sx={{ border: 2 }}
					max="99999999"
					required
					value={context.amount}
					onChange={context.amountChange}
					id="amount"
					endAdornment={<InputAdornment position="start">$</InputAdornment>}
				/>
			</FormControl>

			<FormControl fullWidth sx={{ m: 1 }} variant="filled">
				<InputLabel htmlFor="category">Category</InputLabel>
				<OutlinedInput
					type="text"
					sx={{ border: 2 }}
					required
					value={context.categories}
					onChange={context.categoriesChange}
					id="category"
					endAdornment={<InputAdornment position="start" />}
				/>
			</FormControl>

			<FormControl fullWidth sx={{ m: 1 }} variant="filled">
				<InputLabel htmlFor="note">Note</InputLabel>
				<OutlinedInput
					type="text"
					sx={{ border: 2 }}
					required
					value={context.note}
					onChange={context.noteChange}
					id="note"
					endAdornment={<InputAdornment position="start" />}
				/>
			</FormControl>

			<Button
				variant="contained"
				sx={{ border: 2 }}
				style={{ marginLeft: '40%' }}
				onClick={addOrUpDateExpense}
			>
				{props.type}
			</Button>
		</div>
	);
};
export default ExpenseForm;
