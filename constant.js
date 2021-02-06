module.exports = {
    httpStatusCode : {
        OK : 200,
        TEMPORARY_REDIRECT : 307,
        BAD_REQUEST : 400,
        UNAUTHORIZED : 401,
        FORBIDDEN : 403,
        NOT_FOUND : 404,
        METHOD_NOT_ALLOWED : 405,
        INTERNAL_SERVER_ERROR : 500
    },
    httpErrorCode : {
        SUCCESS : 'SUCCESS',
        USER_ERROR : 'USER_ERROR',
        SERVER_ERROR : 'SERVER_ERROR'
    },
    logType : {
        ACTION : 'action',
        ACCESS : 'access',
        AUDIT : 'audit'
    },
    requestType : {
        CREATE : 'create',
        READ : 'read',
        UPDATE : 'update',
        DELETE : 'delete'
    }
}