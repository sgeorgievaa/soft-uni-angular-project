import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Herb } from '../../../types/herb';
import { HerbService } from '../../herbs/herb.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  herbs: Herb[] = [];
  allHerbs: Herb[] = [];

  searchTerm: string = '';
  hasSearched: boolean = false;

  constructor(private herbService: HerbService) {}

  ngOnInit(): void {
    this.herbService.getAll().subscribe(herbs => {
      this.allHerbs = herbs;
      this.herbs = [...herbs];
    });
  }

  onSearch(): void {
    this.hasSearched = true;

    const term = this.searchTerm.toLowerCase();

    this.herbs = this.allHerbs.filter(h =>
      h.name.toLowerCase().includes(term)
    );
  }
}
