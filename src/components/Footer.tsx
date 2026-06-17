import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const WHATSAPP_URL = "https://wa.me/919270271916?text=Hello%20B-Vyapari%20Team%2C%0AI%27m%20looking%20for%20a%20reliable%20billing%20and%20business%20management%20solution%20for%20my%20business.%20I%27d%20like%20to%20explore%20how%20B-Vyapari%20can%20help%20manage%20billing%2C%20inventory%2C%20and%20daily%20operations.%20Please%20get%20in%20touch%20with%20me.%0AThank%20you."

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.ftBrand}>
          <Link to="/" className={styles.ftLogo}>
            <div className={styles.ftLogoMark}>
              <svg viewBox="0 0 120 120" fill="none">
                <rect width="120" height="120" rx="16" fill="#7A1E2C"/>
                <polygon points="22.6,21.8 52.4,21.8 37.5,51.5" fill="white" stroke="white" stroke-width="6" stroke-linejoin="round" />
                <polygon points="67.6,21.8 97.4,21.8 82.5,51.5" fill="white" stroke="white" stroke-width="6" stroke-linejoin="round" />
                <polygon points="45.1,61.8 74.9,61.8 60,91.5" fill="white" stroke="white" stroke-width="6" stroke-linejoin="round" />
              </svg>
            </div>
            B-<span>Vyapari</span>
          </Link>
          <p className={styles.ftDesc}>
            India's smartest billing and business management platform — built for every local shopkeeper and entrepreneur.
          </p>
          <div className={styles.storeBadges}>
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className={styles.storeBtn}>
              <img src="/google-play-badge.svg" alt="Get it on Google Play" className={styles.storeImg} />
            </a>
            <a href="https://www.apple.com/app-store" target="_blank" rel="noopener noreferrer" className={styles.storeBtn}>
              <img src="/app-store-badge.svg" alt="Download on the App Store" className={styles.storeImg} />
            </a>
          </div>
        </div>

        <div className={styles.ftCol}>
          <div className={styles.ftColTitle}>Product</div>
          <ul className={styles.ftLinks}>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
          </ul>
        </div>

        <div className={styles.ftCol}>
          <div className={styles.ftColTitle}>Support</div>
          <ul className={styles.ftLinks}>
            <li><a href="#help">Help Center</a></li>
            <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp Support</a></li>
            <li><a href="#guides">Video Guides</a></li>
            <li><a href="#status">Status Page</a></li>
          </ul>
        </div>

        <div className={styles.ftCol}>
          <div className={styles.ftColTitle}>Company</div>
          <ul className={styles.ftLinks}>
            <li><a href="#about">About Us</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.fbLeft}>
          <div className={styles.ftContactList}>
            <div className={styles.ftContactItem}>
              <svg viewBox="0 0 16 16" className={styles.contactSvg} aria-hidden="true">
                <path d="M8 1a5 5 0 00-5 5c0 4 5 8 5 8s5-4 5-8a5 5 0 00-5-5z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="8" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <span>Office No. 2, Om Sai Apartment, Road, Nearby Hanuman Temple, Davkhar Nagar, Ganur, Chandvad, Maharashtra 423101</span>
            </div>
            <div className={styles.ftContactItem}>
              <svg viewBox="0 0 16 16" className={styles.contactSvg} aria-hidden="true">
                <path d="M2 4h12v8H2z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <polyline points="2,4 8,9 14,4" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <a href="mailto:info@bvyapari.in">info@bvyapari.in</a>
            </div>
            <div className={styles.ftContactItem}>
              <svg viewBox="0 0 16 16" className={styles.contactSvg} aria-hidden="true">
                <path d="M3 2.5a1.5 1.5 0 00-1.5 1.5c0 4.5 3.5 8 8 8a1.5 1.5 0 001.5-1.5v-2a1 1 0 00-.3-.7l-1.6-1.5a1 1 0 00-1.2-.1l-1.2.8a11.5 11.5 0 01-3.5-3.5l.8-1.2a1 1 0 00-.1-1.2L4.7 3a1 1 0 00-.7-.3H3z" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">+91 92702 71916</a>
            </div>
          </div>
          <div className={styles.copyrightText}>
            © 2026 B-Vyapari. All rights reserved. Developed by <a href="https://visiomatix.in" target="_blank" rel="noopener noreferrer">Visiomatix Media Pvt. Ltd.</a> | visiomatix.in
          </div>
        </div>

        <div className={styles.fbRight}>
          <div className={styles.vxtAttribution}>
            <a href="https://visiomatix.in" target="_blank" rel="noopener noreferrer" className={styles.vxtTitle}>
              Visiomatix Media Pvt. Ltd.
            </a>
            <div className={styles.vxtContactList}>
              <div className={styles.vxtContactItem}>
                <svg viewBox="0 0 16 16" className={styles.contactSvg} aria-hidden="true">
                  <path d="M8 1a5 5 0 00-5 5c0 4 5 8 5 8s5-4 5-8a5 5 0 00-5-5z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="8" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <span>Office No. 3, Om Sai Apartment, Davkhar Nagar, Ganur, Chandvad, Maharashtra 423101</span>
              </div>
              <div className={styles.vxtContactItem}>
                <svg viewBox="0 0 16 16" className={styles.contactSvg} aria-hidden="true">
                  <path d="M2 4h12v8H2z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  <polyline points="2,4 8,9 14,4" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <a href="mailto:info@visiomatix.in">info@visiomatix.in</a>
              </div>
              <div className={styles.vxtContactItem}>
                <svg viewBox="0 0 16 16" className={styles.contactSvg} aria-hidden="true">
                  <path d="M3 2.5a1.5 1.5 0 00-1.5 1.5c0 4.5 3.5 8 8 8a1.5 1.5 0 001.5-1.5v-2a1 1 0 00-.3-.7l-1.6-1.5a1 1 0 00-1.2-.1l-1.2.8a11.5 11.5 0 01-3.5-3.5l.8-1.2a1 1 0 00-.1-1.2L4.7 3a1 1 0 00-.7-.3H3z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">+91 92702 71916</a>
              </div>
            </div>
          </div>
          <div className={styles.ftSocial}>
            <a href="https://www.facebook.com/share/1CG9DHEfT3/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className={styles.socBtn} aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/b_vyaparii?utm_source=qr" target="_blank" rel="noopener noreferrer" className={styles.socBtn} aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://x.com/b_vyapari?s=21" target="_blank" rel="noopener noreferrer" className={styles.socBtn} aria-label="X (formerly Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/b-vyapari/" target="_blank" rel="noopener noreferrer" className={styles.socBtn} aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@bvyapari" target="_blank" rel="noopener noreferrer" className={styles.socBtn} aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
