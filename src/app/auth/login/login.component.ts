import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/auth/service/user.service';
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
        const savedUser = this.userService.getUser();
//       this.userService.saveToken('placeholderToken');
   this.userService.authenticateUser(email, password).subscribe(
      (response: any) => {
        // Assuming the server returns a token in the response
        const token = response.token;

        // Save the received token
        this.userService.saveToken(token);

        this.router.navigate(['/home']);
        alert('Logged in successfully');
        console.log("This session is: ", this.userService.isLoggedIn());
      },
      (error) => {
        alert('Incorrect email or password. Please try again!');
      }
    );
}
    else alert('Please fill all required fields. ');
  }
}

