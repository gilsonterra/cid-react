import React from 'react';
import Datatable from '../../components/Datatable/Datatable';

function SettingsList() {
    const handleLoading = (loading:boolean) => {        
        return loading;
    };

    const columnsRecord = [
        {
            id: 'id',
            align: 'center' as const,            
            label: 'Id'
        },
        {
            id: 'code',
            align: 'left' as const,
            label: 'code'            
        },
        {
            id: 'name',
            align: 'left' as const,            
            label: 'Name'            
        },
        {
            id: 'order',
            align: 'left' as const,            
            label: 'Order'            
        }
    ];

    return (        
        <Datatable title="Settings" onLoading={handleLoading} method="GET" pagination={false} uri="/references" columns={columnsRecord} />
    );
}

export default SettingsList;