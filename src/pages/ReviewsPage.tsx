import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './ReviewsPage.module.css'
import Strip from '../components/Strip'

interface Review {
  category: string
  stars: number
  text: string
  highlight: string | null
  authorName: string
  authorRole: string
  date: string
  initials: string
  isWide: boolean
  categoryLabel?: string
}

export default function ReviewsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [animateVideos, setAnimateVideos] = useState(false)
  const [animateBars, setAnimateBars] = useState(false)

  const videoGridRef = useRef<HTMLDivElement>(null)
  const ratingSummaryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = 'Reviews — What Businesses Say About B-Vyapari'
    const desc = document.querySelector('meta[name="description"]')
    if (desc) {
      desc.setAttribute('content', 'Read reviews from over 10,000 active Indian businesses using B-Vyapari. Hear stories of billing time savings, inventory accuracy, and business growth.')
    }

    const videoObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateVideos(true)
          videoObserver.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const barsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateBars(true)
          barsObserver.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const countObserver = new IntersectionObserver(
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
            countObserver.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (videoGridRef.current) videoObserver.observe(videoGridRef.current)
    if (ratingSummaryRef.current) barsObserver.observe(ratingSummaryRef.current)

    const timer = setTimeout(() => {
      document.querySelectorAll('.js-count-up').forEach((el) => countObserver.observe(el))
    }, 100)

    return () => {
      videoObserver.disconnect()
      barsObserver.disconnect()
      countObserver.disconnect()
      clearTimeout(timer)
    }
  }, [])

  const reviews: Review[] = [
    {
      category: 'billing',
      stars: 5,
      text: '"Before B-Vyapari, making bills was a headache. Now I generate a professional GST invoice in under 2 minutes and send it directly on WhatsApp. My customers are impressed and ask me how I manage so efficiently. The barcode scan feature is just the cherry on top — my team loves it!"',
      highlight: 'Saved ₹15,000/year on accountant fees',
      authorName: 'Rajesh Singh',
      authorRole: 'retail store, Nagpur',
      date: 'March 2025 · Pro Vyapari',
      initials: 'RS',
      isWide: true
    },
    {
      category: 'inventory',
      stars: 5,
      text: '"Stock management was always confusing. B-Vyapari\'s inventory system alerts me automatically when stock is low. Haven\'t run out of anything in 6 months."',
      highlight: 'Zero stockouts for 6 months straight',
      authorName: 'Priya Devi',
      authorRole: 'Clothing Shop, Pune',
      date: 'January 2025 · Pro Vyapari',
      initials: 'PD',
      isWide: false
    },
    {
      category: 'reports',
      stars: 5,
      text: '"The sales reports showed me exactly which products sold most. I stocked up on those and my revenue went up 30% in just 3 months. The data pays for itself many times over."',
      highlight: '+30% Revenue in 3 months',
      authorName: 'Mohan Gupta',
      authorRole: 'Electronics Shop, Mumbai',
      date: 'February 2025 · Business Plan',
      initials: 'MG',
      isWide: false
    },
    {
      category: 'mobile',
      stars: 5,
      text: '"I can manage my shop from home as well. I get to know how much was sold and what is in stock directly on my phone. The app is fantastic, and the interface is extremely simple."',
      highlight: null,
      authorName: 'Vinod Kumar',
      authorRole: 'Medical Store, Jaipur',
      date: 'April 2025 · Pro Vyapari',
      initials: 'VK',
      isWide: false
    },
    {
      category: 'support',
      stars: 5,
      text: '"Customer support is outstanding. I had a query at 10 PM and got a helpful reply on WhatsApp within 5 minutes! They really understand small business owners like us."',
      highlight: null,
      authorName: 'Sunita Kumari',
      authorRole: 'Saree Shop, Varanasi',
      date: 'May 2025 · Starter Plan',
      initials: 'SK',
      isWide: false
    },
    {
      category: 'billing',
      stars: 5,
      text: '"GST returns that used to require a CA are now handled automatically. We save ₹2,000 every month in CA fees alone. The software paid for itself in less than a month."',
      highlight: 'ROI in under 1 month',
      authorName: 'Rakesh Patel',
      authorRole: 'Grocery Wholesale, Surat',
      date: 'March 2025 · Business Plan',
      initials: 'RP',
      isWide: false
    },
    {
      category: 'inventory',
      stars: 5,
      text: '"I have 3 branches and keeping track was a nightmare before. B-Vyapari\'s multi-branch feature shows all inventory and sales in one dashboard. My accountant now takes half the time for monthly closing because the data is already perfectly organized. Best investment for my business."',
      highlight: '3 branches, 1 dashboard — saved 20hrs/month',
      authorName: 'Nitin Khatri',
      authorRole: 'Furniture Business, Ahmedabad (3 Branches)',
      date: 'February 2025 · Business Plan',
      initials: 'NK',
      isWide: true,
      categoryLabel: 'Inventory + Reports'
    },
    {
      category: 'billing',
      stars: 5,
      text: '"The feature to send PDF bills via WhatsApp is amazing ❤️ — customers are really happy with it. My business looks very professional now, and people take us more seriously."',
      highlight: null,
      authorName: 'Anita Mehta',
      authorRole: 'Cosmetics Store, Indore',
      date: 'April 2025 · Pro Vyapari',
      initials: 'AM',
      isWide: false
    },
    {
      category: 'reports',
      stars: 5,
      text: '"Looking at the daily reports shows me exactly which product sells the most. I rearranged my stock accordingly, and our profits increased. Data is truly powerful."',
      highlight: null,
      authorName: 'Babulal Lodha',
      authorRole: 'Stationery Shop, Jodhpur',
      date: 'January 2025 · Pro Vyapari',
      initials: 'BL',
      isWide: false
    }
  ]

  const filteredReviews = reviews.filter(
    (review) => activeCategory === 'all' || review.category === activeCategory
  )

  return (
    <div className={styles.reviewsWrapper}>
      {/* HERO */}
      <section className={styles.reviewsHero}>
        <div className={styles.reviewsHeroBg}></div>
        <div className={`${styles.orb} ${styles.orb1}`}></div>
        <div className={`${styles.orb} ${styles.orb2}`}></div>
        <div className={styles.rhInner}>
          <div className={styles.rhTag}>
            <span className={styles.tagDot}></span> Customer Reviews
          </div>
          <h1 className={styles.rhTitle}>
            Real Stories.<br />
            <span className={styles.cr}>Real Businesses.</span><br />
            <span className={styles.outline}>Real Growth.</span>
          </h1>
          <p className={styles.rhSub}>
            Over <strong>10,000 shopkeepers and entrepreneurs</strong> across India trust B-Vyapari every single day. Here's what they have to say.
          </p>
          <div className={styles.ratingSummary} ref={ratingSummaryRef}>
            <div className={styles.rsBig}>
              <div className={styles.rsScore}>4.9</div>
              <div className={styles.rsStars}>★★★★★</div>
              <div className={styles.rsCount}>12,480 verified reviews</div>
            </div>
            <div className={styles.rsBars} id="rsBars">
              {[
                { star: '5 ★', pct: '92%', val: 0.92 },
                { star: '4 ★', pct: '6%', val: 0.06 },
                { star: '3 ★', pct: '1.5%', val: 0.015 },
                { star: '2 ★', pct: '0.3%', val: 0.003 },
                { star: '1 ★', pct: '0.2%', val: 0.002 }
              ].map((row, idx) => (
                <div className={styles.rsBarRow} key={idx}>
                  <span className={styles.rsBarLabel}>{row.star}</span>
                  <div className={styles.rsBarTrack}>
                    <div
                      className={`${styles.rsBarFill} ${animateBars ? styles.anim : ''}`}
                      style={{ transform: animateBars ? `scaleX(${row.val})` : 'scaleX(0)' }}
                    ></div>
                  </div>
                  <span className={styles.rsBarPct}>{row.pct}</span>
                </div>
              ))}
            </div>
            <div className={styles.rsSplits}>
              <div className={styles.rsSplit}>
                <div className={`${styles.rsSplitNum} js-count-up`} data-target="10" data-suffix="K+">
                  0<span>K+</span>
                </div>
                <div className={styles.rsSplitLabel}>Active Businesses</div>
              </div>
              <div className={styles.rsSplit}>
                <div className={`${styles.rsSplitNum} js-count-up`} data-target="250" data-suffix="L+">
                  0<span>L+</span>
                </div>
                <div className={styles.rsSplitLabel}>Bills Generated</div>
              </div>
              <div className={styles.rsSplit}>
                <div className={`${styles.rsSplitNum} js-count-up`} data-target="28" data-suffix="+">
                  0<span>+</span>
                </div>
                <div className={styles.rsSplitLabel}>States Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Strip />

      {/* FILTER BAR */}
      <div className={styles.filterBar}>
        <div className={styles.filterInner}>
          <div className={styles.filterTabs}>
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'billing', label: 'Billing' },
              { id: 'inventory', label: 'Inventory' },
              { id: 'reports', label: 'Reports' },
              { id: 'support', label: 'Support' },
              { id: 'mobile', label: 'Mobile App' }
            ].map((tab) => (
              <div
                key={tab.id}
                className={`${styles.ftab} ${activeCategory === tab.id ? styles.on : ''}`}
                onClick={() => setActiveCategory(tab.id)}
              >
                {tab.label}
              </div>
            ))}
          </div>
          <div className={styles.filterSort}>
            Sort by:
            <select className={styles.sortSelect} defaultValue="Most Recent">
              <option>Most Recent</option>
              <option>Top Rated</option>
              <option>Most Helpful</option>
            </select>
          </div>
        </div>
      </div>

      {/* FEATURED REVIEW */}
      <section className={styles.featuredSec}>
        <div className={styles.featuredInner}>
          <div className={styles.secLabel}>Featured Review</div>
          <div className={styles.featReview}>
            <div>
              <div className={styles.frStars}>★★★★★</div>
              <p className={styles.frText}>
                "B-Vyapari completely transformed my shop. In the first month, <strong>3-4 hours were spent just on billing daily</strong>; now everything is done in 20 minutes. I send GST invoices on WhatsApp, customers are happy, and it saves me so much time. Buying this software was my best decision."
              </p>
              <div className={styles.frAuthor}>
                <div className={styles.frAv}>AS</div>
                <div>
                  <div className={styles.frName}>Arun Shukla</div>
                  <div className={styles.frRole}>Hardware Store, Lucknow · Using B-Vyapari for 2 years</div>
                  <div className={styles.frBadge}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>{' '}
                    Verified Pro Vyapari User
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.frStats}>
              <div className={styles.frsItem}>
                <div className={styles.frsNum}>3h <span>→</span> 20m</div>
                <div className={styles.frsLabel}>Daily Billing Time Saved</div>
              </div>
              <div className={styles.frsItem}>
                <div className={styles.frsNum}>+<span>40%</span></div>
                <div className={styles.frsLabel}>Revenue Growth in Year 1</div>
              </div>
              <div className={styles.frsItem}>
                <div className={styles.frsNum}><span>₹0</span> Errors</div>
                <div className={styles.frsLabel}>GST Filing Mistakes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN REVIEWS GRID */}
      <section className={styles.reviewsSec}>
        <div className={styles.reviewsInner}>
          <div className={`${styles.secLabel} rv`}>All Customer Reviews</div>
          <div className={styles.reviewsGrid}>
            {filteredReviews.map((review, idx) => (
              <div
                key={idx}
                className={`${styles.rvCard} ${review.isWide ? styles.wide : ''} rv`}
                style={{ contentVisibility: 'auto' }}
              >
                <div className={styles.rvTop}>
                  <div className={styles.rvStars}>★★★★★</div>
                  <div className={styles.rvCategory}>{review.categoryLabel || review.category}</div>
                </div>
                <p className={styles.rvText}>{review.text}</p>
                {review.highlight && <div className={styles.rvHighlight}>{review.highlight}</div>}
                <div className={styles.rvAuthor}>
                  <div className={styles.rvAv}>{review.initials}</div>
                  <div>
                    <div className={styles.rvName}>{review.authorName}</div>
                    <div className={styles.rvRole}>{review.authorRole}</div>
                    <div className={styles.rvDate}>{review.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO REVIEWS */}
      <section className={styles.videoSec}>
        <div className={styles.videoInner}>
          <p className="eyebrow rv" style={{ color: 'var(--cr2)' }}>Voice of Customers</p>
          <h2 className="sec-title w rv rv-d1">They Said It<br />Best.</h2>
          <div className={styles.videoGrid} ref={videoGridRef}>
            {[
              {
                av: 'DJ',
                name: 'Deepak Jain',
                role: 'Dairy Shop, Bhopal',
                text: '"Everything was clear from day one. Setup took 30 minutes, and the first bill was generated in 2 minutes."'
              },
              {
                av: 'KT',
                name: 'Kavita Tiwari',
                role: 'Boutique, Chandigarh',
                text: '"My revenue increased 45% after I started using the analytics. Now I know exactly where every rupee is going."'
              },
              {
                av: 'HS',
                name: 'Harish Soni',
                role: 'Auto Parts, Kanpur',
                text: '"UPI and cash are both tracked in one place. There is no need for a physical ledger (Khata book) anymore. Staff can also use it easily."'
              },
              {
                av: 'PT',
                name: 'Pooja Thakur',
                role: 'Footwear Shop, Delhi',
                text: '"At ₹99/month it\'s criminally affordable for what you get. I was paying ₹3,000 to a freelancer for billing — this does more, better."'
              }
            ].map((video, idx) => (
              <div
                key={idx}
                className={`${styles.videoCard} ${animateVideos ? 'vis' : ''}`}
                style={{ transitionDelay: animateVideos ? `${idx * 120}ms` : '0ms' }}
              >
                <div className={styles.vcPlay}>
                  <svg viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <div className={styles.vcStars}>★★★★★</div>
                <p className={styles.vcText}>{video.text}</p>
                <div className={styles.vcAuthorRow}>
                  <div className={styles.vcAv}>{video.av}</div>
                  <div>
                    <div className={styles.vcName}>{video.name}</div>
                    <div className={styles.vcRole}>{video.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className={styles.trustStrip}>
        <div className={styles.tsItem}>
          <div className={`${styles.tsNum} js-count-up`} data-target="10000" data-suffix="+">
            0<span>+</span>
          </div>
          <div className={styles.tsLabel}>Active Businesses</div>
        </div>
        <div className={styles.tsDivider}></div>
        <div className={styles.tsItem}>
          <div className={`${styles.tsNum} js-count-up`} data-target="4.9" data-suffix=" / 5" data-decimals="1">
            0<span> / 5</span>
          </div>
          <div className={styles.tsLabel}>Average Rating</div>
        </div>
        <div className={styles.tsDivider}></div>
        <div className={styles.tsItem}>
          <div className={`${styles.tsNum} js-count-up`} data-target="12480" data-suffix="">
            0
          </div>
          <div className={styles.tsLabel}>Verified Reviews</div>
        </div>
        <div className={styles.tsDivider}></div>
        <div className={styles.tsItem}>
          <div className={`${styles.tsNum} js-count-up`} data-target="92" data-suffix="%">
            0<span>%</span>
          </div>
          <div className={styles.tsLabel}>Give 5 Stars</div>
        </div>
        <div className={styles.tsDivider}></div>
        <div className={styles.tsItem}>
          <div className={`${styles.tsNum} js-count-up`} data-target="28" data-suffix="+">
            0<span>+</span>
          </div>
          <div className={styles.tsLabel}>States Covered</div>
        </div>
      </div>

      {/* PLATFORM RATINGS */}
      <section className={styles.platformSec}>
        <div className={styles.platformInner}>
          <p className="eyebrow rv">Across All Platforms</p>
          <h2 className="sec-title rv rv-d1">Loved Everywhere<br />You Look.</h2>
          <div className={styles.platformGrid}>
            {[
              {
                name: 'Google Play Store',
                score: '4.8',
                count: '6.2K',
                bars: [0.88, 0.08, 0.025, 0.008, 0.007],
                labels: ['88%', '8%', '2.5%', '0.8%', '0.7%']
              },
              {
                name: 'Apple App Store',
                score: '4.9',
                count: '3.8K',
                bars: [0.93, 0.05, 0.012, 0.004, 0.004],
                labels: ['93%', '5%', '1.2%', '0.4%', '0.4%']
              },
              {
                name: 'Google Reviews',
                score: '4.9',
                count: '2.4K',
                bars: [0.91, 0.07, 0.012, 0.004, 0.004],
                labels: ['91%', '7%', '1.2%', '0.4%', '0.4%']
              }
            ].map((plat, idx) => (
              <div className={`${styles.platCard} rv`} key={idx}>
                <div className={styles.platHeader}>
                  <div className={styles.platName}>{plat.name}</div>
                  <div className={styles.platScore}>
                    {plat.score} <span>★</span> <span className={styles.platCount}>{plat.count}</span>
                  </div>
                </div>
                {plat.bars.map((val, barIdx) => (
                  <div className={styles.platBarRow} key={barIdx}>
                    <span className={styles.platStarLabel}>{5 - barIdx} ★</span>
                    <div className={styles.platBarTrack}>
                      <div
                        className={`${styles.platBarFill} ${animateBars ? styles.anim : ''}`}
                        style={{ transform: animateBars ? `scaleX(${val})` : 'scaleX(0)' }}
                      ></div>
                    </div>
                    <span className={styles.platBarPct}>{plat.labels[barIdx]}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSec}>
        <div className={styles.ctaInner}>
          <h2 className={`${styles.ctaTitle} rv`}>
            Join 10,000+<br />
            <span>Happy Businesses.</span>
          </h2>
          <p className={`${styles.ctaSub} rv rv-d1`}>
            Start free today. No credit card. No setup fees. Your first invoice in under 2 minutes — guaranteed.
          </p>
          <div className={`${styles.ctaBtns} rv rv-d2`}>
            <Link to="/start-free" className={styles.btnCtaMain}>
              Start Free Trial
            </Link>
            <Link to="/pricing" className={styles.btnCtaSec}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
