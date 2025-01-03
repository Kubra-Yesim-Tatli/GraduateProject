import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { Provider, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './Redux/store';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import CategoryPage from './pages/CategoryPage';
import ShopPage from './pages/ShopPage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import AddressPage from './pages/CreateOrder/AddressPage';
import PaymentPage from './pages/CreateOrder/PaymentPage';
import CompletePage from './pages/CreateOrder/CompletePage';
import OrderSuccessPage from './pages/CreateOrder/OrderSuccessPage';
import PreviousOrdersPage from './pages/PreviousOrdersPage';
import ProtectedRoute from './components/ProtectedRoute';
import UserProvider from "./layout/UserContext";
import { verifyToken } from './Redux/Action/authActions';

// Create a wrapper component that uses Redux hooks
const AppContent = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/login" component={LoginForm} />
          <Route exact path="/shop" component={ShopPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/team" component={TeamPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/categories" component={CategoryPage} />
          <Route exact path="/shop/:gender/:categoryName/:categoryId" component={ShopPage} />
          <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" component={ProductDetail} />
          <Route path="/cart" component={CartPage} />
          <Route path="/order-success" component={OrderSuccessPage} />
          <ProtectedRoute path="/profile/orders" component={PreviousOrdersPage} />
          <ProtectedRoute path="/order/address" component={AddressPage} />
          <ProtectedRoute path="/order/payment" component={PaymentPage} />
          <ProtectedRoute path="/order/complete" component={CompletePage} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <Router>
          <AppContent />
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Router>
      </UserProvider>
    </Provider>
  );
}

export default App;
