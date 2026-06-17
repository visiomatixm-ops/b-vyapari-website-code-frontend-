import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './StartFreePage.module.css'

const benefits = [
  '50 free invoices every month, forever',
  'GST-ready billing in Hindi & English',
  'WhatsApp invoice sharing in 1 tap',
  'Real-time inventory & stock alerts',
  'Works on mobile, tablet & desktop',
  'Cancel anytime, no lock-in',
]

export default function StartFreePage() {
  useEffect(() => {
    document.title = 'Start Free — Create Your B-Vyapari Billing Account'
    const desc = document.querySelector('meta[name="description"]')
    if (desc) {
      desc.setAttribute('content', 'Sign up for the free Starter plan of B-Vyapari. No credit card required. Start creating professional invoices and tracking payments today.')
    }
  }, [])

  const [step, setStep] = useState(1)
  const [plan, setPlan] = useState<'starter' | 'pro'>('starter')
  const [firstName, setFirstName] = useState('')
  const [complete, setComplete] = useState(false)

  return (
    <main className={styles.page}>
      <div className={styles.leftPanel}>
        <div className={styles.leftBg} />
        <div className={styles.leftOrb} />
        <div className={styles.leftInner}>
          <div className={styles.leftTag}><span />Free · No Credit Card · 5 Min Setup</div>
          <h1 className={styles.leftTitle}>Your Shop.<br /><em>Digital.</em><br /><span>Today.</span></h1>
          <p className={styles.leftSub}>Join <strong>50,000+ Indian businesses</strong> that already manage invoices, inventory, and customers with B-Vyapari, India's most loved billing platform.</p>
          <div className={styles.socialProof}>
            <div className={styles.avatars}>{['RS', 'PD', 'MG', 'AK', 'SK'].map((name) => <b key={name}>{name}</b>)}</div>
            <div className={styles.stars}>★★★★★</div>
            <p><strong>4.9/5</strong> from 12,000+ reviews on Google & App Store</p>
          </div>
          <div className={styles.benefitList}>
            {benefits.map((benefit) => <div className={styles.benefit} key={benefit}>✓ {benefit}</div>)}
          </div>
        </div>
      </div>

      <section className={styles.rightPanel}>
        <div className={styles.formWrap}>
          <div className={styles.topRow}>
            <Link to="/" className={styles.backBtn}>← Back to Home</Link>
          </div>

          <div className={styles.stepBar}>
            {[1, 2, 3].map((item) => (
              <div key={item} className={styles.stepItem}>
                <span className={`${styles.stepNum} ${step === item ? styles.active : ''} ${step > item || complete ? styles.done : ''}`}>{step > item || complete ? '✓' : item}</span>
                {item < 3 && <i />}
              </div>
            ))}
          </div>

          {!complete && step === 1 && (
            <form className={styles.form} onSubmit={(event) => { event.preventDefault(); setStep(2) }}>
              <h2>Create Your Account</h2>
              <p>Already have one? <Link to="/login">Log in here</Link></p>
              <button type="button" className={styles.googleBtn} onClick={() => window.location.href = 'https://accounts.google.com'}>Continue with Google</button>
              <div className={styles.fieldGroup}>
                <label><span>First Name</span><input value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Ramesh" /></label>
                <label><span>Last Name</span><input placeholder="Sharma" /></label>
              </div>
              <label><span>Email Address</span><input type="email" placeholder="ramesh@yourshop.com" /></label>
              <label><span>Mobile Number</span><input type="tel" placeholder="+91 98765 43210" /></label>
              <label><span>Password</span><input type="password" placeholder="Min. 8 characters" /></label>
              <button className={styles.nextBtn} type="submit">Continue →</button>
              <small>By continuing you agree to our Terms of Service and Privacy Policy.</small>
            </form>
          )}

          {!complete && step === 2 && (
            <form className={styles.form} onSubmit={(event) => { event.preventDefault(); setStep(3) }}>
              <h2>Your Business Details</h2>
              <p>This helps us personalise your experience.</p>
              <label><span>Business / Shop Name</span><input placeholder="Sharma General Store" /></label>
              <label><span>Business Type</span><select><option>Retail / General Store</option><option>Clothing & Textile</option><option>Electronics</option><option>Pharmacy / Medical</option><option>Other</option></select></label>
              <div className={styles.fieldGroup}>
                <label><span>City</span><input placeholder="Pune" /></label>
                <label><span>State</span><select><option>Maharashtra</option><option>Gujarat</option><option>Karnataka</option><option>Other</option></select></label>
              </div>
              <label><span>GSTIN (Optional)</span><input placeholder="22AAAAA0000A1Z5" /></label>
              <div className={styles.btnRow}><button type="button" onClick={() => setStep(1)}>Back</button><button className={styles.nextBtn} type="submit">Continue →</button></div>
            </form>
          )}

          {!complete && step === 3 && (
            <form className={styles.form} onSubmit={(event) => { event.preventDefault(); setComplete(true) }}>
              <h2>Choose Your Plan</h2>
              <p>Start free. Upgrade anytime.</p>
              <div className={styles.planSelector}>
                <label className={`${styles.planOpt} ${plan === 'starter' ? styles.selected : ''}`}><input checked={plan === 'starter'} onChange={() => setPlan('starter')} type="radio" /> <span><b>Starter</b><strong>₹0</strong><small>Free forever</small></span></label>
                <label className={`${styles.planOpt} ${plan === 'pro' ? styles.selected : ''}`}><input checked={plan === 'pro'} onChange={() => setPlan('pro')} type="radio" /> <span><b>Pro Vyapari</b><strong>₹99/mo</strong><small>Unlimited everything</small></span></label>
              </div>
              <div className={styles.planFeatures}>
                {(plan === 'starter' ? ['50 Invoices / Month', '100 Customers', 'Basic Inventory', 'WhatsApp Sharing'] : ['Unlimited Invoices', 'Unlimited Customers', 'Full Sales Reports', 'GST Filing Help']).map((feature) => <span key={feature}>✓ {feature}</span>)}
              </div>
              <div className={styles.btnRow}><button type="button" onClick={() => setStep(2)}>Back</button><button className={styles.nextBtn} type="submit">{plan === 'starter' ? 'Create My Account - Free' : 'Start Pro Trial - ₹99/mo'}</button></div>
            </form>
          )}

          {complete && (
            <div className={styles.success}>
              <div>✓</div>
              <h2>You're all set!</h2>
              <p>Welcome to B-Vyapari, <strong>{firstName || 'there'}</strong>. Your free account is ready.</p>
              <Link to="/">Go to Dashboard →</Link>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
