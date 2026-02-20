import Head from 'next/head';
import Script from 'next/script';

import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Bsheet from '../components/Bsheet';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Features from '../components/Features';
import Demo from '../components/Demo';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>NovaiTemplateCreator — Premium Starter Landing Pages</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&display=swap" rel="stylesheet" />
      </Head>

      {/* External scripts */}
      <Script src="/scripts/scripts.js" strategy="afterInteractive" />
      <Script src="https://unpkg.com/scrollreveal" strategy="lazyOnload" />

      {/* Components */}
      <Loader />
      <div id="main-content" style={{ display: 'none' }}>
        <Navbar />
        <Bsheet />
        <Hero />
        <Projects />
        <Features />
        <Demo />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}
