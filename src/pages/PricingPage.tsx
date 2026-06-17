import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './PricingPage.module.css'

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  useEffect(() => {
    document.title = 'Pricing — B-Vyapari'
    const desc = document.querySelector('meta[name="description"]')
    if (desc) {
      desc.setAttribute('content', 'Compare plans for B-Vyapari. Choose from our free Starter plan, Pro Vyapari for unlimited invoicing, or Business plan for multi-branch accounting.')
    }

    const countUpElements = document.querySelectorAll('.js-count-up')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const target = parseFloat(el.getAttribute('data-target') || '0')
            const suffix = el.getAttribute('data-suffix') || ''
            const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10)
            const duration = 1500
            let startTime: number | null = null

            const animate = (currentTime: number) => {
              if (!startTime) startTime = currentTime
              const progress = Math.min((currentTime - startTime) / duration, 1)
              const easeProgress = progress * (2 - progress)
              const value = easeProgress * target
              el.innerHTML = value.toFixed(decimals) + `<span>${suffix}</span>`
              if (progress < 1) {
                requestAnimationFrame(animate)
              }
            }
            requestAnimationFrame(animate)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    countUpElements.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [])

  function toggleBilling() {
    setIsYearly((prev) => !prev)
  }

  function handleToggleFaq(index: number) {
    setOpenFaqIndex((prev) => (prev === index ? null : index))
  }

  const faqs = [
    {
      q: 'Is a credit card required for the free plan?',
      a: 'Not at all. To start the free plan, you only need your phone number and email. No payment info, no trial period — free means free forever.'
    },
    {
      q: 'Can I upgrade or downgrade my plan?',
      a: 'Yes, you can upgrade or downgrade at any time. When upgrading, your data remains perfectly safe. If you downgrade, only the plan limits will apply — none of your data will be deleted.'
    },
    {
      q: 'Is yearly billing paid upfront?',
      a: 'Yes, the yearly plan is billed as a single upfront payment but comes with a 20% discount. The Pro Vyapari yearly plan costs ₹948/year, saving you ₹240 compared to the monthly plan.'
    },
    {
      q: 'Is my data backed up?',
      a: 'Yes, we automatically back up all your data daily to secure, encrypted cloud storage. Your data is never lost. Pro and Business users also have the option to trigger manual backups.'
    },
    {
      q: 'Is B-Vyapari GST-compliant?',
      a: 'Absolutely. Pro and Business plans generate ready-to-file GSTR-1 and GSTR-3B reports. Invoices automatically calculate CGST, SGST, and IGST, which you can export directly for your accountant or CA.'
    },
    {
      q: 'Is there a penalty for canceling?',
      a: 'No penalty at all. You can cancel your monthly plan anytime and you won\'t be charged from the next month. For yearly plan cancellations, you will receive a pro-rata refund for the remaining months.'
    }
  ]

  return (
    <div className={styles.pricingWrapper}>
      {/* HERO */}
      <section className={styles.pricingHero}>
        <div className={styles.heroBadge}>
          <div className={styles.badgeDot}></div> Simple, Transparent Pricing
        </div>
        <h1>
          Plans for Every<br />
          <span className={styles.cr}>Vyapari.</span>
        </h1>
        <p>
          Start free, upgrade when you grow. <strong>No hidden charges.</strong> Cancel anytime. No credit card required to begin.
        </p>

        {/* Billing Toggle */}
        <div className={styles.toggleWrap} id="toggleWrap">
          <span className={`${styles.toggleLabel} ${!isYearly ? styles.on : ''}`} id="labelMonthly">
            Monthly
          </span>
          <div className={`${styles.toggle} ${isYearly ? styles.yearly : ''}`} id="billingToggle" onClick={toggleBilling}>
            <div className={styles.toggleKnob}></div>
          </div>
          <span className={`${styles.toggleLabel} ${isYearly ? styles.on : ''}`} id="labelYearly">
            Yearly
          </span>
          <span className={styles.saveBadge}>Save 20%</span>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className={styles.priceSection}>
        <div className={styles.priceGrid}>
          {/* STARTER */}
          <div className={`${styles.priceCard} rv`}>
            <div className={styles.pcPlan}>Starter</div>
            <div className={styles.pcAmount}>
              ₹<span className="monthly-price" style={{ display: isYearly ? 'none' : 'inline' }}>0</span>
              <span className="yearly-price" style={{ display: isYearly ? 'inline' : 'none' }}>0</span>
            </div>
            <div className={`${styles.pcPer} monthly-per`} style={{ display: isYearly ? 'none' : 'block' }}>Free forever</div>
            <div className={`${styles.pcPer} yearly-per`} style={{ display: isYearly ? 'block' : 'none' }}>Free forever</div>
            <div className={styles.pcSave}>&nbsp;</div>
            <div className={styles.pcDivider}></div>
            <ul className={styles.pcFeats}>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                50 Invoices / Month
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                100 Customers
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                Basic Inventory (50 items)
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                WhatsApp Invoice Share
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                PDF Download
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                Mobile App Access
              </li>
              <li className={styles.cross}>
                <svg viewBox="0 0 14 14">
                  <line x1="3" y1="3" x2="11" y2="11" />
                  <line x1="11" y1="3" x2="3" y2="11" />
                </svg>{' '}
                GST Reports
              </li>
              <li className={styles.cross}>
                <svg viewBox="0 0 14 14">
                  <line x1="3" y1="3" x2="11" y2="11" />
                  <line x1="11" y1="3" x2="3" y2="11" />
                </svg>{' '}
                Staff Accounts
              </li>
            </ul>
            <Link to="/start-free" className={styles.pcBtn}>
              <span>Get Started Free</span>
            </Link>
          </div>

          {/* PRO VYAPARI (HOT) */}
          <div className={`${styles.priceCard} ${styles.hot} rv rv-d1`}>
            <span className={styles.hotBadge}>Most Popular</span>
            <div className={styles.pcPlan}>Pro Vyapari</div>
            <div className={styles.pcAmount}>
              ₹<span className="monthly-price" style={{ display: isYearly ? 'none' : 'inline' }}>99</span>
              <span className="yearly-price" style={{ display: isYearly ? 'inline' : 'none' }}>79</span>
            </div>
            <div className={`${styles.pcPer} monthly-per`} style={{ display: isYearly ? 'none' : 'block' }}>per month · billed monthly</div>
            <div className={`${styles.pcPer} yearly-per`} style={{ display: isYearly ? 'block' : 'none' }}>per month · billed ₹948/yr</div>
            <div className={`${styles.pcSave} monthly-save`} style={{ display: isYearly ? 'none' : 'block' }}>&nbsp;</div>
            <div className={`${styles.pcSave} yearly-save`} style={{ display: isYearly ? 'block' : 'none' }}>You save ₹240 per year</div>
            <div className={styles.pcDivider}></div>
            <ul className={styles.pcFeats}>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                Unlimited Invoices
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                Unlimited Customers
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                Full Inventory Management
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                Advanced Sales Reports
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                GST Filing Assistance
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                Payment Tracking (UPI/Cash)
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                2 Staff Accounts
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                Priority Support
              </li>
            </ul>
            <Link to="/start-free" className={styles.pcBtn}>
              <span>Subscribe Now</span>
            </Link>
          </div>

          {/* BUSINESS */}
          <div className={`${styles.priceCard} rv rv-d2`}>
            <div className={styles.pcPlan}>Business</div>
            <div className={styles.pcAmount}>
              ₹<span className="monthly-price" style={{ display: isYearly ? 'none' : 'inline' }}>199</span>
              <span className="yearly-price" style={{ display: isYearly ? 'inline' : 'none' }}>159</span>
            </div>
            <div className={`${styles.pcPer} monthly-per`} style={{ display: isYearly ? 'none' : 'block' }}>per month · all features</div>
            <div className={`${styles.pcPer} yearly-per`} style={{ display: isYearly ? 'block' : 'none' }}>per month · billed ₹1,908/yr</div>
            <div className={`${styles.pcSave} monthly-save`} style={{ display: isYearly ? 'none' : 'block' }}>&nbsp;</div>
            <div className={`${styles.pcSave} yearly-save`} style={{ display: isYearly ? 'block' : 'none' }}>You save ₹480 per year</div>
            <div className={styles.pcDivider}></div>
            <ul className={styles.pcFeats}>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                Everything in Pro
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                Multi-Branch (up to 5)
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                Staff Accounts (up to 10)
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                API Access & Integrations
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                Custom Invoice Branding
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                Dedicated Account Manager
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                Data Export (Excel/CSV)
              </li>
              <li>
                <svg viewBox="0 0 14 14">
                  <polyline points="2,7 5,10 12,3" />
                </svg>{' '}
                24/7 Phone Support
              </li>
            </ul>
            <Link to="/start-free" className={styles.pcBtn}>
              <span>Start Business Plan</span>
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAND */}
      <div className={styles.trustBand}>
        <div className={styles.trustInner}>
          <div className={styles.trustItem}>
            <div className={`${styles.trustNum} js-count-up`} data-target="10" data-suffix="K+">
              0<span>K+</span>
            </div>
            <div className={styles.trustLabel}>Active Businesses</div>
          </div>
          <div className={styles.trustItem}>
            <div className={`${styles.trustNum} js-count-up`} data-target="250" data-suffix="L+">
              0<span>L+</span>
            </div>
            <div className={styles.trustLabel}>Bills Generated</div>
          </div>
          <div className={styles.trustItem}>
            <div className={`${styles.trustNum} js-count-up`} data-target="4.9" data-suffix="★" data-decimals="1">
              0<span>★</span>
            </div>
            <div className={styles.trustLabel}>App Store Rating</div>
          </div>
          <div className={styles.trustItem}>
            <div className={`${styles.trustNum} js-count-up`} data-target="99.9" data-suffix="%" data-decimals="1">
              0<span>%</span>
            </div>
            <div className={styles.trustLabel}>Uptime SLA</div>
          </div>
        </div>
      </div>

      {/* COMPARE TABLE */}
      <section className={styles.compareSection}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p className={`${styles.secLabel} rv`}>Full Comparison</p>
          <h2 className="rv rv-d1">Compare All Features.</h2>

          <table className={styles.compareTable}>
            <thead>
              <tr className={styles.ctHeadRow}>
                <th style={{ width: '36%' }}></th>
                <th style={{ width: '21%' }}>
                  <span className={styles.thPlan}>Starter</span>
                  <span className={styles.thPrice}>Free</span>
                </th>
                <th style={{ width: '21%' }} className={styles.thHot}>
                  <span className={styles.thPlan} style={{ color: 'var(--cr)' }}>
                    Pro Vyapari
                  </span>
                  <span className={styles.thPrice}>₹99/mo</span>
                </th>
                <th style={{ width: '22%' }}>
                  <span className={styles.thPlan}>Business</span>
                  <span className={styles.thPrice}>₹199/mo</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* INVOICING */}
              <tr className={styles.ctCatRow}>
                <td colSpan={4}>Invoicing & Billing</td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Invoices per month</td>
                <td>
                  <span className={styles.ctVal}>50</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctVal}>Unlimited</span>
                </td>
                <td>
                  <span className={styles.ctVal}>Unlimited</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>GST-ready invoice templates</td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>PDF download & print</td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>WhatsApp share</td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Email invoice</td>
                <td>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Custom invoice branding / logo</td>
                <td>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Recurring invoices</td>
                <td>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>

              {/* CUSTOMERS */}
              <tr className={styles.ctCatRow}>
                <td colSpan={4}>Customer Management</td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Customer records</td>
                <td>
                  <span className={styles.ctVal}>100</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctVal}>Unlimited</span>
                </td>
                <td>
                  <span className={styles.ctVal}>Unlimited</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Purchase history per customer</td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Outstanding balance tracking</td>
                <td>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Customer-wise profit report</td>
                <td>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>

              {/* INVENTORY */}
              <tr className={styles.ctCatRow}>
                <td colSpan={4}>Inventory & Stock</td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Product catalogue</td>
                <td>
                  <span className={styles.ctVal}>50 items</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctVal}>Unlimited</span>
                </td>
                <td>
                  <span className={styles.ctVal}>Unlimited</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Low stock alerts</td>
                <td>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Barcode scanning</td>
                <td>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Multi-location stock</td>
                <td>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>

              {/* REPORTS */}
              <tr className={styles.ctCatRow}>
                <td colSpan={4}>Reports & Analytics</td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Daily sales summary</td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Monthly / yearly P&L reports</td>
                <td>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>GST filing reports (GSTR-1/3B)</td>
                <td>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Export to Excel / CSV</td>
                <td>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>

              {/* TEAM & BRANCHES */}
              <tr className={styles.ctCatRow}>
                <td colSpan={4}>Team & Branches</td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Staff accounts</td>
                <td>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctVal}>2</span>
                </td>
                <td>
                  <span className={styles.ctVal}>Up to 10</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Role-based permissions</td>
                <td>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Multi-branch management</td>
                <td>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td>
                  <span className={styles.ctVal}>Up to 5</span>
                </td>
              </tr>

              {/* SUPPORT */}
              <tr className={styles.ctCatRow}>
                <td colSpan={4}>Support</td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Email / chat support</td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Priority support (WhatsApp)</td>
                <td>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCheck}>✓</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>Dedicated account manager</td>
                <td>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>
              <tr className={`${styles.ctRow} rv`}>
                <td>24/7 phone support</td>
                <td>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td className={styles.ctHotCol}>
                  <span className={styles.ctCross}>—</span>
                </td>
                <td>
                  <span className={styles.ctCheck}>✓</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <p className={`${styles.faqLabel} rv`}>FAQ</p>
        <h2 className={`${styles.faqTitle} rv rv-d1`}>Common Questions.</h2>

        {faqs.map((faq, idx) => (
          <div className={`${styles.faqItem} rv`} key={idx}>
            <button
              className={`${styles.faqQ} ${openFaqIndex === idx ? styles.open : ''}`}
              onClick={() => handleToggleFaq(idx)}
            >
              {faq.q}
              <span className={styles.faqIcon}>{openFaqIndex === idx ? '−' : '+'}</span>
            </button>
            <div className={`${styles.faqA} ${openFaqIndex === idx ? styles.open : ''}`}>
              {faq.a}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className={styles.ctaSec}>
        <div className={styles.ctaInner}>
          <h2 className={`${styles.ctaTitle} rv`}>
            Start Free.<br />
            <span>Grow Fast.</span>
          </h2>
          <p className={`${styles.ctaSub} rv rv-d1`}>
            Join 10,000+ merchants who digitized their business with B-Vyapari. Today is your turn.
          </p>
          <div className={`${styles.ctaBtns} rv rv-d2`}>
            <Link to="/start-free" className={styles.btnCtaMain}>
              Start Free Today
            </Link>
            <a href="mailto:info@bvyapari.in" className={styles.btnCtaSec}>
              Talk to Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
