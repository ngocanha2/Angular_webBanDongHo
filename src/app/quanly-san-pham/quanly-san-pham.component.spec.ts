import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlySanPhamComponent } from './quanly-san-pham.component';

describe('QuanlySanPhamComponent', () => {
  let component: QuanlySanPhamComponent;
  let fixture: ComponentFixture<QuanlySanPhamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanlySanPhamComponent]
    });
    fixture = TestBed.createComponent(QuanlySanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
