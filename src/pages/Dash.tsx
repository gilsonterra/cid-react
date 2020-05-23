import React, { useState, useEffect } from 'react';
import Request from '../helpers/Request';
import constant from '../constants';
import UrnTable from '../pages/urn/UrnTable';
import Indicator from '../components/Indicator';
import {
    Folder as FolderIcon,
    Edit as EditIcon,
    Info as InfoIcon,
    Check as CheckIcon,
    Send as SendIcon,
    Update as UpdateIcon
} from '@material-ui/icons';
import { Grid } from '@material-ui/core';

const Dash = () => {
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
        }).then(({ data }) => {
            setRecordCount(data.data);
        })
    };

    const handleRequestRecordSourceCount = () => {
        Request({
            method: 'POST',
            url: '/records-sources/count'
        }).then(({ data }) => {
            setRecordSourceCount(data.data);
        })
    };

    useEffect(() => {
        handleRequestRecordCount();
        handleRequestRecordSourceCount();
    }, []);

    return <>
        <Grid container spacing={1}>
            {indicators.map(i => (
                <Grid item sm={12} md={4} lg={2} key={i.color}>
                    <Indicator  {...i} />
                </Grid>
            ))}
        </Grid>
        <div style={{ marginTop: 30 }}>
            <UrnTable />
        </div>
    </>
}

export default Dash;