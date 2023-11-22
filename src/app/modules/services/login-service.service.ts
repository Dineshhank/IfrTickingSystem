import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private apiUrl = 'https://intellifer-001-site5.btempurl.com/api/';
  private _authenticated: boolean = false;
  constructor(private http: HttpClient, private router: Router) { }


  signIn(username: string, password: string): Observable<any>  {
    console.log(username)
    console.log(password)
    

    return this.http.post<any>(this.apiUrl+'Client/ValidateClient?userName='+username+'&password='+password,{responseType :'json'}).pipe(
      tap((response: any) => {
    sessionStorage.setItem('userId', response.id);
    sessionStorage.setItem('userType', response.userType);
    sessionStorage.setItem('message', response.message);
    console.log('userId:',response.id);
    console.log('userType:', response.userType);
    console.log('message', response.message);


    this.isAuthenticated();


  }),
  catchError((error: any) => {
     // console.log(error);
     // this.openErrorSnackbar(error.error)
      this.router.navigate(['/sign-in'])
      // Handle errors here if needed
      return of(error); // Return a new observable or error response
  })
    );
  }


  isAuthenticated(): boolean {
    const message = sessionStorage.getItem('message');
  
    if (message !== null && message === 'Login successfully') {
      this._authenticated = true;
      console.log(this._authenticated)
    } else {
      // "Login successfully" message is not present or doesn't match.
      this._authenticated = false;
    }
    console.log(this._authenticated)
  
    return this._authenticated;
  }
  

  check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }
       // Check the access token availability
        // if ( !this.accessToken )
        // {
        //     return of(false);
        // }
        // Check the access token expire date
        // if ( AuthUtils.isTokenExpired(this.accessToken) )
        // {
        //     return of(false);
        // }
        // If the access token exists, and it didn't expire, sign in using it
        //return this.signInUsingToken();
    }


    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        //localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

}
