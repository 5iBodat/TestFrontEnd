import { useState,createContext } from "react";
import Category from "./components/category/Category";
import Book from "./components/books/Book";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom'
import Header from "./layouts/header/header";
import Footer from "./layouts/footer/footer";
import Bookmark from "./Bookmark";

export const categoryContext = createContext();

function App() {
  const [ctContext, setCtContext] = useState([]);
  return (
    <>
    <div className="container">
    <Router>
      <Header />
        <categoryContext.Provider value={{ctContext, setCtContext}}>
      <Routes>
        <Route path="/" element={<Category />} />
        <Route path="/:id/:name" element={<Book  />} />
        <Route path="/bookmark" element={<Bookmark />} />
        </Routes>
        </categoryContext.Provider>
        <Footer />
    </Router>
    </div>
    </>
  );
}

export default App;
