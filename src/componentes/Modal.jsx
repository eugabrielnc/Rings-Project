import {react} from 'react'
import "../assets/Css/modal.css"

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div style={overlay}>
      <div style={modal}>
        {children}
      </div>
    </div>
  )
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000
}

const modal = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  minWidth: "300px"
}

