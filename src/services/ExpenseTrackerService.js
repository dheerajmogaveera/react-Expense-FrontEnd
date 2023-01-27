export const getExpenseByTitle = (title, expenseList) => {
	expenseList = expenseList.filter(data => data.title === title);
	return expenseList;
};
export const getExpenses = () => {
	return fetch('/expenses').then(res => res.json());
};

export const addExpense = body => {
	return fetch('/expenses', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
};

export const deleteExpenseById = id => {
	return fetch('/expenses/' + id, {
		method: 'DELETE',
		headers: {
			'Access-Control-Allow-Methods': '*',
			Allow: 'DELETE',
			'Content-Type': 'application/json',
		},
		body: null,
	});
};
export const updateExpense = body => {
	return fetch('/expenses', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
};

export const generateReport = range => {
	return fetch('/expenses/report?range=' + range);
};
