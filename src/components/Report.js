import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
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
import { useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
	generateReport,
	generateReportForCustomRange,
} from '../services/ExpenseTrackerService';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { dateFormatter, reportDataProcessing } from '../services/ReportUtils';

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
	const [value, setValue] = useState(null);
	const customDate = useRef();
	const data1 = {
		labels: chartLabel,
		datasets: [
			{
				label: 'Expense Amount',
				backgroundColor: '#d64161',
				borderColor: 'rgba(0,0,0,1)',
				borderWidth: 2,
				data: chartData,
			},
		],
	};
	const startDate = useRef();
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
	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);
	const handleReportGeneration = event => {
		if (range === 'week' || range === 'month') {
			generateReport(range)
				.then(data => {
					return data.json();
				})
				.then(data =>
					reportDataProcessing(
						data,
						SetResponse,
						setChartLabel,
						setChartData,
						setExpensesByDate,
					),
				);
		} else {
			generateCustomReport();
		}
	};

	const generateCustomReport = () => {
		if (start !== null && end !== null) {
			const [startDate, endDate] = dateFormatter(start, end);
			generateReportForCustomRange('custom', startDate, endDate)
				.then(data => {
					return data.json();
				})
				.then(data =>
					reportDataProcessing(
						data,
						SetResponse,
						setChartLabel,
						setChartData,
						setExpensesByDate,
					),
				);
		}
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
					onChange={event => {
						{
							if (event.target.value === 'custom')
								customDate.current.style.display = 'block';
							else customDate.current.style.display = 'none';
							setRange(event.target.value);
						}
					}}
				>
					<MenuItem value={'week'}>Week</MenuItem>
					<MenuItem value={'month'}>Month</MenuItem>
					<MenuItem value={'custom'}>Custom</MenuItem>
				</Select>
			</FormControl>
			<Button variant={'contained'} onClick={handleReportGeneration}>
				Go
			</Button>
			<h1>
				{value}
			</h1>
			<br />
			<br />
			<div ref={customDate} style={{ display: 'none' }}>
				<LocalizationProvider dateAdapter={AdapterDayjs}  >
					<DatePicker
						label="Start Date"
						
						value={start}
						onChange={val => {
							setStart(val);
							console.log('Custom Report');
						}}
                        
						renderInput={params => <TextField {...params} />}
					/>
				</LocalizationProvider>

				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label="End Date"
						value={end}
						onChange={val => {
							setEnd(val);
						}}
						renderInput={params => <TextField {...params} />}
					/>
				</LocalizationProvider>
			</div>
			<br />
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
			</Typography>
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
