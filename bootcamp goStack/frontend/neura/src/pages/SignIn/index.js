import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../../logo.svg'

// import { Container } from './styles';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="Neura" className="App-logo"></img>
      <form>
        <input type="email" placeholder="Seu Email"></input>
        <input placeholder="senha" type="password"></input>
        <button type="submit">Acessar</button>

        <Link to="/register">Criar conta gratuita</Link>
      </form>
    </>
  );
}
