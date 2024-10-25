import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import TopHeader from "./components/TopHeader.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { Toaster } from "sonner";
import { GlobalState } from "./context/globalState.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Replace with your own public Stripe key
const stripePromise = loadStripe("pk_test_51OvmpoEWhpY7ASOw4YwOtVI4czVFxUxKVmrbuJkkTY7xrgHWzwFzlYaG92GHB4uQsPBPlSA1oUkMvgunyVe8ZRio00fevIPiwK");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GlobalState>
          <Elements stripe={stripePromise}>
            <main className="bg-white font-Genty" style={{ backgroundAttachment: "fixed" }}>
              {/* <TopHeader />
              <Header /> */}
              <Toaster />
              <App />
              {/* <Footer /> */}
            </main>
          </Elements>
        </GlobalState>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
