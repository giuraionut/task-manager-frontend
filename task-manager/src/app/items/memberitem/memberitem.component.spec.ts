import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberitemComponent } from './memberitem.component';

describe('MemberitemComponent', () => {
  let component: MemberitemComponent;
  let fixture: ComponentFixture<MemberitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
