import Feedback from './Feedback';
import authRoles from "../../auth/authRoles";
/*
export const FeedbackConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  auth: authRoles.staff,
  routes: [
    {
      path: '/feedback',
      component: Feedback
    }
  ]
};*/

/**
 * Lazy load Example
 */
import React from 'react';

export const FeedbackConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
  auth: authRoles.staff,
    routes  : [
        {
            path     : '/feedback',
          component: React.lazy(() => import((`./Feedback`)))
        }
    ]
};
