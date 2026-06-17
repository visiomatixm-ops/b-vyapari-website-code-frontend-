import { useEffect } from 'react'
import './HomePage.css'

export default function HomePage() {
  useEffect(() => {
    document.title = 'B-Vyapari – Empowering Indian Businesses with Smart Billing & Inventory Management'
    const desc = document.querySelector('meta[name="description"]')
    if (desc) {
      desc.setAttribute('content', "B-Vyapari is India's best free billing software for retail stores, business owners & small businesses. Create GST invoices, manage inventory, track payments & grow your business. Trusted by 10,000+ shops. Free forever plan available.")
    }

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

    // Delay slightly to ensure DOM elements inside dangerouslySetInnerHTML are fully mounted
    const timer = setTimeout(() => {
      document.querySelectorAll('.js-count-up').forEach((el) => observer.observe(el))
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  const html = `
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-noise"></div>
  <div class="orb orb1"></div>
  <div class="orb orb2"></div>

  <div class="hero-inner">
    <div class="hero-left">
      <div class="hero-tag"><div class="tag-dot"></div> India's #1 Billing Software</div>
      <h1 class="hero-h1">Smart<br><span class="outline">Billing</span><br>for Every<br><span class="cr">Business.</span></h1>
      <p class="hero-sub">Create <strong>professional invoices</strong>, manage customers, track inventory, and grow your business — all in one powerful platform built for every Indian shopkeeper.</p>
      <div class="hero-btns">
        <a href="/start-free" class="btn-hero-main"><span>Start Free Today</span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 7h10M7 2l5 5-5 5"/></svg></a>
      </div>
      <div class="hero-stats">
        <div class="hstat">
          <div class="hstat-num js-count-up" data-target="10" data-suffix="K+">0<span>K+</span></div>
          <div class="hstat-label">Active Businesses</div>
        </div>
        <div class="hstat">
          <div class="hstat-num js-count-up" data-target="250" data-suffix="L+">0<span>L+</span></div>
          <div class="hstat-label">Bills Generated</div>
        </div>
        <div class="hstat">
          <div class="hstat-num js-count-up" data-target="4.9" data-suffix="★" data-decimals="1">0<span>★</span></div>
          <div class="hstat-label">App Store Rating</div>
        </div>
      </div>
    </div>

    <div class="hero-right">
      <div class="dash-wrap">
        <div class="dash-card">
          <div class="dash-titlebar">
            <div class="dtb-dots"><div class="dtb-dot"></div><div class="dtb-dot"></div><div class="dtb-dot"></div></div>
            <div class="dtb-name">B-Vyapari Dashboard</div>
          </div>
          <div class="dash-body">
            <div class="dash-sidebar">
              <div class="ds-logo">B-<span>Vyapari</span></div>
              <div class="ds-item on"><svg viewBox="0 0 16 16"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>Dashboard</div>
              <div class="ds-item"><svg viewBox="0 0 16 16"><path d="M2 4h12M2 8h12M2 12h7"/></svg>Invoices</div>
              <div class="ds-item"><svg viewBox="0 0 16 16"><circle cx="8" cy="7" r="4"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>Customers</div>
              <div class="ds-item"><svg viewBox="0 0 16 16"><path d="M1 4h14v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4z"/><path d="M5 1v3m6-3v3"/></svg>Inventory</div>
              <div class="ds-item"><svg viewBox="0 0 16 16"><polyline points="1 11 5 7 9 9 15 3"/></svg>Reports</div>
              <div class="ds-item"><svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 1"/></svg>Payments</div>
            </div>
            <div class="dash-main">
              <div class="dm-header">
                <div class="dm-title">Today's Overview</div>
                <button class="dm-btn">+ New Invoice</button>
              </div>
              <div class="dm-metrics">
                <div class="dm-metric">
                  <div class="dm-m-label">Revenue</div>
                  <div class="dm-m-val g">₹8,420</div>
                  <div class="sparkline"><div class="sp-bar" style="height:40%"></div><div class="sp-bar" style="height:60%"></div><div class="sp-bar" style="height:45%"></div><div class="sp-bar" style="height:80%"></div><div class="sp-bar hi" style="height:100%"></div></div>
                </div>
                <div class="dm-metric">
                  <div class="dm-m-label">Invoices</div>
                  <div class="dm-m-val w">24</div>
                  <div class="sparkline"><div class="sp-bar" style="height:50%"></div><div class="sp-bar" style="height:70%"></div><div class="sp-bar" style="height:55%"></div><div class="sp-bar hi" style="height:90%"></div><div class="sp-bar" style="height:75%"></div></div>
                </div>
                <div class="dm-metric">
                  <div class="dm-m-label">Overdue</div>
                  <div class="dm-m-val r">₹1,200</div>
                  <div class="sparkline"><div class="sp-bar hi" style="height:90%"></div><div class="sp-bar" style="height:70%"></div><div class="sp-bar" style="height:50%"></div><div class="sp-bar" style="height:60%"></div><div class="sp-bar" style="height:40%"></div></div>
                </div>
              </div>
              <div class="dm-table-head"><span>Customer</span><span>Amount</span><span>Date</span><span>Status</span></div>
              <div class="dm-row"><span>Ramesh Sharma</span><span>₹2,340</span><span>Today</span><span><span class="badge b-p">Paid</span></span></div>
              <div class="dm-row"><span>Sita Devi</span><span>₹890</span><span>Today</span><span><span class="badge b-w">Pending</span></span></div>
              <div class="dm-row"><span>Raju Gupta</span><span>₹1,200</span><span>Yesterday</span><span><span class="badge b-r">Overdue</span></span></div>
              <div class="dm-row"><span>Priya Store</span><span>₹3,990</span><span>Yesterday</span><span><span class="badge b-p">Paid</span></span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="float-card fc2"><div class="fc-label">Monthly Growth</div><div class="fc-val">+34%</div><div class="fc-sub">↑ vs last month</div></div>
      <div class="float-card fc1"><div class="fc-label">GST Filed</div><div class="fc-val">Auto ✓</div><div class="fc-sub">Zero manual work</div></div>
    </div>
  </div>
</section>

<div class="strip">
  <div class="strip-inner">
    <span class="strip-item">GST Billing</span>
    <span class="strip-sep"></span>
    <span class="strip-item">Inventory Management</span>
    <span class="strip-sep"></span>
    <span class="strip-item">Payment Tracking</span>
    <span class="strip-sep"></span>
    <span class="strip-item">Sales Reports</span>
    <span class="strip-sep"></span>
    <span class="strip-item">WhatsApp Integration</span>
    <span class="strip-sep"></span>
    <span class="strip-item">Multi-Branch</span>
    <span class="strip-sep"></span>
    <span class="strip-item">Cloud Sync</span>
    <span class="strip-sep"></span>
    <span class="strip-item">UPI Payments</span>
    <span class="strip-sep"></span>
  </div>
  <div class="strip-inner" aria-hidden="true">
    <span class="strip-item">GST Billing</span>
    <span class="strip-sep"></span>
    <span class="strip-item">Inventory Management</span>
    <span class="strip-sep"></span>
    <span class="strip-item">Payment Tracking</span>
    <span class="strip-sep"></span>
    <span class="strip-item">Sales Reports</span>
    <span class="strip-sep"></span>
    <span class="strip-item">WhatsApp Integration</span>
    <span class="strip-sep"></span>
    <span class="strip-item">Multi-Branch</span>
    <span class="strip-sep"></span>
    <span class="strip-item">Cloud Sync</span>
    <span class="strip-sep"></span>
    <span class="strip-item">UPI Payments</span>
    <span class="strip-sep"></span>
  </div>
</div>

<section class="section features-sec" id="features">
  <div class="sec-inner">
    <p class="eyebrow rv">Everything You Need</p>
    <h2 class="sec-title rv rv-d1">One Platform,<br>Complete Control.</h2>
    <div class="features-grid">
      <div class="feat-card rv">
        <div class="feat-num">01</div>
        <div class="icon-3d"><div class="icon-3d-face red"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div></div>
        <h3 class="feat-name">GST Invoicing</h3>
        <p class="feat-desc">Generate professional GST-compliant invoices in seconds. Auto-calculate taxes, share via WhatsApp PDF instantly.</p>
      </div>
      <div class="feat-card rv rv-d1">
        <div class="feat-num">02</div>
        <div class="icon-3d"><div class="icon-3d-face dark"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg></div></div>
        <h3 class="feat-name">Customer Management</h3>
        <p class="feat-desc">Full customer profiles with transaction history, payment records, and outstanding dues — all in one place.</p>
      </div>
      <div class="feat-card rv rv-d2">
        <div class="feat-num">03</div>
        <div class="icon-3d"><div class="icon-3d-face deep"><svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></div></div>
        <h3 class="feat-name">Inventory Control</h3>
        <p class="feat-desc">Real-time stock tracking with low-stock alerts. Never run out of bestsellers. Auto-deduct on every sale.</p>
      </div>
      <div class="feat-card rv">
        <div class="feat-num">04</div>
        <div class="icon-3d"><div class="icon-3d-face green"><svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div></div>
        <h3 class="feat-name">Payment Tracking</h3>
        <p class="feat-desc">Monitor UPI, cash, credit payments in real-time. Automated reminders for overdue accounts reduce defaults.</p>
      </div>
      <div class="feat-card rv rv-d1">
        <div class="feat-num">05</div>
        <div class="icon-3d"><div class="icon-3d-face amber"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div></div>
        <h3 class="feat-name">Sales Analytics</h3>
        <p class="feat-desc">Daily, weekly, monthly sales reports with visual charts. Know your top products, peak hours and best customers.</p>
      </div>
      <div class="feat-card rv rv-d2">
        <div class="feat-num">06</div>
        <div class="icon-3d"><div class="icon-3d-face teal"><svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></div></div>
        <h3 class="feat-name">Mobile App</h3>
        <p class="feat-desc">Full-featured Android & iOS apps. Manage your entire business from your phone — anywhere, anytime.</p>
      </div>
    </div>
  </div>
</section>

<section class="section how-sec" id="how">
  <div class="sec-inner">
    <div class="how-grid">
      <div>
        <p class="eyebrow rv" style="color:var(--cr2)">Simple Process</p>
        <h2 class="sec-title w rv rv-d1">Up & Running<br>in 3 Steps.</h2>
        <div class="steps">
          <div class="step-item" id="s1">
            <div class="step-num-wrap">01</div>
            <div><h4 class="step-title">Create Your Account</h4><p class="step-desc">Sign up free in under 60 seconds. Just your mobile number — no credit card needed, no setup fees.</p></div>
          </div>
          <div class="step-item" id="s2">
            <div class="step-num-wrap">02</div>
            <div><h4 class="step-title">Set Up Your Business</h4><p class="step-desc">Add your business details, products, and customers through our guided setup wizard. Import existing data instantly.</p></div>
          </div>
          <div class="step-item" id="s3">
            <div class="step-num-wrap">03</div>
            <div><h4 class="step-title">Start Billing & Growing</h4><p class="step-desc">Create your first invoice, share with customers on WhatsApp, and watch your business dashboard come alive.</p></div>
          </div>
        </div>
      </div>
      <div class="phone-3d-wrap rv">
        <div class="phone-3d">
          <div class="phone-shell">
            <div class="phone-screen">
              <div class="phone-notch"><div class="pn-pill"></div></div>
              <div class="phone-content">
                <div class="pc-header"><div><div class="pc-greeting">Good Morning</div><div class="pc-name">Ramesh Ji</div></div><div class="pc-avatar">RJ</div></div>
                <div class="pc-card"><div class="pc-card-label">Today's Revenue</div><div class="pc-card-amt">₹8,420</div><div class="pc-card-sub">↑ 12% more than yesterday</div></div>
                <div class="pc-actions"><div class="pc-action"><div class="pc-action-icon">📄</div><div class="pc-action-label">New Bill</div></div><div class="pc-action"><div class="pc-action-icon">👥</div><div class="pc-action-label">Customers</div></div><div class="pc-action"><div class="pc-action-icon">📦</div><div class="pc-action-label">Stock</div></div><div class="pc-action"><div class="pc-action-icon">📊</div><div class="pc-action-label">Reports</div></div></div>
                <div class="pc-list-title">Recent Transactions</div>
                <div class="pc-txn"><div><div class="pc-txn-name">Priya Kapoor</div><div class="pc-txn-date">Today, 3:22 PM</div></div><div class="pc-txn-amt amt-g">+₹890</div></div>
                <div class="pc-txn"><div><div class="pc-txn-name">Mohan Lal</div><div class="pc-txn-date">Today, 1:15 PM</div></div><div class="pc-txn-amt amt-g">+₹3,990</div></div>
                <div class="pc-txn"><div><div class="pc-txn-name">Raju Retail</div><div class="pc-txn-date">Yesterday</div></div><div class="pc-txn-amt amt-r">-₹1,200</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="stats-band">
  <div class="stats-grid">
    <div class="sb-item rv"><div class="sb-num js-count-up" data-target="10" data-suffix="K+">0<span>K+</span></div><div class="sb-label">Active Businesses</div></div>
    <div class="sb-item rv rv-d1"><div class="sb-num js-count-up" data-target="250" data-suffix="L+">0<span>L+</span></div><div class="sb-label">Bills Generated</div></div>
    <div class="sb-item rv rv-d2"><div class="sb-num js-count-up" data-target="99.9" data-suffix="%" data-decimals="1">0<span>%</span></div><div class="sb-label">Platform Uptime</div></div>
    <div class="sb-item rv rv-d3"><div class="sb-num js-count-up" data-target="4.9" data-suffix="★" data-decimals="1">0<span>★</span></div><div class="sb-label">Average Rating</div></div>
  </div>
</div>

<section class="section testi-sec" id="reviews">
  <div class="sec-inner">
    <p class="eyebrow rv">What They Say</p>
    <h2 class="sec-title rv rv-d1">Trusted by 10,000+<br>Businesses.</h2>
    <div class="testi-grid">
      <div class="testi-card rv"><div class="stars">★★★★★</div><p class="testi-text">"Before B-Vyapari, making bills was a headache. Now I generate a professional GST invoice in under 2 minutes and send it directly on WhatsApp. My customers are impressed!"</p><div class="testi-author"><div class="ta-av">RS</div><div><div class="ta-name">Rajesh Singh</div><div class="ta-role">retail store, Nagpur</div></div></div></div>
      <div class="testi-card rv rv-d1"><div class="stars">★★★★★</div><p class="testi-text">"Stock management was always confusing. B-Vyapari's inventory system alerts me automatically when stock is low. Haven't run out of anything in 6 months. Truly life-changing."</p><div class="testi-author"><div class="ta-av">PD</div><div><div class="ta-name">Priya Devi</div><div class="ta-role">Clothing Shop, Pune</div></div></div></div>
      <div class="testi-card rv rv-d2"><div class="stars">★★★★★</div><p class="testi-text">"The sales reports showed me exactly which products sold most. I stocked up on those and my revenue went up 30% in just 3 months. The data pays for itself many times over."</p><div class="testi-author"><div class="ta-av">MG</div><div><div class="ta-name">Mohan Gupta</div><div class="ta-role">Electronics Shop, Mumbai</div></div></div></div>
    </div>
  </div>
</section>

<section class="section price-sec" id="pricing">
  <div class="sec-inner">
    <p class="eyebrow rv" style="color:var(--cr2)">Simple Pricing</p>
    <h2 class="sec-title w rv rv-d1">Plans That Grow<br>With You.</h2>
    <div class="price-grid">
      <div class="price-card rv"><div class="pc-plan">Starter</div><div class="pc-amount">₹0</div><div class="pc-per">Free forever</div><ul class="pc-feats"><li><svg viewBox="0 0 14 14"><polyline points="2,7 5,10 12,3"/></svg>50 Invoices / Month</li><li><svg viewBox="0 0 14 14"><polyline points="2,7 5,10 12,3"/></svg>100 Customers</li><li><svg viewBox="0 0 14 14"><polyline points="2,7 5,10 12,3"/></svg>Basic Inventory</li><li><svg viewBox="0 0 14 14"><polyline points="2,7 5,10 12,3"/></svg>WhatsApp Sharing</li><li><svg viewBox="0 0 14 14"><polyline points="2,7 5,10 12,3"/></svg>Mobile App</li></ul><a href="/start-free" class="pc-btn">Get Started Free</a></div>
      <div class="price-card hot rv rv-d1"><span class="hot-badge">Most Popular</span><div class="pc-plan">Pro Vyapari</div><div class="pc-amount">₹99</div><div class="pc-per">per month · billed monthly (or ₹79/mo yearly)</div><ul class="pc-feats"><li><svg viewBox="0 0 14 14"><polyline points="2,7 5,10 12,3"/></svg>Unlimited Invoices</li><li><svg viewBox="0 0 14 14"><polyline points="2,7 5,10 12,3"/></svg>Unlimited Customers</li><li><svg viewBox="0 0 14 14"><polyline points="2,7 5,10 12,3"/></svg>Advanced Inventory</li><li><svg viewBox="0 0 14 14"><polyline points="2,7 5,10 12,3"/></svg>Full Sales Reports</li><li><svg viewBox="0 0 14 14"><polyline points="2,7 5,10 12,3"/></svg>GST Filing Help</li><li><svg viewBox="0 0 14 14"><polyline points="2,7 5,10 12,3"/></svg>Priority Support</li></ul><a href="/start-free" class="pc-btn">Subscribe Now</a></div>
      <div class="price-card rv rv-d2"><div class="pc-plan">Business</div><div class="pc-amount">₹199</div><div class="pc-per">per month · all features (or ₹159/mo yearly)</div><ul class="pc-feats"><li><svg viewBox="0 0 14 14"><polyline points="2,7 5,10 12,3"/></svg>Everything in Pro</li><li><svg viewBox="0 0 14 14"><polyline points="2,7 5,10 12,3"/></svg>Multi-Branch (5)</li><li><svg viewBox="0 0 14 14"><polyline points="2,7 5,10 12,3"/></svg>Staff Accounts (10)</li><li><svg viewBox="0 0 14 14"><polyline points="2,7 5,10 12,3"/></svg>API Access</li><li><svg viewBox="0 0 14 14"><polyline points="2,7 5,10 12,3"/></svg>Dedicated Manager</li><li><svg viewBox="0 0 14 14"><polyline points="2,7 5,10 12,3"/></svg>Custom Branding</li></ul><a href="/start-free" class="pc-btn">Start Business Plan</a></div>
    </div>
  </div>
</section>

<section class="cta-sec">
  <div class="cta-inner">
    <h2 class="cta-title rv">Go Digital.<br><span>Start Today.</span></h2>
    <p class="cta-sub rv rv-d1">Join 10,000+ businesses who already transformed their billing with B-Vyapari. Free to start, no credit card required.</p>
    <div class="cta-btns rv rv-d2">
      <a href="/start-free" class="btn-cta-main">Start Free Trial</a>
      <a href="/features" class="btn-cta-sec">View All Features</a>
    </div>
  </div>
</section>
`

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
