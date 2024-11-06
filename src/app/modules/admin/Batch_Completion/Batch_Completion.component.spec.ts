import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Batch_CompletionComponent } from './Batch_Completion.component';
describe('Batch_CompletionComponent', () => {
let component: Batch_CompletionComponent;
let fixture: ComponentFixture<Batch_CompletionComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Batch_CompletionComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Batch_CompletionComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

