import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthenticatedGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService) {
  }

  canLoad(): Observable<boolean> {
    return this.authService.authenticated()
      .pipe(
        map(authenticated => {
          if (!authenticated) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        }),
        catchError(() => {
          this.router.navigate(['/login']);
          return of(false);
        })
      );
  }
}

@Injectable()
export class UnAuthenticatedGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService) {
  }

  canLoad(): Observable<boolean> {
    return this.authService.authenticated()
      .pipe(
        map(authenticated => {
          if (!authenticated) {
            return true;
          }
          this.router.navigate([`/`]);
          return false;
        }),
        catchError(() => {
          this.router.navigate(['/']);
          return of(true);
        })
      );
  }
}
