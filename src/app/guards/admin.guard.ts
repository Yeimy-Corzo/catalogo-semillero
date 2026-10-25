import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanMatchFn = (route, segments) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.tieneRol('admin')){
      return true; 
    }
    return router.parseUrl('/productos');
};
