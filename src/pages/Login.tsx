import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
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
        console.log(errors);
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
        <Container component="main" maxWidth="xs">
            <Card className={classes.paper}>
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
        </Container>
    );
}