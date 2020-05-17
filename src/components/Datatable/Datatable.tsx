import React, { useState, useEffect } from 'react';
import Request from '../../helpers/Request';
import { EnhancedTableHead, EnhancedTableHeadColumnsInterface } from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import { makeStyles } from '@material-ui/core/styles';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TablePagination,
    Typography,
    Paper,
    LinearProgress
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

interface DatableProps {
    columns: EnhancedTableHeadColumnsInterface[],
    title: string,
    uri: string,
    onLoading(status: boolean): boolean,
    pagination: boolean,    
    method: string,    
    filters?: { [key: string]: any }
}

const Datatable = (props: DatableProps) => {
    const { columns, title, uri, method, pagination, onLoading, filters } = props;
    const classes = useStyles();
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState('calories');    
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rowsNumber, setRowsNumber] = useState(0);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const sortBy = columns ? columns[0].id : '';

    const handleRequestData = (paginationParams: object) => {
        setLoading(true);
        onLoading(true);
        Request({
            method: method,
            url: uri,
            data: {
                filters: filters,
                pagination: paginationParams
            }
        }).then(({ data }) => {
            const response = data.data || [];

            if (pagination) {
                setRows(response.items);
                setRowsNumber(response.rowsNumber);
                setRowsPerPage(response.rowsPerPage);
                setPage(response.page);
                setOrder(response.descending ? 'desc' : 'asc');
                setOrderBy(response.sortBy);
            }
            else {                
                setRows(response);
                setRowsNumber(response.length);
            }

        }).catch((error) => {
            console.log(error);
        })
            .finally(() => {
                setLoading(false);
                onLoading(false);
            });
    }

    useEffect(() => {
        handleRequestData({
            descending: true,
            sortBy: sortBy,
            page: page,
            rowsNumber: rowsNumber,
            rowsPerPage: rowsPerPage
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const handleRequestSort = (event: React.SyntheticEvent<EventTarget>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);

        handleRequestData({
            descending: isAsc ? true : false,
            sortBy: property,
            page: page,
            rowsNumber: rowsNumber,
            rowsPerPage: rowsPerPage
        });

    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage + 1);

        handleRequestData({
            descending: true,
            sortBy: sortBy,
            page: newPage + 1,
            rowsNumber: rowsNumber,
            rowsPerPage: rowsPerPage
        });
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);

        handleRequestData({
            descending: true,
            sortBy: sortBy,
            page: 1,
            rowsNumber: rowsNumber,
            rowsPerPage: parseInt(event.target.value, 10)
        });
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar rowsCount={rowsNumber} title={title} />
                {loading ? <LinearProgress /> : null}
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size="medium"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            columns={columns}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {rows.map((row, index) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={index}
                                    >
                                        {columns.map((column) => (
                                            <TableCell align={column.align} key={column.id}>{
                                                row[column.id] && column.format ? column.format(row[column.id], row) : row[column.id]
                                            }</TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })}
                            {rows.length <= 0 ? <TableRow><TableCell colSpan={columns.length}>Empty</TableCell></TableRow> : null}

                        </TableBody>
                    </Table>
                </TableContainer>
                {pagination
                    ? <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={rowsNumber}
                        rowsPerPage={rowsPerPage}
                        page={page - 1}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    : <Typography style={{ textAlign: 'center' }} color="inherit" variant="h6" component="div">
                        {rowsNumber} registers.
                    </Typography>
                }

            </Paper>
        </div>
    );
}

Datatable.defaultProps = {
    filters: {},
    pagination: true,
    method: 'POST', 
    onLoading: (status: boolean) => status
};

export default Datatable;
