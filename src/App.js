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
import PaymentConfirmation from './components/Payment/PaymentConfirmation';

library.add(faUser, faShoppingBag, faSearch, faPhone, faMapMarker, faEnvelope, faCheck);

const MainLayout = ({ children }) => (
  <>
    <Header />
    <main>
      <ScrollToTop />
      {children}
    </main>
    <WhatsappButton />
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainLayout><Home /></MainLayout>}
        />
        <Route
          path="/shop"
          element={<MainLayout><Shop /></MainLayout>}
        />
        <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/signin" element={<MainLayout><Signin /></MainLayout>} />
        <Route path="/myaccount" element={<MainLayout><Account /></MainLayout>} />
        <Route
          path="/shop/:productId"
          element={<MainLayout><ProductPage /></MainLayout>}
        />
        <Route path="/admin/*" element={<MainLayout><Admin /></MainLayout>} />
        <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />
        <Route path="/payment-confirmation" element={<MainLayout><PaymentConfirmation /></MainLayout>} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}
export default App;
