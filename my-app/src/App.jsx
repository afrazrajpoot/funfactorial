import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Ribbons from "./components/Ribbons";
import DownloadParties from "./pages/DownloadParties";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import About from "./pages/About";
import Faqs from "./pages/Faqs";
import Contact from "./pages/Contact";
import TermAndCondition from "./pages/TermAndCondition";
import Cancellations from "./pages/Cancellations";
import News2024 from "./pages/News2024";
import IndoorSoftPlay from "./pages/IndoorSoftPlay";
import ChrismisInflatables from "./pages/ChrismisInflatables";
import BouncyCastles from "./pages/BouncyCastles";
import DiscoDomes from "./pages/DiscoDomes";
import AsultCourse from "./pages/AsultCourse";
import BounceSlideCombo from "./pages/BounceSlideCombo";
import AdultCastles from "./pages/AdultCastles";
import SoftPlay from "./pages/SoftPlay";
import PartyAddOns from "./pages/PartyAddOns";
import MusicAmps from "./pages/MusicAmps";
import InflatableGames from "./pages/InflatableGames";
import GeneratorHierSection from "./pages/GeneratorHierSection";
import PartyEntertainer from "./pages/PartyEntertainer";
import BookingForm from "./pages/Booking";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/downloadParty" element={<DownloadParties />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/termandcondition" element={<TermAndCondition />} />
        <Route path="/cancellation" element={<Cancellations />} />
        <Route path="/category/news-2024" element={<News2024 />} />

        <Route path="/category/indoor-soft-play" element={<IndoorSoftPlay />} />
        <Route
          path="/category/chrismis-inflatables"
          element={<ChrismisInflatables />}
        />
        <Route path="/category/bouncy-castles" element={<BouncyCastles />} />
        <Route path="/category/disco-domes" element={<DiscoDomes />} />
        <Route path="/category/asult-course" element={<AsultCourse />} />
        <Route
          path="/category/bounce-slide-combos"
          element={<BounceSlideCombo />}
        />
        <Route path="/category/adult-castles" element={<AdultCastles />} />
        <Route path="/category/soft-play" element={<SoftPlay />} />
        <Route path="/category/party-add-ons" element={<PartyAddOns />} />
        <Route path="/category/music-amps" element={<MusicAmps />} />
        <Route
          path="/category/inflatable-games"
          element={<InflatableGames />}
        />
        <Route
          path="/category/generator-hier-section"
          element={<GeneratorHierSection />}
        />
        <Route
          path="/category/party-entertainer"
          element={<PartyEntertainer />}
        />
        <Route path="/booking" element={<BookingForm />} />
      </Routes>
    </>
  );
};

export default App;
