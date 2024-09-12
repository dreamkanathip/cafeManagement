import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngerdientComponent } from './ingerdient.component';

describe('IngerdientComponent', () => {
  let component: IngerdientComponent;
  let fixture: ComponentFixture<IngerdientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngerdientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngerdientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
