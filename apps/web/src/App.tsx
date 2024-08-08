import { BrowserRouter, Route, Routes } from "react-router-dom"
import Blog from "./pages/Blog"
import Home from "./pages/Home"
import Blogs from "./pages/Blogs"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
