import React from 'react';
import Datatable from '../components/Datatable';
import RecordStatus from '../components/RecordStatus';
import { format, parseJSON } from 'date-fns'

function Dash() {
    const columnsRecord = [
        {
            id: 'id',
            label: 'Urn'
        },
        {
            id: 'departament',
            label: 'Departament',
            format: (val, row) => (val ? val.name : null),
        },
        {
            id: 'information_source',
            label: 'Information Source',
            format: (val, row) => (val ? val.name : null),
        },
        {
            id: 'status',
            label: 'Status',
            format: (val, row) => (<RecordStatus status={val} />),
        },
        {
            id: 'created_at',            
            label: 'Created At',
            format: (val, row) => {
                let objDate = parseJSON(val);
                return format(objDate, 'dd/MM/yyyy H:s:ii')
            }
        },
    ];

    return (
        <Datatable title="Record" uri="/records/search" columns={columnsRecord} />
    );
}

export default Dash;