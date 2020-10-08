export const routesTypeDefinition = <T extends { [key: string]: string }>(types: T): T => types;

export const APP_TOASTR_MESSAGES = routesTypeDefinition({
  INVALID_ROLE: 'Invalid role',
  INVALID_CREDENTIAL: 'Invalid login or password ',
});
