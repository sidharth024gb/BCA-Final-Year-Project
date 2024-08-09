import React from "react";
import "./WebsiteInfo.css";

function Aboutus() {
  return (
    <div className="web-info-container flex-center flex-col pad-20 gap-20">
      <div className="web-info-block flex-center flex-col box-4 box-hover-2">
        <h1 className="web-info-head accent-1">About TradeConnect</h1>
        <p className="web-info-para ind-remove">
          Welcome to TradeConnect, your trusted partner in peer-to-peer
          marketplace innovation! 🔗
        </p>
      </div>

      <div className="web-info-block box-4 box-hover-2">
        <h2 className="web-info-head accent-1">Our Story</h2>
        <p className="web-info-para">
          Founded with the vision of connecting individuals in a dynamic online
          marketplace, TradeConnect emerged as a solution to bridge the gap
          between buyers and sellers. Our journey began when a group of
          passionate entrepreneurs saw the potential of harnessing technology to
          create a platform that empowers users to trade goods and services
          directly with one another. From humble beginnings, we've grown into a
          community-driven marketplace that prioritizes trust, transparency, and
          seamless transactions.
        </p>
      </div>
      <div className="web-info-block box-4 box-hover-2">
        <h2 className="web-info-head accent-1">Today's Marketplace</h2>
        <p className="web-info-para">
          Today, TradeConnect stands as a leading platform in the peer-to-peer
          marketplace space. We offer a wide range of products and services,
          catering to diverse needs and preferences. Our platform is designed to
          facilitate effortless trading experiences, enabling users to discover
          unique items, negotiate deals, and build lasting connections. With
          thousands of active users and a robust network of traders,
          TradeConnect continues to redefine online commerce.
        </p>
      </div>
      <div className="web-info-block box-4 box-hover-2">
        <h2 className="web-info-head accent-1">Our Mission</h2>
        <p className="web-info-para">
          At TradeConnect, our mission is to empower individuals to engage in
          meaningful trade, fostering economic growth and personal connections.
          We strive to provide a secure and user-friendly environment where
          people can confidently buy, sell, and exchange goods and services.
        </p>
      </div>
      <div className="web-info-block box-4 box-hover-2">
        <h2 className="web-info-head accent-1">Our Vision</h2>
        <p className="web-info-para">
          We envision a world where trade is not limited by geographical
          boundaries, and individuals have the freedom to access markets
          globally. Our goal is to become the go-to platform for peer-to-peer
          commerce, renowned for our innovation, community engagement, and
          commitment to customer satisfaction.
        </p>
      </div>
      <div className="web-info-block box-4 box-hover-2">
        <h2 className="web-info-head accent-1">Passion for Community</h2>
        <p className="web-info-para">
          At TradeConnect, we believe in the power of community. Our platform is
          built on the foundation of trust and collaboration, where users can
          share their experiences, learn from each other, and grow together. We
          are passionate about fostering a vibrant marketplace where everyone
          can thrive.
        </p>
      </div>
    </div>
  );
}

export default Aboutus;
