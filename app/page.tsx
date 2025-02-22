import LandingPage from "@/components/landing-page";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main
      className={`min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 $`}
    >
      <LandingPage />
      <Footer />
    </main>
  );
}
