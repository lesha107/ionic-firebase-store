import { routesTypeDefinition } from 'src/app/utils/types';

export const ADMIN_ROUTES = routesTypeDefinition({
  CORE: {
    path: '',
    fullPath: 'admin'
  },
  SALLERS: {
    path: 'sallers',
    fullPath: 'admin/sallers'
  },
  CLIENTS: {
    path: 'clients',
    fullPath: 'admin/clients'
  }
});
