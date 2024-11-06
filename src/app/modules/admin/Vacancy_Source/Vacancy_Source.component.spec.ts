import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Vacancy_SourceComponent } from './Vacancy_Source.component';
describe('Vacancy_SourceComponent', () => {
let component: Vacancy_SourceComponent;
let fixture: ComponentFixture<Vacancy_SourceComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Vacancy_SourceComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Vacancy_SourceComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

