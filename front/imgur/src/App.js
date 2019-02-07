import React, { Component } from 'react';
import GlobalStyle from './styles/global'
import { Container, Content } from './styles'
import Upload from './components/Upload'
import FileList from './components/FileList'
import { uniqueId } from 'lodash'
import filesize from 'filesize'
import api from './services/api'

class App extends Component {

  state = {
    uploadedFiles: []
  }

  handleUpload = files => {
  
    const _uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }))

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(_uploadedFiles)
    })
    console.log(uploadedFiles)
    _uploadedFiles.forEach(this.processUpload)
  }

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(file => {
        return id == file.id ? { ...file, ...data } : file
      })
    })
  }

  processUpload = (file) => {
    const data = new FormData()
    data.append('file', file.file, file.name)
    api.post('posts', data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round(e.loaded * 100 / e.total))
        this.updateFile(file.id, {
          progress,
        })
      },
    }).then(response => {
      console.log(response, `success`)
      this.updateFile(file.id, {
        uploaded: true,
        id: response.data._id,
        url: response.data.url
      })
    }).catch(() => {
      this.updateFile(file.id, {
        error: true
      })
    })
  }

  handleDelete = async id => {
    await api.delete(`posts/${id}`)
    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id != id)
    })
  }

  render() {
    const { uploadedFiles } = this.state
    return (
      <Container>
        <Content>
          <Upload onUpload={this.handleUpload}>
            {!!uploadedFiles.length && (
              <FileList files={uploadedFiles}> onDelete={this.handleDelete}
              </FileList>
            )}
          </Upload>
        </Content>
        <GlobalStyle />>

      </Container>
    );
  }
}

export default App;
