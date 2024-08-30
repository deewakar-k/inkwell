import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import { Blog } from "./pages/Blog";
import { Write } from "./pages/Write";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </BrowserRouter>
  );
}
