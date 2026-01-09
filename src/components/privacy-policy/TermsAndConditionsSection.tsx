import React from 'react'
import styles from './PrivacyPolicySection.module.css';

const TermsAndConditionsSection = () => {
  return (
    <section className={styles.privacyPolicySection} id="termsConditions">
      <div className={styles.privacyContainer}>
        <div className="heading-design">
          <h1 className={styles.privacyHeading}>Terms & Conditions</h1>
          <p><strong>Last Updated:</strong> December 23, 2025</p>
        </div>

        <div className={styles.policyBody}>

          <div className={styles.policyContent}>
            <h3>1. Introduction and Acceptance</h3>
            <p>
              Welcome to <strong>TruckBilty</strong> ("Platform"), provided by
              <strong> TruckBilty LLP</strong> ("Company", "We", "Us", or "Our").
            </p>
            <p>
              By accessing our mobile application, website
              (<strong>https://www.truckbilty.com</strong>), web application
              (<strong>https://app.truckbilty.com</strong>), or using our services
              to generate <strong>Lorry Receipts (LR)</strong>, Consignment Notes,
              Cash Memo, Credit Memo, Collection Memo, Balance Memo or manage
              transport logistics, you ("User", "You") agree to be bound by these
              <strong> Terms and Conditions</strong>.
            </p>
            <p>
              If you do not agree with any part of these Terms, you must
              immediately discontinue the use of <strong>TruckBilty</strong>.
            </p>
          </div>

          <div className={styles.policyContent}>
            <h3>2. Definitions</h3>
            <ul>
              <li><strong>Platform</strong> refers to the TruckBilty mobile app, website, web app, and backend APIs.</li>
              <li><strong>Services</strong> include digital generation of transport documents, data storage, and subscriptions.</li>
              <li><strong>Subscriber</strong> means a user who has purchased a paid membership.</li>
              <li><strong>Generated Documents</strong> means PDFs, images, or digital transport records created on the Platform.</li>
            </ul>
          </div>

          <div className={styles.policyContent}>
            <h3>3. User Accounts and Security</h3>
            <ul>
              <li><strong>Eligibility:</strong> You must be at least 18 years old under Indian law.</li>
              <li><strong>Account Integrity:</strong> You must provide accurate Name, Transport Company Name, GST, and Phone Number.</li>
              <li><strong>Credential Security:</strong> You are responsible for OTP/password confidentiality.</li>
              <li><strong>One Account Policy:</strong> Multiple accounts to abuse offers are prohibited.</li>
            </ul>
          </div>

          <div className={styles.policyContent}>
            <h3>4. Use of Services and Liabilities</h3>
            <p><strong>TruckBilty is a SaaS platform only.</strong> We are not a
              transporter, Goods Transport Agency (GTA), or insurance provider.
            </p>
            <p>
              <strong>User Responsibility:</strong> All Bilty/LR details are
              entered by the user. TruckBilty does not verify goods, value, or
              GST data.
            </p>
            <p>
              <strong>Legal Compliance:</strong> Users are solely responsible
              for compliance with GST Act, Motor Vehicles Act, and other laws.
            </p>
          </div>

          <div className={styles.policyContent}>
            <h3>4.3 Disclaimer (RTO / Police / GST)</h3>
            <ul>
              <li>No liability for penalties, seizure, or detention.</li>
              <li>No guarantee of Bilty validity if user data is incorrect.</li>
              <li>No responsibility for E-Way Bill mismatches.</li>
            </ul>
          </div>

          <div className={styles.policyContent}>
            <h3>5. Subscription and Payments</h3>
            <ul>
              <li><strong>Paid Membership:</strong> Some features require subscription.</li>
              <li><strong>Non-Refundable:</strong> All fees are non-refundable.</li>
              <li><strong>Pricing Changes:</strong> Prices may change for future cycles.</li>
            </ul>
          </div>

          <div className={styles.policyContent}>
            <h3>6. Referral Program (Refer & Earn)</h3>
            <ul>
              <li>Only new users are eligible.</li>
              <li>Rewards are credited after successful actions.</li>
              <li>Fraud, self-referrals, bots lead to bans.</li>
              <li>Bonuses are non-withdrawable unless stated.</li>
            </ul>
          </div>

          <div className={styles.policyContent}>
            <h3>7. Intellectual Property Rights</h3>
            <p>
              All software, designs, and the <strong>TruckBilty</strong> brand
              belong exclusively to <strong>TruckBilty LLP</strong>.
            </p>
          </div>

          <div className={styles.policyContent}>
            <h3>8. Prohibited Activities</h3>
            <ul>
              <li>Fraudulent or illegal Bilty generation</li>
              <li>Tax evasion</li>
              <li>Data scraping or hacking</li>
              <li>Uploading malicious code</li>
            </ul>
          </div>

          <div className={styles.policyContent}>
            <h3>9. Limitation of Liability</h3>
            <p>
              <strong>No indirect or consequential damages.</strong>
            </p>
            <p>
              <strong>Maximum liability</strong> shall not exceed the amount paid
              by the user in the last <strong>3 months</strong>.
            </p>
          </div>

          <div className={styles.policyContent}>
            <h3>10. Termination</h3>
            <p>
              TruckBilty may suspend or terminate accounts for violations,
              fraud, or non-payment without notice.
            </p>
          </div>

          <div className={styles.policyContent}>
            <h3>11. Governing Law & Jurisdiction</h3>
            <p>
              Governed by <strong>Indian Law</strong>.
              Exclusive jurisdiction: <strong>Ahmedabad, Gujarat</strong>.
            </p>
          </div>

          <div className={styles.policyContent}>
            <h3>12. Changes to Terms</h3>
            <p>
              Continued use of TruckBilty after updates constitutes acceptance.
            </p>
          </div>

          <div className={styles.policyContent}>
            <h3>13. Contact Us</h3>
            <p><strong>Company:</strong> TruckBilty LLP</p>
            <p><strong>Address:</strong> 916, City Centre 2, Science City Rd, near CIMS Hospital, Sola, Ahmedabad – 380060</p>
            <p><strong>Email:</strong> support@truckbilty.com</p>
            <p><strong>Phone:</strong> <a href="tel:++919998060916">+91 9998060916</a></p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default TermsAndConditionsSection;
