import React from 'react'
import styles from './PrivacyPolicySection.module.css';

const RefundPolicySection = () => {
  return (
    <section className={styles.privacyPolicySection} id="refundPolicy">
      <div className={styles.privacyContainer}>
        <div className="heading-design">
          <h1 className={styles.privacyHeading}>Cancellation & Refund Policy</h1>
        </div>

        <div className={styles.policyBody}>

          <div className={styles.policyContent} id="NoCancellation">
            <h3>No Cancellation Policy</h3>
            <p>
              TruckBilty does not offer cancellation of any subscription,
              service, or plan once the payment is successfully completed.
            </p>
          </div>

          <div className={styles.policyContent} id="NoRefund">
            <h3>No Refund Policy</h3>
            <p>
              All payments made towards TruckBilty subscriptions or services
              are strictly non-refundable.
            </p>
            <p>
              We do not provide refunds or credits for any partial usage,
              unused subscription period, or early termination.
            </p>
          </div>

          <div className={styles.policyContent} id="FailedTransactions">
            <h3>Failed or Duplicate Transactions</h3>
            <p>
              In case of failed or unsuccessful payment transactions, the
              amount is automatically refunded by the respective payment
              gateway as per their standard refund policies.
            </p>
            <p>
              TruckBilty does not manually process refunds for failed
              transactions once initiated by the payment gateway.
            </p>
          </div>

          <div className={styles.policyContent} id="Gateway">
            <h3>Payment Gateway Responsibility</h3>
            <p>
              All payment-related processing, refunds, and timelines are
              governed by the policies of the payment gateway service provider.
            </p>
            <p>
              Refund timelines may vary depending on banks, cards, or UPI
              providers.
            </p>
          </div>

          <div className={styles.policyContent} id="Changes">
            <h3>Policy Updates</h3>
            <p>
              TruckBilty reserves the right to modify this Cancellation and
              Refund Policy at any time without prior notice. Continued use
              of the platform implies acceptance of the updated policy.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default RefundPolicySection;
