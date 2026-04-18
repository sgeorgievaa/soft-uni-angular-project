import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HerbService } from '../herb.service';
import { UserService } from '../../auth/user.service';
import { Router } from '@angular/router';
import { Herb } from '../../../types/herb';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  constructor(
    private herbService: HerbService,
    private authService: UserService,
    private router: Router
  ) {}

  onSubmit(form: NgForm): void {
    if(form.invalid) return;

    const { name, benefits, usage, imageUrl } = form.value;

    const currentUser = this.authService.getCurrentUser();

    const newHerb: Herb = {
      id: Date.now().toString(),
      name,
      benefits,
      usage,
      imageUrl,
      ownerId: currentUser?.email || ''
    };

    this.herbService.create(newHerb);

    form.reset();

    this.router.navigate(['/catalog']);
  }

}
