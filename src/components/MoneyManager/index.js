import {Component} from 'react'
import {v4} from 'uuid'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    typeSelect: transactionTypeOptions[0].optionId,
    transactionList: [],
    incomeCount: 0,
    expenseCount: 0,
    balanceCount: 0,
  }

  onSubmitForm = event => {
    const {titleInput, amountInput, typeSelect} = this.state
    event.preventDefault()
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: amountInput,
      type: typeSelect,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
    }))
    if (typeSelect === 'INCOME') {
      this.setState(prevState => ({
        incomeCount: prevState.incomeCount + amountInput,
        balanceCount: prevState.balanceCount + amountInput,
      }))
    } else {
      this.setState(prevState => ({
        expenseCount: prevState.expenseCount + amountInput,
        balanceCount: prevState.balanceCount - amountInput,
      }))
    }

    this.setState({
      titleInput: '',
      amountInput: '',
      typeSelect: transactionTypeOptions[0].optionId,
    })
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updatedTransactionList = transactionList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    const requiredTransaction = transactionList.find(
      eachItem => eachItem.id === id,
    )
    const {amount, type} = requiredTransaction
    this.setState({
      transactionList: updatedTransactionList,
    })

    if (type === 'INCOME') {
      this.setState(prevState => ({
        balanceCount: prevState.balanceCount - amount,
        incomeCount: prevState.incomeCount - amount,
      }))
    } else {
      this.setState(prevState => ({
        balanceCount: prevState.balanceCount + amount,
        expenseCount: prevState.expenseCount - amount,
      }))
    }
  }

  onInputAmount = event => {
    this.setState({
      amountInput: Number(event.target.value),
    })
  }

  onInputTitle = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onSelectType = event => {
    this.setState({
      typeSelect: event.target.value,
    })
  }

  render() {
    const {
      titleInput,
      typeSelect,
      amountInput,
      transactionList,
      incomeCount,
      balanceCount,
      expenseCount,
    } = this.state
    return (
      <div className="bg-container">
        <div className="intro-container">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your{' '}
            <span className="span-element">Money Manager</span>
          </p>
        </div>

        <div className="money-details-container">
          <MoneyDetails
            expenseCount={expenseCount}
            balanceCount={balanceCount}
            incomeCount={incomeCount}
          />
        </div>

        <div className="transaction-input">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="form-heading">Add Transaction</h1>
            <label htmlFor="title" className="label-title">
              TITLE
            </label>
            <input
              value={titleInput}
              onChange={this.onInputTitle}
              type="text"
              id="title"
              className="custom-input-title"
              placeholder="TITLE"
            />

            <label htmlFor="amount" className="label-amount">
              AMOUNT
            </label>
            <input
              value={amountInput}
              onChange={this.onInputAmount}
              type="text"
              id="amount"
              className="custom-input-amount"
              placeholder="AMOUNT"
            />

            <label htmlFor="type" className="label-type">
              TYPE
            </label>

            <select
              value={typeSelect}
              id="type"
              className="input-select"
              onChange={this.onSelectType}
            >
              {transactionTypeOptions.map(eachType => (
                <option
                  key={eachType.optionId}
                  value={eachType.optionId}
                  className="type-option"
                >
                  {eachType.displayText}
                </option>
              ))}
            </select>

            <button className="add-button" type="submit">
              Add
            </button>
          </form>

          <div className="transaction-list-container">
            <h1 className="history-heading">History</h1>
            <div className="column-details">
              <p className="column-name">Title</p>
              <p className="column-name">Amount</p>
              <p className="column-name">Type</p>
            </div>
            <ul className="list-container">
              {transactionList.map(eachItem => (
                <TransactionItem
                  details={eachItem}
                  key={eachItem.id}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
