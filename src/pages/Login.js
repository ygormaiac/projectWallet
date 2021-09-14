import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';
import '../css/main.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmitLogin() {
    const { history, getEmail } = this.props;
    const { email } = this.state;
    getEmail(email);
    history.push('/carteira');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;
    const passwordLength = 6;
    const passwordCorrect = password.length >= passwordLength;
    const verifiedEmail = () => {
      const result = /\S+@\S+\.\S+/;
      return result.test(email);
    };

    return (
      <main className="login-form">
        <span className="title">WALLET</span>
        <img src={ require('./gifWallet.gif') } alt="wallet" className="wallet-gif" />
        <input
          className="input-form"
          placeholder="E-mail"
          type="text"
          name="email"
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          className="input-form"
          type="password"
          name="password"
          placeholder="Password"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button
          className="button-login"
          type="submit"
          disabled={ !(verifiedEmail() && passwordCorrect) }
          onClick={ this.onSubmitLogin }
        >
          Entrar
        </button>
      </main>
    );
  }
}

Login.propTypes = {
  getEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
