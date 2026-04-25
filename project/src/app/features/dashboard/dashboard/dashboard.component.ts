import { Component, OnInit, runInInjectionContext } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Herb } from '../../../types/herb';
import { HerbService } from '../../herbs/herb.service';
import { UserService } from '../../auth/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  herbs: Herb[] = [];

  constructor(
    private herbService: HerbService,
    private authService: UserService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    if(!currentUser) return;

    this.herbService.getAll().subscribe(herbs => {
      this.herbs = herbs.filter(
        h => h.ownerId === currentUser.email
      );
    });
  }

}
