import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphamlienquanComponent } from './sanphamlienquan.component';

describe('SanphamlienquanComponent', () => {
  let component: SanphamlienquanComponent;
  let fixture: ComponentFixture<SanphamlienquanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SanphamlienquanComponent]
    });
    fixture = TestBed.createComponent(SanphamlienquanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
