import React from 'react'
import styles from '@/styles/Navbar.module.css'
import Link from "next/link";

function Navbar() {
  return (
    <nav className={styles.nav}>
        <div className={styles.navbarContainer}>
          <Link href="/" className={styles.navbarLogo}>Pokedex Lite</Link>
        </div>
    </nav>
  )
}

export default Navbar