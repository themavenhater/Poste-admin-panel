/*import Articles from './Articles';
import authRoles from "../../auth/authRoles";

export const ArticlesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.admin,
    routes  : [
        {
            path     : '/articles',
            component: Articles
        }
    ]
};*/

/**
 * Lazy load Example
 */
import React from 'react';
import authRoles from "../../auth/authRoles";

export const ArticlesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.admin,
    routes  : [
        {
            path     : '/articles',
            component: React.lazy(() => import('./Articles'))
        }
    ]
};
