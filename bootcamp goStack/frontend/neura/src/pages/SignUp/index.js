import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../../logo.svg'
import { Form, Input } from '@rocketseat/unform'
import { useDispatch } from 'react-redux'
import { signUpRequest } from '../../store/modules/auth/actions'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatorio'),
  email: Yup.string().email('Insira um email valido').required(),
  password: Yup.string().min(6, 'senha de no minimo 6 caracteres').required('A senha é obrigatoria')
})

export default function SignUp() {
  const dispatch = useDispatch()

  function handleSubmit({name, email, password}) {
    dispatch(signUpRequest(name, email, password))
  }

  return (
    <>
      <img src={logo} alt="Neura" className="App-logo"></img>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Seu nome"/>
        <Input name="email" type="email" placeholder="Seu Email"/>
        <Input name="password" placeholder="senha" type="password"/>
        <button type="submit">Acessar</button>

        <Link to="/">Ja tenho uma conta</Link>
      </Form>
    </>
  );
}
