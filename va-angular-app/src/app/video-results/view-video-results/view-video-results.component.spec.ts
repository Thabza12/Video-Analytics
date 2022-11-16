import { ComponentFixture, TestBed } from '@angular/core/testing';

import { viewVideoResultsComponent } from './view-video-results.component';

describe('viewVideoResultsComponent', () => {
  let component: viewVideoResultsComponent;
  let fixture: ComponentFixture<viewVideoResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ viewVideoResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(viewVideoResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
