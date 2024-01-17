import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/pages/auth/service/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  ngOnInit(): void {
  }

constructor(private fb: FormBuilder,
            private router: Router,
            private userService: UserService,
            private title: Title)
     {
      this.title.setTitle('Register');
      this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      reenteredPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
register() {
  if (this.registerForm.valid) {
     const { email, password } = this.registerForm.value;

      this.userService.saveUser(email, password);
        // Registration successful, navigate to login
        this.router.navigate(['/login']);
        alert('Congrats! Account created successfully.');

    } else {
      // Form is not valid, show alert
      alert('Please enter all required fields.');
    }
        console.log('Registration form submitted:', this.registerForm.value);

    }

}
