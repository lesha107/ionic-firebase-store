import { routesTypeDefinition } from 'src/app/utils/types';

export const AUTH_ROUTES = routesTypeDefinition({
  SIGN_IN: {
    path: 'sign-in',
    fullPath: 'auth/sign-in'
  },
  SIGN_UP: {
    path: 'sign-up',
    fullPath: 'auth/sign-up'
  }
});
