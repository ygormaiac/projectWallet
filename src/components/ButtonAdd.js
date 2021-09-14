import React from 'react';
import PropTypes from 'prop-types';

class ButtonAdd extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <input
        className="button-expenses"
        type="button"
        value="Adicionar despesa"
        onClick={ () => onClick() }
      />
    );
  }
}

ButtonAdd.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonAdd;
