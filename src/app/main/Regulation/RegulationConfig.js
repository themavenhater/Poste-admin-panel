import Regulation from './Regulation';

export const RegulationConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/regulation',
            component: Regulation
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
