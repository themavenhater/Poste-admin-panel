import Document from './Document';
import authRoles from "../../auth/authRoles";

export const DocumentConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.staff,
    routes  : [
        {
            path     : '/documents',
            component: Document
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
