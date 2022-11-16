import { ComponentFixture, TestBed } from '@angular/core/testing';

import { headerFooterComponent } from './header-footer.component';

describe('headerFooterComponent', () => {
  let component: headerFooterComponent;
  let fixture: ComponentFixture<headerFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ headerFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(headerFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
