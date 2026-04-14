import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}


  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const { email, password } = form.value;

    const success = this.userService.login({ email, password });

    if (!success) {
      this.errorMessage = 'Invalid email or password';
      return;
    }

    this.router.navigate(['/']);
  
  }
}
