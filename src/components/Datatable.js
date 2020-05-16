import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import LinearProgress from '@material-ui/core/LinearProgress';
import Request from '../helpers/Request';

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort, columns } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {columns.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding='default'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    columns: PropTypes.array.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, title, rowsCount } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    {title} <Badge badgeContent={rowsCount} style={{marginLeft: 15}} color="primary"></Badge>
                </Typography>                
    )
}
        </Toolbar >
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    rowsCount: PropTypes.number.isRequired
};

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


const Datatable = (props) => {
    const { columns, title, uri, method, pagination, onLoading } = props;
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rowsNumber, setRowsNumber] = useState(0);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleRequestData = (paginationParams) => {
        setLoading(true);
        onLoading(true);
        Request({
            method: method,
            url: uri,
            data: {
                filters: {},
                pagination: paginationParams
            }
        }).then(({ data }) => {
            if(pagination){
                setRows(data.data.items);
                setRowsNumber(data.data.rowsNumber);
                setRowsPerPage(data.data.rowsPerPage);
                setPage(data.data.page);
                setOrder(data.data.descending ? 'desc' : 'asc');
                setOrderBy(data.data.sortBy);
            }
            else{
                setRows(data.data);
                setRowsNumber(data.data.length);
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
            sortBy: columns[0].id,
            page: page,
            rowsNumber: rowsNumber,
            rowsPerPage: rowsPerPage
        });
    }, []);

    const handleRequestSort = (event, property) => {
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

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);

        handleRequestData({
            descending: true,
            sortBy: columns[0].id,
            page: newPage + 1,
            rowsNumber: rowsNumber,
            rowsPerPage: rowsPerPage
        });
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);

        handleRequestData({
            descending: true,
            sortBy: columns[0].id,
            page: 1,
            rowsNumber: rowsNumber,
            rowsPerPage: parseInt(event.target.value, 10)
        });
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar rowsCount={rowsNumber} numSelected={selected.length} title={title} />
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
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);                                

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
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
                { pagination 
                    ? <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={rowsNumber}
                        rowsPerPage={rowsPerPage}
                        page={page - 1}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    : <Typography style={{textAlign: 'center'}} color="inherit" variant="h6" component="div">
                        {rowsNumber} registers.
                    </Typography>
                }
                
            </Paper>
        </div>
    );
}

Datatable.defaultProps = {
    method: 'POST',
    pagination: true,
    onLoading: () => {}
};

Datatable.propTypes = {
    pagination: PropTypes.bool.isRequired,
    method: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    uri: PropTypes.string.isRequired,
    onLoading: PropTypes.func
};

export default Datatable;
