import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Herb } from '../../../types/herb';
import { HerbService } from '../herb.service';
import { UserService } from '../../auth/user.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent  implements OnInit{

  herb: Herb | undefined;
  isOwner = false;

  constructor(
    private route: ActivatedRoute,
    private herbService: HerbService,
    private authService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    const foundHerb = this.herbService.getOne(id);

    if(!foundHerb) {
      this.router.navigate(['/catalog']);
      return;
    }

    this.herb = foundHerb;

    const currentUser = this.authService.getCurrentUser();
  
    this.isOwner = currentUser?.email === this.herb.ownerId;
  }

    onDelete(): void {
      if (!this.herb) return;

      const confirmDelete = confirm('Are you sure you want to delete this herb?');

      if(!confirmDelete) return;
  
      this.herbService.delete(this.herb.id);
      this.router.navigate(['/catalog']);
    }
  
  }
