export default function Logo({ className = '', alt = 'Roweder Disk Gás' }) {
  return (
    <img
      className={className}
      src={`${import.meta.env.BASE_URL}images/logo.png`}
      alt={alt}
    />
  );
}
