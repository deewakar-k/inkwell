import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import { Blog } from "./pages/Blog";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}
