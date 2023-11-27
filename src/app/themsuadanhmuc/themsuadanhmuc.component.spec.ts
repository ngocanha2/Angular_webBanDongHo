import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemsuadanhmucComponent } from './themsuadanhmuc.component';

describe('ThemsuadanhmucComponent', () => {
  let component: ThemsuadanhmucComponent;
  let fixture: ComponentFixture<ThemsuadanhmucComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemsuadanhmucComponent]
    });
    fixture = TestBed.createComponent(ThemsuadanhmucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
