import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeCollectionComponent } from './anime-collection.component';

describe('AnimeCollectionComponent', () => {
  let component: AnimeCollectionComponent;
  let fixture: ComponentFixture<AnimeCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
