import React from 'react';
import { connect } from 'react-redux';
import ContentItem from './ContentItem';
import PropTypes from 'prop-types';

class TableExpenses extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <main className="main-table">
        <table className="table-new">
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Excluir/Editar</th>
          </tr>
          {expenses
            .map((expense) => (
              <ContentItem
                key={expense.id}
                expense={expense}
              />
            ))}
        </table>
      </main>
    )
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(TableExpenses);