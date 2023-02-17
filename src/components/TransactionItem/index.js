import './index.css'

const TransactionItem = props => {
  const {details, deleteTransaction} = props
  const {id, title, amount, type} = details

  const onClickDelete = () => {
    deleteTransaction(id)
  }

  const displayTextType = type === 'INCOME' ? 'Income' : 'Expenses'

  return (
    <li className="list-item-container">
      <div className="list-item">
        <p className="list-title">{title}</p>
        <p className="list-amount">{amount}</p>
        <p className="list-type">{displayTextType}</p>
      </div>
      <button
        type="button"
        className="delete-button"
        data-testid="delete"
        onClick={onClickDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}
export default TransactionItem
