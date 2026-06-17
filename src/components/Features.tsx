import styles from './Features.module.css'

interface Feature {
  num: string
  name: string
  desc: string
  iconPath: React.ReactNode
}

const features: Feature[] = [
  {
    num: '01',
    name: 'Bills & Invoices',
    desc: 'Create professional GST bills in seconds. Generate PDFs and send them directly to customers on WhatsApp.',
    iconPath: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
  },
  {
    num: '02',
    name: 'Customer Records',
    desc: 'View every customer\'s history, payment records, and contact details in one click.',
    iconPath: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
  },
  {
    num: '03',
    name: 'Stock Management',
    desc: 'Track your inventory. Get automatic alerts when stock is low — never be out of stock again.',
    iconPath: <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
  },
  {
    num: '04',
    name: 'Payment Tracking',
    desc: 'See exactly who owes what in real time. Track UPI, cash, and credit payments all in one dashboard.',
    iconPath: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></>,
  },
  {
    num: '05',
    name: 'Sales Reports',
    desc: 'Daily, monthly, and yearly sales reports — view your business performance clearly with graphs.',
    iconPath: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
  },
  {
    num: '06',
    name: 'Mobile App',
    desc: 'Available on both Android and iOS. Monitor your business anytime, anywhere — even outside the shop.',
    iconPath: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>,
  },
]

export default function Features() {
  return (
    <section className={styles.features} id="features">
      <p className={`${styles.sectionEyebrow} rv`}>What You Get</p>
      <h2 className={`${styles.sectionTitle} rv`}>One App, Your Entire Business</h2>
      <div className={styles.featuresGrid}>
        {features.map((f) => (
          <div key={f.num} className={`${styles.featureCard} rv`}>
            <div className={styles.featureNum}>{f.num}</div>
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 24 24">{f.iconPath}</svg>
            </div>
            <h3 className={styles.featureName}>{f.name}</h3>
            <p className={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
