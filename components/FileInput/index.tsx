import { useRef } from 'react'
import styles from './styles.module.css'

export default function FileInput({
  handleUpload
}: {
  handleUpload: Function
}) {
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    hiddenFileInput.current?.click()
  }

  return (
    <>
      <button className={`${styles.input} p-2 mr-1`} onClick={handleClick}>
        Upload log
      </button>
      <input
        type='file'
        id='file'
        accept='.log'
        ref={hiddenFileInput}
        style={{ display: 'none' }}
        onChange={e =>
          e.target.files instanceof FileList && handleUpload(e.target.files[0])
        }
      />
    </>
  )
}
