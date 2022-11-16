import { ComponentFixture, TestBed } from '@angular/core/testing';

import { updateVideoResultsComponent } from './update-video-results.component';

describe('updateVideoResultsComponent', () => {
  let component: updateVideoResultsComponent;
  let fixture: ComponentFixture<updateVideoResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ updateVideoResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(updateVideoResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
