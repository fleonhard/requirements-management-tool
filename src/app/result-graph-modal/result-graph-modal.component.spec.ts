import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultGraphModalComponent } from './result-graph-modal.component';

describe('ResultGraphModalComponent', () => {
  let component: ResultGraphModalComponent;
  let fixture: ComponentFixture<ResultGraphModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultGraphModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultGraphModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
