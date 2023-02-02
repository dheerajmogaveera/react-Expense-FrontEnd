import { useContext, useEffect } from "react";
import { getExpenses } from "../services/ExpenseTrackerService";
import Expense from "./Expense";
import ExpenseContext from "../context/ExpenseContext";

const Expenses = () => {
    const context = useContext(ExpenseContext);
	const expenseList = [];
	useEffect(
        () => {
           
			getExpenses().then(res => {
				context.update(res);
			});
		},
		[context.reload],
	);
	context.expense.expenseArray.map((item, index) => {
        expenseList.push(<Expense key={index} obj={item} />);
    });
    
    return (
        <div>
         {expenseList}
        </div>
    )
}
export default Expenses;