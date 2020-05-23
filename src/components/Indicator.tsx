import React from 'react';
import { 
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Typography,    
    SvgIcon
} from '@material-ui/core';

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
        color: '#fff',    
        fontSize: '18px',   
        padding: 0,
        width: '100%'
    };

    const IconLarge = () => {        
        return <SvgIcon style={{fontSize: '2.5em'}} children={icon} />;
    }

    return <List style={paperStyle}>
        <ListItem button style={{height: 100}}>            
            <ListItemText 
                primary={<Typography variant="h4">{total}</Typography>} 
                secondary={<Typography variant="subtitle1">{text}</Typography>} />
            <ListItemAvatar><IconLarge /></ListItemAvatar>
        </ListItem>
    </List>
}

export default Indicator;