import React, { useRef } from 'react';
import Routes from './components/Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import Button from '@material-ui/core/Button';

import 'typeface-roboto';
import './App.css';

const App = () => {
  const notistackRef = useRef();
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
  }

  return <SnackbarProvider
    ref={notistackRef}
    action={(key) => (
      <Button onClick={onClickDismiss(key)}>
        Dismiss
      </Button>
    )}
  >
    <CssBaseline />
    <div className="container">
      <Routes />
    </div>
  </SnackbarProvider>
};

export default App;