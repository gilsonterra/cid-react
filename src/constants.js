const PERMISSION = {
    APPROVE: 'approve',
    CREATE: 'create',
    EDIT: 'edit',
    DELETE: 'deleted',
    VIEW_LOGS: 'view_logs',
    ADMINISTER_USER: 'administer_user',
    ADMINISTER_SETTINGS: 'administer_settings',
    ADMINISTER_ROLES_AND_PERMISSIONS: 'administer_roles_and_permissions'
};

const RECORD_STATUS = {
    INCOMPLETE: 'incomplete',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    DISSEMINATED: 'disseminated',
    ARCHIVED: 'archived',
};

const RECORD_SOURCE_STATUS = {
    UNPROCESSED: 0,
    PROCESSED: 1,
    DISMISSED: 2
}

const EVENT_BUS = {
    UPDATE_RECORD_SOURCE_COUNT: 'update-resource-source-count'
}

export default { PERMISSION, RECORD_STATUS, RECORD_SOURCE_STATUS, EVENT_BUS };