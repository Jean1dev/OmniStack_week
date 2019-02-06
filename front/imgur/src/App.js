import React, { Component } from 'react';
import GlobalStyle from './styles/global'
import { Container, Content } from './styles'
import Upload from './components/Upload'
import FileList from './components/FileList'
import { uniqueId } from 'lodash'
import filesize from 'filesize'

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
  }

  render() {
    const { uploadedFiles } = this.state
    return (
      <Container>
        <Content>
          <Upload>
            { !!uploadedFiles.length && (
              <FileList files={uploadedFiles}>
              </FileList>
            ) }
          </Upload>
        </Content>
        <GlobalStyle/>>
        
      </Container>
    );
  }
}

export default App;
