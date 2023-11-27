import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubaradminComponent } from './menubaradmin.component';

describe('MenubaradminComponent', () => {
  let component: MenubaradminComponent;
  let fixture: ComponentFixture<MenubaradminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenubaradminComponent]
    });
    fixture = TestBed.createComponent(MenubaradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
