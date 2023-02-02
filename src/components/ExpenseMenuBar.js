import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SearchIcon from '@mui/icons-material/Search';
import {
	AppBar,
	Box,
	IconButton,
	Input,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Toolbar,
	Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ExpenseContext from '../context/ExpenseContext';
import { getExpenseByTitle } from '../services/ExpenseTrackerService';
const ExpenseBar = () => {
	const context = useContext(ExpenseContext);

	const [search, SetSearch] = useState('');
	const onChange = e => {
		SetSearch(e.target.value);

		if (e.target.value === '') {
			context.update(context.expenseArrayCopy);
		}
	};
	const searchExpense = e => {
		if (e.key === 'Enter') {
			const expenseList = getExpenseByTitle(search, context.expense.expenseArray);
			context.update(expenseList);
		}
	};

	return (
		<Box>
			<AppBar position="static">
				<Toolbar variant="dense">
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<AccountBalanceWalletIcon sx={{ fontSize: '40px' }} />
					</IconButton>
					<Typography variant="h6" sx={{ ml: 2, mr: 4 }}>
						Expense Tracker App
					</Typography>

					<List sx={{ display: 'flex', flexDirection: 'row' }}>
						<ListItemButton data-testid="home">
							<Link
								style={{ textDecoration: 'none', color: 'white' }}
								to={'/'}
							>
								<ListItem>
									<ListItemText>Home</ListItemText>
								</ListItem>
							</Link>
						</ListItemButton>
						<ListItemButton data-testid="report"> 
							<Link style={{ textDecoration: 'none', color: 'white' }} to={'/report'}>
								<ListItem>
									<ListItemText>Report</ListItemText>
								</ListItem>
							</Link>
						</ListItemButton>
					</List>

					<SearchIcon />

					<Input
						sx={{ border: 1, bgcolor: 'white' }}
						onChange={onChange}
						onInput={onChange}
						onKeyDown={searchExpense}
					/>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
export default ExpenseBar;
