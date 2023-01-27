import { render } from "@testing-library/react"
import Expense from "../components/Expense"

test("Expense Test", () => {
    render(<Expense obj={{ title: "name ", }} type="add" />)
    const linkElement = screen.getBytext(/Expense/i);
    expect(linkElement).toBeInTheDocument();
}
)