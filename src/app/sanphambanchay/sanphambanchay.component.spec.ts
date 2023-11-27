import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphambanchayComponent } from './sanphambanchay.component';

describe('SanphambanchayComponent', () => {
  let component: SanphambanchayComponent;
  let fixture: ComponentFixture<SanphambanchayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SanphambanchayComponent]
    });
    fixture = TestBed.createComponent(SanphambanchayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
