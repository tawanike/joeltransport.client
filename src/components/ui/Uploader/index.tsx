import Dropzone from 'react-dropzone';

type Props = {
    onChange: (files: any) => void
}

function Uploader({ onChange }: Props) {
  return (
        <Dropzone onDrop={onChange}>
            {({getRootProps, getInputProps, isDragActive}) => (
                <section className={`Uploader Uploader__dropzone ${isDragActive && 'Uploader__dropzone--dragging'} `}>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag and drop files here, or click to select files</p>
                        }
                    </div>
                </section>
            )}
        </Dropzone>
  )
}

export default Uploader
