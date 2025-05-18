import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Layout from "./Layout";

export default function NotFound() {
  const error = useRouteError();
  console.error(error);

  return (
    <main className="section-background text-center">
      <Layout
        heroTitle="Oops!"
        heroImage="/images/hero-bog.webp"
      >
        <div className="p-5" role="alert"> {/*add for accessibility*/}
          <h3>Sorry, this page doesn't exist or something went wrong.</h3>
          <Link to="/" className="btn mt-2">Go Home</Link>
        </div>
      </Layout>
    </main>
  );
}
