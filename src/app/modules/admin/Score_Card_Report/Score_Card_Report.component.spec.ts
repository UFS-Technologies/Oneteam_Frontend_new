import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Score_Card_ReportComponent } from './Score_Card_Report.component';
describe('Score_Card_ReportComponent', () => {
let component: Score_Card_ReportComponent;
let fixture: ComponentFixture<Score_Card_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Score_Card_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Score_Card_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

