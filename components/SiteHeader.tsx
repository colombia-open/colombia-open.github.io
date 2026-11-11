"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandMark, GithubMark } from "./BrandMark";

const LIBRARY_URL = "https://github.com/davidcasr/colombia-open";

const NAV_LINKS = [
  { href: "#catalogo", label: "Catálogo" },
  { href: "#mcp", label: "MCP" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#contribuir", label: "Contribuir" },
  { href: "https://pypi.org/project/colombia-open/", label: "PyPI", external: true },
];

export function SiteHeader({ releaseTag, releaseUrl }: { releaseTag: string; releaseUrl: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <nav className="nav">
            <div className="brand-group">
              <Link className="nav-brand" href="#">
                <BrandMark />
                colombia-open
              </Link>
              <a className="version-badge" href={releaseUrl} target="_blank" rel="noopener">
                {releaseTag}
              </a>
            </div>

            <div className="nav-links">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener" : undefined}
                >
                  {link.label}
                </a>
              ))}
              <a className="nav-github" href={LIBRARY_URL}>
                <GithubMark />
                GitHub
              </a>
            </div>

            <button
              type="button"
              className="icon-btn nav-hamburger"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Fuera de <header>: su backdrop-filter lo vuelve el containing block
          de los hijos position:fixed, y el drawer quedaba del alto del header
          (fondo solo arriba, links superpuestos al contenido). */}
      {menuOpen && (
        <div className="nav-drawer">
          <div className="nav-drawer-header">
            <span className="nav-drawer-title">Menú</span>
            <button
              type="button"
              className="icon-btn"
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>
          </div>
          <nav className="nav-drawer-links">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href={LIBRARY_URL} onClick={() => setMenuOpen(false)}>
              GitHub
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
