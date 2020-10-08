// helper for autocomplete. ROOT_ROUTES. -> ADMIN, AUTH

import { AppRoutes } from '../../shared/interfaces';

export const routesTypeDefinition = <T extends AppRoutes>(types: T): T => types;
