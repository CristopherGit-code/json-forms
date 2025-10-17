"use client"

import { useState } from "react"
import type { FC } from "react"
import { JsonFormSkeleton } from "./forms/JsonFormSkeleton"
import "../styles/viewer.css"
import { JsonForms } from '@jsonforms/react';

interface SchemaResponse {
    schema: object
    uiSchema: object
}

export const AIForm: FC = () => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [aiSchema, setSchema] = useState({})
    const [aiUiSchema, setUiSchema] = useState({})
    const [responseOk, setResponseOk] = useState(false);
    const SERVER_URL = "http://localhost:8000/jsonforms";

    const sendMessage = async () => {
        if (!input.trim()) return;

        const currentMessage = input
        setInput("")
        setLoading(true)

        try {
            const response = await fetch(SERVER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: currentMessage })
            })

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`)
            }

            const data: SchemaResponse = await response.json()

            setSchema(data.schema)
            setUiSchema(data.uiSchema)

            setResponseOk(true)
        } catch (err: any) {
            console.error("Server error", err)
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "enter") sendMessage()
    }

    return (
        <>
            <div style={{ display: "flex", gap: "8px" }}>
                <input
                    type="text"
                    placeholder="Request your application..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                    }}
                />
                <button
                    onClick={sendMessage}
                    disabled={loading}
                    style={{
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#1976d2",
                        color: "white",
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                >
                    Send
                </button>
            </div>

            {loading && (
                <div style={{ textAlign: "left", color: "#999" }}>Generating form app...</div>
            )}

            {responseOk && (
                <div>
                    <JsonFormSkeleton activeSection="upload" schema={aiSchema} uiSchema={aiUiSchema} />
                </div>
            )}
        </>
    )
}