import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Herb } from '../../../types/herb';
import { HerbService } from '../../herbs/herb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  latestHerbs: Herb[] = [];

  constructor(private herbServive: HerbService) {}

  ngOnInit(): void {
    this.latestHerbs = this.herbServive.getLatest(3);
  }

}
