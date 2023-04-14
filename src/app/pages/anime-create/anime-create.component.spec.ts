import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeCreateComponent } from './anime-create.component';

describe('AnimeCreateComponent', () => {
  let component: AnimeCreateComponent;
  let fixture: ComponentFixture<AnimeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
