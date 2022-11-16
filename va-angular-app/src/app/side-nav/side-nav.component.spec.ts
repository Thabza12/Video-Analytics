import { ComponentFixture, TestBed } from '@angular/core/testing';

import { sideNavComponent } from './side-nav.component';

describe('sideNavComponent', () => {
  let component: sideNavComponent;
  let fixture: ComponentFixture<sideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ sideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(sideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
