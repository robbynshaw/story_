import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Styled from 'styled-components'
import ByteSize from 'byte-size'
import { Input, Button } from 'semantic-ui-react'
import UploadHandler from 'src/lib/UploadHandler'
import Thumb from './Thumb'

const DropContainer = Styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-bottom: 10px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #eeeeee;
  border-style: dashed;
  background-color: #fafafa;
  color: #9c9c9c;
  outline: none;
  transition: border .24s ease-in-out;
`

const ThumbContainer = Styled.aside`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

class ImageUpload extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      files: [],
    }

    this.onFileSelect = this.onFileSelect.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  onFileSelect(acceptedFiles) {
    const files = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }))

    this.setState({ files })
  }

  onSave() {
    const { files } = this.state
    const { onUpload } = this.props

    const uploader = new UploadHandler({
      onComplete: stateFiles => console.log('COMPLETED ALL', stateFiles),
      onProgress: stateFiles => this.setState({ files: stateFiles }),
    })

    uploader.upload(files)
  }

  render() {
    const { files } = this.state

    console.log('files', files)

    let desc = '<Nothing selected>'
    let disabled = true

    if (files.length) {
      disabled = false

      const size = ByteSize(
        files.reduce((total, file) => total + file.size, 0),
        {
          units: 'metric',
        },
      ).toString()

      const name = files.length === 1
        ? files[0].name
        : `( ${files.reduce(total => total + 1, 0)} Images )`

      desc = `${name} - ${size}`
    }

    const thumbs = files.map(file => (
      <Thumb
        url={file.preview}
        isLoading={file.isLoading}
        percent={file.percent}
        key={file.name || file.path}
      />
    ))

    return (
      <>
        <Dropzone style={{}} onDrop={this.onFileSelect}>
          {({ getRootProps, getInputProps, open }) => (
            <DropContainer>
              <div {...getRootProps()}>
                <ThumbContainer>{thumbs}</ThumbContainer>
                <input {...getInputProps()} />

                {files.length > 0 || (
                  <>
                    <p>Drag &apos;n drop images here</p>
                    <Button onClick={open}>Open File Dialog</Button>
                  </>
                )}
              </div>
            </DropContainer>
          )}
        </Dropzone>
        <Input
          fluid
          readOnly
          value={desc}
          disabled={disabled}
          action={{
            color: 'green',
            labelPosition: 'right',
            icon: 'upload',
            content: 'Insert',
            onClick: this.onSave,
          }}
        />
      </>
    )
  }
}

ImageUpload.propTypes = {
  onUpload: PropTypes.func,
  onSelect: PropTypes.func,
}

ImageUpload.defaultProps = {
  onUpload: () => {},
  onSelect: () => {},
}

export default ImageUpload
