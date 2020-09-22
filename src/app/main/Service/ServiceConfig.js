import React from 'react';
import {Redirect} from 'react-router-dom';
import authRoles from "../../auth/authRoles";

export const ServiceConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.staff,
    routes  : [
        {
            path     : '/services-types/services/:serviceId',
            component: React.lazy(() => import((`./service/Service`)))
        },
        {
            path     : '/services-types/services',
            component: React.lazy(() => import((`./services/Services`)))
        },
        {
            path     : '/services-types/types/',
            component: React.lazy(() => import((`./types/Types`)))
        },
        {
            path: '/services-types',
            component: () => <Redirect to="/services-types/services"/>
        },

    ]
};
