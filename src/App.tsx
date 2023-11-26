import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { FooterLinks } from './components/Footer/FooterLinks';
import { HeroContentLeft } from './components/NavBar/HeroContentLeft';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <HeroContentLeft />
      <Router />
      <FooterLinks />
    </MantineProvider>
  );
}
