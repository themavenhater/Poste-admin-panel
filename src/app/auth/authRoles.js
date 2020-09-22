/**
 * Authorization Roles
 */
const authRoles = {
    admin    : ['admin'],
    staff    : ['admin', 'moderateur'],
    // user     : ['admin', 'staff', 'user'],
    onlyGuest: []
};

export default authRoles;
