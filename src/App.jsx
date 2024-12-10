import { BrowserRouter as Router } from "react-router-dom"; // Router importu
import { useState } from 'react'
import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import PageContent from "./layout/PageContent";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router> {/* Router ile sar */}
      <PageContent>
        <Header />
        <HomePage />
        <Footer />
      </PageContent>
    </Router>
  );
}

export default App;

