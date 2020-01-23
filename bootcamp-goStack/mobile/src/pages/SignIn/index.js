import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import Background from '../../components/Background'
import logo from '../../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { signInRequest } from '../../store/modules/auth/actions'

import { Container, Form, FormInput, SubmitButton, SignLink, SignLinkText } from './styles';

export default function SignIn({ navigation }) {
  const passwordRef = useRef()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loading = useSelector(state => state.auth.loading)

  function handleSubmit() {
    dispatch(signInRequest(email, password))
  }

  return (
    <Background>
      <Container>
        <Image source={logo}></Image>

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardtype="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu email"
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
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          ></FormInput>

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')} >
          <SignLinkText> Criar conta gratuita </SignLinkText>
        </SignLink>

      </Container>
    </Background>
  );
}
