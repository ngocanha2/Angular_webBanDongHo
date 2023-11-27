import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphamtheoloaiconComponent } from './sanphamtheoloaicon.component';

describe('SanphamtheoloaiconComponent', () => {
  let component: SanphamtheoloaiconComponent;
  let fixture: ComponentFixture<SanphamtheoloaiconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SanphamtheoloaiconComponent]
    });
    fixture = TestBed.createComponent(SanphamtheoloaiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
