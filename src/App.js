import React, {Suspense, lazy, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/Shop';
import Login from './components/Login/Login';
import products from './components/Products/Products';
import WhatsappButton from './components/WhatsappButton';
import Admin from './components/Admin/Admin';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faShoppingBag, faSearch, faPhone, faMapMarker, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';

library.add(faUser, faShoppingBag, faSearch, faPhone, faMapMarker, faEnvelope)

const ProductPage = lazy(() => import('./components/Products/ProductPage'));


const App = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  return (
    <Router>
      <Header isAdmin={isAdmin} onAuthChange={setIsAdmin}/>
      <main>
      <ScrollToTop/>
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login isAdmin={isAdmin} onAuthChange={setIsAdmin}/>} />
            {products.map(product => (
              <Route path={`/shop/${product.id}`} key={product.id} element={<ProductPage id={product.id}img={product.img} name={product.name} price={product.price}/>}/>
            ))}
            <Route path="/admin/*" element={<Admin isAuthenticated={isAdmin}/>} />
          </Routes>
        </Suspense>
      </main>
      <WhatsappButton />
      <Footer />
    </Router>
  );
}

export default App;
