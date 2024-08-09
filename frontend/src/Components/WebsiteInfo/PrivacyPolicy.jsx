import React from "react";
import "./WebsiteInfo.css";

function PrivacyPolicy() {
  return (
    <div className="web-info-container flex-center flex-col pad-20 gap-20">
      <div className="web-info-block flex-center flex-col box-4 box-hover-2">
        <h1 className="web-info-head accent-1">Privacy Policy</h1>
      </div>

      <div className="web-info-block box-4 box-hover-2">
        <h2 className="web-info-head accent-1">
          Information Collection and Use
        </h2>
        <p className="web-info-para">
          At TradeConnect, we collect certain information when you use our
          platform. This includes personal data such as your name, email
          address, and usage patterns. We use this information to enhance our
          services, provide a better user experience, and communicate with you
          effectively.
        </p>
      </div>

      <div className="web-info-block box-4 box-hover-2">
        <h2 className="web-info-head accent-1">Cookies</h2>
        <p className="web-info-para">
          We use cookies to improve your browsing experience on TradeConnect.
          These small text files are stored on your device and help us analyze
          website traffic, personalize content, and remember your preferences.
          You can manage or disable cookies through your browser settings.
        </p>
      </div>

      <div className="web-info-block box-4 box-hover-2">
        <h2 className="web-info-head accent-1">Data Security</h2>
        <p className="web-info-para">
          We are committed to protecting your data. Your information is stored
          securely using industry-standard practices to prevent unauthorized
          access or disclosure. Despite our efforts, please be aware that no
          method of data transmission over the internet or electronic storage is
          completely secure.
        </p>
      </div>

      <div className="web-info-block box-4 box-hover-2">
        <h2 className="web-info-head accent-1">Third-Party Services</h2>
        <p className="web-info-para">
          TradeConnect may integrate with third-party services (e.g., analytics
          tools, advertising networks). These services have their own privacy
          policies, and we encourage you to review them. We are not responsible
          for the privacy practices of these third parties.
        </p>
      </div>

      <div className="web-info-block box-4 box-hover-2">
        <h2 className="web-info-head accent-1">Changes to Privacy Policy</h2>
        <p className="web-info-para">
          We may update our privacy policy from time to time. Any changes will
          be posted on this page. Your continued use of TradeConnect after any
          modifications signifies your acceptance of the updated policy.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
