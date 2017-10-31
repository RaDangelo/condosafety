import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfkModalComponent } from './afk-modal.component';

describe('AfkModalComponent', () => {
  let component: AfkModalComponent;
  let fixture: ComponentFixture<AfkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AfkModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
