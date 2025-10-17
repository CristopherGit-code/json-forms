import './styles/App.css'
import { Header } from './components/Header';
import { useState } from 'react';
import { FormHandler } from './components/FormHandler';

export type Section = "registry" | "example" | "oiaform" | "upload" | "aiform";

const App = () => {
  const [activeSection, setActiveSection] = useState<Section>('registry')

  return (
    <>
      <Header activeSection={activeSection} onSectionChange={setActiveSection}/>
      <FormHandler activeSection={activeSection} />
    </>
  );
};

export default App;
