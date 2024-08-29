export default function CustomizedModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <span
        className="close"
        onClick={onClose}
        style={{
          position: "absolute",
          right: "8vw",
          color: "black",
          fontSize: "50px",
        }}
      >
        &times;
      </span>
      {children}
    </>
  );
}
