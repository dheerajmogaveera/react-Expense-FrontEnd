import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

test('react router test', async () => {
   
    render(<BrowserRouter ><App /></BrowserRouter>
    );
   await waitFor(async() => {
        const home = screen.getByTestId("home")
        const report = screen.getByTestId("report")
        await report.click()
        const addButton = screen.getByRole("button", { name: "Expense" })
   
     
        expect(addButton).toBeInTheDocument();
    })
});
