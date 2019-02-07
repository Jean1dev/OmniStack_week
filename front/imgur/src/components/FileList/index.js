import React from 'react';

import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'
import CircularProgressbar from 'react-circular-progressbar'
import { Container, FileInfo, Preview } from './style'


const FileList = ({ files, onDelete }) => (
    <Container>
        {files.map(uploadedFiles => (
            <li key={uploadedFiles.id}>
                <FileInfo>
                    <Preview src={uploadedFiles.preview}>

                    </Preview>
                    <div>
                        <strong>{uploadedFiles.name}</strong>
                        <span>{uploadedFiles.readableSize}
                        {!!uploadedFiles.url && <button onClick={() => {onDelete(uploadedFiles.id)}}>Excluir</button>}
                        </span>
                    </div>
                </FileInfo>
                <div>
                    {!uploadedFiles.uploaded && !uploadedFiles.error && (

                        <CircularProgressbar
                            styles={{
                                root: { width: 24 },
                                path: { stroke: `#7159c1` }
                            }}
                            strokeWidth={10}
                            percentage={uploadedFiles.progress}
                        >
                        </CircularProgressbar>
                    )}
                    {uploadedFiles.url && (

                        <a href={uploadedFiles.url}
                            target="_blank"
                            rel="noopener noreferrer">
                            <MdLink style={{ marginRight: 8 }} size={24} color="#222"></MdLink>
                        </a>
                    )}

                    {uploadedFiles.uploaded && <MdCheckCircle size={24} color="#78e5d5"></MdCheckCircle>}
                    {uploadedFiles.error && <MdError size={24} color="#e57878"></MdError>}
                </div>
            </li>
        ))}
    </Container>
)

export default FileList;
