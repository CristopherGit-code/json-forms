"use client"
import type { FC } from "react"
import type { Section } from "../App"
import '../styles/header.css'

interface HeaderProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
}

export const Header: FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const navItems: { id: Section; label: string }[] = [
    { id: "registry", label: "Car Registry" },
    { id: "example", label: "TODO list" },
    { id: "upload", label: "Upload form" },
    { id: "oiaform", label: "OIA form" },
    { id: "aiform", label: "AI form" }
  ]

  return (
    <div className="header-container">
      <header className="header">
        <h1 className="header-title">JSON Forms App</h1>
      </header>
      <nav className="nav-bar">
        <ul className="nav-items">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`nav-button ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
                {activeSection === item.id && <span className="nav-indicator" />}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}