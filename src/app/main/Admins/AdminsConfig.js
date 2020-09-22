import Admins from './Admins';
import authRoles from "../../auth/authRoles";

export const AdminsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.admin,
    routes  : [
        {
            path     : '/admins',
            component: Admins
        }
    ]
};

/**
 * Lazy load Example
 */
/*
import React from 'react';

export const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};
*/
