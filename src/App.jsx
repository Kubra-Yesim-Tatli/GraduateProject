import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";

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

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
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
          <Layout>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/signup" component={SignupForm} />
              <Route path="/login" component={LoginForm} />
              <Route exact path="/shop" component={ShopPage} />
              <Route path="/categories" component={CategoryPage} />
              <Route path="/shop/:gender/:category" component={ShopPage} />
              <Route path="/product/:id" component={ProductDetail} />
            </Switch>
          </Layout>
        </Router>
      </UserProvider>
    </Provider>
  );
}

export default App;
