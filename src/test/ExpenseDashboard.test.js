import { queryByAttribute, render, screen } from '@testing-library/react';
import ExpenseDashboard from '../components/ExpenseDashboard';
import ExpenseContext from '../context/ExpenseContext';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue({}),
    });
});
afterEach(() => {
    jest.resetAllMocks();
});

test('test add Expense mocked  call', async () => {
    render(
        <ExpenseContext.Provider
            value={{
                title: 'abcd',
                amount: 8,
                note: 'sample note',
                categories: ['test'],
                setTitle: (prev, res) => {
                    prev = res;
                },
                setAmount: res => { },
                setCategories: res => { },
                setNote: () => { },
                update: res => { },
                msg: 'msg',
                setMsg: () => { },
                expense: {
                    expenseArray: [
                        {
                            title: 'test',
                            amount: 8,
                            note: 'sample note',
                            categories: ['test category'],
                        },
                    ],
                },
            }}
        >
            <ExpenseDashboard />
        </ExpenseContext.Provider>,
    );

    const addExpenseButton = screen.getByRole('button', { name: 'add' });
    await userEvent.click(addExpenseButton);

    //2 times because while loading the component already a an api call is made to fetch components
    expect(fetch).toHaveBeenCalledTimes(2);
});

test('test delete Expense mocked  call', async () => {
    render(
        <ExpenseContext.Provider
            value={{
                title: 'abcd',
                amount: 8,
                note: 'sample note',
                categories: ['test'],
                setTitle: (prev, res) => {
                    prev = res;
                },
                setAmount: res => { },
                setCategories: res => { },
                setNote: () => { },
                update: res => { },
                msg: 'msg',
                setMsg: () => { },
                setReload: reload => { },
                expense: {
                    expenseArray: [
                        {
                            title: 'test',
                            amount: 8,
                            note: 'sample note',
                            categories: ['test category'],
                        },
                    ],
                },
            }}
        >
            <ExpenseDashboard />
        </ExpenseContext.Provider>,
    );

    const deleteExpenseButton = screen.getByTestId('delete');
    await userEvent.click(deleteExpenseButton);

    //2 times because while loading the component already a an api call is made to fetch components
    expect(fetch).toHaveBeenCalledTimes(2);
});

test('test update Expense mocked  call', async () => {
    render(
        <ExpenseContext.Provider
            value={{
                title: 'abcd',
                amount: 8,
                note: 'sample note',
                categories: ['test'],
                setTitle: (prev, res) => {
                    prev = res;
                },
                setAmount: res => { },
                setCategories: res => { },
                setNote: () => { },
                update: res => { },
                msg: 'msg',
                setMsg: () => { },
                setReload: reload => { },
                expense: {
                    expenseArray: [
                        {
                            title: 'test',
                            amount: 8,
                            note: 'sample note',
                            categories: ['test category'],
                        },
                    ],
                },
            }}
        >
            <ExpenseDashboard />
        </ExpenseContext.Provider>,
    );

    const updateExpenseButton = screen.getByRole('button', { name: 'update' });

    await userEvent.click(updateExpenseButton);

    //2 times because while loading the component already a an api call is made to fetch components
    expect(fetch).toHaveBeenCalledTimes(2);
});

test('test modal open and close on button click', async () => {
    render(
        <ExpenseContext.Provider
            value={{
                title: 'abcd',
                amount: 8,
                note: 'sample note',
                categories: ['test'],
                setTitle: (prev, res) => {
                    prev = res;
                },
                setAmount: res => { },
                setCategories: res => { },
                setNote: () => { },
                update: res => { },
                msg: 'msg',
                setMsg: () => { },
                setReload: reload => { },
                expense: {
                    expenseArray: [
                        {
                            title: 'test',
                            amount: 8,
                            note: 'sample note',
                            categories: ['test category'],
                        },
                    ],
                },
            }}
        >
            <ExpenseDashboard />
        </ExpenseContext.Provider>,
    );

    const addButton = screen.getByRole('button', { name: 'Expense' });
    const closeButton = screen.getByTestId('close');

    //userEvent.click(updateButton)

    await userEvent.click(closeButton);
    const modal = await screen.getByTestId('modal');
    expect(modal).toHaveStyle('display: none');
    await userEvent.click(addButton);
    expect(modal).toHaveStyle('display: block');
});

test('Expense Dashboard test', async () => {
    render(
        <ExpenseContext.Provider
            value={{
                title: 'abcd',
                amount: 8,
                note: 'sample note',
                categories: ['test'],
                setTitle: (prev, res) => {
                    prev = res;
                },
                setAmount: res => { },
                setCategories: res => { },
                setNote: () => { },
                update: res => { },
                msg: 'msg',
                setMsg: () => { },
                expense: {
                    expenseArray: [
                        {
                            title: 'test',
                            amount: 8,
                            note: 'sample note',
                            categories: ['test category'],
                        },
                    ],
                },
            }}
        >
            <ExpenseDashboard />
        </ExpenseContext.Provider>,
    );

    const title = screen.getByRole('heading', { name: 'test' });
    expect(title.textContent).toBe('test');
    const amount = screen.getByRole('heading', { name: '$8' });
    expect(amount.textContent).toBe('$8');
    const category = screen.getByRole('heading', { name: 'test category' });
    expect(category.textContent).toBe('test category');
    const note = screen.getByRole('heading', { name: 'sample note' });
    expect(note.textContent).toBe('sample note');
    const updateButton = queryByAttribute.bind(null, 'update');

    expect(fetch).toHaveBeenCalledTimes(1);
});
