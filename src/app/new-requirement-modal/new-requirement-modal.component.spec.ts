import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRequirementModalComponent } from './new-requirement-modal.component';

describe('NewRequirementModalComponent', () => {
  let component: NewRequirementModalComponent;
  let fixture: ComponentFixture<NewRequirementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRequirementModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRequirementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
