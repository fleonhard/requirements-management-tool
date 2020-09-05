import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRequirementModalComponent } from './delete-requirement-modal.component';

describe('DeleteRequirementModalComponent', () => {
  let component: DeleteRequirementModalComponent;
  let fixture: ComponentFixture<DeleteRequirementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRequirementModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRequirementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
