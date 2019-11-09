import React, { useRef } from 'react';
import { Image } from 'react-native';
import Background from '../../components/Background'
import logo from '../../assets/logo.png'

import { Container, Form, FormInput, SubmitButton, SignLink, SignLinkText } from './styles';

export default function SignIn({ navigation }) {
  const passwordRef = useRef()

  function handleSubmit() {
    
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
          ></FormInput>

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          ></FormInput>

          <SubmitButton onPress={handleSubmit}>
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
