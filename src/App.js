import { Route, Routes } from 'react-router-dom';
import ExpenseMenuBar from './components/ExpenseMenuBar';
import Expenses from './components/Expenses';
import Report from './components/Report';
import ExpenseState from './context/ExpenseState';
import './css/App.css';
import img from "./img/expense.jpg" 
function App() {
  const style={backgroundImage:`url(${img})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition: "center",opacity:"0.9" }
	return (
		<ExpenseState>
			<div>
				<div  >
          <ExpenseMenuBar />
         
					<br />
				
						<Routes>
							<Route path="/" element={<Expenses />} />
							<Route path="/report" element={<Report />} />
						</Routes>
					</div>
				</div>
		
		</ExpenseState>
	);
}

export default App;
