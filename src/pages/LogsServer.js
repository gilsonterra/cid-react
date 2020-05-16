import React, { useState, useEffect } from 'react';
import Request from '../helpers/Request';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';

function LogsServer() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleRequest = () => {
        setLoading(true);
        Request({
            method: 'GET',
            url: '/logs/server'
        }).then(({ data }) => {
            setLogs(data.data);
        }).finally(() => setLoading(false))
    }

    useEffect(() => {
        handleRequest();
    }, []);

    return <Paper elevation={3} style={{ backgroundColor: '#000000', color: '#9e9e9e' }}>
        <Typography variant="h6" component="div" style={{ padding: 10 }}>
            Logs Server
        </Typography>
        {loading
            ? <LinearProgress variant="query" color="secondary" />
            : <List dense  component="nav" aria-label="main mailbox folders">
                {logs.map(log => (
                    <ListItem key={log.log} dense button>
                        <ListItemText primary={log.log} />
                    </ListItem>
                ))}
            </List>
        }
    </Paper>    
}

export default LogsServer;
