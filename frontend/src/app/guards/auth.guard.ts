import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const user = authService.currentUser;
  const username = route.paramMap.get('username');

  if (!user.name) {
    router.navigateByUrl('/login');
    return false;
  }

  if (user.name === username) {
    return true;
  }

  router.navigateByUrl('/');
  return false;
};
