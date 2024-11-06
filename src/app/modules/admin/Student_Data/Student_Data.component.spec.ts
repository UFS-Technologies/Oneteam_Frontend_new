import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Student_DataComponent } from './Student_Data.component';


describe('Student_DataComponent', () => {
  let component: Student_DataComponent;
  let fixture: ComponentFixture<Student_DataComponent>;

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Student_DataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Student_DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
