import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerbCardComponent } from './herb-card.component';

describe('HerbCardComponent', () => {
  let component: HerbCardComponent;
  let fixture: ComponentFixture<HerbCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HerbCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HerbCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
