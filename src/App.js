import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/Shop';
import Login from './components/Login/Login';
import WhatsappButton from './components/WhatsappButton';
import Admin from './components/Admin/Admin';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faShoppingBag, faSearch, faPhone, faMapMarker, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import Signin from './components/Login/Signin';
import { useAuth } from './AuthContext';
import Account from './components/Account/Account';

library.add(faUser, faShoppingBag, faSearch, faPhone, faMapMarker, faEnvelope);

const ProductPage = lazy(() => import('./components/Products/ProductPage'));

const App = () => {
  const { userData, url } = useAuth();
  const [reload, setReload] = useState(false);
  const [openCart, setOpenCart] = useState();
  return (
    <Router>
      <Header userData={userData} openCart={openCart} setOpenCart={setOpenCart} reload={reload} setReload={setReload}/>
      <main>
        <ScrollToTop/>
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route path="/" element={<Home reload={reload} setReload={setReload} />} />
            <Route path="/shop" element={<Shop reload={reload} setReload={setReload} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin url={url}/>} />
            <Route path="/myaccount" element={<Account userData={userData} />}/>
            <Route path={'/shop/:productId'} element={<ProductPage reload={reload} setReload={setReload}/>}/>
            <Route path="/admin/*" element={<Admin adminData={userData} url={url}/>} />
          </Routes>
        </Suspense>
      </main>
      <WhatsappButton />
      <Footer />
    </Router>
  );
}

export default App;
