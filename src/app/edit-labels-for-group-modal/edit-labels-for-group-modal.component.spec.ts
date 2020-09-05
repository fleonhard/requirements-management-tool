import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLabelsForGroupModalComponent } from './edit-labels-for-group-modal.component';

describe('EditLabelsForGroupModalComponent', () => {
  let component: EditLabelsForGroupModalComponent;
  let fixture: ComponentFixture<EditLabelsForGroupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLabelsForGroupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLabelsForGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
