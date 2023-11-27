import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlydanhmucComponent } from './quanlydanhmuc.component';

describe('QuanlydanhmucComponent', () => {
  let component: QuanlydanhmucComponent;
  let fixture: ComponentFixture<QuanlydanhmucComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanlydanhmucComponent]
    });
    fixture = TestBed.createComponent(QuanlydanhmucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
