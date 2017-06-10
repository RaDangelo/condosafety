import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTypeModalComponent } from './person-type-modal.component';

describe('PersonTypeModalComponent', () => {
  let component: PersonTypeModalComponent;
  let fixture: ComponentFixture<PersonTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonTypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
