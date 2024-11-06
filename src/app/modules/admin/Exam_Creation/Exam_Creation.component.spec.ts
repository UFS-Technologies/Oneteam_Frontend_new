import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Exam_CreationComponent } from './Exam_Creation.component';
describe('Exam_CreationComponent', () => {
let component: Exam_CreationComponent;
let fixture: ComponentFixture<Exam_CreationComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Exam_CreationComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Exam_CreationComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

