import React from 'react';
import { useContext } from 'react';
import ExpenseContext from '../context/ExpenseContext';
import { updateExpense } from './ExpenseTrackerService';

export const handleCategoryChange = (event, context, customCategory) => {
	event.target.value = event.target.value.filter(item => {
		return item !== ' ';
	});
	if (event.target.value.includes('Other')) {
		customCategory.current.style.display = 'block';
	} else {
		let { target: { value } } = event;

		context.setCategories(
			typeof value === 'string' && value !== 'Other' ? value.split(',') : value,
		);
	}
};

export const handleExpenseUpdate = (event, context,props) => {
    if (props.type === 'add') {
			addExpense(body)
				.then(res => {
					return res.json();
				})
				.then(res => context.addExpense(res));
    } else {
        let body = {
		title: context.title,
		amount: context.amount,
		categories: context.categories,
		note: context.note,
	};
			body.id = props.Object.id;
			updateExpense(body).then(res => {
				context.setReload(!context.reload);
			});
		}
}
