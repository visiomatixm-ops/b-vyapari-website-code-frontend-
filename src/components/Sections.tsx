import { Link } from 'react-router-dom'
import styles from './Sections.module.css'

/* ── STATS BAND ── */
const stats = [
  { num: '50K+', label: 'Active Vyaparis' },
  { num: '₹200Cr+', label: 'Bills Generated' },
  { num: '99.9%', label: 'Uptime' },
  { num: '4.9★', label: 'Average Rating' },
]

export function StatsBand() {
  return (
    <div className={styles.statsBand}>
      <div className={styles.statsGrid}>
        {stats.map((s, i) => (
          <div key={s.label} className={`${styles.sbItem} rv ${i > 0 ? `rv-d${i}` : ''}`}>
            <div className={styles.sbNum}>{s.num}</div>
            <div className={styles.sbLabel}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── TESTIMONIALS ── */
const testimonials = [
  {
    text: 'Creating bills used to be such a headache. With B-Vyapari, a professional GST bill is ready in 2 minutes. Customers are happy and so are we!',
    name: 'Rajesh Singh',
    role: 'Retail Shop, Nagpur',
    initials: 'RS',
  },
  {
    text: "Stock tracking is now automatic. There used to be so much confusion. B-Vyapari truly digitised our shop. Excellent app.",
    name: 'Priya Devi',
    role: 'Clothing Store, Pune',
    initials: 'PD',
    delay: 'rv-d1',
  },
  {
    text: 'The reports showed us which products sell the most. Now we only stock those. Sales went up 30% in just 3 months. Thank you B-Vyapari!',
    name: 'Mohan Gupta',
    role: 'Electronics, Mumbai',
    initials: 'MG',
    delay: 'rv-d2',
  },
]

export function Testimonials() {
  return (
    <section className={`${styles.testimonials}`} id="testimonials">
      <p className={`${styles.sectionEyebrow} rv`}>What Our Vyaparis Say</p>
      <h2 className={`${styles.sectionTitle} rv`}>Their Words…</h2>
      <Link to="/reviews" className={`${styles.viewAllLink} rv`}>View All Reviews →</Link>
      <div className={styles.testimonialGrid}>
        {testimonials.map((t) => (
          <div key={t.name} className={`${styles.testimonialCard} rv ${t.delay || ''}`}>
            <div className={styles.starRow}>★★★★★</div>
            <span className={styles.quoteMark}>"</span>
            <p className={styles.testimonialText}>{t.text}</p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>{t.initials}</div>
              <div>
                <div className={styles.authorName}>{t.name}</div>
                <div className={styles.authorRole}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── PRICING ── */
interface Plan {
  name: string; amount: string; per: string;
  features: string[]; btnText: string; hot?: boolean;
}
const plans: Plan[] = [
  {
    name: 'Free',
    amount: '₹0',
    per: 'Free forever',
    features: ['50 Bills / Month', '100 Customers', 'Basic Stock', 'WhatsApp Share'],
    btnText: 'Get Started Free',
  },
  {
    name: 'Pro Vyapari',
    amount: '₹99',
    per: 'per month · most popular',
    hot: true,
    features: ['Unlimited Bills', 'Unlimited Customers', 'Advanced Inventory', 'Sales Reports', 'GST Filing Help'],
    btnText: 'Subscribe Now',
  },
  {
    name: 'Business',
    amount: '₹199',
    per: 'per month · full power',
    features: ['Everything in Pro', 'Multi-Branch', 'Staff Accounts (5)', 'Priority Support', 'API Access'],
    btnText: 'Start Business Plan',
  },
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 14 14" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="2,7 5,10 12,3" />
    </svg>
  )
}

export function Pricing() {
  return (
    <section className={`${styles.pricing}`} id="pricing">
      <p className={`${styles.sectionEyebrow} rv`}>Plans For Every Budget</p>
      <h2 className={`${styles.sectionTitle} rv`}>Simple, Clear Pricing</h2>
      <Link to="/pricing" className={`${styles.viewAllLink} rv`}>See Full Pricing Details →</Link>
      <div className={styles.pricingGrid}>
        {plans.map((p, i) => (
          <div key={p.name} className={`${styles.priceCard} ${p.hot ? styles.featured : ''} rv ${i > 0 ? `rv-d${i}` : ''}`}>
            <div className={styles.pricePlan}>{p.name}</div>
            <div className={styles.priceAmount}>{p.amount}</div>
            <div className={styles.pricePeriod}>{p.per}</div>
            <ul className={styles.priceFeatures}>
              {p.features.map((f) => (
                <li key={f}><CheckIcon />{f}</li>
              ))}
            </ul>
            <Link to="/start-free" className={styles.priceCta}>{p.btnText}</Link>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── CTA STRIP ── */
export function CTA() {
  return (
    <div className={styles.ctaStrip}>
      <h2 className={styles.ctaStripTitle}>Take Your Shop Digital Today</h2>
      <Link to="/start-free" className={styles.btnWhite}>Start Free Trial →</Link>
    </div>
  )
}

/* ── FOOTER ── */
const footerCols = [
  { title: 'Product', links: [['Features', '/features'], ['Pricing', '/pricing'], ['How It Works', '/how-it-works'], ['Reviews', '/reviews']] },
  { title: 'Account', links: [['Log In', '/login'], ['Start Free', '/start-free'], ['Help Center', '#'], ['WhatsApp Support', '#']] },
  { title: 'Company', links: [['About Us', '#'], ['Blog', '#'], ['Privacy Policy', '#'], ['Terms', '#']] },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>B-<span>Vyapari</span></div>
          <p className={styles.footerTagline}>Your trusted digital partner for billing, inventory, and business management — all in one place.</p>
          <div className={styles.footerContactList}>
            <div className={styles.footerContactItem}>
              <svg className={styles.footerContactIcon} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.5-2-4.5-4.5-4.5z"/>
                <circle cx="8" cy="6" r="1.5"/>
              </svg>
              <span>Office No. 2, Om Sai Apartment, Road, Nearby Hanuman Temple, Davkhar Nagar, Ganur, Chandvad, Maharashtra 423101</span>
            </div>
            <div className={styles.footerContactItem}>
              <svg className={styles.footerContactIcon} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M2 3h12a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1z"/>
                <polyline points="1,4 8,9.5 15,4"/>
              </svg>
              <a href="mailto:info@bvyapari.in" className={styles.footerContactLink}>info@bvyapari.in</a>
            </div>
            <div className={styles.footerContactItem}>
              <svg className={styles.footerContactIcon} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M2 2.5A1.5 1.5 0 013.5 1h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 010 1.414L6.5 5.414A11.042 11.042 0 009.586 8.5l1.293-1.207a1 1 0 011.414 0l1.414 1.414a1 1 0 010 1.414L12.5 11.414A1.5 1.5 0 0111 12.9a12.5 12.5 0 01-9.4-9.4A1.5 1.5 0 012 2.5z"/>
              </svg>
              <a href="tel:+919270271916" className={styles.footerContactLink}>+91 92702 71916</a>
            </div>
          </div>
        </div>
        {footerCols.map((col) => (
          <div key={col.title}>
            <div className={styles.footerColTitle}>{col.title}</div>
            <ul className={styles.footerLinks}>
              {col.links.map(([label, href]) => (
                <li key={label}>
                  {href.startsWith('/') ? <Link to={href}>{label}</Link> : <a href={href}>{label}</a>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomLogo}>B-VYAPARI</div>
        <div>© 2026 B-Vyapari. The smartest billing app for Indian businesses.</div>
        <div>Made with ❤️ for Indian Vyaparis</div>
      </div>
    </footer>
  )
}
