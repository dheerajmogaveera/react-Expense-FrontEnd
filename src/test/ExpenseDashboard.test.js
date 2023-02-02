import { queryByAttribute, render, screen } from "@testing-library/react"
import ExpenseDashboard from "../components/ExpenseDashboard"
import ExpenseContext from "../context/ExpenseContext"
import userEvent  from "@testing-library/user-event";

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({})
  })
    });
    afterEach(() => {
        jest.resetAllMocks()
    })
test("Expense Dashboard test",async() => {
    render(
        <ExpenseContext.Provider value={{
            title: "abcd",amount:8,note:"sample note" ,categories:["test"],setTitle: (prev,res) => {prev=res }, setAmount: (res) => { }, setCategories: (res) => { }
            , setNote: () => { },update:(res)=>{},msg:"msg",setMsg:()=>{},
            expense: {
                expenseArray: [
                    {
                        title: "test",
                        amount: 8,
                        note: "sample note",
                        categories: ["test category"]
                    }
                ]
            } 
        }}>
            <ExpenseDashboard/>
        </ExpenseContext.Provider>
    )
    
    const title = screen.getByRole("heading", { name: "test" })
    expect(title.textContent).toBe("test")
     const amount= screen.getByRole("heading", { name: "$8" })
    expect(amount.textContent).toBe("$8")
     const category= screen.getByRole("heading", { name: "test category" })
    expect(category.textContent).toBe("test category")
   const note= screen.getByRole("heading", { name: "sample note" })
    expect(note.textContent).toBe("sample note")
    const updateButton = queryByAttribute.bind(null, "update");
    
    expect(fetch).toHaveBeenCalledTimes(1)
    const addButton = screen.getByRole("button", { name: "Expense" })
    const closeButton=screen.getByTestId("close")
    const addExpenseButton = screen.getByRole("button", { name: "add" })
    //userEvent.click(updateButton)
    
   await userEvent.click(addExpenseButton)
   await userEvent.click(closeButton)
    const modal=await screen.getByTestId("modal")
    expect(modal).toHaveStyle('display: none') 
    await userEvent.click(addButton)
    expect(modal).toHaveStyle('display: block') 
    const updateExpenseButton = screen.getByRole("button", { name: "update" })
    userEvent.click(updateExpenseButton)
     await userEvent.click(updateExpenseButton)
    expect(fetch).toHaveBeenCalledTimes(4)

})