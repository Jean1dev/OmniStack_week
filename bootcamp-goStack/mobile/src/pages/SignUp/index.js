import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import Background from '../../components/Background'
import logo from '../../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { signUpRequest } from '../../store/modules/auth/actions'

import { Container, Form, FormInput, SubmitButton, SignLink, SignLinkText } from './styles';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const emailRef = useRef()
  const passwordRef = useRef()
  const loading = useSelector(state => state.auth.loading)

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password))
  }

  return (
    <Background>
      <Container>
        <Image source={logo}></Image>

        <Form>
        <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu nome"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          ></FormInput>

          <FormInput
            icon="mail-outline"
            keyboardtype="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu email"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          ></FormInput>

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          ></FormInput>

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Cadastrar
          </SubmitButton>
        </Form>


        <SignLink onPress={() => navigation.navigate('SignIn')} >
          <SignLinkText> Ja tenho conta </SignLinkText>
        </SignLink>

      </Container>
    </Background>
  );
}
