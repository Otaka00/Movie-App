import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/pages/auth/service/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login-register.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private router: Router,
  private fb: FormBuilder,
  private userService: UserService,
  private title:Title)
  {
     this.title.setTitle('Login');
}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

navigateToRegister() {
    this.router.navigate(['/register']);
  }
  onSubmit() {
  if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;

          if (email === "admin@gmail.com" && password === "123456") {
            this.router.navigate(['/home']);
            alert('Logged in successfully');
          }
          else{
          alert('Incorrect email or password. Please try again!');
   }
}
    else alert('Please fill all required fields. ');

}
}

