import React from 'react';
import {    
    TableHead,
    TableSortLabel,    
    TableCell,    
    TableRow,
} from '@material-ui/core';

export type AlignType = "inherit" | "center" | "left"  | "right" | "justify" | undefined;

export interface EnhancedTableHeadColumnsInterface {
    id: string,
    align?: AlignType,
    label: string,
    format?(val: any, row: any): any
}

interface EnhancedTableHeadProps {
    classes: Record<"table" | "root" | "paper" | "visuallyHidden", string>,
    order: 'asc' | 'desc',
    orderBy: string,
    onRequestSort(event: React.SyntheticEvent<EventTarget>, property: string): any,
    columns: EnhancedTableHeadColumnsInterface[]
}

export const EnhancedTableHead = (props: EnhancedTableHeadProps) => {
    const { classes, order, orderBy, onRequestSort, columns } = props;
    
    const createSortHandler = (property: string) => (event: React.SyntheticEvent<EventTarget>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {columns.map((columns) => (
                    <TableCell
                        key={columns.id}
                        align={columns.align}
                        padding='default'
                        sortDirection={orderBy === columns.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === columns.id}
                            direction={orderBy === columns.id ? order : 'asc'}
                            onClick={createSortHandler(columns.id)}
                        >
                            {columns.label}
                            {orderBy === columns.id ? (
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

EnhancedTableHead.defaultProps = {
    align: 'left'
}