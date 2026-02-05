import Link from "next/link";
<<<<<<< HEAD
import Header from'./components/Header';
import Hero from './components/Hero';
import FeatureCard1 from './components/FeatureCard1';
import FeatureCard2 from './components/FeatureCard2';
import Footer from './components/Footer';
=======
import Link from "next/link";

>>>>>>> upstream/main
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 text-gray-900">

      {/* Header */}
<<<<<<< HEAD
      <Header />
=======
      <header className="bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">EchoRoom</h1>
            <p className="text-sm text-gray-600">
              Ideas • {" "}
              <Link href="/experiments">Experiments </Link>{" "} • Reflection
            </p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
            OSQ Project
          </span>
        </div>
      </header>
>>>>>>> upstream/main

      {/* Hero */}
      <Hero />

      {/* How It Works */}
      <FeatureCard1 />


      {/* Capabilities */}
      <FeatureCard2/>
      

      {/* Footer */}
      <Footer/>
      

    </main>
  );
}
