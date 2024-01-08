import {Injectable} from '@angular/core';
import {filter, Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {


  private apiUrl = 'http://localhost:8223/api/v1/auth';

  private helper = new JwtHelperService();

  public token!: string;
  public loggedUser!: string;
  public isloggedIn: boolean = false;
  public roles!: string[];
  public regitredUser : User = new User();
  public isLoginFailed: boolean=false;

  constructor(private httpClient: HttpClient) {
  }


  login(username: string, password: string): Observable<any> {
    // Create HTTP params for the request
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)

    // Make the POST request
    return this.httpClient.post(this.apiUrl, {},{params});
  }

  saveToken(jwt: string,refreshToken:string) {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('refreshToken', refreshToken);
    this.token = jwt;
    this.isloggedIn = true;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.realm_access.roles;
    const userRoles = this.roles.filter(role => role === "USER");
    localStorage.setItem('roles', JSON.stringify(userRoles));
    this.loggedUser = decodedToken.preferred_username ;
    localStorage.setItem('loggedUser', this.loggedUser);

  }


}
