//Create a component to include a consistent hero on every page

import type { ReactNode } from 'react';

type LayoutProps = {
  children?: ReactNode;
  heroTitle?: string;
  heroImage?: string;
};

function Layout({ children, heroTitle, heroImage }: LayoutProps) {
  return (
    <>
      {heroTitle && heroImage && (
        <div
          className="hero"
          style={{
            width: '100vw',
            height: '66vh',
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            color: 'white',
            textAlign: 'left',
          }}
        >
          <div
            className="hero-overlay"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              padding: '1.5rem 2rem',
              width: '50%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'left',
              borderRadius: 0,
            }}
          >
            <h1 style={{ margin: 5 }}>
              {heroTitle}
            </h1>
          </div>
        </div>
      )}
      <main>{children}</main>
    </>
  );
}

export default Layout;
