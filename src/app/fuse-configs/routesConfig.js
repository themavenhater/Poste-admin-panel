import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {DashboardConfig} from 'app/main/Dashboard/DashboardConfig';
import {RegulationConfig} from 'app/main/Regulation/RegulationConfig'
import {FeedbackConfig} from 'app/main/feedback/FeedbackConfig'
import {HumanRessourceConfig} from 'app/main/HumanRessource/HumanRessourceConfig'
import {NotificationsConfig} from 'app/main/notifications/NotificationsConfig'
// import {AdminsConfig} from 'app/main/Admins/AdminsConfig'
import {ServiceConfig} from 'app/main/Service/ServiceConfig'
import {ArticlesConfig} from 'app/main/Articles/ArticlesConfig'
import {LoginConfig} from 'app/main/login/LoginConfig'
import {RegionsJobsConfig} from 'app/main/RegionsJobs/RegionsJobsConfig'
import {DocumentConfig} from 'app/main/Document/DocumentConfig'

const routeConfigs = [
  DashboardConfig,
  RegulationConfig,
  HumanRessourceConfig,
  FeedbackConfig,
  NotificationsConfig,
  ServiceConfig,
  // AdminsConfig,
  DocumentConfig,
  ArticlesConfig,
  LoginConfig,
  RegionsJobsConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard"/>
  },
  {
    component: () => <Redirect to="/login"/>
  }
];

export default routes;
