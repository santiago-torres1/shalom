import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/Shop';
import Login from './components/Login/Login';
import products from './components/Products/Products';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faShoppingBag, faSearch, faPhone, faMapMarker, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import Footer from './components/Footer/Footer';

library.add(faUser, faShoppingBag, faSearch, faPhone, faMapMarker, faEnvelope)

const ProductPage = lazy(() => import('./components/Products/ProductPage'));

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            {products.map(product => (
              <Route path={`/shop/${product.id}`} element={<ProductPage img={product.img} name={product.name} price={product.price}/>}/>
            ))}
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
