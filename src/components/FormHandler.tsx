import type { FC } from "react"
import type { Section } from "../App"
import { JsonFormSkeleton } from "./forms/JsonFormSkeleton"
import { JsonViewer } from "./Viewer"
import { OIA } from './forms/OIA'
import '../styles/formHandler.css'

interface FormHandlerProps {
  activeSection: Section
}

export const FormHandler: FC<FormHandlerProps> = ({ activeSection }) => {
  return (
    <main className="content-container">
      {activeSection === "registry" && <JsonFormSkeleton activeSection={activeSection} />}
      {activeSection === "example" && <JsonFormSkeleton activeSection={activeSection} />}
      {activeSection === "oiaform" && <OIA />}
      {activeSection === "upload" && <JsonViewer />}
    </main>
  )
}
