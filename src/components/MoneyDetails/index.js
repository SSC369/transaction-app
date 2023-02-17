import './index.css'

const MoneyDetails = props => {
  const {balanceCount, incomeCount, expenseCount} = props
  return (
    <div className="money-details-inner-container">
      <div className="balance-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="balance-icon"
        />
        <div className="money-details">
          <p>Your Balance</p>
          <p className="count" data-testid="balanceAmount">
            Rs {balanceCount}
          </p>
        </div>
      </div>

      <div className="income-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="balance-icon"
        />
        <div className="money-details">
          <p>Your Income</p>
          <p className="count" data-testid="incomeAmount">
            Rs {incomeCount}
          </p>
        </div>
      </div>

      <div className="expense-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="balance-icon"
        />
        <div className="money-details">
          <p>Your Expenses</p>
          <p className="count" data-testid="expensesAmount">
            Rs {expenseCount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
