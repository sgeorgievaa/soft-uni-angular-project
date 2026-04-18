import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HerbService } from '../herb.service';
import { UserService } from '../../auth/user.service';
import { Herb } from '../../../types/herb';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  herb: Herb | null = null;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private herbService: HerbService,
    private authService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');


    if (!id) {
      this.router.navigate(['/catalog']);
      return;
    }

    const foundHerb = this.herbService.getOne(id);

    if (!foundHerb) {
      this.router.navigate(['/catalog']);
      return;
    }

    const currentUser = this.authService.getCurrentUser();

    if (currentUser?.email !== foundHerb.ownerId) {
      this.router.navigate(['/catalog']);
      return;
    }

    this.herb = foundHerb;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid || !this.herb) return;

    const updatedHerb: Herb = {
      ...this.herb,
      ...form.value
    };

    this.herbService.update(this.herb.id, updatedHerb);

    this.router.navigate(['/catalog', this.herb.id]);
  }

}
