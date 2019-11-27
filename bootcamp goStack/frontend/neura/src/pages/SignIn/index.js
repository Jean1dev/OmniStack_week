import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../../logo.svg'
import { Form, Input } from '@rocketseat/unform'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  email: Yup.string().email('Insira um email valido').required(),
  password: Yup.string().min(6, 'senha de no minimo 6 caracteres').required('A senha é obrigatoria')
})
// import { Container } from './styles';

export default function SignIn() {

  function handleSubmit(data) {

  }

  return (
    <>
      <img src={logo} alt="Neura" className="App-logo"></img>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu Email"></Input>
        <Input name="password" placeholder="senha" type="password"></Input>
        <button type="submit">Acessar</button>

        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}
