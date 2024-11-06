import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Syllabus_ImportComponent } from './Syllabus_Import.component';
describe('Syllabus_ImportComponent', () => {
let component: Syllabus_ImportComponent;
let fixture: ComponentFixture<Syllabus_ImportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Syllabus_ImportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Syllabus_ImportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

