import { addExpense, updateExpense } from './ExpenseTrackerService'

export const handleCategoryChange = (event, context, customCategory) => {
  event.target.value = event.target.value.filter((item) => {
    return item !== ' '
  })
  if (event.target.value.includes('Other')) {
    customCategory.current.style.display = 'block'
  } else {
    let {
      target: { value },
    } = event

    context.setCategories(
      typeof value === 'string' && value !== 'Other' ? value.split(',') : value,
    )
  }
}

export const inputFormStyle = {
  display: 'inline-block',
  color: 'text.primary',

  width: '50%',
  height: 'max-content',
  margin: '10px',
  border: 3,
  borderColor: 'grey.500',

  borderRadius: 1,
  boxShadow: 3,
  typography: 'body1',
  ':hover': { border: 2, borderColor: 'blue' },
}

export const handleExpenseUpdate = (event, context, props,msg) => {
  let body = {
    title: context.title,
    amount: context.amount,
    categories: context.categories,
    note: context.note,
  }
  if (props.type === 'add') {
    addExpense(body)
		.then((res) => {
			if (res.status === 201) {
				context.setMsg("Expense added successfully !!!")
				context.expense.expenseArray.push(res.json())
				msg.current.style.display = 'block'
				msg.current.style.color = 'green'
				return res.json()
			}
			else {
				msg.current.color = 'red'
				msg.current.style.display = 'block'
				
			    context.setMsg("Error occurred while adding the expense")
			}
      })
      .then((res) => context.addExpense(res))
  } else {
    body.id = props.Object.id
	  updateExpense(body).then((res) => {
		if (res.status === 204) {
			context.setMsg("Expense updated successfully !!!")
			context.expense.expenseArray.map(item => {
				if (item.id == body.id) return body;
				else return item;
			})
			msg.current.style.display = 'block'
			msg.current.style.color = 'green'
			context.setReload(!context.reload)
			
		}
		else {
			msg.current.style.display = 'block'
			msg.current.style.color = 'red'
			context.setMsg("Error occurred while updating the expense")
		  }
    })
  }
}
export const openUpdateForm = (props, context, modal) => {
  context.setTitle(props.obj.title)
  context.setAmount(props.obj.amount)
  context.setCategories([...props.obj.categories])
  context.setNote(props.obj.note)
  modal.current.style.display = 'block'
}
