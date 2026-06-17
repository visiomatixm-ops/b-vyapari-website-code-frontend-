import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './FeaturesPage.module.css'

type TabName = 'Revenue' | 'Orders' | 'Profit' | 'Customers'

const chartData = {
  Revenue: {
    kpis: [
      { val: '₹58,420', label: 'Total Revenue', delta: '↑ 23% vs last week' },
      { val: '186', label: 'Total Orders', delta: '↑ 18%' },
      { val: '₹314', label: 'Avg. Order', delta: '↑ 5%' }
    ],
    bars: [
      { height: 35, y: 75, opacity: 0.5 },
      { height: 55, y: 55, opacity: 0.6 },
      { height: 70, y: 40, opacity: 0.7 },
      { height: 50, y: 60, opacity: 0.6 },
      { height: 90, y: 20, opacity: 1.0 },
      { height: 75, y: 35, opacity: 0.8 },
      { height: 60, y: 50, opacity: 0.65 }
    ],
    peakIndex: 4, // Friday (0-indexed: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6)
    peakText: 'Peak'
  },
  Orders: {
    kpis: [
      { val: '186', label: 'Total Orders', delta: '↑ 18% vs last week' },
      { val: '₹314', label: 'Avg. Order', delta: '↑ 5%' },
      { val: '42', label: 'New Signups', delta: '↑ 14%' }
    ],
    bars: [
      { height: 25, y: 85, opacity: 0.5 },
      { height: 45, y: 65, opacity: 0.6 },
      { height: 85, y: 25, opacity: 0.9 },
      { height: 40, y: 70, opacity: 0.6 },
      { height: 70, y: 40, opacity: 0.8 },
      { height: 95, y: 15, opacity: 1.0 },
      { height: 55, y: 55, opacity: 0.65 }
    ],
    peakIndex: 5, // Sat
    peakText: 'Max'
  },
  Profit: {
    kpis: [
      { val: '₹14,210', label: 'Total Profit', delta: '↑ 15% vs last week' },
      { val: '24.3%', label: 'Profit Margin', delta: '↑ 2%' },
      { val: '₹76', label: 'Avg. Profit/Order', delta: '↑ 4%' }
    ],
    bars: [
      { height: 40, y: 70, opacity: 0.5 },
      { height: 60, y: 50, opacity: 0.6 },
      { height: 55, y: 55, opacity: 0.6 },
      { height: 75, y: 35, opacity: 0.8 },
      { height: 80, y: 30, opacity: 0.85 },
      { height: 65, y: 45, opacity: 0.7 },
      { height: 95, y: 15, opacity: 1.0 }
    ],
    peakIndex: 6, // Sun
    peakText: 'Best'
  },
  Customers: {
    kpis: [
      { val: '412', label: 'Active Cust.', delta: '↑ 8% vs last week' },
      { val: '42', label: 'New Signups', delta: '↑ 14%' },
      { val: '88%', label: 'Repeat Rate', delta: '↑ 1.2%' }
    ],
    bars: [
      { height: 50, y: 60, opacity: 0.6 },
      { height: 35, y: 75, opacity: 0.5 },
      { height: 65, y: 45, opacity: 0.7 },
      { height: 90, y: 20, opacity: 0.95 },
      { height: 60, y: 50, opacity: 0.65 },
      { height: 75, y: 35, opacity: 0.8 },
      { height: 80, y: 30, opacity: 0.85 }
    ],
    peakIndex: 3, // Thu
    peakText: 'Busy'
  }
}

export default function FeaturesPage() {
  const [activeSection, setActiveSection] = useState('invoicing')
  const [activePill, setActivePill] = useState('invoicing')
  const [activeTab, setActiveTab] = useState<TabName>('Revenue')
  const [animateBars, setAnimateBars] = useState(false)
  const [animateInvoicing, setAnimateInvoicing] = useState(false)

  const invFeatureListRef = useRef<HTMLDivElement>(null)
  const stockDashRef = useRef<HTMLDivElement>(null)

  // Scroll spy to update active section in sticky nav
  useEffect(() => {
    document.title = 'Features — B-Vyapari Billing & Inventory Software'
    const desc = document.querySelector('meta[name="description"]')
    if (desc) {
      desc.setAttribute('content', 'Explore all features of B-Vyapari billing app: GST invoicing, stock tracking, automatic alerts, UPI payment links, WhatsApp integration, and sales reports.')
    }

    const handleScroll = () => {
      const sections = ['invoicing', 'inventory', 'customers', 'payments', 'reports', 'integrations', 'compare']
      let currentSection = 'invoicing'
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el && window.scrollY >= el.offsetTop - 150) {
          currentSection = sectionId
        }
      }
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // IntersectionObservers for animations
  useEffect(() => {
    const invObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateInvoicing(true)
          invObserver.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    const barObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateBars(true)
          barObserver.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (invFeatureListRef.current) invObserver.observe(invFeatureListRef.current)
    if (stockDashRef.current) barObserver.observe(stockDashRef.current)

    return () => {
      invObserver.disconnect()
      barObserver.disconnect()
    }
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const currentTab = chartData[activeTab]

  return (
    <div className={styles.featuresWrapper}>
      {/* ═══ PAGE HERO ═══ */}
      <section className={styles.pageHero}>
        <div className={styles.phGrid}></div>
        <div className={`${styles.phOrb} ${styles.phOrb1}`}></div>
        <div className={`${styles.phOrb} ${styles.phOrb2}`}></div>
        <div className={styles.phInner}>
          <div className={styles.phBreadcrumb}>
            <Link to="/">Home</Link>
            <span>/</span>
            <span className={styles.curPage}>Features</span>
          </div>
          <p className={styles.phEyebrow}>Complete Feature Set</p>
          <h1 className={styles.phTitle}>
            Every Tool Your<br />
            Business <span className={styles.cr}>Needs.</span>
          </h1>
          <p className={styles.phSub}>
            From generating your first GST invoice to tracking multi-branch inventory — B-Vyapari has every feature built for real Indian businesses.
          </p>
          <div className={styles.phPills}>
            {[
              { id: 'invoicing', label: 'GST Invoicing' },
              { id: 'inventory', label: 'Inventory' },
              { id: 'customers', label: 'Customers' },
              { id: 'payments', label: 'Payments' },
              { id: 'reports', label: 'Reports' },
              { id: 'integrations', label: 'Integrations' }
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => {
                  setActivePill(pill.id)
                  scrollToSection(pill.id)
                }}
                className={`${styles.phPill} ${activePill === pill.id ? styles.on : ''}`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STICKY FEATURE NAV ═══ */}
      <div className={styles.featNav}>
        <div className={styles.featNavInner}>
          <button
            onClick={() => scrollToSection('invoicing')}
            className={`${styles.fnItem} ${activeSection === 'invoicing' ? styles.on : ''}`}
          >
            <svg viewBox="0 0 16 16"><path d="M3 2h10v12H3z" /><path d="M5 6h6M5 9h4" /></svg>
            Invoicing
          </button>
          <button
            onClick={() => scrollToSection('inventory')}
            className={`${styles.fnItem} ${activeSection === 'inventory' ? styles.on : ''}`}
          >
            <svg viewBox="0 0 16 16"><path d="M1 4h14v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4z" /><path d="M5 1v3m6-3v3" /></svg>
            Inventory
          </button>
          <button
            onClick={() => scrollToSection('customers')}
            className={`${styles.fnItem} ${activeSection === 'customers' ? styles.on : ''}`}
          >
            <svg viewBox="0 0 16 16"><circle cx="8" cy="5" r="3" /><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" /></svg>
            Customers
          </button>
          <button
            onClick={() => scrollToSection('payments')}
            className={`${styles.fnItem} ${activeSection === 'payments' ? styles.on : ''}`}
          >
            <svg viewBox="0 0 16 16"><path d="M1 5h14v8H1z" /><path d="M1 8h14" /><circle cx="5" cy="11" r="1" /></svg>
            Payments
          </button>
          <button
            onClick={() => scrollToSection('reports')}
            className={`${styles.fnItem} ${activeSection === 'reports' ? styles.on : ''}`}
          >
            <svg viewBox="0 0 16 16"><polyline points="1 12 5 8 9 10 15 4" /></svg>
            Reports
          </button>
          <button
            onClick={() => scrollToSection('integrations')}
            className={`${styles.fnItem} ${activeSection === 'integrations' ? styles.on : ''}`}
          >
            <svg viewBox="0 0 16 16"><circle cx="4" cy="4" r="2" /><circle cx="12" cy="4" r="2" /><circle cx="8" cy="12" r="2" /><path d="M4 6v2a4 4 0 008 0V6" /></svg>
            Integrations
          </button>
          <button
            onClick={() => scrollToSection('compare')}
            className={`${styles.fnItem} ${activeSection === 'compare' ? styles.on : ''}`}
          >
            <svg viewBox="0 0 16 16"><path d="M2 4h12M2 8h12M2 12h12" /></svg>
            Compare Plans
          </button>
        </div>
      </div>

      {/* ═══ SECTION 1 — INVOICING ═══ */}
      <section className={`${styles.sec} ${styles.invSec}`} id="invoicing">
        <div className={styles.secInner}>
          <p className={`${styles.eyebrow} rv`}>01 — GST Invoicing</p>
          <h2 className={`${styles.secH} rv`}>Professional Invoices<br />in Seconds.</h2>
          <p className={`${styles.secP} rv`}>
            Create fully GST-compliant invoices with automatic tax calculation. Share via WhatsApp PDF, email, or print — all from one screen.
          </p>
          <div className={styles.invGrid}>
            <div className={styles.invFeatureList} ref={invFeatureListRef}>
              {[
                {
                  id: 'if1',
                  colorClass: styles.c1,
                  title: 'Auto GST Calculation',
                  desc: 'CGST, SGST, IGST automatically split based on state. No manual math, no filing errors. Fully compliant with current GST rules.',
                  svg: (
                    <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                  )
                },
                {
                  id: 'if2',
                  colorClass: styles.c2,
                  title: 'WhatsApp Invoice Sharing',
                  desc: "One tap to send a professional PDF invoice directly to your customer's WhatsApp. No app switching, no downloads needed.",
                  svg: (
                    <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 7.68a20 20 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                  )
                },
                {
                  id: 'if3',
                  colorClass: styles.c3,
                  title: 'Custom Invoice Templates',
                  desc: 'Choose from 10+ professional templates. Add your logo, brand colors, signature, and custom terms & conditions.',
                  svg: (
                    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                  )
                },
                {
                  id: 'if4',
                  colorClass: styles.c4,
                  title: 'Recurring Invoices',
                  desc: 'Set up automatic invoice generation for repeat customers — weekly, monthly, quarterly. Never forget a billing cycle again.',
                  svg: (
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  )
                },
                {
                  id: 'if5',
                  colorClass: styles.c5,
                  title: 'E-Invoice & E-Way Bill',
                  desc: 'Generate government-registered e-invoices and e-way bills directly from B-Vyapari. Full compliance, zero paperwork.',
                  svg: (
                    <svg viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>
                  )
                }
              ].map((feat, index) => (
                <div
                  key={feat.id}
                  className={`${styles.invFeat} ${animateInvoicing ? 'vis' : ''}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`${styles.invFeatIcon} ${feat.colorClass}`}>
                    {feat.svg}
                  </div>
                  <div>
                    <div className={styles.invFeatTitle}>{feat.title}</div>
                    <div className={styles.invFeatDesc}>{feat.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Invoice mockup */}
            <div className="rv">
              <div className={styles.invoiceMockup}>
                <div className={styles.imHeader}>
                  <div className={styles.imBrand}>B-<span>Vyapari</span> Invoice</div>
                  <div className={styles.imBadge}>GST Compliant</div>
                </div>
                <div className={styles.imBody}>
                  <div className={styles.imMeta}>
                    <div>
                      <div className={styles.imMetaLabel}>Invoice No.</div>
                      <div className={styles.imMetaVal}>INV-2026-0847</div>
                    </div>
                    <div>
                      <div className={styles.imMetaLabel}>Issue Date</div>
                      <div className={styles.imMetaVal}>28 May, 2026</div>
                    </div>
                    <div>
                      <div className={styles.imMetaLabel}>Due Date</div>
                      <div className={styles.imMetaVal}>12 Jun, 2026</div>
                    </div>
                  </div>
                  <div className={styles.imTo}>
                    <div className={styles.imToLabel}>Bill To</div>
                    <div className={styles.imToName}>Ramesh Sharma</div>
                    <div className={styles.imToAddr}>Sharma Retail, MG Road, Pune — GSTIN: 27AAACS2460H1ZV</div>
                  </div>
                  <div className={styles.imTableHead}>
                    <span>Item Description</span><span>Qty</span><span>Rate</span><span>Amount</span>
                  </div>
                  <div className={styles.imRow}><span>Basmati Rice (5kg)</span><span>10</span><span>₹280</span><span>₹2,800</span></div>
                  <div className={styles.imRow}><span>Refined Oil (1L)</span><span>15</span><span>₹140</span><span>₹2,100</span></div>
                  <div className={styles.imRow}><span>Sugar (1kg)</span><span>20</span><span>₹45</span><span>₹900</span></div>
                  <div className={styles.imTotalRow}>
                    <div>
                      <div className={styles.imTotalLabel}>CGST (9%)</div>
                      <div style={{ fontSize: '.78rem', fontWeight: 600, color: '#666', marginTop: '2px' }}>₹512</div>
                    </div>
                    <div>
                      <div className={styles.imTotalLabel}>SGST (9%)</div>
                      <div style={{ fontSize: '.78rem', fontWeight: 600, color: '#666', marginTop: '2px' }}>₹512</div>
                    </div>
                    <div>
                      <div className={styles.imTotalLabel}>Total Amount</div>
                      <div className={styles.imTotalVal}>₹6,824</div>
                    </div>
                  </div>
                </div>
                <div className={styles.imFooter}>
                  <div className={styles.imFooterTxt}>Thank you for your business!</div>
                  <div className={styles.imGst}>GSTIN: 27BVYAP1234C1ZX</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2 — INVENTORY ═══ */}
      <section className={`${styles.sec} ${styles.inv2Sec}`} id="inventory">
        <div className={styles.secInner}>
          <p className={`${styles.eyebrow} rv`} style={{ color: 'var(--cr2)' }}>02 — Inventory Management</p>
          <h2 className={`${styles.secH} ${styles.w} rv`}>Always Know<br />What's in Stock.</h2>
          <p className={`${styles.secP} rv`} style={{ color: 'rgba(255,255,255,.4)' }}>
            Real-time stock tracking across all products. Automatic deduction on every sale, smart reorder alerts, and multi-location inventory support.
          </p>
          <div className={styles.inv2Grid}>
            {/* Stock mockup */}
            <div className="rv" ref={stockDashRef}>
              <div className={styles.stockDash}>
                <div className={styles.sdHead}>
                  <div className={styles.sdTitle}>Inventory Dashboard</div>
                  <div className={styles.sdDate}>As of today, 11:42 AM</div>
                </div>
                <div className={styles.sdBody}>
                  <div className={styles.sdAlert}>
                    <div className={styles.sdAlertDot}></div>
                    <div className={styles.sdAlertText}>Low Stock Alert — Action Required</div>
                    <div className={styles.sdAlertCount}>3 items</div>
                  </div>
                  <div className={styles.sdCats}>
                    <button className={`${styles.sdCat} ${styles.on}`}>All Items</button>
                    <button className={styles.sdCat}>Groceries</button>
                    <button className={styles.sdCat}>Electronics</button>
                    <button className={styles.sdCat}>Clothing</button>
                  </div>
                  <div className={styles.sdItem}>
                    <div>
                      <div className={styles.sdItemName}>Basmati Rice 5kg</div>
                      <div className={styles.sdItemSku}>SKU: GRC-001</div>
                    </div>
                    <div className={styles.sdItemQty}>248 bags</div>
                    <div>
                      <div className={styles.sdBarWrap}>
                        <div className={`${styles.sdBar} ${styles.barG}`} style={{ width: animateBars ? '82%' : '0%' }}></div>
                      </div>
                    </div>
                    <div className={`${styles.sdItemStatus} ${styles.sOk}`}>In Stock</div>
                  </div>
                  <div className={styles.sdItem}>
                    <div>
                      <div className={styles.sdItemName}>Samsung Galaxy A15</div>
                      <div className={styles.sdItemSku}>SKU: ELC-047</div>
                    </div>
                    <div className={styles.sdItemQty}>6 units</div>
                    <div>
                      <div className={styles.sdBarWrap}>
                        <div className={`${styles.sdBar} ${styles.barY}`} style={{ width: animateBars ? '18%' : '0%' }}></div>
                      </div>
                    </div>
                    <div className={`${styles.sdItemStatus} ${styles.sLow}`}>Low Stock</div>
                  </div>
                  <div className={styles.sdItem}>
                    <div>
                      <div className={styles.sdItemName}>Cotton Kurta (M)</div>
                      <div className={styles.sdItemSku}>SKU: CLT-112</div>
                    </div>
                    <div className={styles.sdItemQty}>0 pcs</div>
                    <div>
                      <div className={styles.sdBarWrap}>
                        <div className={`${styles.sdBar} ${styles.barR}`} style={{ width: animateBars ? '2%' : '0%' }}></div>
                      </div>
                    </div>
                    <div className={`${styles.sdItemStatus} ${styles.sOut}`}>Out of Stock</div>
                  </div>
                  <div className={styles.sdItem}>
                    <div>
                      <div className={styles.sdItemName}>Refined Sunflower Oil 1L</div>
                      <div className={styles.sdItemSku}>SKU: GRC-018</div>
                    </div>
                    <div className={styles.sdItemQty}>144 btl</div>
                    <div>
                      <div className={styles.sdBarWrap}>
                        <div className={`${styles.sdBar} ${styles.barG}`} style={{ width: animateBars ? '60%' : '0%' }}></div>
                      </div>
                    </div>
                    <div className={`${styles.sdItemStatus} ${styles.sOk}`}>In Stock</div>
                  </div>
                  <div className={styles.sdItem}>
                    <div>
                      <div className={styles.sdItemName}>USB-C Charging Cable</div>
                      <div className={styles.sdItemSku}>SKU: ELC-083</div>
                    </div>
                    <div className={styles.sdItemQty}>12 pcs</div>
                    <div>
                      <div className={styles.sdBarWrap}>
                        <div className={`${styles.sdBar} ${styles.barY}`} style={{ width: animateBars ? '24%' : '0%' }}></div>
                      </div>
                    </div>
                    <div className={`${styles.sdItemStatus} ${styles.sLow}`}>Low Stock</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Feature blocks */}
            <div className={styles.inv2Features}>
              <div className={`${styles.ifBlock} rv`}>
                <div className={styles.ifBlockIcon} style={{ background: 'linear-gradient(145deg,#a32438,#7A1E2C)', boxShadow: '0 4px 0 #3a0a11,inset 0 1px 0 rgba(255,255,255,.1)' }}>
                  <svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>
                </div>
                <div className={styles.ifBlockTitle}>Smart Reorder Alerts</div>
                <div className={styles.ifBlockDesc}>Set minimum stock levels per product. B-Vyapari sends instant alerts via push notification, WhatsApp, or SMS when stock dips below threshold — so you never run out.</div>
              </div>
              <div className={`${styles.ifBlock} rv rv1`}>
                <div className={styles.ifBlockIcon} style={{ background: 'linear-gradient(145deg,#15803d,#0a4a24)', boxShadow: '0 4px 0 #021a0c,inset 0 1px 0 rgba(255,255,255,.1)' }}>
                  <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <div className={styles.ifBlockTitle}>Multi-Location Stock</div>
                <div className={styles.ifBlockDesc}>Manage inventory across multiple branches or warehouses from one dashboard. Transfer stock between locations with a single click and full audit trail.</div>
              </div>
              <div className={`${styles.ifBlock} rv rv2`}>
                <div className={styles.ifBlockIcon} style={{ background: 'linear-gradient(145deg,#1e40af,#0d1f5c)', boxShadow: '0 4px 0 #050e2a,inset 0 1px 0 rgba(255,255,255,.1)' }}>
                  <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                </div>
                <div className={styles.ifBlockTitle}>Barcode & QR Scanner</div>
                <div className={styles.ifBlockDesc}>Scan product barcodes using your phone camera to instantly add items to bills or update stock. Works with all standard barcode formats.</div>
              </div>
              <div className={`${styles.ifBlock} rv rv3`}>
                <div className={styles.ifBlockIcon} style={{ background: 'linear-gradient(145deg,#b45309,#7c3500)', boxShadow: '0 4px 0 #3a1800,inset 0 1px 0 rgba(255,255,255,.1)' }}>
                  <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                </div>
                <div className={styles.ifBlockTitle}>Bulk Import / Export</div>
                <div className={styles.ifBlockDesc}>Import your entire product catalogue from Excel or CSV in one click. Export inventory reports for accounting or auditing anytime.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3 — CUSTOMERS ═══ */}
      <section className={`${styles.sec} ${styles.custSec}`} id="customers">
        <div className={styles.secInner}>
          <p className={`${styles.eyebrow} rv`}>03 — Customer Management</p>
          <h2 className={`${styles.secH} rv`}>Know Every<br />Customer Better.</h2>
          <p className={`${styles.secP} rv`}>Complete 360° customer profiles with full transaction history, outstanding dues, contact details, and business insights — all in one place.</p>
          <div className={styles.custGrid}>
            <div className={`${styles.custCard} rv`}>
              <div className={`${styles.icon3} ${styles.i3Red}`}>
                <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
              </div>
              <div className={styles.custCardTitle}>Customer Profiles</div>
              <div className={styles.custCardDesc}>Full profiles with name, mobile, GSTIN, address, credit limit, and billing history. Tag customers as retail, wholesale, or VIP.</div>
              <span className={styles.custCardTag}>All Plans</span>
            </div>
            <div className={`${styles.custCard} rv rv1`}>
              <div className={`${styles.icon3} ${styles.i3Navy}`}>
                <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 7.68a20 20 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              </div>
              <div className={styles.custCardTitle}>Payment Reminders</div>
              <div className={styles.custCardDesc}>Automated WhatsApp reminders for overdue payments. Set custom reminder schedules — 7 days, 3 days, day of due date.</div>
              <span className={styles.custCardTag}>Pro & Business</span>
            </div>
            <div className={`${styles.custCard} rv rv2`}>
              <div className={`${styles.icon3} ${styles.i3Green}`}>
                <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
              </div>
              <div className={styles.custCardTitle}>Purchase History</div>
              <div className={styles.custCardDesc}>See every invoice, payment, and return for each customer. Filter by date range, amount, or product category.</div>
              <span className={styles.custCardTag}>All Plans</span>
            </div>
            <div className={`${styles.custCard} rv`}>
              <div className={`${styles.icon3} ${styles.i3Amber}`}>
                <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
              </div>
              <div className={styles.custCardTitle}>Credit Limit Control</div>
              <div className={styles.custCardDesc}>Set and enforce credit limits per customer. Get warnings when a customer exceeds their limit before generating a new invoice.</div>
              <span className={styles.custCardTag}>Pro & Business</span>
            </div>
            <div className={`${styles.custCard} rv rv1`}>
              <div className={`${styles.icon3} ${styles.i3Teal}`}>
                <svg viewBox="0 0 24 24"><path d="M23 7l-7 5-7-5M1 7l7 5 7-5M1 7v10a2 2 0 002 2h18a2 2 0 002-2V7" /></svg>
              </div>
              <div className={styles.custCardTitle}>Bulk SMS & WhatsApp</div>
              <div className={styles.custCardDesc}>Send offers, festival greetings, or payment reminders to all customers at once. Segment by category, location, or purchase value.</div>
              <span className={styles.custCardTag}>Business Only</span>
            </div>
            <div className={`${styles.custCard} rv rv2`}>
              <div className={`${styles.icon3} ${styles.i3Purple}`}>
                <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
              </div>
              <div className={styles.custCardTitle}>Customer Ledger</div>
              <div className={styles.custCardDesc}>Auto-generated ledger for every customer. Share a clean account statement via WhatsApp or email with one tap.</div>
              <span className={styles.custCardTag}>All Plans</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4 — PAYMENTS ═══ */}
      <section className={`${styles.sec} ${styles.paySec}`} id="payments">
        <div className={styles.secInner}>
          <p className={`${styles.eyebrow} rv`} style={{ color: 'var(--cr2)' }}>04 — Payment Tracking</p>
          <h2 className={`${styles.secH} ${styles.w} rv`}>Every Rupee,<br />Accounted For.</h2>
          <p className={`${styles.secP} rv`} style={{ color: 'rgba(255,255,255,.4)' }}>Track UPI, cash, credit, and card payments in real time. Reconcile accounts automatically and never miss a payment again.</p>
          <div className={styles.payGrid}>
            <div className={styles.payFeatures}>
              {[
                { num: '01', title: 'Multi-Mode Payment Tracking', desc: 'Record UPI (PhonePe, GPay, Paytm), cash, cheque, NEFT/RTGS, and card payments. Auto-reconcile with your bank statement.' },
                { num: '02', title: 'Partial Payment Support', desc: 'Accept advance payments and partial settlements. Track remaining balances automatically. Clear visibility of who owes what.' },
                { num: '03', title: 'UPI Payment Link', desc: 'Generate a UPI payment link or QR code directly from any invoice. Share it on WhatsApp and let customers pay instantly.' },
                { num: '04', title: 'Overdue Management', desc: 'See all overdue invoices in one dashboard sorted by age. Send reminder messages with a single tap and track response rates.' },
                { num: '05', title: 'Daily Cash Flow Report', desc: "See today's collections, pending payments, and net cash position at a glance. End-of-day reconciliation made effortless." }
              ].map((feat) => (
                <div key={feat.num} className={`${styles.payFeat} rv`}>
                  <div className={styles.payFeatNum}>{feat.num}</div>
                  <div>
                    <div className={styles.payFeatTitle}>{feat.title}</div>
                    <div className={styles.payFeatDesc}>{feat.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment tracker mockup */}
            <div className="rv">
              <div className={styles.payDash}>
                <div className={styles.pdHead}>
                  <div className={styles.pdTitle}>Payment Tracker — May 2026</div>
                  <select className={styles.pdFilter}><option>This Month</option></select>
                </div>
                <div className={styles.pdBody}>
                  <div className={styles.pdSummary}>
                    <div className={styles.pdSumCard}>
                      <div className={styles.pdSumLabel}>Collected</div>
                      <div className={`${styles.pdSumVal} ${styles.g}`}>₹1.24L</div>
                    </div>
                    <div className={styles.pdSumCard}>
                      <div className={styles.pdSumLabel}>Pending</div>
                      <div className={`${styles.pdSumVal} ${styles.w}`}>₹18,400</div>
                    </div>
                    <div className={styles.pdSumCard}>
                      <div className={styles.pdSumLabel}>Overdue</div>
                      <div className={`${styles.pdSumVal} ${styles.r}`}>₹6,200</div>
                    </div>
                  </div>
                  <div className={styles.pdTxnHead}>
                    <span>Customer</span><span>Amount</span><span>Method</span><span>Status</span>
                  </div>
                  <div className={styles.pdRow}>
                    <span className={styles.pdName}>Ramesh Sharma</span>
                    <span style={{ color: '#fff', fontWeight: 600 }}>₹2,340</span>
                    <span className={styles.pdMethod}><span className={styles.upiBadge}>UPI</span></span>
                    <span><span className={`${styles.pdBadge} ${styles.pbP}`}>Paid</span></span>
                  </div>
                  <div className={styles.pdRow}>
                    <span className={styles.pdName}>Priya Stores</span>
                    <span style={{ color: '#fff', fontWeight: 600 }}>₹890</span>
                    <span className={styles.pdMethod}><span className={styles.cashBadge}>Cash</span></span>
                    <span><span className={`${styles.pdBadge} ${styles.pbP}`}>Paid</span></span>
                  </div>
                  <div className={styles.pdRow}>
                    <span className={styles.pdName}>Raju Retail</span>
                    <span style={{ color: '#fff', fontWeight: 600 }}>₹1,200</span>
                    <span className={styles.pdMethod}><span className={styles.creditBadge}>Credit</span></span>
                    <span><span className={`${styles.pdBadge} ${styles.pbW}`}>Pending</span></span>
                  </div>
                  <div className={styles.pdRow}>
                    <span className={styles.pdName}>Sita Fabrics</span>
                    <span style={{ color: '#fff', fontWeight: 600 }}>₹4,500</span>
                    <span className={styles.pdMethod}><span className={styles.upiBadge}>UPI</span></span>
                    <span><span className={`${styles.pdBadge} ${styles.pbR}`}>Overdue</span></span>
                  </div>
                  <div className={styles.pdRow}>
                    <span className={styles.pdName}>Mohan Electronics</span>
                    <span style={{ color: '#fff', fontWeight: 600 }}>₹8,200</span>
                    <span className={styles.pdMethod}><span className={styles.cashBadge}>Cash</span></span>
                    <span><span className={`${styles.pdBadge} ${styles.pbP}`}>Paid</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5 — REPORTS ═══ */}
      <section className={`${styles.sec} ${styles.repSec}`} id="reports">
        <div className={styles.secInner}>
          <p className={`${styles.eyebrow} rv`}>05 — Sales Reports & Analytics</p>
          <h2 className={`${styles.secH} rv`}>Data That Drives<br />Better Decisions.</h2>
          <p className={`${styles.secP} rv`}>Understand your business deeply with visual reports covering sales, profit margins, customer behavior, and inventory turnover — in real time.</p>
          <div className={styles.repGrid}>
            {/* Chart mockup */}
            <div className="rv">
              <div className={styles.chartDash}>
                <div className={styles.cdHead}>
                  <div className={styles.cdTitle}>Sales Analytics</div>
                  <select className={styles.cdPeriod}><option>Last 7 Days</option></select>
                </div>
                <div className={styles.cdBody}>
                  <div className={styles.cdTabs}>
                    {(['Revenue', 'Orders', 'Profit', 'Customers'] as TabName[]).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${styles.cdTab} ${activeTab === tab ? styles.on : ''}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className={styles.cdTopRow}>
                    {currentTab.kpis.map((kpi, idx) => (
                      <div key={idx} className={styles.cdKpi}>
                        <div className={styles.cdKpiVal}>{kpi.val}</div>
                        <div className={styles.cdKpiLabel}>{kpi.label}</div>
                        <div className={styles.cdKpiDelta}>{kpi.delta}</div>
                      </div>
                    ))}
                  </div>
                  <svg className={styles.barChart} viewBox="0 0 340 110" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7A1E2C" />
                        <stop offset="100%" stopColor="#5a1520" />
                      </linearGradient>
                    </defs>
                    {currentTab.bars.map((bar, i) => (
                      <rect
                        key={i}
                        x={10 + i * 48}
                        y={bar.y}
                        width="34"
                        height={bar.height}
                        rx="2"
                        fill="url(#barGrad)"
                        opacity={bar.opacity}
                        className={styles.bcBar}
                      />
                    ))}
                    <circle
                      cx={10 + currentTab.peakIndex * 48 + 17}
                      cy={currentTab.bars[currentTab.peakIndex].y - 4}
                      r="4"
                      fill="#4ade80"
                    />
                    <text
                      x={10 + currentTab.peakIndex * 48 + 17}
                      y={currentTab.bars[currentTab.peakIndex].y - 12}
                      fontSize="8"
                      fill="#4ade80"
                      textAnchor="middle"
                      fontFamily="DM Sans, sans-serif"
                    >
                      {currentTab.peakText}
                    </text>
                  </svg>
                  <div className={styles.bcLabels}>
                    <span className={styles.bcLabel}>Mon</span>
                    <span className={styles.bcLabel}>Tue</span>
                    <span className={styles.bcLabel}>Wed</span>
                    <span className={styles.bcLabel}>Thu</span>
                    <span className={styles.bcLabel}>Fri</span>
                    <span className={styles.bcLabel}>Sat</span>
                    <span className={styles.bcLabel}>Sun</span>
                  </div>
                  <div className={styles.cdLegend}>
                    <div className={styles.cdLegItem}><div className={styles.cdLegDot} style={{ background: 'var(--cr)' }}></div> {activeTab}</div>
                    <div className={styles.cdLegItem}><div className={styles.cdLegDot} style={{ background: '#4ade80' }}></div> Peak Day</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Feature list */}
            <div className={styles.repFeats}>
              <div className={`${styles.rfItem} rv`}>
                <div className={styles.rfIcon} style={{ background: 'linear-gradient(145deg,#a32438,#7A1E2C)', boxShadow: '0 5px 0 #3a0a11' }}>
                  <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                </div>
                <div>
                  <div className={styles.rfTitle}>Real-Time Sales Dashboard</div>
                  <div className={styles.rfDesc}>Live revenue, order count, and average order value updating as sales happen throughout the day.</div>
                </div>
              </div>
              <div className={`${styles.rfItem} rv rv1`}>
                <div className={styles.rfIcon} style={{ background: 'linear-gradient(145deg,#1e40af,#0d1f5c)', boxShadow: '0 5px 0 #050e2a' }}>
                  <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                </div>
                <div>
                  <div className={styles.rfTitle}>Product Performance Report</div>
                  <div className={styles.rfDesc}>See which products sell most, generate the highest margin, and which are slow-moving. Make smarter stocking decisions.</div>
                </div>
              </div>
              <div className={`${styles.rfItem} rv rv2`}>
                <div className={styles.rfIcon} style={{ background: 'linear-gradient(145deg,#15803d,#0a4a24)', boxShadow: '0 5px 0 #021a0c' }}>
                  <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
                </div>
                <div>
                  <div className={styles.rfTitle}>Customer Insights</div>
                  <div className={styles.rfDesc}>Identify your top customers by revenue, frequency, and payment behaviour. Focus retention efforts where it matters most.</div>
                </div>
              </div>
              <div className={`${styles.rfItem} rv rv3`}>
                <div className={styles.rfIcon} style={{ background: 'linear-gradient(145deg,#b45309,#7c3500)', boxShadow: '0 5px 0 #3a1800' }}>
                  <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                </div>
                <div>
                  <div className={styles.rfTitle}>Export to Excel / PDF</div>
                  <div className={styles.rfDesc}>Export any report to Excel or PDF with one click. Share with your CA, bank, or business partner instantly.</div>
                </div>
              </div>
              <div className={`${styles.rfItem} rv`}>
                <div className={styles.rfIcon} style={{ background: 'linear-gradient(145deg,#0d9488,#134e4a)', boxShadow: '0 5px 0 #042f2e' }}>
                  <svg viewBox="0 0 24 24"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" /><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" /><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" /><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" /><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" /><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" /><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" /><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" /></svg>
                </div>
                <div>
                  <div className={styles.rfTitle}>GST Summary Report</div>
                  <div className={styles.rfDesc}>Automatically generated GSTR-1 and GSTR-3B summary. Hand it to your CA and file returns without stress.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6 — INTEGRATIONS ═══ */}
      <section className={`${styles.sec} ${styles.integSec}`} id="integrations">
        <div className={styles.secInner}>
          <p className={`${styles.eyebrow} rv`}>06 — Integrations</p>
          <h2 className={`${styles.secH} rv`}>Connects With<br />Tools You Use.</h2>
          <p className={`${styles.secP} rv`}>B-Vyapari plugs into the apps your business already runs on — payments, accounting, e-commerce, and more.</p>
          <div className={styles.integGrid}>
            <div className={`${styles.integCard} rv`}>
              <div className={styles.integLogoBox} style={{ background: 'linear-gradient(145deg,#5f259f,#3d1063)', boxShadow: '0 4px 0 rgba(0,0,0,.2)' }}>📱</div>
              <div className={styles.integName}>PhonePe</div>
              <div className={styles.integDesc}>Accept UPI payments and auto-reconcile with invoices. Payment confirmation updates B-Vyapari instantly.</div>
              <div className={`${styles.integStatus} ${styles.isLive}`}><div className={`${styles.isDot} ${styles.dotLive}`}></div> Live</div>
            </div>
            <div className={`${styles.integCard} rv rv1`}>
              <div className={styles.integLogoBox} style={{ background: 'linear-gradient(145deg,#00a86b,#006b44)', boxShadow: '0 4px 0 rgba(0,0,0,.2)' }}>💚</div>
              <div className={styles.integName}>Google Pay</div>
              <div className={styles.integDesc}>GPay UPI payments linked to invoices. Mark as paid automatically when payment is received on your UPI ID.</div>
              <div className={`${styles.integStatus} ${styles.isLive}`}><div className={`${styles.isDot} ${styles.dotLive}`}></div> Live</div>
            </div>
            <div className={`${styles.integCard} rv rv2`}>
              <div className={styles.integLogoBox} style={{ background: 'linear-gradient(145deg,#00a0e3,#005fa3)', boxShadow: '0 4px 0 rgba(0,0,0,.2)' }}>💙</div>
              <div className={styles.integName}>Paytm</div>
              <div className={styles.integDesc}>Generate Paytm payment links inside invoices. All collections tracked in your B-Vyapari dashboard automatically.</div>
              <div className={`${styles.integStatus} ${styles.isLive}`}><div className={`${styles.isDot} ${styles.dotLive}`}></div> Live</div>
            </div>
            <div className={`${styles.integCard} rv rv3`}>
              <div className={styles.integLogoBox} style={{ background: 'linear-gradient(145deg,#1f9a3e,#0d5c22)', boxShadow: '0 4px 0 rgba(0,0,0,.2)' }}>📊</div>
              <div className={styles.integName}>Tally ERP</div>
              <div className={styles.integDesc}>Sync B-Vyapari invoices and vouchers directly with Tally. No double data entry. Your CA will thank you.</div>
              <div className={`${styles.integStatus} ${styles.isBeta}`}><div className={`${styles.isDot} ${styles.dotBeta}`}></div> Beta</div>
            </div>
            <div className={`${styles.integCard} rv`}>
              <div className={styles.integLogoBox} style={{ background: 'linear-gradient(145deg,#25d366,#128c2e)', boxShadow: '0 4px 0 rgba(0,0,0,.2)' }}>💬</div>
              <div className={styles.integName}>WhatsApp Business</div>
              <div className={styles.integDesc}>Send invoices, payment reminders, and offers via WhatsApp Business API. Verified sender badge included.</div>
              <div className={`${styles.integStatus} ${styles.isLive}`}><div className={`${styles.isDot} ${styles.dotLive}`}></div> Live</div>
            </div>
            <div className={`${styles.integCard} rv rv1`}>
              <div className={styles.integLogoBox} style={{ background: 'linear-gradient(145deg,#f97316,#c2410c)', boxShadow: '0 4px 0 rgba(0,0,0,.2)' }}>🛒</div>
              <div className={styles.integName}>Amazon / Flipkart</div>
              <div className={styles.integDesc}>Import online orders from Amazon Seller and Flipkart Seller. Auto-generate invoices and update inventory.</div>
              <div className={`${styles.integStatus} ${styles.isBeta}`}><div className={`${styles.isDot} ${styles.dotBeta}`}></div> Beta</div>
            </div>
            <div className={`${styles.integCard} rv rv2`}>
              <div className={styles.integLogoBox} style={{ background: 'linear-gradient(145deg,#2563eb,#1e3a8a)', boxShadow: '0 4px 0 rgba(0,0,0,.2)' }}>📧</div>
              <div className={styles.integName}>Email (SMTP)</div>
              <div className={styles.integDesc}>Send invoices directly from your own business email via Gmail, Outlook, or any SMTP provider. Fully branded.</div>
              <div className={`${styles.integStatus} ${styles.isLive}`}><div className={`${styles.isDot} ${styles.dotLive}`}></div> Live</div>
            </div>
            <div className={`${styles.integCard} rv rv3`}>
              <div className={styles.integLogoBox} style={{ background: 'linear-gradient(145deg,#6366f1,#4338ca)', boxShadow: '0 4px 0 rgba(0,0,0,.2)' }}>🔗</div>
              <div className={styles.integName}>Shopify / WooCommerce</div>
              <div className={styles.integDesc}>Sync your online store with B-Vyapari. Orders auto-imported, inventory synced, GST invoices auto-generated.</div>
              <div className={`${styles.integStatus} ${styles.isSoon}`}><div className={`${styles.isDot} ${styles.dotSoon}`}></div> Coming Soon</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7 — COMPARISON TABLE ═══ */}
      <section className={`${styles.sec} ${styles.compSec}`} id="compare">
        <div className={styles.secInner}>
          <p className={`${styles.eyebrow} rv`} style={{ color: 'var(--cr2)' }}>07 — Plan Comparison</p>
          <h2 className={`${styles.secH} ${styles.w} rv`}>What's Included<br />in Each Plan.</h2>
          <div className={`${styles.compTable} rv`}>
            {/* Header */}
            <div className={styles.ctHead}>
              <div className={styles.ctHeadCell}>Feature</div>
              <div className={`${styles.ctHeadCell} ${styles.hStarter}`}>Starter (Free)</div>
              <div className={`${styles.ctHeadCell} ${styles.hPro}`}>Pro — ₹99/mo</div>
              <div className={`${styles.ctHeadCell} ${styles.hBiz}`}>Business — ₹199/mo</div>
            </div>

            {/* Invoicing category */}
            <div className={`${styles.ctRow} ${styles.catRow}`}>
              <div className={`${styles.ctCell} ${styles.catLabel}`} style={{ gridColumn: '1/-1' }}>Invoicing & Billing</div>
            </div>
            <div className={styles.ctRow} data-label="GST Invoices">
              <div className={`${styles.ctCell} ${styles.featName}`}>GST Invoices</div>
              <div className={styles.ctCell}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg><span className={styles.lim}>50/month</span></div>
              <div className={`${styles.ctCell} ${styles.hProCol}`}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg><span className={styles.lim}>Unlimited</span></div>
              <div className={styles.ctCell}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg><span className={styles.lim}>Unlimited</span></div>
            </div>
            <div className={styles.ctRow} data-label="Custom Invoice Templates">
              <div className={`${styles.ctCell} ${styles.featName}`}>Custom Invoice Templates</div>
              <div className={styles.ctCell}><svg className={styles.partial} viewBox="0 0 16 16"><line x1="3" y1="8" x2="13" y2="8" /></svg><span className={styles.lim}>2 templates</span></div>
              <div className={`${styles.ctCell} ${styles.hProCol}`}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg><span className={styles.lim}>10+ templates</span></div>
              <div className={styles.ctCell}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg><span className={styles.lim}>Custom branding</span></div>
            </div>
            <div className={styles.ctRow} data-label="Recurring Invoices">
              <div className={`${styles.ctCell} ${styles.featName}`}>Recurring Invoices</div>
              <div className={styles.ctCell}><svg className={styles.cross} viewBox="0 0 16 16"><line x1="4" y1="4" x2="12" y2="12" /><line x1="12" y1="4" x2="4" y2="12" /></svg></div>
              <div className={`${styles.ctCell} ${styles.hProCol}`}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg></div>
              <div className={styles.ctCell}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg></div>
            </div>
            <div className={styles.ctRow} data-label="E-Invoice & E-Way Bill">
              <div className={`${styles.ctCell} ${styles.featName}`}>E-Invoice & E-Way Bill</div>
              <div className={styles.ctCell}><svg className={styles.cross} viewBox="0 0 16 16"><line x1="4" y1="4" x2="12" y2="12" /><line x1="12" y1="4" x2="4" y2="12" /></svg></div>
              <div className={`${styles.ctCell} ${styles.hProCol}`}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg></div>
              <div className={styles.ctCell}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg></div>
            </div>

            {/* Inventory */}
            <div className={`${styles.ctRow} ${styles.catRow}`}>
              <div className={`${styles.ctCell} ${styles.catLabel}`} style={{ gridColumn: '1/-1' }}>Inventory Management</div>
            </div>
            <div className={styles.ctRow} data-label="Product Catalogue">
              <div className={`${styles.ctCell} ${styles.featName}`}>Product Catalogue</div>
              <div className={styles.ctCell}><svg className={styles.partial} viewBox="0 0 16 16"><line x1="3" y1="8" x2="13" y2="8" /></svg><span className={styles.lim}>100 items</span></div>
              <div className={`${styles.ctCell} ${styles.hProCol}`}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg><span className={styles.lim}>Unlimited</span></div>
              <div className={styles.ctCell}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg><span className={styles.lim}>Unlimited</span></div>
            </div>
            <div className={styles.ctRow} data-label="Low Stock Alerts">
              <div className={`${styles.ctCell} ${styles.featName}`}>Low Stock Alerts</div>
              <div className={styles.ctCell}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg></div>
              <div className={`${styles.ctCell} ${styles.hProCol}`}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg></div>
              <div className={styles.ctCell}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg></div>
            </div>
            <div className={styles.ctRow} data-label="Multi-Location Stock">
              <div className={`${styles.ctCell} ${styles.featName}`}>Multi-Location Stock</div>
              <div className={styles.ctCell}><svg className={styles.cross} viewBox="0 0 16 16"><line x1="4" y1="4" x2="12" y2="12" /><line x1="12" y1="4" x2="4" y2="12" /></svg></div>
              <div className={`${styles.ctCell} ${styles.hProCol}`}><svg className={styles.cross} viewBox="0 0 16 16"><line x1="4" y1="4" x2="12" y2="12" /><line x1="12" y1="4" x2="4" y2="12" /></svg></div>
              <div className={styles.ctCell}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg><span className={styles.lim}>Up to 5 branches</span></div>
            </div>

            {/* Reports */}
            <div className={`${styles.ctRow} ${styles.catRow}`}>
              <div className={`${styles.ctCell} ${styles.catLabel}`} style={{ gridColumn: '1/-1' }}>Reports & Analytics</div>
            </div>
            <div className={styles.ctRow} data-label="Sales Reports">
              <div className={`${styles.ctCell} ${styles.featName}`}>Sales Reports</div>
              <div className={styles.ctCell}><svg className={styles.partial} viewBox="0 0 16 16"><line x1="3" y1="8" x2="13" y2="8" /></svg><span className={styles.lim}>Basic</span></div>
              <div className={`${styles.ctCell} ${styles.hProCol}`}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg><span className={styles.lim}>Advanced</span></div>
              <div className={styles.ctCell}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg><span className={styles.lim}>Full Analytics</span></div>
            </div>
            <div className={styles.ctRow} data-label="GST Filing Report">
              <div className={`${styles.ctCell} ${styles.featName}`}>GST Filing Report</div>
              <div className={styles.ctCell}><svg className={styles.cross} viewBox="0 0 16 16"><line x1="4" y1="4" x2="12" y2="12" /><line x1="12" y1="4" x2="4" y2="12" /></svg></div>
              <div className={`${styles.ctCell} ${styles.hProCol}`}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg></div>
              <div className={styles.ctCell}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg></div>
            </div>

            {/* Team */}
            <div className={`${styles.ctRow} ${styles.catRow}`}>
              <div className={`${styles.ctCell} ${styles.catLabel}`} style={{ gridColumn: '1/-1' }}>Team & Access</div>
            </div>
            <div className={styles.ctRow} data-label="Staff Accounts">
              <div className={`${styles.ctCell} ${styles.featName}`}>Staff Accounts</div>
              <div className={styles.ctCell}><svg className={styles.cross} viewBox="0 0 16 16"><line x1="4" y1="4" x2="12" y2="12" /><line x1="12" y1="4" x2="4" y2="12" /></svg></div>
              <div className={`${styles.ctCell} ${styles.hProCol}`}><svg className={styles.partial} viewBox="0 0 16 16"><line x1="3" y1="8" x2="13" y2="8" /></svg><span className={styles.lim}>2 users</span></div>
              <div className={styles.ctCell}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg><span className={styles.lim}>10 users</span></div>
            </div>
            <div className={styles.ctRow} data-label="API Access">
              <div className={`${styles.ctCell} ${styles.featName}`}>API Access</div>
              <div className={styles.ctCell}><svg className={styles.cross} viewBox="0 0 16 16"><line x1="4" y1="4" x2="12" y2="12" /><line x1="12" y1="4" x2="4" y2="12" /></svg></div>
              <div className={`${styles.ctCell} ${styles.hProCol}`}><svg className={styles.cross} viewBox="0 0 16 16"><line x1="4" y1="4" x2="12" y2="12" /><line x1="12" y1="4" x2="4" y2="12" /></svg></div>
              <div className={styles.ctCell}><svg className={styles.check} viewBox="0 0 16 16"><polyline points="3,8 6,11 13,4" /></svg></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA BAND ═══ */}
      <div className={styles.ctaBand}>
        <div className={styles.ctaBandInner}>
          <div className={styles.ctaBandText}>
            <h2>Ready to Transform<br />Your Business?</h2>
            <p>Start free today. No credit card required. Setup in under 60 seconds.</p>
          </div>
          <div className={styles.ctaBandBtns}>
            <Link to="/start-free" className={styles.btnWhite}>Start Free Trial</Link>
            <Link to="/pricing" className={styles.btnOutlineW}>View Pricing</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
