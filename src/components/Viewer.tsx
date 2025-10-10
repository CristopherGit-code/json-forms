"use client"

import { useState } from "react"
import type { FC } from "react"
import { JsonFormSkeleton } from "./JsonFormSkeleton"
import "../styles/viewer.css"

export const JsonViewer: FC = () => {
  const [json1, setJson1] = useState("")
  const [json2, setJson2] = useState("")
  const [parsed1, setParsed1] = useState<any>(null)
  const [parsed2, setParsed2] = useState<any>(null)
  const [error1, setError1] = useState("")
  const [error2, setError2] = useState("")

  const handleJson1Change = (value: string) => {
    setJson1(value)
    try {
      if (value.trim()) {
        const parsed = JSON.parse(value)
        setParsed1(parsed)
        setError1("")
      } else {
        setParsed1(null)
        setError1("")
      }
    } catch (err) {
      setError1("Invalid JSON format")
      setParsed1(null)
    }
  }

  const handleJson2Change = (value: string) => {
    setJson2(value)
    try {
      if (value.trim()) {
        const parsed = JSON.parse(value)
        setParsed2(parsed)
        setError2("")
      } else {
        setParsed2(null)
        setError2("")
      }
    } catch (err) {
      setError2("Invalid JSON format")
      setParsed2(null)
    }
  }

  return (
    <div className="json-viewer-container">
      <h2 className="json-viewer-title">JSON forms schema view</h2>
      <p className="json-viewer-description">Paste schema and uiSchema to render the form</p>

      <div className="json-layout">
        {/* Left side: Two text input areas */}
        <div className="json-inputs-side">
          <div className="json-input-section">
            <h3 className="json-section-title">JSON Schema</h3>
            <textarea
              className="json-textarea"
              placeholder='Paste your JSON here... e.g., {"name": "John", "age": 30}'
              value={json1}
              onChange={(e) => handleJson1Change(e.target.value)}
            />
            {error1 && <div className="json-error">{error1}</div>}
          </div>

          <div className="json-input-section">
            <h3 className="json-section-title">UI Schema</h3>
            <textarea
              className="json-textarea"
              placeholder='Paste your JSON here... e.g., {"name": "Jane", "age": 25}'
              value={json2}
              onChange={(e) => handleJson2Change(e.target.value)}
            />
            {error2 && <div className="json-error">{error2}</div>}
          </div>
        </div>

        {/* Right side: Comparison component */}
        <div className="json-comparison-side">
          <JsonFormSkeleton  activeSection="upload" schema={parsed1} uiSchema={parsed2} />
        </div>
      </div>
    </div>
  )
}