import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-white border-b">
      <div className="text-2xl font-extrabold text-blue-600">CodeKero</div>
      <div className="space-x-4">
        <Button variant="outline">Login</Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
      </div>
    </nav>
  );
}