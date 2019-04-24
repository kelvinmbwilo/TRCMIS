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
    console.log(token);
    if (token) {
      this.router.navigate( ['', 'dashboard']);
    }
  }

  login(loginForm) {
    console.log({loginForm});
    this.customeUsernameNotifier = false;
    this.customePasswordNotifier = false;
    const loginCredentials = loginForm.value;

    if (loginCredentials.username === '') {
      this.customeUsernameNotifier = true;
      return;
    } else if (loginCredentials.password === '') {
      this.customePasswordNotifier = true;
      return;
    }

    this.loginNotification.loading = true;
    this.userService.login(loginCredentials).subscribe((results) => {
      console.log({results});
      this.loginNotification.isError = false;
      this.loginNotification.message = 'Login successful';
      this.loginNotification.attempted = true;
      this.loginNotification.loading = false;
      this.userService.loggedIn = true;
      this.userService.setNavigation(results);
      setTimeout(() => {
        console.log('hapa nafika na nnaitwa');
        this.router.navigate(['', 'dashboard']);
      }, 2000);

    }, (error) => {

      this.loginNotification.isError = true;
      this.loginNotification.message = error.status === 0 ? error.message : error.error.error.message;
      // this.loginNotification.message = 'Login failure, wrong username or password';
      this.loginNotification.attempted = true;
      this.loginNotification.loading = false;
      this.userService.loggedIn = false;
      this.router.navigate(['', 'dashboard']);
      setTimeout(() => {
        this.closeNotification();
      }, 8000);
    });
  }

  closeNotification() {
    this.loginNotification.isError = false;
    this.loginNotification.attempted = false;
  }
}
