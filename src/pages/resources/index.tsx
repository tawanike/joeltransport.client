import Image from 'next/image';
import { CoverImage } from '../../components/ui';

export default function Resources() {
  return (
    <div className="Resources">
      <CoverImage size="medium" src="/img/kaleb.png" />

      <div className="Resources__documents">
        <h2>Resourceful documents</h2>
      </div>

      <div className="Resources__documents">
        <h2>Here are some related articles</h2>
      </div>
    </div>
  )
}
