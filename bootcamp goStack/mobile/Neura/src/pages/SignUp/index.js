import React, { useRef } from 'react';
import { Image } from 'react-native';
import Background from '../../components/Background'
import logo from '../../assets/logo.png'

import { Container, Form, FormInput, SubmitButton, SignLink, SignLinkText } from './styles';

export default function SignUp({ navigation }) {
  const emailRef = useRef()
  const passwordRef = useRef()

  function handleSubmit() {

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
          ></FormInput>

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={handleSubmit}
          ></FormInput>

          <SubmitButton onPress={handleSubmit}>
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
