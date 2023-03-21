import { useState } from "react";
import Dropzone from "react-dropzone";

type Props = {
  onChange: (files: any) => void;
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function Uploader({ onChange }: Props) {
  const [files, setFiles] = useState<any[]>([]);
  function handleOnDrop(files: any) {
    onChange(files);
    setFiles(
      files.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }

  const thumbs = files.map((file) => (
    <div
      style={{
        width: 100,
        height: 100,
        display: "inline-flex",
        padding: 4,
        boxSizing: "border-box",
        marginBottom: 8,
        marginRight: 8,
      }}
      key={file.name}
    >
      <div style={thumbInner}>
        <img
          alt=""
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <Dropzone onDrop={handleOnDrop}>
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
              <p>Drag and drop files here, or click to select files</p>
            )}
          </div>
          <div>{thumbs}</div>
        </section>
      )}
    </Dropzone>
  );
}

export default Uploader;
