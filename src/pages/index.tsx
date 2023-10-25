import React from "react";
import Form from "../components/Form";
import Popup from "../components/Popup";
import Footer from "../components/Footer";
import MainContent from "../components/MainContent";
import ClientReview from "../components/ClientReview";
import Features from "../components/Features";
import AdditionalInformation1 from "../components/AdditionalDescription1";
import AdditionalInformation3 from "../components/AdditionalDescription3";

const LandingPage = () => {
  return (
    <>
      <div className="h-screen flex flex-col items-center md:justify-between bg-gray-50">
        <Popup />
        {/* check done */}
        <MainContent />
        {/* check done */}
        <AdditionalInformation1 /> {/* check done */}
        <Form />
        {/* check done */}
        <Features />
        {/* check done */}
        <AdditionalInformation3 />
        {/* check done */}
        <ClientReview /> {/* check done */}
        <Footer /> {/* check done */}
      </div>
    </>
  );
};

export default LandingPage;
