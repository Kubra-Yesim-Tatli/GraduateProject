import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { Provider, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import HomePage from "./pages/HomePage";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ShopPage from "./pages/ShopPage";
import UserProvider from "./layout/UserContext";
import store from "./Redux/store";
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import ProtectedRoute from './components/ProtectedRoute';
import AddressPage from './pages/CreateOrder/AddressPage';
import PaymentPage from './pages/CreateOrder/PaymentPage';
import { verifyToken, setUser } from './Redux/Action/authActions';

// Create a wrapper component that uses Redux hooks
const AppContent = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini kontrol et
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)));
    }
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
          <Route path="/categories" component={CategoryPage} />
          <Route exact path="/shop/:gender/:categoryName/:categoryId" component={ShopPage} />
          <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" component={ProductDetail} />
          <Route path="/cart" component={CartPage} />
          <ProtectedRoute exact path="/create-order/address" component={AddressPage} />
          <ProtectedRoute path="/create-order/payment" component={PaymentPage} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

// Create an auth wrapper component
const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return children;
};

function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <Router>
          <AuthWrapper>
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
          </AuthWrapper>
        </Router>
      </UserProvider>
    </Provider>
  );
}

export default App;
