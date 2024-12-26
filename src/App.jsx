import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { Provider, useDispatch } from 'react-redux';

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
import { verifyToken } from './Redux/Action/authActions';

// Create a wrapper component that uses Redux hooks
const AppContent = () => {
  const location = useLocation();

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
          </AuthWrapper>
        </Router>
      </UserProvider>
    </Provider>
  );
}

export default App;
