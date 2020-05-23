import React from 'react';

import { 
    Button,
    TextField,
    Card,
    CardContent,
    Typography,
    Container,
    Box,
    Grid
} from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import Request from '../helpers/Request';
import { useSnackbar } from 'notistack';
import { setToken, setScope, setUser } from '../helpers/Auth';
import { useHistory } from "react-router-dom";

interface Login {
    email: string,
    password: string
}

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    let history = useHistory();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const requestSubmit = (values: Login) => {
        Request({
            method: 'post',
            url: '/token',
            data: values
        }).then(({ data }) => {
            setToken(data.data.token);
            setScope(data.data.scope);
            setUser(data.data.user);
            history.push("/admin");
        }).catch((error) => {
            enqueueSnackbar('Error login', {
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                variant: 'warning'
            });
        });
    };

    const validationValues = (values: Login) => {
        const errors = {email: ''};
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }
        return errors;
    };


    return (
        <Box display="flex" height="100vh" justifyContent="center" alignItems="center">
            <Card style={{width: 500, height: 280}}>
                <CardContent>
                    <Typography component="h1" variant="h5">
                        CID - Customs Intelligence Database
                    </Typography>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);
                            setSubmitting(false);
                            requestSubmit(values);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            isSubmitting,
                        }) => (
                                <form onSubmit={handleSubmit} noValidate>                                     
                                    <TextField
                                        variant="filled"
                                        margin="normal"
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        required
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoComplete="email"
                                        defaultValue={values.email}
                                        helperText={errors.email && touched.email && errors.email}
                                        autoFocus
                                    />                                                                                                                                                               
                                    <TextField
                                        variant="filled"
                                        margin="normal"
                                        fullWidth
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        helperText={errors.password && touched.password && errors.password}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<VpnKeyIcon />}
                                        disabled={isSubmitting}
                                        className={classes.submit}
                                    >Sign In</Button>
                                </form>
                            )}
                    </Formik>
                </CardContent>
            </Card>
        </Box>
    );
}