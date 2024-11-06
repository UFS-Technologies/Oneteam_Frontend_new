import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Level_Details_StatusComponent } from './Level_Details_Status.component';
describe('Level_Details_StatusComponent', () => {
let component: Level_Details_StatusComponent;
let fixture: ComponentFixture<Level_Details_StatusComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Level_Details_StatusComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Level_Details_StatusComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

