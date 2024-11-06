import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Application_SettingsComponent } from './Application_Settings.component';


describe('Application_SettingsComponent', () => {
  let component: Application_SettingsComponent;
  let fixture: ComponentFixture<Application_SettingsComponent>;

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Application_SettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Application_SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
