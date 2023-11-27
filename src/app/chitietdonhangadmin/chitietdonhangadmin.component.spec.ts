import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietdonhangadminComponent } from './chitietdonhangadmin.component';

describe('ChitietdonhangadminComponent', () => {
  let component: ChitietdonhangadminComponent;
  let fixture: ComponentFixture<ChitietdonhangadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChitietdonhangadminComponent]
    });
    fixture = TestBed.createComponent(ChitietdonhangadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
