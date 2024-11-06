import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Job_RejectionsComponent } from './Job_Rejections.component';
describe('Job_RejectionsComponent', () => {
let component: Job_RejectionsComponent;
let fixture: ComponentFixture<Job_RejectionsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Job_RejectionsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Job_RejectionsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

