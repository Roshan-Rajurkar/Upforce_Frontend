import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Details from './pages/Details'

function App() {
  return (
    <div className='p-4 px-10 sm:px-6 md:px-8 lg:px-10 xl:px-14'>
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/create" exact element={<Create />} />
      <Route path="/edit/:id" exact element={<Edit />} />
      <Route path="/details/:id" exact element={<Details/>} />
      <Route path="*" exact element={<p>404 page not found</p>} />
    </Routes>
    </div>
  );
}

export default App;
