import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/Shop';
import Login from './components/Login/Login';
import WhatsappButton from './components/WhatsappButton';
import Admin from './components/Admin/Admin';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faShoppingBag, faSearch, faPhone, faMapMarker, faEnvelope, faCheck} from '@fortawesome/free-solid-svg-icons';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import Signin from './components/Login/Signin';
import Account from './components/Account/Account';
import Checkout from './components/Checkout/Checkout';
import ProductPage from './components/Products/ProductPage';
import Payment from './components/Payment/Payment';

library.add(faUser, faShoppingBag, faSearch, faPhone, faMapMarker, faEnvelope, faCheck);

const App = () => {
  console.log('rendered')
  return (
    <Router>
      <Header />
      <main>
        <ScrollToTop/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/myaccount" element={<Account />}/>
            <Route path={'/shop/:productId'} element={<ProductPage />}/>
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/checkout" element={<Checkout />}/>
            <Route path="/payment" element={<Payment />}/>
          </Routes>
      </main>
      <WhatsappButton />
      <Footer />
    </Router>

  );
}

export default App;
