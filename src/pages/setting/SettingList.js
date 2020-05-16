import React from 'react';
import Datatable from '../../components/Datatable';

function SettingsList() {
    const handleLoading = (loading) => {
        console.log(loading);
    };

    const columnsRecord = [
        {
            id: 'id',
            align: 'center',            
            label: 'Id'
        },
        {
            id: 'code',
            align: 'left',
            label: 'code'            
        },
        {
            id: 'name',
            align: 'left',            
            label: 'Name'            
        },
        {
            id: 'order',
            align: 'left',            
            label: 'Order'            
        }
    ];

    return (        
        <Datatable title="Settings" onLoading={handleLoading} method="GET" pagination={false} uri="/references" columns={columnsRecord} />
    );
}

export default SettingsList;