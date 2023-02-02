import {
	Button,
	Checkbox,
	FormControl,
	InputAdornment,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	Typography,
} from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ExpenseContext from '../context/ExpenseContext';
import '../css/ExpenseForm.css';
import { addExpense, updateExpense } from '../services/ExpenseTrackerService';
import { handleCategoryChange, handleExpenseUpdate } from '../services/ExpenseTrackerUtils';

const categoryOptions = [
	'Fuel',
	'Dining',
	'Shopping',
	'Subscriptions',
	'Travel',
	'Other',
];
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 24 * 4.5 + 8,
			width: 250,
		},
	},
};
const ExpenseForm = props => {
	const context = useContext(ExpenseContext);
	
	const customCategory = useRef();
	const form = useRef()
	
	const msg = useRef();
	const addOrUpdateExpense = () => {
		handleExpenseUpdate(event,context,props,msg)
	};
	const handleChange = event => {
		handleCategoryChange(event, context, customCategory);
	};
	useEffect(
		() => {
			context.setTitle(context.title);
			context.setAmount(context.amount);
			context.setCategories(context.categories);
			context.setNote(context.note);
			form.current.addEventListener('submit',(e)=>{e.preventDefault();})
		},
		[context.title],
	);

	return (
		<div className="TestRoute" >
		     <form ref={form} onSubmit={addOrUpdateExpense}>
			<FormControl fullWidth sx={{ m: 1 }} variant="filled">
				<InputLabel htmlFor="title">Title</InputLabel>
					<OutlinedInput
						data-testid="title"
					type="text"
				   
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
				
					max="99999999"
					required
					value={context.amount}
					onChange={context.amountChange}
					id="amount"
					endAdornment={<InputAdornment position="start">$</InputAdornment>}
				/>
			</FormControl>

			<FormControl sx={{ m: 1, width: '99%' }} variant="filled">
				<InputLabel id="category-multiple-name-label">Category</InputLabel>
				<Select
					labelId="category-multiple-name-label"
					id="category-multiple-name"
						multiple
						required
					value={context.categories}
					onChange={handleChange}
					input={<OutlinedInput label="Name" />}
					MenuProps={MenuProps}
				>
					{categoryOptions.map(name =>
						<MenuItem key={name} value={name}>
							{name}
						</MenuItem>,
					)}
				</Select>
			</FormControl>
			<div ref={customCategory} style={{ display: 'none' }}>
				<FormControl fullWidth sx={{ m: 1 }} variant="filled">
					<InputLabel htmlFor="custom">Custom Category</InputLabel>
					<OutlinedInput
						id="custom"
						type="text"
						
						value={context.categories}
						required
						onChange={handleChange}
						endAdornment={<InputAdornment position="start" />}
					/>
				</FormControl>
			</div>
			<FormControl fullWidth sx={{ m: 1 }} variant="filled">
				<InputLabel htmlFor="note">Note</InputLabel>
				<OutlinedInput
					type="text"
					
					
					value={context.note}
					onChange={context.noteChange}
					id="note"
					endAdornment={<InputAdornment position="start" />}
				/>
			</FormControl>

			<Button
					variant="contained"
					type='submit'
				sx={{ border: 2 }}
				style={{ marginLeft: '40%' }}
				
			>
				{props.type}
				</Button>
				</form>
			<Typography variant='h6' sx={{display:'none',marginLeft:"10%"}} ref={msg}>{context.msg }</Typography>
		</div>
	);
};
export default ExpenseForm;
