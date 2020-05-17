import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import Request from '../../helpers/Request';
import UserInterface from '../../interfaces/UserInterface';
import {
    Button,
    TextField,
    Card,
    CardContent,
    Typography
} from '@material-ui/core';

const UserForm = () => {
    const [user, setUser] = useState<UserInterface>({
        email: '',
        name: '',
        roles: [],
        created_at: '',
        updated_at: '',
        id: '',
        is_active: ''
    });

    const requestFindUser = (id: number) => {
        Request({
            method: 'GET',
            url: `/users/${id}`
        }).then(({data}) => {            
            setUser(data.data);            
        });
    }

    useEffect(() => {
        requestFindUser(2);
    }, []);

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography component="h1" variant="h5">
                        User Agency
                    </Typography>
                    {user.email}
                    <Formik<UserInterface>                        
                        initialValues={user}
                        enableReinitialize={true}                        
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(false);
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
                                        value={values.email}
                                        helperText={errors.email && touched.email && errors.email}
                                        autoFocus
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >Sign In</Button>
                                </form>
                            )}
                    </Formik>
                </CardContent>
            </Card>
        </div>
    );
}

export default UserForm;