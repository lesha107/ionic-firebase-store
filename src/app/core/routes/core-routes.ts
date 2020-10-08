import { routesTypeDefinition } from 'src/app/utils/types';

export const CORE_ROUTES = routesTypeDefinition({
  AUTH: {
    path: 'auth',
    fullPath: '/auth',
  },
  ADMIN: {
    path: 'admin',
    fullPath: '/admin',
  },
});
