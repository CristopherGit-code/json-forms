import type { FC } from "react"
import type { Section } from "../App"
import { JsonFormSkeleton } from "./JsonFormSkeleton"
import { JsonViewer } from "./Viewer"
import '../styles/formHandler.css'

interface FormHandlerProps {
  activeSection: Section
}

export const FormHandler: FC<FormHandlerProps> = ({ activeSection }) => {
  return (
    <main className="content-container">
      {activeSection === "registry" && <JsonFormSkeleton activeSection={activeSection} />}
      {activeSection === "example" && <JsonFormSkeleton activeSection={activeSection} />}
      {activeSection === "upload" && <JsonViewer />}
    </main>
  )
}
