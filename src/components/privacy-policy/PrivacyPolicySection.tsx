import React from 'react'
import styles from './PrivacyPolicySection.module.css';

const PrivacyPolicySection = () => {
  return (
    <section className={styles.privacyPolicySection} id="privacyPolicy">
      <div className={styles.privacyContainer}>
        <div className="heading-design">
          <h1 className={styles.privacyHeading}>Privacy Policy</h1>
        </div>

        <div className={styles.policyBody}>

          <div className={styles.policyContent} id="Collection">
            <h3>Collection And Use Of Information</h3>
            <p>
              TruckBilty collects information such as company name, user name,
              mobile number, email address, GST details, vehicle information,
              driver details, bilty records, and payment-related data.
            </p>
            <p>
              This information is collected when you register, generate bilties,
              manage consignments, make payments, or interact with our platform.
            </p>
          </div>

          <div className={styles.policyContent} id="Purpose">
            <h3>Purpose Of Data Collection</h3>
            <ul>
              <li>Generating and managing digital truck bilties</li>
              <li>Tracking consignments and transport records</li>
              <li>Managing customers, vehicles, and drivers</li>
              <li>Improving platform performance and user experience</li>
              <li>Legal, accounting, and compliance requirements</li>
            </ul>
          </div>

          <div className={styles.policyContent} id="Cookies">
            <h3>Cookies & Tracking</h3>
            <p>
              TruckBilty uses cookies to maintain login sessions, improve
              performance, and understand usage behavior.
            </p>
            <p>
              You can control cookies through browser settings, but disabling
              them may affect some platform features.
            </p>
          </div>

          <div className={styles.policyContent} id="ThirdParty">
            <h3>Third-Party Services</h3>
            <p>
              We may integrate with third-party services such as SMS providers,
              payment gateways, analytics tools, and cloud storage services.
              These providers only receive data necessary to perform their
              services.
            </p>
          </div>

          <div className={styles.policyContent} id="Sharing">
            <h3>Information Sharing</h3>
            <p>
              TruckBilty does not sell your data. Information may be shared only
              with authorized partners required for operational functionality
              and legal compliance.
            </p>
          </div>

          <div className={styles.policyContent} id="Marketing">
            <h3>Communication & Notifications</h3>
            <p>
              We may send system alerts, service updates, feature announcements,
              or billing notifications. You can opt out of promotional messages
              at any time.
            </p>
          </div>

          <div className={styles.policyContent} id="Security">
            <h3>Data Protection & Security</h3>
            <p>
              TruckBilty uses industry-standard security practices including
              encrypted APIs, secure authentication, role-based access, and
              protected servers to safeguard your data.
            </p>
          </div>

          <div className={styles.policyContent} id="IPR">
            <h3>Intellectual Property</h3>
            <p>
              All software, UI designs, logos, and content of TruckBilty are
              protected intellectual property. Unauthorized use is strictly
              prohibited.
            </p>
          </div>

          <div className={styles.policyContent} id="Authenticity">
            <h3>User Responsibility</h3>
            <p>
              Users are responsible for providing accurate transport, vehicle,
              and billing information. TruckBilty is not liable for issues caused
              by incorrect data.
            </p>
          </div>

          <div className={styles.policyContent} id="Changes">
            <h3>Policy Updates</h3>
            <p>
              This Privacy Policy may be updated periodically. Continued use of
              TruckBilty indicates acceptance of the revised policy.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicySection;
