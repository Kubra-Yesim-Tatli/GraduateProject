import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Router'ı import ediyoruz
import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import PageContent from "./layout/PageContent";
import HomePage from "./Pages/HomePage";

import SignupForm from "./components/SignupForm";

function App() {
  return (
    <Router>
      <PageContent>
        <Header />
        <Switch> {/* Switch ile sadece bir route'un render edilmesini sağlıyoruz */}
          <Route exact path="/" component={HomePage} /> {/* HomePage için bir route */}
          <Route path="/signup" component={SignupForm} /> {/* /signup için SignUpPage route'u */}
        </Switch>
        <Footer />
      </PageContent>
    </Router>
  );
}

export default App;