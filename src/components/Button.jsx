export default function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button className={`tap-button ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
