import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Enquiry_SourceComponent } from './Enquiry_Source.component';
describe('Enquiry_SourceComponent', () => {
let component: Enquiry_SourceComponent;
let fixture: ComponentFixture<Enquiry_SourceComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Enquiry_SourceComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Enquiry_SourceComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

