import { routesTypeDefinition } from 'src/app/utils/types';

export const ADMIN_ROUTES = routesTypeDefinition({
  CORE: {
    path: '',
    fullPath: 'admin',
  },
  SALLER: {
    path: 'saller',
    fullPath: 'admin/saller',
  },
  CLIENT: {
    path: 'client',
    fullPath: 'admin/client',
  },
});
