"use client";

import { useState, useEffect, useRef } from "react";
import { Info, Shield, ShieldCheck, Lock, AlertTriangle, BookOpen, Cookie, ExternalLink, Mail } from "lucide-react";
import Link from "next/link";
import "./legal-content.css";

const SECTIONS = [
  { id: "information-we-collect", label: "Information We Collect", num: "01" },
  { id: "how-we-use-and-share-information", label: "How We Use & Share Information", num: "02" },
  { id: "how-we-protect-information", label: "How We Protect Information", num: "03" },
  { id: "data-retention-policy", label: "Data Retention Policy", num: "04" },
  { id: "your-rights", label: "Your Rights & Choices", num: "05" },
  { id: "links-to-other-websites", label: "Links to Other Websites", num: "06" },
  { id: "changes-to-privacy-policy", label: "Changes to Privacy Policy", num: "07" },
  { id: "contact-us", label: "Contact Us", num: "08" },
];

export default function PrivacyPolicyContent() {
  const [activeSection, setActiveSection] = useState("information-we-collect");
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        sectionRefs.current[id] = el;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  return (
    <section
      aria-labelledby="privacy-policy-heading"
      className="legal-content-section"
    >
      <h2 id="privacy-policy-heading" className="sr-only">
        Privacy Policy Sections
      </h2>

      <div className="legal-layout">
        {/* ══════════════════════════
            LEFT — Contents Navigation
            ══════════════════════════ */}
        <aside aria-label="Privacy policy contents navigation">
          <div className="legal-nav-card">
            <div className="legal-nav-header">
              <p className="legal-nav-title">Contents</p>
            </div>

            <nav aria-label="Jump to section">
              <ul className="legal-nav-list">
                {SECTIONS.map(({ id, label, num }) => (
                  <li key={id} className="legal-nav-item">
                    <a
                      href={`#${id}`}
                      onClick={scrollTo(id)}
                      className={`legal-nav-link${activeSection === id ? " active" : ""}`}
                      aria-current={activeSection === id ? "true" : undefined}
                    >
                      <span className="legal-nav-num">{num}</span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Privacy inquiry block */}
            <div className="legal-nav-contact">
              <span className="legal-nav-contact-label">Privacy inquiries</span>
              <a
                href="mailto:info@richmonks.in"
                className="legal-nav-contact-link"
              >
                info@richmonks.in
              </a>
            </div>
          </div>
        </aside>

        {/* ═══════════════════════════
            RIGHT — Legal Document Body
            ═══════════════════════════ */}
        <div className="legal-sections">

          {/* ── Document Preamble ── */}
          <div className="rounded-xl border border-[#c8d6e5] bg-[#f8fafc] p-6 shadow-xs">
            <p className="legal-intro">
              RichMonks is committed to maintaining robust privacy protections for its users.
            </p>
            <p className="legal-body">
              Our Privacy Policy (&ldquo;Privacy Policy&rdquo;) is designed to help you understand how we collect, use and safeguard the information you provide to us and to assist you in making informed decisions when using our Service.
            </p>
            <p className="legal-body">
              For purposes of this Agreement, &ldquo;Site&rdquo; refers to the Company&rsquo;s website, which can be accessed at <span className="font-medium text-[#1a2157]">www.richmonks.in</span> or through our mobile application (&ldquo;App&rdquo;) - RichMonks.
            </p>
            <p className="legal-body">
              &ldquo;Service&rdquo; refers to the Company&rsquo;s services accessed via the Site or App, in which users can view data analytics about specific Stock Markets in India.
            </p>
            <p className="legal-body">
              The terms &ldquo;company&rdquo;, &ldquo;we,&rdquo; &ldquo;us,&rdquo; and &ldquo;our&rdquo; refer to the Company, RichMonks. &ldquo;You&rdquo; refers to you, as a user of our Site or our Service.
            </p>
            <p className="legal-body">
              By accessing our Site or our Service, you accept our Privacy Policy and <Link href="/terms-of-use" className="legal-link">Terms of Use</Link>, and you consent to our collection, storage, use and disclosure of your Personal Information as described in this Privacy Policy.
            </p>
          </div>

          {/* ── SECTION 01: INFORMATION WE COLLECT ── */}
          <article id="information-we-collect" className="legal-section">
            <div className="legal-section-head">
              <span className="legal-section-num" aria-hidden="true">01</span>
              <h2 className="legal-section-title">I. Information We Collect</h2>
            </div>
            <span className="legal-section-divider" aria-hidden="true" />

            <p className="legal-intro">
              We collect &ldquo;Non-Personal Information&rdquo; and &ldquo;Personal Information.&rdquo;
            </p>
            <p className="legal-body">
              <strong>Non-Personal Information</strong> includes information that cannot be used to personally identify you, such as anonymous usage data, general demographic information we may collect, referring/exit pages and URLs, platform types, preferences you submit and preferences that are generated based on the data you submit and number of clicks.
            </p>
            <p className="legal-body">
              <strong>Personal Information</strong> includes your email which you submit to us through the registration process at the Site.
            </p>

            {/* Subsection (A) */}
            <div className="legal-subsection">
              <h3 className="legal-subsection-title">
                (A) Information collected via Technology
              </h3>
              <p className="legal-body">
                To activate the Service you do not need to submit any Personal Information other than your email address. To use the Service thereafter, you do need to submit further Personal Information, which may include: location, mobile number, etc. However, in an effort to improve the quality of the Service, we track information provided to us by your browser or by our software application when you view or use the Service, such as the website you came from (known as the &ldquo;referring URL&rdquo;), the type of browser you use, the device from which you connected to the Service, the time and date of access, and other information that does not personally identify you.
              </p>

              {/* Use of Cookies */}
              <h4 className="legal-subsubsection-title">
                Use of Cookies
              </h4>
              <p className="legal-body">
                We track this information using cookies, or small text files which include an anonymous unique identifier. Cookies are sent to a user&rsquo;s browser from our servers and are stored on the user&rsquo;s computer hard drive. Sending a cookie to a user&rsquo;s browser enables us to collect Non-Personal information about that user and keep a record of the user&rsquo;s preferences when utilizing our services, both on an individual and aggregate basis. The Company may use both persistent and session cookies; persistent cookies remain on your computer after you close your session and until you delete them, while session cookies expire when you close your browser.
              </p>

              {/* Cookie Types Grid */}
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-[#c8d6e5] bg-white p-4 shadow-xs">
                  <span className="font-body text-[0.8125rem] font-bold text-blue uppercase tracking-wider">a) Essential</span>
                  <p className="mt-1 mb-0 font-body text-[0.8125rem] leading-[1.65] text-[#3d4f6b]">
                    Essential for basic functionalities. Helps keep users logged in and remembers relevant session data.
                  </p>
                </div>
                <div className="rounded-lg border border-[#c8d6e5] bg-white p-4 shadow-xs">
                  <span className="font-body text-[0.8125rem] font-bold text-green uppercase tracking-wider">b) Insight</span>
                  <p className="mt-1 mb-0 font-body text-[0.8125rem] leading-[1.65] text-[#3d4f6b]">
                    Used for tracking user activities within the Service to continuously improve the user experience.
                  </p>
                </div>
                <div className="rounded-lg border border-[#c8d6e5] bg-white p-4 shadow-xs">
                  <span className="font-body text-[0.8125rem] font-bold text-[#1a2157] uppercase tracking-wider">c) Marketing</span>
                  <p className="mt-1 mb-0 font-body text-[0.8125rem] leading-[1.65] text-[#3d4f6b]">
                    Third-party cookies to analyze visitor trends. No intrusive personal data is collected.
                  </p>
                </div>
              </div>

              <p className="legal-body mt-4">
                <strong>a) Essential Cookies:</strong> These cookies are essential for the basic functionalities offered by the Service. These class of cookies helps in keeping a user logged in to the Service and remember relevant information when they return to the Service.
              </p>
              <p className="legal-body">
                <strong>b) Insight Cookies:</strong> These are used for tracking the user activities within the Service, which in turn helps us in improving your user experience.
              </p>
              <p className="legal-body">
                <strong>c) Marketing Cookies:</strong> We also use some marketing cookies provided by third parties to collect and analyse various information about the visitors to the RichMonks website and users of the service. No personal or intrusive information is collected in this process though.
              </p>

              <p className="legal-body mt-3">
                You have the choice of accepting or declining the use of cookies through your web browser. For more information on controlling cookie settings in your browser, please refer to the following methods:
              </p>

              <ul className="legal-bullet-list">
                <li>More information on &ldquo;Incognito&rdquo; mode and cookie setting in Google Chrome</li>
                <li>More information on &ldquo;InPrivate&rdquo; and cookie setting in IE</li>
                <li>More information on &ldquo;Private Browsing&rdquo; and cookie setting in FireFox</li>
                <li>More information on &ldquo;Private Browsing&rdquo; and cookies setting in Safari</li>
              </ul>

              <div className="legal-callout-blue" role="note">
                <Info size={16} strokeWidth={2} className="legal-callout-blue-icon" aria-hidden="true" />
                <p>
                  Please note that if you wish to turn off the cookies in your web browser, you might not be able to take advantage of many features of our Service.
                </p>
              </div>
            </div>

            {/* Subsection (B) */}
            <div className="legal-subsection">
              <h3 className="legal-subsection-title">
                (B) Information you provide us by registering for an account
              </h3>

              <p className="legal-body">
                <strong>(i) New User Registration:</strong> In addition to the information provided automatically by your browser when you visit the Site, to become a subscriber to the Service you will need to create a personal profile. You can create a profile by registering with the Service and entering your email address, and creating a user name and a password. By registering, you are authorizing us to collect, store and use your email address in accordance with this Privacy Policy.
              </p>

              <p className="legal-body">
                <strong>(ii) Social Login &amp; Third-Party Services:</strong> Registration can be done by supplying a unique email address and password, or by linking your Facebook or Google accounts. See below under &ldquo;From Other Sources&rdquo; for more information about linking your Facebook or Google Accounts.
              </p>
              <p className="legal-body">
                If you choose to link your social-media account or account relating to other third-party services to the our Services, you may be asking third parties to send us certain information from those social media accounts or services accounts, and you are authorizing us to collect, store, and use what they send us in accordance with this Privacy Policy. You can disassociate your registration from third-party accounts any time.
              </p>
              <p className="legal-body">
                In addition, we may provide Third Party Services&rsquo; interfaces or links on the Service to facilitate your sending a communication from the Service. For example, we may use third parties to facilitate e-mails, tweets, &ldquo;likes,&rdquo; content submissions or postings of comments on Facebook or other social media platforms. We may also enable access to or display of third party content via the Service, that is actually being served or published by the third party, and such third party may be collecting data from you in connection with that content. These third parties may collect and retain any information used or provided in any such communications or other activities and these third parties&rsquo; practices are not subject to our Privacy Policy.
              </p>
              <p className="legal-body">
                When you use Third Party Services, you are using their services and not our Service and they, not we, are responsible for their practices. You should review the applicable third party privacy policies before using such Third Party Services in connection with our Service.
              </p>

              <p className="legal-body">
                <strong>(iii) Contact With Our Call Centers:</strong> We collect personal information from you in non-digital contexts, including, for example, when you reach us over the phone or contact customer service over phone or/including communication channels such as WhatsApp, Facebook Messenger, Twitter, etc.
              </p>
            </div>

            {/* Subsection (C) */}
            <div className="legal-subsection">
              <h3 className="legal-subsection-title">
                (C) Information from Other Sources
              </h3>
              <p className="legal-body">
                We may use publicly available databases, including privately-held marketing and data analytics resources. For example, we may receive demographic information (age, gender, household income, job industry and job title) from these sources.
              </p>
            </div>

            {/* Subsection (D) */}
            <div className="legal-subsection">
              <h3 className="legal-subsection-title">
                (D) Children&rsquo;s Privacy
              </h3>
              <p className="legal-body">
                The Site and the Service are not directed to anyone under the age of 13. The Site does not knowingly collect or solicit information from anyone under the age of 13, or allow anyone under the age of 13 to sign up for the Service. In the event that we learn that we have gathered personal information from anyone under the age of 13 without the consent of a parent or guardian, we will delete that information as soon as possible. If you believe we have collected such information, please contact us at <a href="mailto:info@richmonks.in" className="legal-link">info@richmonks.in</a>.
              </p>
            </div>
          </article>

          {/* ── SECTION 02: HOW WE USE AND SHARE INFORMATION ── */}
          <article id="how-we-use-and-share-information" className="legal-section">
            <div className="legal-section-head">
              <span className="legal-section-num" aria-hidden="true">02</span>
              <h2 className="legal-section-title">II. How We Use and Share Information</h2>
            </div>
            <span className="legal-section-divider" aria-hidden="true" />

            <div className="legal-subsection">
              <h3 className="legal-subsection-title">
                (A) Personal Information:
              </h3>
              <p className="legal-body">
                Except as otherwise stated in this Privacy Policy, we do not sell, trade, rent or otherwise share for marketing purposes your Personal Information with third parties without your consent. We do share Personal Information with vendors who are performing services for the Company, such as the servers for our email communications who are provided access to user&rsquo;s email address for purposes of sending emails from us. Those vendors use your Personal Information only at our direction and in accordance with our Privacy Policy.
              </p>
              <p className="legal-body">
                We may share Personal Information with outside parties if we have a good-faith belief that access, use, preservation or disclosure of the information is reasonably necessary to meet any applicable legal process or enforceable governmental request; to enforce applicable Terms of Service, including investigation of potential violations; address fraud, security or technical concerns; or to protect against harm to the rights, property, or safety of our users or the public as required or permitted by law.
              </p>
            </div>

            <div className="legal-subsection">
              <h3 className="legal-subsection-title">
                (B) Non-Personal Information:
              </h3>
              <p className="legal-body">
                In general, we use Non-Personal Information to help us improve the Service and customize the user experience. We also aggregate Non-Personal Information in order to track trends and analyze use patterns on the Site. This Privacy Policy does not limit in any way our use or disclosure of Non-Personal Information and we reserve the right to use and disclose such Non-Personal Information to our partners, advertisers and other third parties at our discretion.
              </p>
              <p className="legal-body">
                In the event we undergo a business transaction such as a merger, acquisition by another company, or sale of all or a portion of our assets, your Personal Information may be among the assets transferred. You acknowledge and consent that such transfers may occur and are permitted by this Privacy Policy, and that any acquirer of our assets may continue to process your Personal Information as set forth in this Privacy Policy. If our information practices change at any time in the future, we will post the policy changes to the Site so that you may opt out of the new information practices. We suggest that you check the Site periodically if you are concerned about how your information is used.
              </p>
            </div>

            <div className="legal-subsection">
              <h3 className="legal-subsection-title">
                (C) Use of Analytics:
              </h3>
              <p className="legal-body">
                We share some of the collected information with third-party analytics tools in order to produce intelligent insights, detect &amp; remove fraudulent data, including spam, and offer better services. Our data sharing with such agencies is governed by GDPR &amp; other applicable industry regulations.
              </p>
            </div>
          </article>

          {/* ── SECTION 03: HOW WE PROTECT INFORMATION ── */}
          <article id="how-we-protect-information" className="legal-section">
            <div className="legal-section-head">
              <span className="legal-section-num" aria-hidden="true">03</span>
              <h2 className="legal-section-title">III. How We Protect Information</h2>
            </div>
            <span className="legal-section-divider" aria-hidden="true" />

            <p className="legal-intro">
              We implement security measures designed to protect your information from unauthorized access.
            </p>
            <p className="legal-body">
              Your account is protected by your account password and we urge you to take steps to keep your personal information safe by not disclosing your password and by logging out of your account after each use. We further protect your information from potential security breaches by implementing certain technological security measures including encryption, firewalls and secure socket layer technology. However, these measures do not guarantee that your information will not be accessed, disclosed, altered or destroyed by breach of such firewalls and secure server software. By using our Service, you acknowledge that you understand and agree to assume these risks.
            </p>

            <div className="legal-cards-grid">
              <div className="legal-card">
                <div className="legal-card-icon-box blue" aria-hidden="true">
                  <ShieldCheck size={18} strokeWidth={1.8} />
                </div>
                <h3 className="legal-card-title">Encryption &amp; Firewalls</h3>
                <p className="legal-card-body">
                  SSL technology and firewall protocols are implemented to safeguard data from unauthorized access.
                </p>
              </div>

              <div className="legal-card">
                <div className="legal-card-icon-box green" aria-hidden="true">
                  <Lock size={18} strokeWidth={1.8} />
                </div>
                <h3 className="legal-card-title">User Account Safety</h3>
                <p className="legal-card-body">
                  Individual account authentication ensures protected access to your personal preferences.
                </p>
              </div>
            </div>
          </article>

          {/* ── SECTION 04: DATA RETENTION POLICY ── */}
          <article id="data-retention-policy" className="legal-section">
            <div className="legal-section-head">
              <span className="legal-section-num" aria-hidden="true">04</span>
              <h2 className="legal-section-title">IV. Data Retention Policy</h2>
            </div>
            <span className="legal-section-divider" aria-hidden="true" />

            <p className="legal-intro">
              We retain your information as necessary to provide services and comply with legal requirements.
            </p>
            <p className="legal-body">
              We will retain your information for as long as your account is active or as needed by us to provide you services. We will retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </article>

          {/* ── SECTION 05: YOUR RIGHTS REGARDING THE USE OF YOUR PERSONAL INFORMATION ── */}
          <article id="your-rights" className="legal-section">
            <div className="legal-section-head">
              <span className="legal-section-num" aria-hidden="true">05</span>
              <h2 className="legal-section-title">V. Your Rights Regarding the Use of Your Personal Information</h2>
            </div>
            <span className="legal-section-divider" aria-hidden="true" />

            <p className="legal-intro">
              You have the right at any time to prevent us from contacting you for marketing purposes.
            </p>
            <p className="legal-body">
              When we send a promotional communication to a user, the user can opt out of further promotional communications by following the Unsubscribe instructions provided in each promotional email. You can also indicate that you do not wish to receive marketing communications from us in the opt-out page, i.e. &ldquo;Settings&rdquo; section of the App.
            </p>
            <p className="legal-body">
              Please note that notwithstanding the promotional preferences you indicate by either unsubscribing or opting out in the opt-out page, we may continue to send you account-related emails, administrative emails including, for example, periodic updates to our Privacy Policy.
            </p>
          </article>

          {/* ── SECTION 06: LINKS TO OTHER WEBSITES ── */}
          <article id="links-to-other-websites" className="legal-section">
            <div className="legal-section-head">
              <span className="legal-section-num" aria-hidden="true">06</span>
              <h2 className="legal-section-title">VI. Links to Other Websites</h2>
            </div>
            <span className="legal-section-divider" aria-hidden="true" />

            <p className="legal-intro">
              Our Service may contain links to or compatibility with third-party sites and services.
            </p>
            <p className="legal-body">
              As part of the Service, we may provide links to or compatibility with other websites or applications. However, we are not responsible for the privacy practices employed by those websites or the information or content they contain. This Privacy Policy applies solely to information collected by us through the Site and the Service. Therefore, this Privacy Policy does not apply to your use of a third party website accessed by selecting a link on our Site or via our Service.
            </p>
            <p className="legal-body">
              To the extent that you access or use the Service through or on another website or application, then the privacy policy of that other website or application will apply to your access or use of that site or application. We encourage our users to read the privacy statements of other websites before proceeding to use them.
            </p>
          </article>

          {/* ── SECTION 07: CHANGES TO OUR PRIVACY POLICY ── */}
          <article id="changes-to-privacy-policy" className="legal-section">
            <div className="legal-section-head">
              <span className="legal-section-num" aria-hidden="true">07</span>
              <h2 className="legal-section-title">VII. Changes to Our Privacy Policy</h2>
            </div>
            <span className="legal-section-divider" aria-hidden="true" />

            <p className="legal-intro">
              The Company reserves the right to change this policy and our Terms of Service at any time.
            </p>
            <p className="legal-body">
              We will notify you of significant changes to our Privacy Policy by sending a notice to the primary email address specified in your account or by placing a prominent notice on our site. Significant changes will go into effect immediately or within 2-3 business days following such notification. Non-material changes or clarifications will take effect immediately. You should periodically check the Site and this privacy page for updates.
            </p>
          </article>

          {/* ── SECTION 08: CONTACT US ── */}
          <article id="contact-us" className="legal-section">
            <div className="legal-section-head">
              <span className="legal-section-num" aria-hidden="true">08</span>
              <h2 className="legal-section-title">VIII. Contact Us</h2>
            </div>
            <span className="legal-section-divider" aria-hidden="true" />

            <p className="legal-intro">
              Have questions regarding our privacy practices?
            </p>
            <p className="legal-body">
              If you have any questions regarding this Privacy Policy or the practices of this Site, please contact us by sending an email to <a href="mailto:info@richmonks.in" className="legal-link font-semibold">info@richmonks.in</a>.
            </p>

            <div className="legal-callout-green" role="note">
              <Mail size={16} strokeWidth={2} className="legal-callout-green-icon" aria-hidden="true" />
              <p>
                Email inquiries are handled by our compliance team at <span className="font-semibold">info@richmonks.in</span>.
              </p>
            </div>
          </article>

          {/* ── ACCEPTANCE PANEL ── */}
          <div className="legal-acceptance" role="region" aria-label="Privacy policy acknowledgment">
            <div className="legal-acceptance-icon" aria-hidden="true">
              <BookOpen size={22} strokeWidth={1.6} />
            </div>

            <h2 className="legal-acceptance-title">Your Acknowledgment</h2>

            <p className="legal-acceptance-body">
              By accessing our Site or Service, you acknowledge and consent to our collection, storage, use, and disclosure of your Personal Information as outlined in this Privacy Policy.
            </p>

            <span className="legal-acceptance-divider" aria-hidden="true" />

            <p className="legal-acceptance-footer">
              © 2026 Richmonks. All rights reserved.&nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href="/terms-of-use">Terms of Use</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href="/contact">Contact Us</Link>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
