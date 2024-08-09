import React from 'react';
import "./WebsiteInfo.css";

function TermsAndConditions() {
    return (
      <div className="web-info-container flex-center flex-col pad-20 gap-20">
        <div className="web-info-block flex-center flex-col box-4 box-hover-2">
          <h1 className="web-info-head accent-1">Terms and Conditions</h1>
        </div>

        <div className="web-info-block box-4 box-hover-2">
          <h2 className="web-info-head accent-1">Acceptance of Terms</h2>
          <p className="web-info-para">
            By accessing and using TradeConnect, you agree to comply with these
            terms and conditions. If you do not agree, please refrain from using
            the platform.
          </p>
        </div>
        <div className="web-info-block box-4 box-hover-2">
          <h2 className="web-info-head accent-1">Intellectual Property</h2>
          <p className="web-info-para">
            All content on TradeConnect, including text, images, logos, and
            trademarks, is protected by intellectual property laws. You may not
            reproduce, distribute, or modify any content without prior written
            permission.
          </p>
        </div>
        <div className="web-info-block box-4 box-hover-2">
          <h2 className="web-info-head accent-1">User Conduct</h2>
          <p className="web-info-para">
            Users must not engage in any unlawful or harmful activities on
            TradeConnect. Respect other users and refrain from offensive,
            abusive, or harmful behavior. Do not attempt to hack, disrupt, or
            interfere with the platform’s functionality.
          </p>
        </div>
        <div className="web-info-block box-4 box-hover-2">
          <h2 className="web-info-head accent-1">Privacy Policy</h2>
          <p className="web-info-para">
            Please refer to our separate&nbsp;
            <a href="/privacy">Privacy Policy</a>&nbsp;for details on how we
            collect, use, and protect your personal information.
          </p>
        </div>
        <div className="web-info-block box-4 box-hover-2">
          <h2 className="web-info-head accent-1">Disclaimer</h2>
          <p className="web-info-para">
            The information provided on TradeConnect is for general purposes
            only and does not constitute professional advice. We do not
            guarantee the accuracy, completeness, or reliability of the content.
          </p>
        </div>
        <div className="web-info-block box-4 box-hover-2">
          <h2 className="web-info-head accent-1">Limitation of Liability</h2>
          <p className="web-info-para">
            TradeConnect is not liable for any direct, indirect, incidental,
            consequential, or punitive damages arising from your use of the
            platform. This includes, but is not limited to, loss of data,
            profits, or business interruption. We recommend that you regularly
            back up your data and exercise caution while using our services.
          </p>
        </div>
        <div className="web-info-block box-4 box-hover-2">
          <h2 className="web-info-head accent-1">
            Links to Third-Party Websites
          </h2>
          <p className="web-info-para">
            TradeConnect may contain links to external sites. We do not endorse
            or control the content on these third-party websites. Use them at
            your own risk, and review their terms and privacy policies.
          </p>
        </div>
        <div className="web-info-block box-4 box-hover-2">
          <h2 className="web-info-head accent-1">Modifications to Terms</h2>
          <p className="web-info-para">
            We reserve the right to update or modify these terms and conditions
            without prior notice. Any changes will be effective immediately upon
            posting on the platform.
          </p>
        </div>
        <div className="web-info-block box-4 box-hover-2">
          <h2 className="web-info-head accent-1">Governing Law</h2>
          <p className="web-info-para">
            These terms are governed by the laws of the jurisdiction in which
            TradeConnect operates. Any disputes shall be resolved in the
            appropriate courts within this jurisdiction.
          </p>
        </div>
      </div>
    );
}

export default TermsAndConditions
