export default function Input({ label, type = "text", name, placeholder, value, onChange }) {
  return (
    <label className="input-group">
      <span>{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </label>
  );
}
