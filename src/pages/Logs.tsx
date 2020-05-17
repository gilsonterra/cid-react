import React, { useState, useEffect } from 'react';
import Datatable from '../components/Datatable/Datatable';
import Resquest from '../helpers/Request';
import { format, parseJSON } from 'date-fns';
import { Formik } from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    Card,
    CardContent,
    Button,
    TextField
} from '@material-ui/core';
import { useLocation, useHistory } from "react-router-dom";


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Logs() {
    let query = useQuery();
    let history = useHistory();
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        activity: '',
        user_id: ''
    });
    const columnsRecord = [
        {
            id: 'id',
            align: 'center' as const,
            label: 'Id'
        },
        {
            id: 'user',
            align: 'left' as const,
            label: 'User Agency',
            format: (val: any, row: any) => (val ? val.name : null),
        },
        {
            id: 'activity',
            align: 'left' as const,
            label: 'Activity',
            format: (val: string, row: any) => (<pre>{val}</pre>),
        },
        {
            id: 'created_at',
            align: 'left' as const,
            label: 'Created At',
            format: (val: string, row: any) => {
                let objDate = parseJSON(val);
                return format(objDate, 'dd/MM/yyyy H:s:ii')
            }
        },
    ];

    const setQuery = (values: { [key: string]: any }) => {
        Object.keys(values).map((key: string) => query.set(key, values[key]));
        history.replace({
            pathname: history.location.pathname,
            search: query.toString()
        });
    };

    const handleRequestUsers = () => {
        Resquest({
            method: 'GET',
            url: '/users'
        }).then(({ data }) => {
            setUsers(data.data);

            setFilters({
                activity: query.get('activity') || '',
                user_id: ''
            })

        })
    };

    useEffect(() => {
        handleRequestUsers();
    }, []);

    return <div>
        <Card>
            <CardContent>
                <Formik
                    enableReinitialize
                    initialValues={filters}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false);
                        setFilters(values);
                        setQuery(values);
                    }}
                >
                    {({
                        values,
                        setFieldValue,
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
                                    id="activity"
                                    label="Activity"
                                    name="activity"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    defaultValue={values.activity}
                                    autoFocus
                                />
                                <Autocomplete
                                    id="user_id"
                                    fullWidth
                                    style={{ marginBottom: 10 }}
                                    options={users}
                                    getOptionLabel={(option: { name: '' }) => option ? option.name : ''}
                                    renderInput={(params) => <TextField {...params} label="User" variant="filled" />}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SearchIcon />}
                                    disabled={isSubmitting}
                                >Search</Button>
                            </form>
                        )}
                </Formik>
            </CardContent>
        </Card>
        <br />
        <Datatable filters={filters} title="Logs" uri="/logs/search" columns={columnsRecord} />
    </div>
}

export default Logs;