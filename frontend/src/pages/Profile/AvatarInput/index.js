import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform'
import api from '../../../services/api'

import { Container } from './styles';

export default function AvatarInput() {
    const { defaultValue, registerField } = useField('avatar')
    const [file, setFile] = useState(defaultValue && defaultValue.idl)
    const [preview, setPreview] = useState(defaultValue && defaultValue.url)
    const ref = useRef()

    useEffect(() => {
        if (ref.current) {
            alert('pelo menos uma')
            registerField({
                name: 'avatar_id',
                ref: ref.current,
                path: 'dataset.file'
            })
        }
// eslint-disable-next-line
    }, [])// se colocar as dependencias aqui da o demonio no navegador

    // useEffect(() => {
    //     if (ref.current) {
    //         console.log('foi')
    //         registerField({
    //             name: 'avatar_id',
    //             ref: ref.current,
    //             path: 'dataset.file'
    //         })
    //     }
    // }, [ref, registerField])

    async function handleChange(e) {
        const data = new FormData()
        data.append(`file`, e.target.files[0])

        const response = await api.post('files', data)

        const { id, url } = response.data
        setFile(id)
        setPreview(url)
    }

    return (
        <Container>
            <label htmlFor="avatar">
                <img src={preview || 'https://api.adorable.io/avatars/50/abott@adorable.pngCopy'} alt=""></img>
                <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    data-file={file}
                    onChange={handleChange}
                    ref={ref} />
            </label>
        </Container>
    );
}
