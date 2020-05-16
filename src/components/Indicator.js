import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

function Indicator({ total, color, text, icon }) {
    const paperStyle = {
        backgroundColor: color,
        marginRight: 5,
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

Indicator.propTypes = {
    total: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired
};

export default Indicator;