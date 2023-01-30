import { queryByAttribute, render } from "@testing-library/react";
import { screen } from "@testing-library/react";
import Expense from "../components/Expense"
import ExpenseContext from "../context/ExpenseContext";
import { Button } from "@mui/material";
import userEvent  from "@testing-library/user-event";
test("Expense Test", async() => {
    render(
        
        <ExpenseContext.Provider value={{
            title: "abcd",amount:8,note:"sample note" ,categories:["test"],setTitle: (res) => { }, setAmount: (res) => { }, setCategories: (res) => { }
            , setNote: () => { }
        }}>
            <Expense obj={{ title: "name",amount:23 }} type="add" />
        </ExpenseContext.Provider>
    )
    
    
    const button = await screen.getByRole('button', { name: "update" })
    const updateExpenseButton=queryByAttribute.bind(null, "update")
    const deleteButton =  queryByAttribute.bind(null, "delete")
    const textInput = screen.getByRole("textbox", { name: "Title" });
    const amountInput = screen.getByRole("spinbutton", "amount")
    const noteInput = screen.getByRole("textbox", { name: "Note" });
    const categoryInput = screen.getByRole("textbox", { name: "Category" });
    expect(deleteButton).toBeEnabled
    expect(await button).toBeEnabled()
    expect(textInput).toHaveValue("abcd");
    expect(amountInput).toHaveValue(8);
    expect(noteInput).toHaveValue("sample note");
    expect(categoryInput).toHaveValue("test");
    // userEvent.click(updateExpenseButton)
    const modal = await document.getElementById("modal1");
    let style = await window.getComputedStyle(modal);
    expect(style.display).toBe("block"); 
   
   
}
)