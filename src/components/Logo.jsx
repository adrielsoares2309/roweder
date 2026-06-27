import { publicAssetUrl } from '../utils/publicAssetUrl';

export default function Logo({ className = '', alt = 'Roweder Disk Gás' }) {
  return (
    <img
      className={className}
      src={publicAssetUrl('images/logo.png')}
      alt={alt}
    />
  );
}
