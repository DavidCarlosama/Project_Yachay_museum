import Head from "next/head";

import Navbar from "../components/navbar";
import SectionTitle from "../components/AbouTitle";

import { benefitOne, benefitTwo } from "../components/About_data";
import Video from "../components/video";
import Benefits from "../components/benefits";
import Footer from "../components/footer";
import Testimonials from "../components/testimonials";
import Faq from "../components/faq";
import PopupWidget from "../components/popupWidget";
import About from "../components/About";

const History = () => {
  return (
    <>
      <Head>
        <title>Yachay Archaeological Museum</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <About />

      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />
      
            
      <Footer />
      <PopupWidget />
    </>
  );
}

export default History;