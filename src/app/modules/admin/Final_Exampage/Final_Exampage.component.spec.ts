import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Final_ExampageComponent } from './Final_Exampage.component';
describe('Final_ExampageComponent', () => {
let component: Final_ExampageComponent;
let fixture: ComponentFixture<Final_ExampageComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Final_ExampageComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Final_ExampageComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

