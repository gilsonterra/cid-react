import React from 'react';
import Datatable from '../../components/Datatable/Datatable';
import RecordStatus from '../../components/RecordStatus';
import { format, parseJSON } from 'date-fns'

function UrnTable() {
    const columnsRecord = [
        {
            id: 'id',
            align: 'center' as const,
            label: 'Urn'
        },
        {
            id: 'departament',
            label: 'Departament',
            format: (val: any, row: any) => (val ? val.name : null),
        },
        {
            id: 'information_source',
            label: 'Information Source',
            format: (val: any, row: any) => (val ? val.name : null),
        },
        {
            id: 'status',
            label: 'Status',
            format: (val: {code: '', name: ''}, row: any) => (<RecordStatus name={val.name} code={val.code} />),
        },
        {
            id: 'created_at',
            label: 'Created At',
            format: (val: string, row: any) => {
                let objDate = parseJSON(val);
                return format(objDate, 'dd/MM/yyyy H:s:ii')
            }
        },
    ];

    return (
        <Datatable title="Record" uri="/records/search" columns={columnsRecord} />
    );
}

export default UrnTable;