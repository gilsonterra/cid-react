import React from 'react';
import {    
    TableHead,
    TableSortLabel,    
    TableCell,    
    TableRow,
    Hidden
} from '@material-ui/core';

export type AlignType = "inherit" | "center" | "left"  | "right" | "justify" | undefined;
export type HiddenType = "xs" | "sm" | "md" | "lg" | "xl" | ("xs" | "sm" | "md" | "lg" | "xl")[] | undefined;

export interface EnhancedTableHeadColumnsInterface {
    id: string,
    align?: AlignType,
    label: string,
    hidden?: HiddenType,
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
                {columns.map((col) => (   
                    <Hidden only={col.hidden}>              
                    <TableCell
                        key={col.id}
                        align={col.align}
                        padding='default'
                        sortDirection={orderBy === col.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === col.id}
                            direction={orderBy === col.id ? order : 'asc'}
                            onClick={createSortHandler(col.id)}
                        >
                            {col.label}
                            {orderBy === col.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>    
                    </Hidden>                   
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.defaultProps = {
    align: 'left'
}