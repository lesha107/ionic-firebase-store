import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { RoleGuard } from 'src/app/auth/guards/role.guard';

export { AuthGuard } from 'src/app/auth/guards/auth.guard';
export { RoleGuard } from 'src/app/auth/guards/role.guard';

export const AUTH_GUARDS = [AuthGuard, RoleGuard];
