import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Herb } from '../../../types/herb';
import { HerbService } from '../../herbs/herb.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  herbs: Herb[] = [];

  constructor(private herbService: HerbService) {}

  ngOnInit(): void {
    this.herbs = this.herbService.getAll();
  }
}
