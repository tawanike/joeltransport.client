import Image from "next/image";

function Hero() {
  return (
    <div className="Hero" style={{ paddingTop: 2}}>
      <Image src="/img/delivery-man.png" width={2200} height={600} alt="" style={{ width: '100%' }}/>
    </div>
  )
}

export default Hero
