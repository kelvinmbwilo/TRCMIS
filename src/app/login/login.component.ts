import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginNotification = {isError: false, message: 'Login successful', attempted: false, loading: false};
  loginForm: FormGroup;
  customeUsernameNotifier: boolean = false;
  customePasswordNotifier: boolean = false;
  hide = true;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  ngOnInit() {
    const token = localStorage.getItem('htmr-web-token');
    const location = localStorage.getItem('htmr-starting-location');
    console.log(token);
    if (token && location) {
      this.router.navigate( ['', 'dashboard']);
    }
  }

  async login(loginCredentials) {
    if (this.loginForm.valid) {
      this.loginNotification.loading = true;
      try {
        const openSrpResult: any = await this.userService.login1(loginCredentials).toPromise();
        const openMrsResult: any = await this.userService.login(loginCredentials).toPromise();
        if (openSrpResult) {
          if (openSrpResult.team && openSrpResult.team.team) {
            if (openSrpResult.team.team.location) {
              const location = openSrpResult.team.team.location;
              const starting_location = location ? location.uuid : 'ed787525-d770-11e8-ba9c-f23c917bb7ec';
              localStorage.setItem('htmr-starting-location', starting_location);
            }
          }
        }
        if (openMrsResult && openMrsResult.results) {
          if (openMrsResult.results.length > 0) {
              const username = openMrsResult.results[0].display;
              localStorage.setItem('trcmis-user', username);
              this.userService.setNavigation(openMrsResult);
          }
        }
        this.loginNotification.isError = false;
        this.loginNotification.message = 'Login successful';
        this.loginNotification.attempted = true;
        this.loginNotification.loading = false;
        this.userService.loggedIn = true;
        setTimeout(() => {
          this.router.navigate(['', 'dashboard']);
        }, 2000);
      } catch (e) {
        console.log(e);
        this.loginNotification.isError = true;
        this.loginNotification.message = e.status === 0 ? e.message : e.error.error.message;
        // this.loginNotification.message = 'Login failure, wrong username or password';
        this.loginNotification.attempted = true;
        this.loginNotification.loading = false;
        this.userService.loggedIn = false;
        localStorage.removeItem('htmr-web-token');
        // this.router.navigate(['', 'dashboard']);
        setTimeout(() => {
          this.closeNotification();
        }, 6000);
      }
    }
    // const loginCredentials = loginForm.value;
    //
    // this.loginNotification.loading = true;
    // this.userService.login(loginCredentials).subscribe((openSrpResult: any) => {
    //
    // });
    // this.userService.login(loginCredentials).subscribe((results: any) => {
    //   console.log({results});
    //   const username = results && results.results ? results.results[0].display : '';
    //   localStorage.setItem('trcmis-user', username);
    //   this.loginNotification.isError = false;
    //   this.loginNotification.message = 'Login successful';
    //   this.loginNotification.attempted = true;
    //   this.loginNotification.loading = false;
    //   this.userService.loggedIn = true;
    //   this.userService.setNavigation(results);
    //   setTimeout(() => {
    //     this.router.navigate(['', 'dashboard']);
    //   }, 2000);
    //
    // }, (error) => {
    //
    //   this.loginNotification.isError = true;
    //   this.loginNotification.message = error.status === 0 ? error.message : error.error.error.message;
    //   // this.loginNotification.message = 'Login failure, wrong username or password';
    //   this.loginNotification.attempted = true;
    //   this.loginNotification.loading = false;
    //   this.userService.loggedIn = false;
    //   localStorage.removeItem('htmr-web-token');
    //   // this.router.navigate(['', 'dashboard']);
    //   setTimeout(() => {
    //     this.closeNotification();
    //   }, 6000);
    // });
  }

  closeNotification() {
    this.loginNotification.isError = false;
    this.loginNotification.attempted = false;
  }
}
