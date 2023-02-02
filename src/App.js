import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ExpenseMenuBar from './components/ExpenseMenuBar';
import ExpenseState from './context/ExpenseState';
import './css/App.css';
import img from "./img/expense.jpg";
function App() {
	const ExpensesComponent = lazy(() => {
		return import('./components/ExpenseDashboard');
	})
	const ReportComponent = lazy(() => {
		return import('./components/Report');
	})
  	const style={backgroundImage:`url(${img})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition: "center",opacity:"0.9" }
	return (
		
		<ExpenseState>
			<div>
				<div  >
          <ExpenseMenuBar />
         
					<br />
				      
						<Routes> 
							<Route path="/" element={<Suspense fallback={<div>Loading content....</div>}><ExpensesComponent /></Suspense>} />
							<Route path="/report" element={<Suspense fallback={<div>Loading....</div>}><ReportComponent /></Suspense>} />
						</Routes>
					
					</div>
				</div>
		
			</ExpenseState>
			
			
	);
}

export default App;
