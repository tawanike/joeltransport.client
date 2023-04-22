import { useRouter } from "next/router";

function About() {
  const router = useRouter();
  return (
    <div className="AboutSection">
      <h1>Who we are</h1>
      <p>
        Joël Transport is a home and office moving company and has been around
        since 1965. We’re a household name with thousands of happy clients.
      </p>
      <button
        className="button button-secondary"
        onClick={() => router.push("/about")}
      >
        Learn more
      </button>
    </div>
  );
}

export default About;
