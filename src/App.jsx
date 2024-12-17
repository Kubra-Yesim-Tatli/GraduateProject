import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Router'ı import ediyoruz
import React from "react";
import { Provider } from "react-redux"; // Redux Provider import ediyoruz


import Header from "./layout/Header";
import Footer from "./layout/Footer";
import PageContent from "./layout/PageContent";
import HomePage from "./pages/HomePage";

import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import UserProvider from "./layout/UserContext";
import store from "./Redux/store";

function App() {
  return (
    <Provider store={store}> {/* Redux Provider ekliyoruz */}
      <UserProvider>
        <Router>
          <PageContent>
            <Header />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/signup" component={SignupForm} />
              <Route path="/login" component={LoginForm} />
            </Switch>
            <Footer />
          </PageContent>
        </Router>
      </UserProvider>
    </Provider>
  );
}

export default App;
