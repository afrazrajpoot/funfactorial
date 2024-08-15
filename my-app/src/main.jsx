import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import TopHeader from "./components/TopHeader.jsx";
import Header from "./components/Header.jsx";
import Ribbons from "./components/Ribbons.jsx";
import Footer from "./components/Footer.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { Toaster } from "sonner";
import MobileHeader from "./components/MobileHeader.jsx";
import { GlobalState } from "./context/globalState.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GlobalState>
          <main className="bg-[#B2FFFF] p-[0.2vw]" style={{ backgroundAttachment: "fixed" }}>
            <TopHeader />
            <section className="bg-white rounded-md w-full max-w-[100vw] overflow-x-hidden">
              <Header />

              <Toaster />
              <App />
              <Footer />
            </section>
          </main>
        </GlobalState>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
