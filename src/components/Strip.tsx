import styles from './Strip.module.css'

const items = ['GST Billing', 'Inventory Management', 'Payment Tracking', 'Sales Reports', 'WhatsApp Integration', 'Multi-Branch', 'Cloud Sync', 'UPI Payments']

export default function Strip() {
  return (
    <div className={styles.strip}>
      <div className={styles.stripInner}>
        {items.map((item) => (
          <span key={`orig-${item}`} className={styles.stripItemWrap}>
            <span className={styles.stripItem}>{item}</span>
            <span className={styles.stripSep} />
          </span>
        ))}
      </div>
      <div className={styles.stripInner} aria-hidden="true">
        {items.map((item) => (
          <span key={`clone-${item}`} className={styles.stripItemWrap}>
            <span className={styles.stripItem}>{item}</span>
            <span className={styles.stripSep} />
          </span>
        ))}
      </div>
    </div>
  )
}
