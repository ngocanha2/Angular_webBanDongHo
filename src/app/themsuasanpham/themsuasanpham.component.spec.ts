import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemsuasanphamComponent } from './themsuasanpham.component';

describe('ThemsuasanphamComponent', () => {
  let component: ThemsuasanphamComponent;
  let fixture: ComponentFixture<ThemsuasanphamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemsuasanphamComponent]
    });
    fixture = TestBed.createComponent(ThemsuasanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
