import { useRouter } from 'next/router';

function About() {
    const router = useRouter();
    return (
        <div className="AboutSection">
            <h1>Who we really are</h1>
            <p>Joël Transport has been around since 1965. We’re a household name with hundreds of happy clients.</p>
            <button className="button button-secondary" onClick={() => router.push('/about')}>Learn more</button>
        </div>
    )
}

export default About;
