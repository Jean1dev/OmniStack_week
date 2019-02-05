import React from 'react';

import { View } from 'react-native';
import { Container, FileInfo, Preview } from './styles'
// import styles from '.(/styles';)

const FileList = () => (
    <Container>
        <li>
            <FileInfo>
                <Preview src="">

                </Preview>
                <div>
                    <strong>profile.png</strong>
                    <span>64k <button>Excluir</button></span>
                </div>
            </FileInfo>
        </li>
    </Container>
)

export default FileList;
