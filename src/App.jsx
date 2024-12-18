import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import PageContent from "./layout/PageContent";
import HomePage from "./pages/HomePage";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ShopPage from "./pages/ShopPage";
import UserProvider from "./layout/UserContext";
import store from "./Redux/store";

// Koşullu Header ve Footer için bir Wrapper oluşturuyoruz
const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooterPages = ["/shop"]; // Header ve Footer'ı gizlemek istediğimiz sayfalar
  const hideHeaderFooter = hideHeaderFooterPages.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <Router>
          <PageContent>
            <Layout>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/signup" component={SignupForm} />
                <Route path="/login" component={LoginForm} />
                <Route path="/shop" component={ShopPage} />
              </Switch>
            </Layout>
          </PageContent>
        </Router>
      </UserProvider>
    </Provider>
  );
}

export default App;
