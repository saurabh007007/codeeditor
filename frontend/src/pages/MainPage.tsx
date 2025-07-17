import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";
import { Button } from "@/components/ui/button";

export  function MainPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-8 bg-gradient-to-b from-white to-blue-50">
        <section className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4">Master Coding with Confidence</h1>
          <p className="text-xl text-gray-600 mb-6">
            Learn from curated challenges, build real-world projects, and sharpen your skills with interactive lessons.
          </p>
          <Button className="bg-blue-600 text-white px-8 py-4 text-lg hover:bg-blue-700">Start Coding</Button>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">Real-Time Compiler</h3>
            <p className="text-gray-600">Write, compile, and run code in multiple languages directly in your browser.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
            <p className="text-gray-600">Visual dashboards to monitor learning goals and completed challenges.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">Community Support</h3>
            <p className="text-gray-600">Join our vibrant community and get help from peers and mentors.</p>
          </div>
        </section>

        <section className="mt-24 bg-blue-600 text-white p-12 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Coding Journey?</h2>
          <p className="mb-6">Sign up now and unlock all the premium features for free!</p>
          <Button className="bg-white text-blue-600 font-semibold px-6 py-3 hover:bg-gray-100">Join Now</Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}