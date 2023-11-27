import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlydonhangadminComponent } from './quanlydonhangadmin.component';

describe('QuanlydonhangadminComponent', () => {
  let component: QuanlydonhangadminComponent;
  let fixture: ComponentFixture<QuanlydonhangadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanlydonhangadminComponent]
    });
    fixture = TestBed.createComponent(QuanlydonhangadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
