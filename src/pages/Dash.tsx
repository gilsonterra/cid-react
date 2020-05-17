import React, {useState, useEffect} from 'react';
import Request from '../helpers/Request';
import constant from '../constants';
import UrnTable from '../pages/urn/UrnTable';
import Indicator from '../components/Indicator';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import CheckIcon from '@material-ui/icons/Check';
import SendIcon from '@material-ui/icons/Send';
import FolderIcon from '@material-ui/icons/Folder';

function Dash() {
    const [recordCount, setRecordCount] = useState({
        [constant.RECORD_STATUS.INCOMPLETE]: 0,
        [constant.RECORD_STATUS.PENDING_APPROVAL]: 0,
        [constant.RECORD_STATUS.APPROVED]: 0,
        [constant.RECORD_STATUS.DISSEMINATED]: 0,
        [constant.RECORD_STATUS.ARCHIVED]: 0,
    });

    const [recordSourceCount, setRecordSourceCount] = useState({
       processed: 0
    });

    const indicators = [
        {
            total: recordSourceCount['processed'],
            color: '#FFA726',            
            text: 'Reports Waiting',
            icon: <UpdateIcon />
        },
        {
            total: recordCount[constant.RECORD_STATUS.INCOMPLETE],
            color: '#BDBDBD',            
            text: 'Incomplete',
            icon: <EditIcon />
        },
        {
            total: recordCount[constant.RECORD_STATUS.PENDING_APPROVAL],
            color: '#FFA728',            
            text: 'Pending Approval',
            icon: <InfoIcon />
        },
        {
            total: recordCount[constant.RECORD_STATUS.APPROVED],
            color: '#7AC27E',            
            text: 'Approved',
            icon: <CheckIcon />
        },
        {
            total: recordCount[constant.RECORD_STATUS.DISSEMINATED],
            color: '#42A5F5',            
            text: 'Disseminated',
            icon: <SendIcon />
        },
        {
            total: recordCount[constant.RECORD_STATUS.ARCHIVED],
            color: '#E57373',            
            text: 'Archieved',
            icon: <FolderIcon />
        }
    ];

    const handleRequestRecordCount = () => {
        Request({
            method: 'POST',
            url: '/records/count'
        }).then(({data}) => {            
            setRecordCount(data.data);
        })
    };

    const handleRequestRecordSourceCount = () => {
        Request({
            method: 'POST',
            url: '/records-sources/count'
        }).then(({data}) => {                        
            setRecordSourceCount(data.data);
        })
    };

    useEffect(() => {
        handleRequestRecordCount();
        handleRequestRecordSourceCount();
    }, []);

    return <div>      
        {indicators.map(i => <Indicator key={i.color} {...i} />)}
        <div style={{marginTop: 30}}>
            <UrnTable />
        </div>
    </div>
}

export default Dash;