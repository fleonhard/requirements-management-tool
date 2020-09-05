import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequirementModalComponent } from './edit-requirement-modal.component';

describe('EditRequirementModalComponent', () => {
  let component: EditRequirementModalComponent;
  let fixture: ComponentFixture<EditRequirementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRequirementModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRequirementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
