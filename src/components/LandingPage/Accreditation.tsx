import React from 'react';
import Image from 'next/image';

function Accreditation() {
  return (
    <div className="Accreditation">
      <h1>Membership & accreditation</h1>
      <div className="Accreditation__logos">
          <Image src="/img/memberships/amosa.png" width="179" height="71" alt=""/>
          <Image src="/img/memberships/saima.png" width="180" height="64" alt=""/>
          <Image src="/img/memberships/rfa.png" width="178" height="61" alt=""/>
          <Image src="/img/memberships/nbcrfli.png" width="77" height="77" alt=""/>
      </div>
    </div>
  )
}

export default Accreditation;
