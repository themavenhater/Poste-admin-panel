import Notifications from './Notifications';
import authRoles from "../../auth/authRoles";

export const NotificationsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.admin,
    routes  : [
        {
            path     : '/notifications',
            component: Notifications
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
