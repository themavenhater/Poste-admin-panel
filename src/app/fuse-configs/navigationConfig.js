import {authRoles} from 'app/auth';

const navigationConfig = [
  {
    'id': 'applications',
    'title': 'Applications',
    'type': 'group',
    'icon': 'apps',
    'auth': authRoles.staff,
    'children': [
      {
        'id': 'dashboard-component',
        'title': 'Tableau de bord',
        'type': 'item',
        'icon': 'dashboard',
        'auth': authRoles.staff,
        'url': '/dashboard'
      },
      {
        'id': 'articles-component',
        'title': 'Actualité',
        'type': 'item',
        'icon': 'news',
        'auth': authRoles.staff,
        'url': '/articles'
      },
      {
        'id': 'services-component',
        'title': 'Services',
        'type': 'collapse',
        'icon': 'whatshot',
        'auth': authRoles.staff,
        'url': '/services-types',
        'children': [
          {
            'id': 'services',
            'title': 'Services',
            'type': 'item',
            'icon': 'shopping_cart',
            'auth': authRoles.staff,
            'url': '/services-types/services',
          },
          {
            'id': 'types',
            'title': 'Types',
            'type': 'item',
            'icon': 'shopping_cart',
            'auth': authRoles.staff,
            'url': '/services-types/types',
          },
        ]
      },
      {
        'id': 'rh-component',
        'title': 'Ressources humaines',
        'type': 'item',
        'icon': 'whatshot',
        'auth': authRoles.staff,
        'url': '/rh'
      },
      {
        'id': 'feedback-component',
        'title': 'Retours',
        'type': 'item',
        'icon': 'whatshot',
        'auth': authRoles.staff,
        'url': '/feedback'
      },
      {
        'id': 'notif-component',
        'title': 'Notification',
        'type': 'item',
        'icon': 'whatshot',
        'auth': authRoles.staff,
        'url': '/notifications'
      },
      {
        'id': 'doc-component',
        'title': 'Documents',
        'type': 'item',
        'icon': 'whatshot',
        'auth': authRoles.staff,
        'url': '/documents'
      },
      {
        'id': 'regionsjobs-component',
        'title': 'Régions & fonctions',
        'type': 'item',
        'icon': 'whatshot',
        'auth': authRoles.staff,
        'url': '/regionsjobs'
      },
      /*{
        'id': 'admins-component',
        'title': 'Admin',
        'type': 'item',
        'icon': 'whatshot',
        'auth': authRoles.admin,
        'url': '/admins'
      },*/
    ]
  }
];

export default navigationConfig;
