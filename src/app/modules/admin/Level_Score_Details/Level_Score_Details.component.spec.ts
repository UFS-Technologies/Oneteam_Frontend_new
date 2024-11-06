import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Level_Score_DetailsComponent } from './Level_Score_Details.component';
describe('Level_Score_DetailsComponent', () => {
let component: Level_Score_DetailsComponent;
let fixture: ComponentFixture<Level_Score_DetailsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Level_Score_DetailsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Level_Score_DetailsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

