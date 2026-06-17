import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

const tableRows = [
  { name: 'Ramesh Sharma', amount: '₹2,340', date: 'Today', status: 'Paid', badgeClass: styles.badgePaid },
  { name: 'Sita Devi', amount: '₹890', date: 'Today', status: 'Pending', badgeClass: styles.badgePending },
  { name: 'Raju Gupta', amount: '₹1,200', date: 'Yesterday', status: 'Due', badgeClass: styles.badgeDue },
  { name: 'Priya Store', amount: '₹3,990', date: 'Yesterday', status: 'Paid', badgeClass: styles.badgePaid },
]

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}>
        <div className={styles.heroGrid}></div>
      </div>
      <div className={styles.heroLeft}>
        <div className={styles.heroBadge}>🇮🇳 &nbsp;Every Vyapari's Digital Partner</div>
        <h1 className={styles.heroTitle}>
          Billing, Inventory, Sales & Growth<br />
          <em>All in One Place</em>
        </h1>
        <p className={styles.heroSub}>Take your shop digital with B-Vyapari. Create bills, track customers, manage stock — all in one place, effortlessly simple.</p>
        <div className={styles.heroActions}>
          <Link to="/start-free" className={styles.btnHero}>
            <span>Get Started Now</span>
            <span>→</span>
          </Link>
          <a href="#how" className={styles.btnWatch}>
            <div className={styles.playIcon}>
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor"><path d="M1 1L9 6L1 11V1Z"/></svg>
            </div>
            Watch Demo
          </a>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.statItem}>
            <div className={styles.statNum}>50K+</div>
            <div className={styles.statLabel}>Active Vyaparis</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNum}>₹200Cr+</div>
            <div className={styles.statLabel}>Bills Generated</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNum}>99.9%</div>
            <div className={styles.statLabel}>Uptime</div>
          </div>
        </div>
      </div>
      <div className={styles.heroRight}>
        <div className={styles.appMockup}>
          <div className={styles.appTopbar}>
            <div className={`${styles.dot} ${styles.dotR}`}></div>
            <div className={`${styles.dot} ${styles.dotY}`}></div>
            <div className={`${styles.dot} ${styles.dotG}`}></div>
            <div className={styles.appTopbarTitle}>B-Vyapari Dashboard</div>
          </div>
          <div className={styles.appBody}>
            <div className={styles.appSidebar}>
              <div className={styles.appSidebarLogo}>B-<span>Vyapari</span></div>
              <div className={`${styles.sidebarItem} ${styles.active}`}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
                Dashboard
              </div>
              <div className={styles.sidebarItem}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4h12M2 8h12M2 12h8"/></svg>
                Bills
              </div>
              <div className={styles.sidebarItem}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="6" r="3"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>
                Customers
              </div>
              <div className={styles.sidebarItem}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 4h14v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm4-3h6"/></svg>
                Inventory
              </div>
              <div className={styles.sidebarItem}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="1,11 5,7 9,9 15,3"/></svg>
                Reports
              </div>
            </div>
            <div className={styles.appMain}>
              <div className={styles.appHeaderRow}>
                <div className={styles.appPageTitle}>Today's Dashboard</div>
                <button className={styles.newBillBtn}>+ New Bill</button>
              </div>
              <div className={styles.appMetricRow}>
                <div className={styles.metricCard}>
                  <div className={styles.metricCardLabel}>Today's Sales</div>
                  <div className={`${styles.metricCardVal} ${styles.green}`}>₹8,420</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricCardLabel}>Bills</div>
                  <div className={styles.metricCardVal}>24</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricCardLabel}>Pending</div>
                  <div className={`${styles.metricCardVal} ${styles.crimson}`}>₹1,200</div>
                </div>
              </div>
              <div className={styles.appTableHeader}>
                <span>Customer</span>
                <span>Amount</span>
                <span>Date</span>
                <span>Status</span>
              </div>
              {tableRows.map((row) => (
                <div key={row.name} className={styles.appTableRow}>
                  <span>{row.name}</span>
                  <span>{row.amount}</span>
                  <span>{row.date}</span>
                  <span><span className={`${styles.statusBadge} ${row.badgeClass}`}>{row.status}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
