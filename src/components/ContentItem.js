import React from 'react';
import { connect } from 'react-redux';
// import Button from 'react-bootstrap/Button';
import { BiTrash, BiEditAlt } from 'react-icons/bi';
import { refreshItems } from '../actions';
// import { addExpense, convertValue, refreshItems } from '../actions';

class ContentItem extends React.Component {
  constructor(props) {
    super(props);
    this.getCurrencyName = this.getCurrencyName.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  getCurrencyName(exchangeRates, currency) {
    const { name } = exchangeRates[currency];
    return name.split('/')[0];
  }

  getRate(exchangeRates, currency) {
    const { ask } = exchangeRates[currency];
    return ask;
  }

  getConvertedValue(rate, value) {
    const total = Number(rate) * Number(value);
    const valueTotal = Math.round((total + Number.EPSILON) * 100) / 100;
    return valueTotal;
  }

  deleteItem(expense) {
    const { expenses, replaceExpenses } = this.props;
    const index = expenses.indexOf(expense);
    const newExpenses = [...expenses];
    newExpenses.splice(index, 1);
    // newExpenses = newExpenses.map((expense, i) => ({ ...expense, id: i }));
    replaceExpenses(newExpenses);
  }


  render() {
    const { expense } = this.props;
    const { value, description, currency, method, tag, exchangeRates } = expense;
    const currencyName = this.getCurrencyName(exchangeRates, currency);
    const rate = this.getRate(exchangeRates, currency);
    const convertedValue = this.getConvertedValue(rate, value);
    const roundedRate = Math.round((rate) * 100) / 100;

    return (
      <tr className="table-add">
        <td className="cedula">{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{`${value}`}</td>
        <td>{currencyName}</td>
        <td>{`${roundedRate}`}</td>
        <td>{`${convertedValue}`}</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            className="button-delete"
            onClick={ this.deleteItem }
          >
            <BiTrash />
          </button>
          <button 
            type="button"
            data-testid="edit-btn"
            className="button-edit"
          >
           <BiEditAlt />
          </button>
        </td>
      </tr>
    )
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  replaceExpenses: (payload) => dispatch(refreshItems(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentItem);