import { useRouter } from 'next/router';

function About() {
  const router = useRouter();
  return (
    <div className="AboutSection">
      <h1>Who we really are</h1>
      <p>Joel Transport was established in 1965 and has been a household name synonymous with excellent service in the furniture removals</p>
      <button className="button button-secondary" onClick={() => router.push('/about')}>Learn more</button>
    </div>
  )
}

export default About;
