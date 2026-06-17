import styles from './Strip.module.css'

const items = ['GST Billing', 'Inventory Management', 'Payment Tracking', 'Sales Reports', 'WhatsApp Integration', 'Multi-Branch', 'Cloud Sync', 'UPI Payments']

export default function Strip() {
  return (
    <div className={styles.strip}>
      <div className={styles.stripInner}>
        {items.map((item, i) => (
          <span key={item}>
            <span className={styles.stripItem}>{item}</span>
            {i < items.length - 1 && <span className={styles.stripSep} />}
          </span>
        ))}
      </div>
    </div>
  )
}
