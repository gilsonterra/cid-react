import React from 'react';
import Datatable from '../components/Datatable';
import { format, parseJSON } from 'date-fns'

function Logs() {
    const columnsRecord = [
        {
            id: 'id',
            align: 'center',            
            label: 'Id'
        },
        {
            id: 'user',
            align: 'left',
            label: 'User Agency',
            format: (val, row) => (val ? val.name : null),
        },
        {
            id: 'activity',
            align: 'left',            
            label: 'Activity',
            format: (val, row) => (<pre>{val}</pre>),
        },
        {
            id: 'created_at',
            align: 'left',            
            label: 'Created At',
            format: (val, row) => {
                let objDate = parseJSON(val);
                return format(objDate, 'dd/MM/yyyy H:s:ii')
            }
        },
    ];

    return (
        <Datatable title="Logs" uri="/logs/search" columns={columnsRecord} />
    );
}

export default Logs;