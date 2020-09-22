import HumanRessource from './HumanRessource';
import authRoles from "../../auth/authRoles";

export const HumanRessourceConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.admin,
    routes  : [
        {
            path     : '/rh',
            component: HumanRessource
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
