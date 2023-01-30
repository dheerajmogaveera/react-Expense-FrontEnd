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

export const handleExpenseUpdate = (event, context, props) => {
  let body = {
    title: context.title,
    amount: context.amount,
    categories: context.categories,
    note: context.note,
  }
  if (props.type === 'add') {
    addExpense(body)
      .then((res) => {
        return res.json()
      })
      .then((res) => context.addExpense(res))
  } else {
    body.id = props.Object.id
    updateExpense(body).then((res) => {
      context.setReload(!context.reload)
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
