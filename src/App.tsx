import React from 'react';
import Routes from './components/Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import 'typeface-roboto';

const App = () => {
  return <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }} maxSnack={1}>
    <CssBaseline />
    <div className="container">
      <Routes />
    </div>
  </SnackbarProvider>
};

export default App;