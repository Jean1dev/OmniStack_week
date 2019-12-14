import React from 'react'

import { MdNotifications } from 'react-icons/md'
import { Container, Badge, NotificationList, Notification, Scroll } from './styles'

export default function Notifications() {
    return (
        <Container>
            <Badge hasUnread>
                <MdNotifications color="#7159c1" size={20}></MdNotifications>
            </Badge>

            <NotificationList>
                <Scroll>
                    <Notification unread>
                        <p> tem uma notificacao</p>
                        <time>ha dois dias atras</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                </Scroll>
            </NotificationList>
        </Container>
    )
}