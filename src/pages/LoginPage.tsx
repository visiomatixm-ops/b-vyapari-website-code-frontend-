import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './LoginPage.module.css'

const WHATSAPP_URL = "https://wa.me/919270271916?text=Hello%20B-Vyapari%20Team%2C%0AI%27m%20looking%20for%20a%20reliable%20billing%20and%20business%20management%20solution%20for%20my%20business.%20I%27d%20like%20to%20explore%20how%20B-Vyapari%20can%20help%20manage%20billing%2C%20inventory%2C%20and%20daily%20operations.%20Please%20get%20in%20touch%20with%20me.%0AThank%20you."

export default function LoginPage() {
  useEffect(() => {
    document.title = 'Log In — Access Your B-Vyapari Dashboard'
    const desc = document.querySelector('meta[name="description"]')
    if (desc) {
      desc.setAttribute('content', 'Sign in to your B-Vyapari account to manage invoices, check inventory stock, view sales analytics, and download GSTR reports.')
    }
  }, [])

  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailError = submitted && !email.trim()
  const passError = submitted && password.trim().length < 6

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className={styles.page}>
      <div className={styles.pageBg} />
      <div className={`${styles.orb} ${styles.orbOne}`} />
      <div className={`${styles.orb} ${styles.orbTwo}`} />

      <section className={styles.leftPanel}>
        <div className={styles.leftInner}>
          <div className={styles.tag}><span />Welcome Back</div>
          <h1 className={styles.leftTitle}>Your<br /><em>Business</em><br />Awaits<br /><span>You.</span></h1>
          <p className={styles.leftSub}>Continue managing your invoices, tracking <strong>inventory</strong>, and growing your business, all in one place.</p>

          <div className={styles.miniDash}>
            <div className={styles.mdTop}><i /><i /><i /><span>B-Vyapari Dashboard</span></div>
            <div className={styles.mdMetrics}>
              <div><small>Revenue</small><strong className={styles.green}>₹8,420</strong></div>
              <div><small>Invoices</small><strong>24</strong></div>
              <div><small>Overdue</small><strong className={styles.red}>₹1,200</strong></div>
            </div>
            {[
              ['Ramesh Sharma', '₹2,340', 'Paid'],
              ['Sita Devi', '₹890', 'Pending'],
              ['Priya Store', '₹3,990', 'Paid'],
            ].map(([name, amount, status]) => (
              <div className={styles.mdRow} key={name}><span>{name}</span><b>{amount}</b><small>{status}</small></div>
            ))}
          </div>

          <div className={styles.stats}>
            <div><strong>50K<span>+</span></strong><small>Active Businesses</small></div>
            <div><strong>₹200<span>Cr+</span></strong><small>Bills Generated</small></div>
            <div><strong>4.9<span>★</span></strong><small>App Store Rating</small></div>
          </div>
        </div>
      </section>

      <section className={styles.rightPanel}>
        <div className={styles.topLinks}>
          <Link to="/">← Back to Home</Link>
        </div>
        <form className={styles.formWrap} onSubmit={handleSubmit}>
          <p className={styles.formEyebrow}>Log In to B-Vyapari</p>
          <h2 className={styles.formTitle}>Sign in to<br />your account</h2>
          <p className={styles.formSub}>Don't have an account? <Link to="/start-free">Start Free Today →</Link></p>

          <div className={styles.socialRow}>
            <button type="button" onClick={() => window.location.href = 'https://accounts.google.com'}>Google</button>
            <button type="button" onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')}>WhatsApp</button>
          </div>

          <div className={styles.divider}><span />or continue with email<span /></div>

          <label className={`${styles.field} ${emailError ? styles.hasError : ''}`}>
            <span>Mobile / Email</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" placeholder="yourname@example.com or 9876543210" />
            {emailError && <small>Please enter a valid email or mobile number.</small>}
          </label>

          <label className={`${styles.field} ${passError ? styles.hasError : ''}`}>
            <span>Password <a href="#">Forgot Password?</a></span>
            <div className={styles.passwordWrap}>
              <input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Enter your password" />
              <button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>
            {passError && <small>Password must be at least 6 characters.</small>}
          </label>

          <label className={styles.remember}>
            <input checked={remember} onChange={(event) => setRemember(event.target.checked)} type="checkbox" />
            <span>Keep me signed in for 30 days</span>
          </label>

          <button className={styles.submitBtn} type="submit">Log In to Dashboard →</button>
          <p className={styles.signupLink}>New to B-Vyapari? <Link to="/start-free">Create a free account →</Link></p>
        </form>
      </section>
    </main>
  )
}
