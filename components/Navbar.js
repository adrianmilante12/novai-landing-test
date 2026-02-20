"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-content">

        <div className="logo">
          <Link href="/">
            <img src="/images/logo.png" alt="Logo" />
          </Link>
        </div>

        <Link href="#get-started" className="btn-primary nav-right">
          Get Started
        </Link>

        {/* Menu */}
        <div className={`nav-menu ${open ? "active" : ""}`}>
          <Link href="#features" onClick={() => setOpen(false)}>Features</Link>
          <Link href="/showcase" onClick={() => setOpen(false)}>Template</Link>
          <Link href="#pricing" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="#faq" onClick={() => setOpen(false)}>FAQ</Link>
        </div>

        {/* Hamburger */}
        <div 
          className={`hamburger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </header>
  );
  }
