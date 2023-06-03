import { useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const DropZone = ({ meta, field: { name }, helpers }) => {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    accept: {
      "application/zip": [".zip"],
    },
    onDrop: (acceptedFiles) => {
      helpers.setValue(acceptedFiles, meta.touched);
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const acceptedFileItems = acceptedFiles.map((file) => {
    return (
      <li key={file.path}>
        {file.path} - {Number(file.size / (1024 * 1024)).toFixed(2)} MB
      </li>
    );
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <li key={file.path}>
        {file.path} - {Number(file.size / (1024 * 1024)).toFixed(2)} MB
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    );
  });

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} name={name} />
        <p>Drag 'n' drop zipped folder here, or click to select folder </p>
        <em>(single zipped folder is allowed to drop or select here)</em>
      </div>
      {meta.touched && meta.error ? (
        <div style={styles.error}>{meta.error}</div>
      ) : null}
      <aside>
        {acceptedFileItems.length > 0 && (
          <>
            <h4>Accepted files</h4>
            <ul className="unordered-list">{acceptedFileItems}</ul>
          </>
        )}

        {fileRejections.length > 0 && (
          <>
            <h4>Rejected files</h4>
            <ul>{fileRejectionItems}</ul>
          </>
        )}
      </aside>
    </section>
  );
};

const styles = {
  error: {
    color: "#D82E2F",
    fontWeight: 500,
    fontSize: "0.9rem",
  },
};

export default DropZone;
