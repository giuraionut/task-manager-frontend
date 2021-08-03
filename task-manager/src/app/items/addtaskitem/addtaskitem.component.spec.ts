import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtaskitemComponent } from './addtaskitem.component';

describe('AddtaskitemComponent', () => {
  let component: AddtaskitemComponent;
  let fixture: ComponentFixture<AddtaskitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtaskitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtaskitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
