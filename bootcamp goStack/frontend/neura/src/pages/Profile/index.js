import React from 'react';
import { Form, Input } from '@rocketseat/unform'
import { useSelector, useDispatch } from 'react-redux'

import { updateProfileRequest } from '../../store/modules/user/actions'

import Avatar from './AvatarInput'
import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.user.profile)

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data))
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Avatar name="avatar_id"></Avatar>
        <Input name="name" placeholder="nome completo"></Input>
        <Input type="email" name="email" placeholder="email"></Input>

        <hr/>
        <Input type="password" name="oldPassword" placeholder="senha atual"></Input>
        <Input type="password" name="password" placeholder="nova senha"></Input>
        <Input type="password" name="confirmPassword" placeholder="confirme a senha"></Input>

        <button type="submit"> Atualizar perfil</button>
      </Form>

      <button type="button"> Sair </button>
    </Container>
  )
}
