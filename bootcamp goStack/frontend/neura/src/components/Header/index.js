import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import logo from '../../logo.svg'
import Notifications from '../Notifications'
import { Container, Content, Profile } from './styles'

export default function Header() {
    const profile = useSelector(state => state.user.profile)

    return(
        <Container>
            <Content>
                <nav>
                    <img src="https://api.adorable.io/avatars/50/abott@adorable.pngCopy" alt="Neura"></img>
                    <Link to="/dashboard">DASHBOARD</Link>
                </nav>

                <aside>
                    <Notifications></Notifications>
                    <Profile>
                        <div>
                            <strong> {profile.name} </strong>
                            <Link to="/profile"> Meu perfil</Link>
                        </div>
                        <img src={profile.avatar || 'https://api.adorable.io/avatars/50/abott@adorable.pngCopy' } alt=""></img>
                    </Profile>
                </aside>
            </Content>
        </Container>
    )
}