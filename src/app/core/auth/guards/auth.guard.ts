import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { of, switchMap } from 'rxjs';
import { LoginServiceService } from 'app/modules/services/login-service.service';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) =>
{
    const router: Router = inject(Router);

    // Check the authentication status
    return inject(LoginServiceService).check().pipe(
        switchMap((authenticated) =>
        {
            // If the user is not authenticated...
            if ( !authenticated )
            {

                // Redirect to the sign-in page with a redirectUrl param
                // const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
                // const urlTree = router.parseUrl(`sign-in?${redirectURL}`);

                //return of(urlTree);
            }

            // Allow the access
            return of(true);
        }),
    );
};



// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationEnd } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { LoginServiceService } from 'app/modules/services/login-service.service'; // Import your authentication service
// import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';


// @Injectable({
//     providedIn: 'root'
// })


// export class AuthGuard implements CanActivate {

//     constructor(private authService: LoginServiceService, private router: Router) {}


//     canActivate(
//         next: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

           

//         if (this.authService.isAuthenticated()) {
//             console.log("its true now")
//             return true;
//         } else {
//             console.log("no you should login")

//              // Redirect to the sign-in page with a redirectUrl param
//             //  const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
//             //  const urlTree = this.router.parseUrl(`sign-in?${redirectURL}`);

//             //  return of(urlTree);

            
//            this.router.navigate(['/sign-in']);
//             return false;
//         }
//     }
// }
