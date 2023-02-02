export const reportDataProcessing=(data,SetResponse,setChartLabel,setChartData,setExpensesByDate) => {
					SetResponse(data);
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
}
export const dateFormatter = (start,end) => {
	let startDate =
				Number(start['$M']) + 1 > 9
					? Number(start['$M']) + 1
					: '0' + (Number(start['$M']) + 1)
			let endDate =
				Number(end['$M']) + 1 > 9
					? Number(end['$M']) + 1
					: '0' + (Number(end['$M']) + 1)
			startDate = start['$D'] + '-' + startDate + '-' + start['$y']
	endDate = end['$D'] + '-' + endDate + '-' + end['$y']
	return [startDate, endDate ]
}