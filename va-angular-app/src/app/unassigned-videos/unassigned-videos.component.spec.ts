import { ComponentFixture, TestBed } from '@angular/core/testing';

import { unassignedVideosComponent } from './unassigned-videos.component';

describe('unassignedVideosComponent', () => {
  let component: unassignedVideosComponent;
  let fixture: ComponentFixture<unassignedVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ unassignedVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(unassignedVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
