"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-content">
        
        <div className="logo">
          <a href="#"><img src="/images/logo.png" alt="Logo" /></a>
        </div>

        <a href="#get-started" className="btn-primary nav-right">
          Get Started
        </a>

        {/* KEEP ID navMenu */}
        <div id="navMenu" className={`nav-menu ${open ? "active" : ""}`}>
          <a href="#features" onClick={() => setOpen(false)}>Features</a>
          <a href="showcase.html" onClick={() => setOpen(false)}>Template</a>
          <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
          <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
        </div>

        <div className="nav-actions">
          {/* KEEP ID hamburger */}
          <div
            id="hamburger"
            className={`hamburger ${open ? "active" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

      </div>
    </header>
  );
              }
