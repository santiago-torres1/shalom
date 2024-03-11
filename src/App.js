import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/Shop';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faShoppingBag, faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faShoppingBag, faSearch)

const App = () => {

  return (
    <Router>
      <div className='hero_area'>
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<Shop />} />
            <Route path="/reviews" element={<Shop />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
