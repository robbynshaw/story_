function getProgressPercent(e) {
  if (e.total) {
    return (e.loaded / e.total) * 100
  }
  return 10
}

export const UploadStatus = {
  LOADING: 'loading',
  SAVING: 'saving',
  ERROR: 'error',
  COMPLETE: 'complete',
}

class UploadHandler {
  constructor(opts) {
    this.saveMethod = opts.save || (file => new Promise(res => res(file)))
    this.onError = opts.onError || (() => {})
    this.onProgress = opts.onProgress || (() => {})
    this.onComplete = opts.onComplete || (() => {})

    this.checkComplete = this.checkComplete.bind(this)
    this.upload = this.upload.bind(this)
  }

  checkComplete(files) {
    if (
      files.reduce(
        (cmplt, file) => cmplt
          && (file.status === UploadStatus.COMPLETE
            || file.status === UploadStatus.ERROR),
        true,
      )
    ) {
      this.onComplete(files)
    }
  }

  upload(files) {
    const stateFiles = [...files].map(file => ({
      ...file,
      percent: 0,
      status: UploadStatus.LOADING,
      data: [],
    }))

    if (stateFiles.length) {
      for (let i = 0; i < stateFiles.length; i += 1) {
        const file = stateFiles[i]

        const reader = new FileReader()
        reader.onabort = () => {}

        reader.onerror = (er) => {
          file.status = UploadStatus.ERROR
          this.onError(UploadStatus.LOADING, file, er)
        }

        reader.onload = (e) => {
          console.log('e', e)
          file.data.push(btoa(reader.result))
          file.percent = getProgressPercent(e)
          this.onProgress(stateFiles)
        }

        // Performance implications are nil and we need the closure
        // eslint-disable-next-line no-loop-func
        reader.onloadend = async () => {
          file.status = UploadStatus.SAVING

          try {
            await this.saveMethod(file)
            this.checkComplete(stateFiles)
          } catch (er) {
            file.status = UploadStatus.ERROR
            this.onError(UploadStatus.SAVING, file, er)
          }
        }

        reader.readAsBinaryString(files[i])
      }
    }
  }
}

export default UploadHandler
