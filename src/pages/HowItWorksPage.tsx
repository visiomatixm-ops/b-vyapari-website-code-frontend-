import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './HowItWorksPage.module.css'

export default function HowItWorksPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [animateSetup, setAnimateSetup] = useState(false)

  const setupCardsRef = useRef<HTMLDivElement>(null)

  // IntersectionObserver to stagger-reveal setup cards on scroll
  useEffect(() => {
    document.title = 'How It Works — Setup B-Vyapari Billing in 5 Minutes'
    const desc = document.querySelector('meta[name="description"]')
    if (desc) {
      desc.setAttribute('content', 'Learn how to get started with B-Vyapari. Create your free account in 60 seconds, set up your business details, and start billing your customers instantly.')
    }

    const scObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateSetup(true)
          scObserver.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (setupCardsRef.current) {
      scObserver.observe(setupCardsRef.current)
    }

    return () => {
      scObserver.disconnect()
    }
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <div className={styles.howItWorksWrapper}>
      {/* ═══ PAGE HERO ═══ */}
      <section className={styles.pageHero}>
        <div className={styles.heroBg}></div>
        <div className={styles.heroNoise}></div>
        <div className={`${styles.orb} ${styles.orb1}`}></div>
        <div className={`${styles.orb} ${styles.orb2}`}></div>

        <div className={styles.heroInner}>
          <div className={styles.heroTag}>
            <div className={styles.tagDot}></div> Simple 3-Step Process
          </div>
          <h1 className={styles.heroH1}>
            Get started in<br />
            <span className={styles.cr}>3 Easy Steps</span><br />
            <span className={styles.outline}>instantly.</span>
          </h1>
          <p className={styles.heroSub}>
            B-Vyapari is so simple that you can <strong>start billing from day one</strong>. From the setup wizard to your first invoice — everything is guided, fast, and hassle-free.
          </p>
          <div className={styles.heroBtns}>
            <button onClick={() => scrollToSection('steps')} className={styles.btnHeroMain}>
              <span>View Steps</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 2v10M2 7l5 5 5-5" /></svg>
            </button>
          </div>
          <div className={styles.heroQuicknav}>
            <button onClick={() => scrollToSection('step1')} className={styles.qnPill}>
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg> Step 1: Create Account
            </button>
            <button onClick={() => scrollToSection('step2')} className={styles.qnPill}>
              <svg viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg> Step 2: Setup Business
            </button>
            <button onClick={() => scrollToSection('step3')} className={styles.qnPill}>
              <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /></svg> Step 3: Invoice &amp; Grow
            </button>
          </div>
        </div>

        <div className={styles.scrollHint}>
          <div className={styles.scrollArrow}><div className={styles.scrollDot}></div></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ═══ OVERVIEW STRIP ═══ */}
      <div className={styles.overviewStrip}>
        <div className={styles.ovItem}><div className={styles.ovIcon}><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg></div><span className={styles.ovText}>60 seconds signup</span></div>
        <div className={styles.ovItem}><div className={styles.ovIcon}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div><span className={styles.ovText}>No credit card needed</span></div>
        <div className={styles.ovItem}><div className={styles.ovIcon}><svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" /></svg></div><span className={styles.ovText}>Works on mobile & desktop</span></div>
        <div className={styles.ovItem}><div className={styles.ovIcon}><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07" /></svg></div><span className={styles.ovText}>English + Hindi support</span></div>
        <div className={styles.ovItem}><div className={styles.ovIcon}><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></div><span className={styles.ovText}>GST ready from day 1</span></div>
        <div className={styles.ovItem}><div className={styles.ovIcon}><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></div><span className={styles.ovText}>Live dashboard instantly</span></div>
      </div>

      {/* ═══ BIG 3 STEPS ═══ */}
      <section className={`${styles.section} ${styles.howitworksSec}`} id="steps">
        <div className={styles.secInner}>
          <p className={`${styles.eyebrow} ${styles.w}`}>How It Works</p>
          <h2 className={`${styles.secTitle} ${styles.w} rv`}>Just 3 Steps.<br />And You're Set.</h2>
          <p className={`${styles.secSub} ${styles.w} rv ${styles.rvD1}`}>Create your account, set up your business, and send your first invoice — it's so fast that you can start billing professionally today.</p>

          <div className={styles.bigSteps}>
            {/* STEP 1 */}
            <div className={styles.bigStep} id="step1">
              <div className={`${styles.stepVisual} ${styles.rvX} rv`}>
                <div className={styles.stepNumGiant}>01</div>
                <div className={styles.stepVisualContent}>
                  <div className={styles.phone3dWrap}>
                    <div className={styles.phone3d}>
                      <div className={styles.phoneShell}>
                        <div className={styles.phoneScreen}>
                          <div className={styles.phoneNotch}><div className={styles.pnPill}></div></div>
                          <div className={styles.phoneContent}>
                            <div style={{ textAlign: 'center', padding: '20px 0 24px' }}>
                              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>👋</div>
                              <div style={{ fontSize: '.82rem', fontWeight: 800, color: '#fff', letterSpacing: '-.01em', marginBottom: '4px' }}>Welcome to<br />B-Vyapari!</div>
                              <div style={{ fontSize: '.58rem', color: '#444', marginBottom: '24px' }}>Create free account in 60 seconds</div>
                            </div>
                            {/* signup form mockup */}
                            <div style={{ background: '#161616', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <div style={{ background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: '6px', padding: '10px 12px' }}>
                                <div style={{ fontSize: '.45rem', color: '#444', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '3px' }}>Mobile Number</div>
                                <div style={{ fontSize: '.7rem', color: '#ccc' }}>+91 98765 43210</div>
                              </div>
                              <div style={{ background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: '6px', padding: '10px 12px' }}>
                                <div style={{ fontSize: '.45rem', color: '#444', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '3px' }}>Business Name</div>
                                <div style={{ fontSize: '.7rem', color: '#ccc' }}>Ramesh retail store</div>
                              </div>
                              <div style={{ background: '#0d0d0d', border: '1px solid rgba(122,30,44,.3)', borderRadius: '6px', padding: '10px 12px', borderColor: 'var(--cr)' }}>
                                <div style={{ fontSize: '.45rem', color: 'var(--cr2)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '3px' }}>Verify OTP</div>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                  <div style={{ background: '#222', borderRadius: '4px', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.65rem', color: '#fff', fontWeight: 800 }}>7</div>
                                  <div style={{ background: '#222', borderRadius: '4px', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.65rem', color: '#fff', fontWeight: 800 }}>2</div>
                                  <div style={{ background: '#222', borderRadius: '4px', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.65rem', color: '#fff', fontWeight: 800 }}>4</div>
                                  <div style={{ background: '#222', borderRadius: '4px', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.65rem', color: '#fff', fontWeight: 800 }}>8</div>
                                  <div style={{ background: 'rgba(122,30,44,.3)', borderRadius: '4px', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.65rem', color: 'var(--cr2)', fontWeight: 800, animation: 'blink 1.2s infinite' }}>_</div>
                                  <div style={{ background: '#1a1a1a', borderRadius: '4px', width: '22px', height: '22px' }}></div>
                                </div>
                              </div>
                              <div style={{ background: 'var(--cr)', borderRadius: '6px', padding: '11px', textAlign: 'center', fontSize: '.6rem', fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: '#fff' }}>Create Account →</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                              <div style={{ flex: 1, height: '1px', background: '#1a1a1a' }}></div>
                              <div style={{ fontSize: '.45rem', color: '#333' }}>or</div>
                              <div style={{ flex: 1, height: '1px', background: '#1a1a1a' }}></div>
                            </div>
                            <div style={{ marginTop: '10px', background: '#161616', border: '1px solid #2a2a2a', borderRadius: '6px', padding: '9px', textAlign: 'center', fontSize: '.55rem', fontWeight: 600, color: '#555', letterSpacing: '.04em' }}>Login with Google</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.rvXr} rv`}>
                <div className={styles.stepBadge}>
                  <div className={styles.stepBadgeNum}>01</div>
                  <div className={styles.stepBadgeLabel}>First Step</div>
                </div>
                <h3 className={styles.stepHeading}>Create <span>Account</span><br />— 100% Free.</h3>
                <p className={styles.stepBody}>
                  All you need is your <strong>mobile number</strong>. Enter the OTP, verify, and your account is ready in <strong>60 seconds</strong>. No credit card, no hidden charges.
                </p>
                <div className={styles.stepChecks}>
                  <div className={styles.stepCheck}><div className={styles.checkIcon}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div><div><strong>Mobile OTP signup</strong> — no email required</div></div>
                  <div className={styles.stepCheck}><div className={styles.checkIcon}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div><div><strong>One-click Google login</strong> support</div></div>
                  <div className={styles.stepCheck}><div className={styles.checkIcon}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div><div><strong>Free Starter plan</strong> includes 50 invoices/month</div></div>
                  <div className={styles.stepCheck}><div className={styles.checkIcon}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div><div>Works on Android, iOS, and <strong>Web browsers</strong></div></div>
                </div>
                <div className={styles.timeBadge}><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg> Total time: 60 seconds</div>
              </div>
            </div>

            {/* STEP 2 */}
            <div className={`${styles.bigStep} ${styles.reverse}`} id="step2">
              <div className={`${styles.rvXr} rv`}>
                <div className={styles.stepBadge}>
                  <div className={styles.stepBadgeNum}>02</div>
                  <div className={styles.stepBadgeLabel}>Second Step</div>
                </div>
                <h3 className={styles.stepHeading}>Setup <span>Business</span><br />in Minutes.</h3>
                <p className={styles.stepBody}>
                  Follow the <strong>guided setup wizard</strong> after signing up. Enter your GSTIN, add products, and import customers — complete it all in under <strong>5 minutes</strong>.
                </p>
                <div className={styles.stepChecks}>
                  <div className={styles.stepCheck}><div className={styles.checkIcon}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div><div><strong>Auto-validate GSTIN</strong> with the GST portal</div></div>
                  <div className={styles.stepCheck}><div className={styles.checkIcon}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div><div><strong>Bulk import products</strong> from Excel/CSV</div></div>
                  <div className={styles.stepCheck}><div className={styles.checkIcon}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div><div><strong>Automatic templates</strong> based on your business type</div></div>
                  <div className={styles.stepCheck}><div className={styles.checkIcon}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div><div>Upload your logo to <strong>personalize your invoices</strong></div></div>
                  <div className={styles.stepCheck}><div className={styles.checkIcon}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div><div><strong>Migrate historical data</strong> from Tally or Excel for free</div></div>
                </div>
                <div className={styles.timeBadge}><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg> Total time: 5 minutes</div>
              </div>
              <div className={`${styles.stepVisual} ${styles.rvX} rv`} ref={setupCardsRef}>
                <div className={styles.stepNumGiant}>02</div>
                <div className={styles.stepVisualContent}>
                  <div className={styles.setupCards} id="setupCards">
                    <div className={`${styles.setupCard} ${animateSetup ? 'vis' : ''}`} style={{ transitionDelay: '100ms', transform: animateSetup ? 'none' : 'translateX(20px)', transition: 'opacity 0.6s, transform 0.6s' }}>
                      <div className={`${styles.scIcon} ${styles.red}`}><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9,22 9,12 15,12 15,22" /></svg></div>
                      <div className={styles.scText}><h4>Business Details</h4><p>Name, GSTIN, address — all set</p></div>
                      <div className={styles.scCheck}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div>
                    </div>
                    <div className={`${styles.setupCard} ${animateSetup ? 'vis' : ''}`} style={{ transitionDelay: '250ms', transform: animateSetup ? 'none' : 'translateX(20px)', transition: 'opacity 0.6s, transform 0.6s' }}>
                      <div className={`${styles.scIcon} ${styles.green}`}><svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg></div>
                      <div className={styles.scText}><h4>Products &amp; Stock</h4><p>1,842 products imported from Excel</p>
                        <div className={styles.scProgress}><div className={styles.scProgressBar} style={{ width: '100%', background: 'var(--cr)' }}></div></div>
                      </div>
                      <div className={styles.scCheck}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div>
                    </div>
                    <div className={`${styles.setupCard} ${animateSetup ? 'vis' : ''}`} style={{ transitionDelay: '400ms', transform: animateSetup ? 'none' : 'translateX(20px)', transition: 'opacity 0.6s, transform 0.6s' }}>
                      <div className={`${styles.scIcon} ${styles.blue}`}><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg></div>
                      <div className={styles.scText}><h4>Customers</h4><p>348 customers synced from Tally</p>
                        <div className={styles.scProgress}><div className={styles.scProgressBar} style={{ width: '100%', background: 'var(--cr)' }}></div></div>
                      </div>
                      <div className={styles.scCheck}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div>
                    </div>
                    <div className={`${styles.setupCard} ${animateSetup ? 'vis' : ''}`} style={{ transitionDelay: '550ms', transform: animateSetup ? 'none' : 'translateX(20px)', transition: 'opacity 0.6s, transform 0.6s', borderColor: 'rgba(122,30,44,.3)' }}>
                      <div className={`${styles.scIcon} ${styles.amber}`}><svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg></div>
                      <div className={styles.scText}><h4>Payment Modes</h4><p>UPI, Cash, Card — all active</p>
                        <div className={styles.scProgress}><div className={styles.scProgressBar} style={{ width: '75%', background: 'var(--cr2)' }}></div></div>
                      </div>
                    </div>
                    <div className={`${styles.setupCard} ${animateSetup ? 'vis' : ''}`} style={{ transitionDelay: '700ms', transform: animateSetup ? 'none' : 'translateX(20px)', transition: 'opacity 0.6s, transform 0.6s', borderColor: 'rgba(122,30,44,.25)', background: 'rgba(122,30,44,.05)' }}>
                      <div className={`${styles.scIcon} ${styles.dark}`}><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg></div>
                      <div className={styles.scText}><h4>Invoice Template</h4><p>Configuring logo and branding…</p>
                        <div className={styles.scProgress}><div className={styles.scProgressBar} style={{ width: '40%', background: 'var(--cr2)' }}></div></div>
                      </div>
                    </div>
                    {/* completion bar */}
                    <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: '8px', padding: '16px 20px', marginTop: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ fontSize: '.6rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.1em' }}>Setup Progress</div>
                        <div style={{ fontSize: '.7rem', fontWeight: 900, color: 'var(--cr2)' }}>80%</div>
                      </div>
                      <div style={{ height: '4px', background: '#111', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: '80%', background: 'linear-gradient(90deg,var(--cr),var(--cr2))', borderRadius: '2px' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3 */}
            <div className={styles.bigStep} id="step3">
              <div className={`${styles.stepVisual} ${styles.rvX} rv`}>
                <div className={styles.stepNumGiant}>03</div>
                <div className={styles.stepVisualContent}>
                  <div className={styles.laptopWrap}>
                    <div className={styles.laptop3d}>
                      <div className={styles.laptopScreen}>
                        <div className={styles.lsTitlebar}>
                          <div className={styles.lsDots}><div className={styles.lsDot}></div><div className={styles.lsDot}></div><div className={styles.lsDot}></div></div>
                          <div className={styles.lsTitle}>B-Vyapari — Invoice #INV-2401</div>
                        </div>
                        <div className={styles.lsBody}>
                          <div className={styles.invPreview}>
                            <div className={styles.invTop}>
                              <div>
                                <div className={styles.invBrandName}>Ramesh <span>business</span></div>
                                <div className={styles.invBrandGstin}>GSTIN: 27ABCDE1234F1Z5 · Nagpur</div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <div className={styles.invNum}>INV-2401</div>
                                <div className={styles.invDate}>15 Jan 2026</div>
                              </div>
                            </div>
                            <div className={styles.invParties}>
                              <div>
                                <div className={styles.invToLabel}>Bill To</div>
                                <div className={styles.invToName}>Priya Medical Hall</div>
                                <div className={styles.invToSub}>GSTIN: 27FGHIJ5678K2L6</div>
                              </div>
                              <div>
                                <div className={styles.invToLabel}>Due Date</div>
                                <div className={styles.invToName}>30 Jan 2026</div>
                                <div className={styles.invToSub} style={{ color: '#22c55e', fontWeight: 600 }}>● UPI Ready</div>
                              </div>
                            </div>
                            <table className={styles.invTable}>
                              <thead><tr><th>Item</th><th>Qty</th><th>Rate</th><th>GST</th><th>Total</th></tr></thead>
                              <tbody>
                                <tr><td>Tata Salt 1kg</td><td>10</td><td>₹24</td><td>5%</td><td>₹252</td></tr>
                                <tr><td>Colgate Max Fresh</td><td>5</td><td>₹78</td><td>18%</td><td>₹460</td></tr>
                                <tr><td>Rin Detergent 1kg</td><td>8</td><td>₹95</td><td>12%</td><td>₹851</td></tr>
                              </tbody>
                            </table>
                            <div className={styles.invTotalRow}>
                              <span>Subtotal</span><span>₹1,413</span>
                            </div>
                            <div className={styles.invTotalRow}>
                              <span>GST (CGST + SGST)</span><span>₹143</span>
                            </div>
                            <div className={styles.invTotalRow} style={{ marginTop: '6px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                              <span className={styles.invGrand}>Total</span><span className={styles.invGrand}>₹1,556</span>
                            </div>
                            <div className={styles.invActions}>
                              <div className={`${styles.invActionBtn} ${styles.iabPdf}`}>📄 PDF</div>
                              <div className={`${styles.invActionBtn} ${styles.iabWa}`}>💬 WhatsApp</div>
                              <div className={`${styles.invActionBtn} ${styles.iabUpi}`}>💳 UPI Link</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.rvXr} rv`}>
                <div className={styles.stepBadge}>
                  <div className={styles.stepBadgeNum}>03</div>
                  <div className={styles.stepBadgeLabel}>Third Step</div>
                </div>
                <h3 className={styles.stepHeading}>Send Invoices,<br /><span>Get Paid.</span></h3>
                <p className={styles.stepBody}>
                  Create your first invoice — <strong>ready in 2 minutes</strong>. GST is calculated automatically, and you can share it via <strong>WhatsApp in one tap</strong> along with a UPI payment link.
                </p>
                <div className={styles.stepChecks}>
                  <div className={styles.stepCheck}><div className={styles.checkIcon}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div><div><strong>GST auto-calculation</strong> — handles CGST, SGST, and IGST</div></div>
                  <div className={styles.stepCheck}><div className={styles.checkIcon}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div><div><strong>Share invoices as PDF</strong> on WhatsApp in a single tap</div></div>
                  <div className={styles.stepCheck}><div className={styles.checkIcon}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div><div><strong>Attach UPI payment links</strong> directly to invoices</div></div>
                  <div className={styles.stepCheck}><div className={styles.checkIcon}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div><div><strong>Automatically marks paid</strong> when payments arrive</div></div>
                  <div className={styles.stepCheck}><div className={styles.checkIcon}><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg></div><div><strong>Real-time dashboard</strong> updates for sales, dues, and stock</div></div>
                </div>
                <div className={styles.timeBadge}><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg> First invoice: 2 minutes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DETAILED BREAKDOWNS ═══ */}
      <section className={`${styles.section} ${styles.detailSec}`}>
        <div className={styles.secInner}>
          <p className={`${styles.eyebrow} rv`}>Step-by-Step Details</p>
          <h2 className={`${styles.secTitle} rv ${styles.rvD1}`}>Exactly what happens<br />at each step.</h2>
          <p className={`${styles.secSub} rv ${styles.rvD2}`}>No confusion. Here is the complete breakdown — what to do, time required, and features.</p>

          <div className={styles.detailGrid}>
            <div className={`${styles.detailCard} rv`}>
              <div className={styles.dcStepNum}>01</div>
              <div className={`${styles.dcIcon} ${styles.red}`}><svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg></div>
              <div className={styles.dcTitle}>Account Creation</div>
              <p className={styles.dcDesc}>Sign up with your mobile number, verify OTP, and your account is ready. The Starter plan is free forever — 50 invoices/month, 100 customers, and mobile app access. No expiry.</p>
              <div className={styles.dcTime}>⏱ 60 seconds</div>
            </div>

            <div className={`${styles.detailCard} rv ${styles.rvD1}`}>
              <div className={styles.dcStepNum}>02</div>
              <div className={`${styles.dcIcon} ${styles.dark}`}><svg viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg></div>
              <div className={styles.dcTitle}>Business Setup</div>
              <p className={styles.dcDesc}>Our guided wizard takes you through business name, optional GSTIN, address, and logo. Bulk import products and customers from Excel or migrate from Tally with our team's help.</p>
              <div className={styles.dcTime}>⏱ 5 minutes</div>
            </div>

            <div className={`${styles.detailCard} rv ${styles.rvD2}`}>
              <div className={styles.dcStepNum}>03</div>
              <div className={`${styles.dcIcon} ${styles.green}`}><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /></svg></div>
              <div className={styles.dcTitle}>First Invoice</div>
              <p className={styles.dcDesc}>Select a customer, add products, and GST is automatically calculated. Share the PDF invoice via WhatsApp along with a UPI payment link for instant dashboard updates.</p>
              <div className={styles.dcTime}>⏱ 2 minutes</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURE HIGHLIGHTS BAND ═══ */}
      <div className={styles.featuresBand}>
        <div className={styles.featBandInner}>
          <div className={`${styles.fbandItem} rv`}>
            <div className={styles.fbIcon}><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></div>
            <div className={styles.fbTitle}>Bank-Grade Security</div>
            <div className={styles.fbDesc}>Your data is secured with AES-256 encryption. Automated hourly backups.</div>
          </div>
          <div className={`${styles.fbandItem} rv ${styles.rvD1}`}>
            <div className={styles.fbIcon}><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07" /><path d="M21 2H3v16l4-4h14V2zM8 10h8M8 6h8" /></svg></div>
            <div className={styles.fbTitle}>WhatsApp Support</div>
            <div className={styles.fbDesc}>Need setup help? WhatsApp support with real humans, 4-hour response guaranteed.</div>
          </div>
          <div className={`${styles.fbandItem} rv ${styles.rvD2}`}>
            <div className={styles.fbIcon}><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></div>
            <div className={styles.fbTitle}>Live Dashboard</div>
            <div className={styles.fbDesc}>Your dashboard goes live with your first invoice — revenue, dues, and stock all in one place.</div>
          </div>
          <div className={`${styles.fbandItem} rv ${styles.rvD3}`}>
            <div className={styles.fbIcon}><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" /></svg></div>
            <div className={styles.fbTitle}>Anytime Access</div>
            <div className={styles.fbDesc}>Access on mobile, tablet, or laptop. Your data is always synced across all devices.</div>
          </div>
        </div>
      </div>

      {/* ═══ TIMELINE — PEHLE DIN SE LEKAR AAGE TAK ═══ */}
      <section className={`${styles.section} ${styles.timelineSec}`}>
        <div className={`${styles.secInner} ${styles.timelineInner}`}>
          <p className={`${styles.eyebrow} rv`}>Your Journey</p>
          <h2 className={`${styles.secTitle} rv ${styles.rvD1}`}>From Day 1 to<br />Month 3 &amp; Beyond.</h2>
          <p className={`${styles.secSub} rv ${styles.rvD2}`}>Here is the progress you can expect when starting with B-Vyapari.</p>

          <div className={styles.timelineWrap}>
            <div className={styles.timelineLine}></div>

            <div className={`${styles.tItem} step-item`}>
              <div className={styles.tDot}></div>
              <div className={styles.tTag}>Day 1 — First Day</div>
              <div className={styles.tTitle}>Account Setup &amp; First Invoice</div>
              <div className={styles.tDesc}>Sign up in 60 seconds, setup business in 5 minutes, and send your first professional GST invoice on WhatsApp today.</div>
            </div>

            <div className={`${styles.tItem} step-item`}>
              <div className={styles.tDot}></div>
              <div className={styles.tTag}>Week 1 — First Week</div>
              <div className={styles.tTitle}>Add Customers &amp; Products</div>
              <div className={styles.tDesc}>Bulk import all your products, customers, and opening stock from Excel. Automate your invoices and set up WhatsApp reminders for overdue payments.</div>
            </div>

            <div className={`${styles.tItem} step-item`}>
              <div className={styles.tDot}></div>
              <div className={styles.tTag}>Month 1 — First Month</div>
              <div className={styles.tTitle}>Automated GSTR-1 Reports</div>
              <div className={styles.tDesc}>Get GSTR-1 and GSTR-3B reports ready to export at the end of the month. Share directly with your accountant without manual calculations.</div>
            </div>

            <div className={`${styles.tItem} step-item`}>
              <div className={styles.tDot}></div>
              <div className={styles.tTag}>Month 2 — Second Month</div>
              <div className={styles.tTitle}>Revenue Analytics</div>
              <div className={styles.tDesc}>Understand which products sell the most. Optimize stock based on data insights and grow your monthly revenue.</div>
            </div>

            <div className={`${styles.tItem} step-item`}>
              <div className={styles.tDot}></div>
              <div className={styles.tTag}>Month 3 — Third Month</div>
              <div className={styles.tTitle}>Add Staff &amp; Scale</div>
              <div className={styles.tDesc}>Upgrade to the Pro plan, add staff accounts with role-based permissions, and scale your daily operations efficiently.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <div className={styles.faqStrip}>
        <div className={styles.faqInner}>
          <p className={`${styles.eyebrow} ${styles.w} rv`} style={{ marginBottom: '20px' }}>Common Questions</p>
          <h2 className={`${styles.secTitle} ${styles.w} rv ${styles.rvD1}`} style={{ marginBottom: '48px' }}>Frequently Asked<br />Questions.</h2>

          <div className={styles.faqInner}>
            {[
              { q: 'Do I need any technical knowledge for setup?', a: 'Not at all. B-Vyapari is built for everyone, including those who have never used billing software before. Our guided setup wizard explains every step, and WhatsApp support is always available.' },
              { q: 'Can I migrate my data from Tally or Excel?', a: 'Yes! You can import customers, products, and opening stock directly from Tally, Excel, or CSV. Our support team also offers free migration assistance for Pro and Business plan users.' },
              { q: 'How long does it take to create the first invoice?', a: 'Under 2 minutes. Simply select a customer, add products, and the system automatically calculates GST. You can then share the invoice on WhatsApp with one click.' },
              { q: 'Can I use B-Vyapari if I don\'t have a GSTIN?', a: 'Yes, absolutely! GSTIN is optional. Small businesses that are not GST-registered can use B-Vyapari to generate regular non-GST invoices, and you can easily add your GSTIN later if needed.' },
              { q: 'What is included in the Free plan?', a: 'Our Starter plan is free forever and includes 50 invoices per month, 100 customers, basic inventory management, WhatsApp sharing, mobile app access, and automated cloud backup.' }
            ].map((faq, idx) => (
              <div key={idx} className={`${styles.faqItem} ${openFaqIndex === idx ? styles.open : ''}`}>
                <button className={styles.faqQ} onClick={() => toggleFaq(idx)}>
                  {faq.q}
                  <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                </button>
                <div className={styles.faqA}>
                  <div className={styles.faqAInner}>
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ STATS BAND ═══ */}
      <div className={styles.statsBand}>
        <div className={styles.statsGrid}>
          <div className={`${styles.sbItem} rv`}><div className={styles.sbNum}>10K+</div><div className={styles.sbLabel}>Active Businesses</div></div>
          <div className={`${styles.sbItem} rv ${styles.rvD1}`}><div className={styles.sbNum}>250L+</div><div className={styles.sbLabel}>Bills Generated</div></div>
          <div className={`${styles.sbItem} rv ${styles.rvD2}`}><div className={styles.sbNum}>99.9%</div><div className={styles.sbLabel}>Platform Uptime</div></div>
          <div className={`${styles.sbItem} rv ${styles.rvD3}`}><div className={styles.sbNum}>4.9★</div><div className={styles.sbLabel}>App Store Rating</div></div>
        </div>
      </div>

      {/* ═══ CTA ═══ */}
      <section className={styles.ctaSec}>
        <div className={styles.ctaInner}>
          <h2 className={`${styles.ctaTitle} rv`}>Get Started Today.<br /><span>Completely Free.</span></h2>
          <p className={`${styles.ctaSub} rv ${styles.rvD1}`}>Join 10,000+ businesses already using B-Vyapari. No credit card required. Account ready in 60 seconds.</p>
          <div className={`${styles.ctaBtns} rv ${styles.rvD2}`}>
            <Link to="/start-free" className={styles.btnCtaMain}>Create Free Account →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
