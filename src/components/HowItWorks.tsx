import styles from './HowItWorks.module.css'

const steps = [
  {
    num: '01',
    title: 'Create Your Account',
    desc: 'Sign up for free. All you need is your mobile number — takes less than a minute.',
  },
  {
    num: '02',
    title: 'Set Up Your Business',
    desc: 'Add your business details, products, and customers. A simple wizard guides you through the process.',
  },
  {
    num: '03',
    title: 'Start Billing',
    desc: 'Create your first bill and send it to your customer on WhatsApp. That\'s how simple B-Vyapari is!',
  },
]

const transactions = [
  { name: 'Priya Kapoor', date: 'Today, 3:22 PM', amt: '+₹890', cls: styles.txnPlus },
  { name: 'Mohan Lal', date: 'Today, 1:15 PM', amt: '+₹3,990', cls: styles.txnPlus },
  { name: 'Raju Retail', date: 'Yesterday, 11:00 AM', amt: '₹1,200 due', cls: styles.txnMinus },
]

export default function HowItWorks() {
  return (
    <section className={styles.how} id="how">
      <div className={styles.howGrid}>
        <div>
          <p className={`${styles.sectionEyebrow} rv`}>Simple Process</p>
          <h2 className={`${styles.sectionTitle} rv`}>Get Started in 3 Steps</h2>
          <div className="steps">
            {steps.map((s, i) => (
              <div key={s.num} className={`step-item ${styles.step}`} style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className={styles.stepNum}>{s.num}</div>
                <div className={styles.stepContent}>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rv">
          <div className={styles.phoneFrame}>
            <div className={styles.phoneScreen}>
              <div className={styles.phoneNotch}><div className={styles.notchPill}></div></div>
              <div className={styles.phoneContent}>
                <div className={styles.phoneHeader}>
                  <div>
                    <div className={styles.phoneGreeting}>Welcome 👋</div>
                    <div className={styles.phoneUsername}>Ramesh Ji</div>
                  </div>
                  <div className={styles.phoneAvatar}>RJ</div>
                </div>
                <div className={styles.phoneBalance}>
                  <div className={styles.pbLabel}>Today's Earnings</div>
                  <div className={styles.pbAmount}>₹8,420</div>
                  <div className={styles.pbSub}>↑ 12% more than yesterday</div>
                </div>
                <div className={styles.phoneQuick}>
                  <div className={styles.quickBtn}>
                    <div className={styles.quickBtnIcon}>📄</div>
                    <div className={styles.quickBtnLabel}>New Bill</div>
                  </div>
                  <div className={styles.quickBtn}>
                    <div className={styles.quickBtnIcon}>👥</div>
                    <div className={styles.quickBtnLabel}>Customers</div>
                  </div>
                  <div className={styles.quickBtn}>
                    <div className={styles.quickBtnIcon}>📦</div>
                    <div className={styles.quickBtnLabel}>Stock</div>
                  </div>
                  <div className={styles.quickBtn}>
                    <div className={styles.quickBtnIcon}>📊</div>
                    <div className={styles.quickBtnLabel}>Reports</div>
                  </div>
                </div>
                <div className={styles.phoneRecentTitle}>Recent Bills</div>
                {transactions.map((t) => (
                  <div key={t.name} className={styles.phoneTxn}>
                    <div>
                      <div className={styles.txnName}>{t.name}</div>
                      <div className={styles.txnDate}>{t.date}</div>
                    </div>
                    <div className={`${styles.txnAmt} ${t.cls}`}>{t.amt}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
