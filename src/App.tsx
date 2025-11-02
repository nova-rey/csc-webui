import { Routes, Route } from "react-router-dom";
import Builder from "./routes/Builder";
import Runs from "./routes/Runs";
import Replay from "./routes/Replay";
import About from "./routes/About";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <NavBar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Builder />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/runs" element={<Runs />} />
          <Route path="/replay" element={<Replay />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}
