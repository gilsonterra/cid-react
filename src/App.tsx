import React from 'react';
import Routes from './components/Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
//import Button from '@material-ui/core/Button';
import 'typeface-roboto';

const App = () => {
  return <SnackbarProvider>
    <CssBaseline />
    <div className="container">
      <Routes />
    </div>
  </SnackbarProvider>
};

export default App;