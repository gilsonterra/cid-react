import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import SendIcon from '@material-ui/icons/Send';
import FolderIcon from '@material-ui/icons/Folder';
import constants from '../constants';

function RecordStatus({ status }) {
    let [config, setConfig] = useState({});

    const setup = (status) => {
        let config = {};

        switch (status.code) {
            case constants.RECORD_STATUS.PENDING_APPROVAL:
                config = { color: "#FDD835", icon: <InfoIcon /> };
                break;
            case constants.RECORD_STATUS.APPROVED:
                config = { color: "#81C784", icon: <CheckIcon /> };
                break;
            case constants.RECORD_STATUS.DISSEMINATED:
                config = { color: "#64B5F6", icon: <SendIcon /> };
                break;
            case constants.RECORD_STATUS.ARCHIVED:
                config = { color: "#E57373", icon: <FolderIcon /> };
                break;
            default:
                config = { color: "", icon: <EditIcon /> };
                break;
        }

        setConfig(config);
    }


    useEffect(() => {
        setup(status);
    }, [])


    return (
        <Chip label={status.name} style={{backgroundColor: config.color}} icon={config.icon} />
    );
}

RecordStatus.propTypes = {
    status: PropTypes.object.isRequired
};

export default RecordStatus;