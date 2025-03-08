export default function Loader({ size }) {
  return (
    <div className={`loading-container ${size}`}>
      <div className="spinner"></div>
    </div>
  );
}
