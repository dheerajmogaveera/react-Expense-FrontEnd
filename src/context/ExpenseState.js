import { useState } from 'react';
import ExpenseContext from './ExpenseContext';

const ExpenseState = props => {
	const [expense, setExpense] = useState({
		expenseArray: [],
		reload: false,
	});
	const [reload, setReload] = useState(false);
	const [expenseArrayCopy, setExpenseArrayCopy] = useState();
	const [title, setTitle] = useState('');
	const [amount, setAmount] = useState(0.0);
	const [categories, setCategories] = useState([]);
	const [note, setNote] = useState('');
	const [type, setType] = useState('');
	const titleChange = event => {
		setTitle(event.target.value);
	};
	const amountChange = event => {
		setAmount(event.target.value);
	};

	const categoriesChange = event => {
		setCategories(event.target.value);
	};
	const noteChange = event => {
		setNote(event.target.value);
	};

	const [msg, setMsg] = useState('');
	const update = array => {
		setExpense(prev => {
			return {
				expenseArray: array,
				reload: prev.reload,
			};
		});
		setExpenseArrayCopy(expense.expenseArray);
	};
	const addExpense = res => {
		setExpense(prev => {
			prev.expenseArray.push(res);
			return {
				expenseArray: prev.expenseArray,
				reload: !prev.reload,
			};
		});
	};

	return (
		<ExpenseContext.Provider
			value={{
				expense: expense,
				update: update,
				addExpense: addExpense,
				reload: reload,
				setReload,
				expenseArrayCopy: expenseArrayCopy,
				title: title,
				amount: amount,
				categories: categories,
				note: note,
				msg: msg,
				setTitle: setTitle,
				setAmount: setAmount,
				setCategories: setCategories,
				setNote: setNote,
				setMsg: setMsg,
				titleChange: titleChange,
				amountChange: amountChange,
				categoriesChange: categoriesChange,
				noteChange: noteChange,
				type: type,
				setType: setType,
			}}
		>
			{props.children}
		</ExpenseContext.Provider>
	);
};

export default ExpenseState;
