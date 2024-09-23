import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomRightWordComponent } from './bottom-right-word.component';

describe('BottomRightWordComponent', () => {
  let component: BottomRightWordComponent;
  let fixture: ComponentFixture<BottomRightWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomRightWordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomRightWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
