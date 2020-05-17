import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

interface IndicatorProps {
    total: number,
    color: string,
    text: string,
    icon: JSX.Element
}

function Indicator(props: IndicatorProps) {
    const { total, color, text, icon } = props;
    const paperStyle = {
        backgroundColor: color,
        margin: 2,
        color: '#fff',
        display: 'inline-block',
        padding: 0,
    };

    return <List style={paperStyle}>
        <ListItem button>
            <ListItemAvatar>{icon}</ListItemAvatar>
            <ListItemText primary={total} secondary={text} />
        </ListItem>
    </List>
}

export default Indicator;