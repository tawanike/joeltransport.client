import Image from 'next/image';

function HowItWorks() {
  return (
    <div className="HowItWorks container">
      <div className="row">
        <div className="HowItWorks__image-container col-12 col-md-5">
          <Image src="/img/how-it-works.png" alt="How it works" width={350} height={500} style={{ marginTop: -63, marginLeft: -12 }} />
        </div>
        <div className="HowItWorks__description col-12 col-md-7">
          <h1>How It Works</h1>
          <p>Steps to scheduling your local move or local storage.</p>
          <ul>
            <li>
              <div style={{ backgroundColor: 'var(--color-primary)'}}></div>
              <p>Get a free quote</p>
            </li>
            <li>
              <div style={{ backgroundColor: 'var(--color-red-primary)'}}></div>
              <p>Plan your move</p>
            </li>
            <li>
              <div style={{ backgroundColor: 'var(--color-error)'}}></div>
              <p>Pay for your move</p>
            </li>
            <li>
              <div style={{ backgroundColor: 'var(--color-bg-footer)'}}></div>
              <p>Get moving</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks;
