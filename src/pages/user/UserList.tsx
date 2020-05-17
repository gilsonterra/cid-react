import React from 'react';
import Datatable from '../../components/Datatable/Datatable';
import { format, parseJSON } from 'date-fns'
import Chip from '@material-ui/core/Chip';

function Dash() {
    const columns = [
        {
            id: 'name',
            label: 'Name'
        },
        {
            id: 'email',
            label: 'Email'
        },
        {
            id: 'created_at',            
            label: 'Created At',
            format: (val:string, row:any) => {
                let objDate = parseJSON(val);
                return format(objDate, 'dd/MM/yyyy H:s:ii')
            }
        },
        {
            id: 'updated_at',            
            label: 'Updated At',
            format: (val:string, row:any) => {
                let objDate = parseJSON(val);
                return format(objDate, 'dd/MM/yyyy H:s:ii')
            }
        },
        {
            id: 'roles',            
            label: 'Roles',
            format: (roles:{id: '', name: ''}[], row:any) => (
                roles.map(role => (
                    <Chip key={role.id} color="primary" label={role.name} />
                ))
            )
        },
        
    ];

    return (
        <Datatable title="Users" method="GET" pagination={false} uri="/users" columns={columns} />
    );
}

export default Dash;