import React from 'react';
import authRoles from "../../auth/authRoles";

export const RegionsJobsConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  auth: authRoles.admin,
  routes  : [
    {
      path: '/regionsjobs',
      component: React.lazy(() => import((`./RegionsJobs`)))
    },
  ]
};
