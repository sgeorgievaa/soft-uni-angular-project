import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage = '';
  passwordMismatch = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const { email, password, rePass } = form.value;

    // Reset state
    this.passwordMismatch = false;
    this.errorMessage = '';

    // Check passwords
    if (password !== rePass) {
      this.passwordMismatch = true;
      return;
    }

    const success = this.userService.register({ email, password });

    if (!success) {
      this.errorMessage = 'User already exists';
      return;
    }

    this.router.navigate(['/login']);

  }
}
