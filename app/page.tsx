import Link from 'next/link';
import Header from '../components/Header';
import HeroSection from '../components/Hero';
import FeatureSection from '../components/Feature';
import MenuSection from '../components/Menu';

export default function Home() {
  return (
    <>
      <Header />
      <main className="content-with-fixed-header max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <FeatureSection />
        <MenuSection />
      </main>
    </>
    // <main className="min-h-screen p-8">
    //   <header className="max-w-4xl mx-auto">
    //     <h1 className="text-4xl font-bold">My App</h1>
    //     <p className="mt-2 text-gray-600">Landing page — fully server-rendered for SEO</p>
    //     <nav className="mt-4">
    //       <Link href="/about">About</Link> | <Link href="/services">Services</Link> |{' '}
    //       <Link href="/contact">Contact</Link> | <Link href="/dashboard">Dashboard</Link>
    //     </nav>
    //   </header>

    //   <section className="max-w-4xl mx-auto mt-12">
    //     <h2 className="text-2xl font-semibold">Benefits</h2>
    //     <ul className="list-disc ml-6 mt-4">
    //       <li>SEO-ready pages server-rendered by Next.js</li>
    //       <li>Installable PWA</li>
    //       <li>GAS backend using Google Sheets</li>
    //     </ul>
    //   </section>
    // </main>
  );
}
