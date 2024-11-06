import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Agreement_DetailsComponent } from './Agreement_Details.component';
describe('Agreement_DetailsComponent', () => {
let component: Agreement_DetailsComponent;
let fixture: ComponentFixture<Agreement_DetailsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Agreement_DetailsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Agreement_DetailsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

