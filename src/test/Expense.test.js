import { queryByAttribute, render } from "@testing-library/react";
import { screen } from "@testing-library/react";
import Expense from "../components/Expense"
import ExpenseContext from "../context/ExpenseContext";
import { Button } from "@mui/material";
import userEvent from "@testing-library/user-event";


beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({})
  })
    });
    afterEach(() => {
        jest.resetAllMocks()
    })
test("Expense Test", async() => {
    render(
        
        <ExpenseContext.Provider value={{
            title: "abcd",amount:8,note:"sample note" ,categories:["test"],setTitle: (res) => { }, setAmount: (res) => { }, setCategories: (res) => { }
            , setNote: () => { },setReload:(reload)=>{},setMsg:(msg)=>{ }
        }}>
            <Expense obj={{ title: "name",amount:23 ,categories:["test"],note:""}} type="add" />
        </ExpenseContext.Provider> 
    )
    
    
    const button = await screen.getByRole('button', { name: "update" })
    const updateExpenseButton=queryByAttribute.bind(null, "update")
    const deleteButton = screen.getByTestId("delete")
    const textInput = screen.getByRole("textbox", { name: "Title" });
    const amountInput = screen.getByRole("spinbutton", "amount")
    const noteInput = screen.getByRole("textbox", { name: "Note" });
    const categoryInput = screen.getByRole("button", { name: "Category ​" });
    const closeButton = screen.getByTestId("close1")
    const updateButton = screen.getByTestId("update")
    expect(categoryInput.childNodes[0].textContent).toBe("​")
    expect(deleteButton).toBeEnabled
    expect( button).toBeEnabled()
    expect(textInput).toHaveValue("abcd");
    expect(amountInput).toHaveValue(8);
    expect(noteInput).toHaveValue("sample note")
     userEvent.click(updateExpenseButton)
    deleteButton.click()
    closeButton.click()
    updateButton.click()
    expect(fetch).toHaveBeenCalledTimes(1)
  
   
}
)