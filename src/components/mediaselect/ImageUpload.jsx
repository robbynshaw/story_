import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Styled from 'styled-components'
import ByteSize from 'byte-size'
import { Input } from 'semantic-ui-react'

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
`

const Thumb = Styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  max-width: 300px;
  max-height: 300px;
  padding: 10px;
  box-sizing: border-box;
`

const ThumbInner = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
`

const ThumbImg = Styled.img`
  display: block;
  width: auto;
  height: 100%;
`

class ImageUpload extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: "Drag 'n drop your image here, or click to browse for a file",
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

    if (files.length) {
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i]

        const result = {
          lastModified: file.lastModified,
          name: file.name,
          type: 'image',
          data: '',
          size: file.size,
        }

        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = btoa(reader.result)
          result.data += binaryStr

          // TODO This should set a progress circly bar overlaying
          // the image
        }

        reader.onloadend = () => {
          // TODO This should change the color of the circly bar and
          // start making progress as it is saved into the repo.
          // Then, after it's saved into the repo, we should finally
          // make this callback here
          onUpload(result)
        }

        reader.readAsBinaryString(file)
      }
    }
  }

  render() {
    const { message, files } = this.state

    let msg = <p>{message}</p>
    if (files.length) {
      msg = null
    }

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
      <Thumb key={file.name}>
        <ThumbInner>
          <ThumbImg src={file.preview} />
        </ThumbInner>
      </Thumb>
    ))

    return (
      <>
        <Dropzone style={{}} onDrop={this.onFileSelect}>
          {({ getRootProps, getInputProps }) => (
            <DropContainer>
              <div {...getRootProps()}>
                <ThumbContainer>{thumbs}</ThumbContainer>
                <input {...getInputProps()} />
                {msg}
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
  onUpload: PropTypes.func.isRequired,
}

export default ImageUpload
