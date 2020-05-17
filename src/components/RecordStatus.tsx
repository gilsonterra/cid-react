import React, { useState, useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import SendIcon from '@material-ui/icons/Send';
import FolderIcon from '@material-ui/icons/Folder';
import constants from '../constants';

interface RecordStatusPropsInterface {
    code: string,
    name: string
}

interface ConfigElementInterface {
    color?: string,
    icon: JSX.Element
}


function RecordStatus(props: RecordStatusPropsInterface) {    
    let [config, setConfig] = useState<ConfigElementInterface>({ color: "#CCC", icon: <EditIcon /> });

    const setup = (props: RecordStatusPropsInterface) => {
        let config: ConfigElementInterface = { color: "#CCC", icon: <EditIcon /> };        

        switch (props.code) {
            case constants.RECORD_STATUS.PENDING_APPROVAL:
                config.color = "#FDD835";
                config.icon = <InfoIcon />;
                break;
            case constants.RECORD_STATUS.APPROVED:                
                config.color = "#81C784";
                config.icon = <CheckIcon />;
                break;
            case constants.RECORD_STATUS.DISSEMINATED:                
                config.color = "#64B5F6";
                config.icon = <SendIcon />;
                break;
            case constants.RECORD_STATUS.ARCHIVED:                
                config.color = "#E57373";
                config.icon = <FolderIcon />;
                break;
            default:                
                config.color = "#CCC";
                config.icon = <EditIcon />;
                break;
        }

        setConfig(config);
    }


    useEffect(() => {
        setup(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Chip label={props.name} style={{backgroundColor: config.color}} icon={config.icon} />
    );
}

export default RecordStatus;