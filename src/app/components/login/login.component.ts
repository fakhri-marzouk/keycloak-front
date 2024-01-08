import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authentication: AuthenticationService, private router: Router) {
  }

  form: any = {
    username: null,
    password: null
  };

  login(): void {
    const {email, password} = this.form;
    this.authentication.login(email, password).subscribe(
      {
        next: data => {
          let jwt = data['access_token'];
          let refreshToken = data['refresh_token'];
          this.authentication.saveToken(jwt,refreshToken);
          console.log(data);
          this.router.navigate(['/home']);
        },
        error: error => {
          console.log(error);
        }
      }
    )
  }

}
