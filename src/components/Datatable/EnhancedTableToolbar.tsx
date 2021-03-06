import React from 'react';
import {
    lighten,
    makeStyles
} from '@material-ui/core/styles';
import {
    Toolbar,
    Typography,
    Badge,
} from '@material-ui/core';

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

interface EnhancedTableToolbarProps {
    title: string,
    rowsCount: number,
    headerRight?: JSX.Element
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { title, rowsCount, headerRight } = props;
    const classes = useToolbarStyles();

    return (
        <Toolbar>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                {title} <Badge badgeContent={rowsCount} style={{ marginLeft: 15 }} color="primary"></Badge>
            </Typography>
            {headerRight}
        </Toolbar >
    );
};

export default EnhancedTableToolbar;