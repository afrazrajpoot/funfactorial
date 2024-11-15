import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "./components/Loader";
import { Toaster } from "sonner";
import Success from "./pages/Success";
import AllProducts from "./pages/AllProducts";
import SearchProducts from "./pages/SearchProducts";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import PopUpForm from "./pages/PopUpForm";
import ReadSingleBlog from "./pages/ReadSingleBlog";
import Dashboard from "./pages/Dashboard";
import BlogPosts from "./components/dashboardItems/BlogPosts";
import AddProductInfo from "./components/dashboardItems/AddProductInfo";




// Lazy load the pages
const Home = lazy(() => import("./pages/Home"));
const Ribbons = lazy(() => import("./components/Ribbons"));
const DownloadParties = lazy(() => import("./pages/DownloadParties"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const About = lazy(() => import("./pages/About"));
const Faqs = lazy(() => import("./pages/Faqs"));
const Contact = lazy(() => import("./pages/Contact"));
const TermAndCondition = lazy(() => import("./pages/TermAndCondition"));
const Cancellations = lazy(() => import("./pages/Cancellations"));
const News2024 = lazy(() => import("./pages/News2024"));
const IndoorSoftPlay = lazy(() => import("./pages/IndoorSoftPlay"));
const ChrismisInflatables = lazy(() => import("./pages/ChrismisInflatables"));
const BouncyCastles = lazy(() => import("./pages/BouncyCastles"));
const DiscoDomes = lazy(() => import("./pages/DiscoDomes"));
const AsultCourse = lazy(() => import("./pages/AsultCourse"));
const BounceSlideCombo = lazy(() => import("./pages/BounceSlideCombo"));
const AdultCastles = lazy(() => import("./pages/AdultCastles"));
const SoftPlay = lazy(() => import("./pages/SoftPlay"));
const PartyAddOns = lazy(() => import("./pages/PartyAddOns"));
// const MusicAmps = lazy(() => import("./pages/MusicAmps"));
const InflatableGames = lazy(() => import("./pages/InflatableGames"));
const GeneratorHierSection = lazy(() => import("./pages/GeneratorHierSection"));
const PartyEntertainer = lazy(() => import("./pages/PartyEntertainer"));
const BookingForm = lazy(() => import("./pages/Booking"));
const Detail = lazy(() => import("./dynamicPages/Detail"));
const Admin = lazy(() => import("./pages/Admin"));
const CheckAvailibility = lazy(() => import("./pages/CheckAvailibility"));
const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Toaster />
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
        <Route path="/category/chrismis-inflatables" element={<ChrismisInflatables />} />
        <Route path="/category/bouncy-castles" element={<BouncyCastles />} />
        <Route path="/category/disco-domes" element={<DiscoDomes />} />
        <Route path="/category/asult-course" element={<AsultCourse />} />
        <Route path="/category/bounce-slide-combos" element={<BounceSlideCombo />} />
        <Route path="/category/adult-castles" element={<AdultCastles />} />
        <Route path="/category/soft-play" element={<SoftPlay />} />
        <Route path="/category/party-add-ons" element={<PartyAddOns />} />
        {/* <Route path="/category/music-amps" element={<MusicAmps />} /> */}
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/category/inflatable-games" element={<InflatableGames />} />
        <Route path="/category/generator-hier-section" element={<GeneratorHierSection />} />
        <Route path="/category/party-entertainer" element={<PartyEntertainer />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/:id" element={<Detail />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin" element ={<Admin />} />
        <Route path="/search-products" element={<SearchProducts />} />
        <Route path ='/login' element={<Login />} />
        <Route path="/check-availibility" element={<CheckAvailibility />} />
        <Route path={'/blogs'} element ={<Blogs />} />
        <Route path={'/create-blog'} element={<PopUpForm />} />
        <Route path='/update-blog/:keywords' element={<PopUpForm />} />
        <Route path="/blogs/:keywords" element={<ReadSingleBlog />} />
        <Route path="/add-product-info" element={<AddProductInfo />} />
        <Route path="/dashboard" element={<BlogPosts />} />
      </Routes>
    </Suspense>
  );
};

export default App;
