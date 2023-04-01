import Dropzone from "react-dropzone";

type Props = {
  onChange: (files: any) => void;
};

function Uploader({ onChange }: Props) {
  return (
    <Dropzone onDrop={onChange}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <section
          className={`Uploader Uploader__dropzone ${
            isDragActive && "Uploader__dropzone--dragging"
          } `}
        >
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p className="text-center">
                Drag and drop files here. <br />
                The file size of your attachment should not exceed 10MB.
              </p>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
}

export default Uploader;
