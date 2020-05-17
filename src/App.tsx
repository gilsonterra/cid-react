import React from 'react';
import Routes from './components/Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
//import { SnackbarProvider } from 'notistack';
//import Button from '@material-ui/core/Button';
import 'typeface-roboto';

const App = () => {
  return <div>
    <CssBaseline />
    <div className="container">
      <Routes />
    </div>
  </div>
};

export default App;