import React from 'react'
import styles from './Strip.module.css'

const items = [
  'GST Billing',
  'Inventory Management',
  'Payment Tracking',
  'Sales Reports',
  'WhatsApp Integration',
  'Multi-Branch',
  'Cloud Sync',
  'UPI Payments'
]

export default function Strip() {
  return (
    <div className={styles.strip}>
      <div className={styles.stripInner}>
        {items.map((item) => (
          <React.Fragment key={item}>
            <span className={styles.stripItem}>{item}</span>
            <span className={styles.stripSep} />
          </React.Fragment>
        ))}
      </div>
      <div className={styles.stripInner} aria-hidden="true">
        {items.map((item) => (
          <React.Fragment key={`${item}-dup`}>
            <span className={styles.stripItem}>{item}</span>
            <span className={styles.stripSep} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
