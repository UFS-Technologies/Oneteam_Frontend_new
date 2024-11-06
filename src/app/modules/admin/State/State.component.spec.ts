import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StateComponent } from './State.component';
describe('StateComponent', () => {
let component: StateComponent;
let fixture: ComponentFixture<StateComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ StateComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(StateComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

