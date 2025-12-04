const FileUpload = ({ label, accept, onChange }) => (
  <label className="form-field">
    <span>{label}</span>
    <input type="file" accept={accept} onChange={(e) => onChange(e.target.files?.[0])} />
  </label>
);

export default FileUpload;


