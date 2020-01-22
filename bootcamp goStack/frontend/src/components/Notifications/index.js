import React, { useState, useEffect, useMemo } from 'react'
import api from '../../services/api'
import { parseISO, formatDistance } from 'date-fns'
import pt from 'date-fns/locale/pt'

import { MdNotifications } from 'react-icons/md'
import { Container, Badge, NotificationList, Notification, Scroll } from './styles'

export default function Notifications() {
    const [visible, setVisible] = useState(false)
    const [notifications, setNotifications] = useState([])
    const hasUnread = useMemo(
        () => !!notifications.find(item => item.read === false),
        [notifications]
    )

    useEffect(() => {
        async function loadNotifications() {
            const response = await api.get('notifications')
            const data = response.data.map(item => ({
                ...item,
                timeDistance: formatDistance(
                    parseISO(item.createdAt),
                    new Date(),
                    { addSuffix: true, locale: pt}
                )
            }))
            setNotifications(data)
        }

        loadNotifications()
    }, [])

    function handleToggleVisible() {
        setVisible(!visible)
    }

    async function handleMarkAsRead(id) {
        await api.put(`notifications/${id}`)

        setNotifications(
            notifications.map(item => item._id === id ? { ...item, read: true} : item)
        )
    }

    return (
        <Container>
            <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
                <MdNotifications color="#7159c1" size={20}></MdNotifications>
            </Badge>

            <NotificationList visible={visible}>
                <Scroll>
                { notifications.map(item => (
                    <Notification key={item._id} unread={!item.read}>
                        <p> {item.content}</p>
                        <time> {item.timeDistance}</time>
                        {!item.read && (
                            <button onClick={() => handleMarkAsRead(item._id)} type="button">Marcar como lida</button>
                        )}
                    </Notification>
                ))}
                
                </Scroll>
            </NotificationList>
        </Container>
    )
}