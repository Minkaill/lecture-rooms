import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { FooterLinks } from './components/Footer/FooterLinks';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <div className="app-wrapper">
          <Router />
        </div>
      </Provider>
      <div className='footer'>
      <FooterLinks />
      </div>
    </MantineProvider>
  );
}
