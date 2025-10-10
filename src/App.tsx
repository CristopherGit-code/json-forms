import './styles/App.css'
import { Header } from './components/header/Header';
import { JsonFormSkeleton } from './components/JsonFormSkeleton';
import { useState } from 'react';
import { FormHandler } from './components/FormHandler';

export type Section = "registry" | "example" | "upload";

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
