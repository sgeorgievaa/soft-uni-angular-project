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

    this.herbService.getOne(id).subscribe({
      next: (herb) => {
        if (!herb) {
          this.router.navigate(['/catalog']);
          return;
        }

        this.herb = herb;

        const currentUser = this.authService.getCurrentUser();
        this.isOwner = currentUser?.email === herb.ownerId;
      },
      error: () => {
        this.errorMessage = 'Failed to load herb. Please try again.';
      }
    });
  }

    onDelete(): void {
      if (!this.herb) return;

      const confirmDelete = confirm('Are you sure you want to delete this herb?');

      if(!confirmDelete) return;
  
      this.herbService.delete(this.herb.id).subscribe({
        next: () => {
          this.router.navigate(['/catalog']);
        },
        error: () => {
          this.errorMessage = 'Failed to delete herb. Please try again.';
          
        }
      });
    }
  
  }
