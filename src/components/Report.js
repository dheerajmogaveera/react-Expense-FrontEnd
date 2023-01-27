import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { generateReport } from '../services/ExpenseTrackerService';

ChartJS.register(
	ArcElement,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);
const Report = () => {
	const [chartLabel, setChartLabel] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [expensesByDate, setExpensesByDate] = useState([]);
	const [response, SetResponse] = useState({});
	const data1 = {
		labels: chartLabel,
		datasets: [
			{
				label: 'Expense Amount',
				backgroundColor: "#d64161",
				borderColor: 'rgba(0,0,0,1)',
				borderWidth: 2,
				data: chartData,
			},
		],
  };
  
  const data2 = {
		labels: chartLabel,
		datasets: [
			{
				label: 'No Of Expenses',
				backgroundColor: '#6b5b95',
				borderColor: 'rgba(0,0,0,1)',
				borderWidth: 2,
				data: expensesByDate,
			},
		],
  };

	const [range, setRange] = useState('');
	const handleChange = event => {
		setRange(event.target.value);
		generateReport(event.target.value)
			.then(data => {
				return data.json();
			})
			.then(data => {
				SetResponse(data);
				console.log(data);
				const label = [];
        const value = [];
        const value1 = [];
				for (var key in data.amountByDate) {
					label.push(key);
				}
				label.sort();
				label.forEach(val => {
          value.push(data.amountByDate[val]);
          value1.push(data.numberOfExpensesByDays[val]);
				});
				setChartLabel(label);
        setChartData(value);
        setExpensesByDate(value1);
			});
	};

	return (
		<div>
			<FormControl sx={{ width: '30%' }}>
				<InputLabel id="demo-simple-select-label">Range</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={range}
					label="Age"
					onChange={handleChange}
				>
					<MenuItem value={'week'}>Week</MenuItem>
					<MenuItem value={'month'}>Month</MenuItem>
				</Select>
      </FormControl>
      
      
			<div
				style={{
					height: '45%',
					width: '45%',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Bar
					data={data1}
					options={{
						plugins: {
							title: {
								display: true,
								text: 'Average amount per day',
								fontSize: 20,
                fontWeight: 'bold',
                
              },
              
							legend: {
								display: true,
								position: 'right',
							},
						},
					}}
				/>
				<Bar
					data={data2}
					options={{
						plugins: {
							title: {
								display: true,
								text: 'Number of expenses per day',
								fontSize: 20,
								fontWeight: 'bold',
							},
							legend: {
								display: true,
								position: 'right',
							},
						},
					}}
				/>
			</div>
			<Typography variant="h6">
				Total Amount Spent:{response.totalAmount}$
			</Typography>
			<Typography variant="h6">
				Total No of Expense:{response.totalExpenses}
			</Typography >
			<Typography variant="h6">
				Average Amount Per Day:{response.averageAmountPerDay}$
			</Typography>
			<Typography variant="h6">
				Average Amount Per Expense:{response.averageAmountPerExpense}$
			</Typography>
		</div>
	);
};

export default Report;
