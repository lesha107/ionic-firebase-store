import { Route } from '@angular/router';

export interface AppRoutes {
  [index: string]: AppRoute;
}

export interface AppRoute extends Route {
  fullPath?: string;
}
