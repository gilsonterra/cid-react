import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import Request from '../../helpers/Request';
import UserInterface from '../../interfaces/UserInterface';
import { Link, useParams } from 'react-router-dom'
import {
    Button,
    TextField,
    Card,
    CardContent,
    Typography
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import RoleInterface from '../../interfaces/RoleInterface';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';

const UserSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  }).defined();

const UserForm = () => {
    const { enqueueSnackbar } = useSnackbar();
    let { id } = useParams();        
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState<UserInterface>({
        email: '',
        name: '',
        roles: [],
        created_at: '',
        updated_at: '',
        id: '',
        is_active: ''
    });
    const requestFindUser = (id: string) => {
        Request({
            method: 'GET',
            url: `/users/${id}`
        }).then(({ data }) => {
            setUser(data.data);
        });
    }

    const handleRequestRoles = () => {
        Request({
            method: 'GET',
            url: '/references/ref_type/ROLE'
        }).then(({ data }) => {
            setRoles(data.data);
        })
    };

    const handleRequestSubmit = (user: UserInterface) => {
        Request({
            method: id ? 'PUT' : 'POST',
            url: id ? `/users/${id}` : '/users',
            data: user
        }).then(({ data }) => {
            console.log(data);
            enqueueSnackbar('Success', { variant: 'success'});
        }).catch((error) => {
            const message = error.response.data.error.description || 'error';
            enqueueSnackbar(message, { variant: 'error' });
        })
    };

    useEffect(() => {
        handleRequestRoles();
    }, []);

    useEffect(() => {
        if (id) {
            requestFindUser(id);
        }

    }, [id]);

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography component="h1" variant="h5">
                        User Agency
                    </Typography>
                    <Formik<UserInterface>
                        initialValues={user}
                        enableReinitialize={true}
                        validationSchema={UserSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(false);
                            handleRequestSubmit(values);
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
                                        id="name"
                                        label="Name"
                                        required
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        autoComplete="name"
                                        value={values.name}
                                        error={errors.name && touched.name && errors.name ? true : false}
                                        helperText={errors.name && touched.name && errors.name}
                                        autoFocus
                                    />
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
                                        error={errors.email && touched.email && errors.email ? true : false}
                                        helperText={errors.email && touched.email && errors.email}                                        
                                    />    
                                     <Autocomplete
                                        id="role_id"
                                        multiple
                                        fullWidth
                                        style={{ marginBottom: 10 }}
                                        value={values.roles}
                                        onChange={(event: React.ChangeEvent<{}>, roles: RoleInterface[]) => {
                                            setUser({...values, roles: [...roles]});                                                                                     
                                        }}                                        
                                        options={roles}
                                        getOptionLabel={(role: RoleInterface) => role ? role.name : ''}
                                        renderInput={(params) => <TextField {...params} label="Role" variant="filled" />}
                                    />
                                    <TextField
                                        variant="filled"
                                        margin="normal"
                                        fullWidth
                                        type="password"
                                        id="password"
                                        label="Password"                                        
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}                                        
                                        value={values.password}
                                        helperText={errors.password && touched.password && errors.password}                                        
                                    /> 
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >Send</Button>
                                    <Button color="primary" component={Link} to="/admin/user/list">Back</Button>
                                </form>
                            )}
                    </Formik>
                </CardContent>
            </Card>
        </div>
    );
}

export default UserForm;