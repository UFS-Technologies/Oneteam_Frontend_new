/***
 * Admin module
 * Declare all componets that is used in admin module
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatProgressSpinnerModule, MatDialogModule, MatAutocompleteModule, MatPaginatorModule, MatToolbarModule, MatSidenavModule, MatSortModule, MatMenuModule, MatIconModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatDatepickerModule, MatExpansionModule } from '@angular/material';
import { MatNativeDateModule} from '@angular/material';
import { SharedModule } from '../shared-module/shared-module';
import { AdminRoutes } from './admin.routing';
import { AdminComponent } from './admin.component';
import {HttpClientModule} from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';
import { Home_PageComponent } from './Home_Page/Home_Page.component'; 
import { AccountsComponent } from './Accounts/Accounts.component';
import { AgentComponent } from './Agent/Agent.component';

import { Agent_CommisionComponent } from './Agent_Commision/Agent_Commision.component';
import { Agent_Course_TypeComponent } from './Agent_Course_Type/Agent_Course_Type.component';
import { BatchComponent } from './Batch/Batch.component';
import { CandidateComponent } from './Candidate/Candidate.component';
import { Candidate_FollowupComponent } from './Candidate_Followup/Candidate_Followup.component';
import { Applied_CandidateComponent } from './Applied_Candidate/Applied_Candidate.component';
import { AttendanceComponent } from './Attendance/Attendance.component';
import { Attendance_ReportComponent } from './Attendance_Report/Attendance_Report.component';
import { CategoryComponent } from './Category/Category.component';
import { Certificate_RequestComponent } from './Certificate_Request/Certificate_Request.component';
import { CertificatesComponent } from './Certificates/Certificates.component';
import { CourseComponent } from './Course/Course.component';
import { Course_FeesComponent } from './Course_Fees/Course_Fees.component';
import { Course_Import_DetailsComponent } from './Course_Import_Details/Course_Import_Details.component';
import { Course_Import_MasterComponent } from './Course_Import_Master/Course_Import_Master.component';
import { Course_SubjectComponent } from './Course_Subject/Course_Subject.component';
import { Course_TypeComponent } from './Course_Type/Course_Type.component';
import { DocumentComponent } from './Document/Document.component';
import { Exam_DetailsComponent } from './Exam_Details/Exam_Details.component';
import { Exam_MasterComponent } from './Exam_Master/Exam_Master.component';
import { ExperienceComponent } from './Experience/Experience.component';
import { Fees_Collection_ReportComponent } from './Fees_Collection_Report/Fees_Collection_Report.component';
import { Fees_Outstanding_ReportComponent } from './Fees_Outstanding_Report/Fees_Outstanding_Report.component';
import { Fees_ReceiptComponent } from './Fees_Receipt/Fees_Receipt.component';
import { Fees_TypeComponent } from './Fees_Type/Fees_Type.component';
import { Followup_TypeComponent } from './Followup_Type/Followup_Type.component';
import { Functionl_AreaComponent } from './Functionl_Area/Functionl_Area.component';
import { Job_PostingComponent } from './Job_Posting/Job_Posting.component';
import { Mark_ListComponent } from './Mark_List/Mark_List.component';
import { PartComponent } from './Part/Part.component';
import { QualificationComponent } from './Qualification/Qualification.component';
import { QuestionComponent } from './Question/Question.component';
import { Question_ImportComponent } from './Question_Import/Question_Import.component';
import { SettingsComponent } from './Settings/Settings.component';
import { SpecializationComponent } from './Specialization/Specialization.component';
import { StatusComponent } from './Status/Status.component';
import { StudentComponent } from './Student/Student.component';
import { Student_CourseComponent } from './Student_Course/Student_Course.component';
import { Student_Course_SubjectComponent } from './Student_Course_Subject/Student_Course_Subject.component';
import { Student_FollowupComponent } from './Student_Followup/Student_Followup.component';
import { Study_MaterialsComponent } from './Study_Materials/Study_Materials.component';
import { SubjectComponent } from './Subject/Subject.component';
import { UniversityComponent } from './University/University.component';
import { University_FollowupComponent } from './University_Followup/University_Followup.component';
import { User_RoleComponent } from './User_Role/User_Role.component';
import { User_TypeComponent } from './User_Type/User_Type.component';
import { UsersComponent } from './Users/Users.component';
import { Employer_DetailsComponent} from './Employer_Details/Employer_Details.component';
import { TransactionComponent } from './Transaction/Transaction.component';
import { InterviewComponent } from './Interview/Interview.component';
import { PlacedComponent } from './Placed/Placed.component';
import { Placed_ReportComponent } from './Placed_Report/Placed_Report.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { Registration_ReportComponent } from './Registration_Report/Registration_Report.component';
import { Interview_ReportComponent } from './Interview_Report/Interview_Report.component';
import { Transaction_ReportComponent } from './Transaction_Report/Transaction_Report.component';
import { Admission_ReportComponent } from './Admission_Report/Admission_Report.component';
import { Enquiry_SourceComponent } from './Enquiry_Source/Enquiry_Source.component';
import {   Lead_ReportComponent } from './Lead_Report/Lead_Report.component';
import { Candidate_Job_ApplyComponent } from './Candidate_Job_Apply/Candidate_Job_Apply.component';
import { Fees_InstalmentComponent } from './Fees_Instalment/Fees_Instalment.component';
import { Question_Import_MasterComponent } from './Question_Import_Master/Question_Import_Master.component';
import { Question_Import_DetailsComponent } from './Question_Import_Details/Question_Import_Details.component';
import { StateComponent } from './State/State.component';
import {Pending_FollowUpComponent} from './Pending_FollowUp/Pending_FollowUp.component'
import {Fees_Due_ReportComponent} from './Fees_Due_Report/Fees_Due_Report.component'

import { ScrollingModule } from '@angular/cdk/scrolling';
import { from } from 'rxjs';
import { Student_ImportComponent } from './Student_Import/Student_Import.component';
import { CompanyComponent } from './Company/Company.component';
import { Batch_ReportComponent } from './Batch_Report/Batch_Report.component';
import { DropOut_ReportComponent } from './DropOut_Report/DropOut_Report.component';
import { Student_DataComponent } from './Student_Data/Student_Data.component';
import { JobPosting_ReportComponent } from './JobPosting_Report/JobPosting_Report.component';
import { Student_Job_ReportComponent } from './Student_Job_Report/Student_Job_Report.component';
import { Jobposting_Detailed_ReportComponent } from './Jobposting_Detailed_Report/Jobposting_Detailed_Report.component';
import { Job_RejectionsComponent } from './Job_Rejections/Job_Rejections.component';
import { Conversion_ReportComponent } from './Conversion_Report/Conversion_Report.component';
import { Active_Batch_ReportComponent } from './Active_Batch_Report/Active_Batch_Report.component';
import { Application_SettingsComponent } from './Application_Settings/Application_Settings.component';
import { Company_List_ReportComponent } from './Company_List_Report/Company_List_Report.component';
import { Syllabus_CoverageComponent } from './Syllabus_Coverage/Syllabus_Coverage.component';
import { Batch_CompletionComponent } from './Batch_Completion/Batch_Completion.component';
import { Interview_Scheduled_ReportComponent } from './Interview_Scheduled_Report/Interview_Scheduled_Report.component';
import { Placement_Report_NewComponent } from './Placement_Report_New/Placement_Report_New.component';
import { Complaint_DetailsComponent } from './Complaint_Details/Complaint_Details.component';
import { Employer_FollowupComponent } from './Employer_Followup/Employer_Followup.component';
import { Employer_StatusComponent } from './Employer_Status/Employer_Status.component';
import { Vacancy_SourceComponent } from './Vacancy_Source/Vacancy_Source.component';
import { Syllabus_ImportComponent } from './Syllabus_Import/Syllabus_Import.component';
import { Job_Opening_Pending_Followups_ReportComponent } from './Job_Opening_Pending_Followups_Report/Job_Opening_Pending_Followups_Report.component';
import { PeriodComponent } from './Period/Period.component';
import { Agreement_DetailsComponent } from './Agreement_Details/Agreement_Details.component';
import { Recruitment_DrivesComponent } from './Recruitment_Drives/Recruitment_Drives.component';
import { Followup_ReportComponent } from './Followup_Report/Followup_Report.component';
import { Final_ExampageComponent } from './Final_Exampage/Final_Exampage.component';
import { Exam_CreationComponent } from './Exam_Creation/Exam_Creation.component';
import { Level_Details_StatusComponent } from './Level_Details_Status/Level_Details_Status.component';
import { Score_Card_ReportComponent } from './Score_Card_Report/Score_Card_Report.component';
import { Batch_AttendanceComponent } from './Batch_Attendance/Batch_Attendance.component';
import { Level_Score_DetailsComponent } from './Level_Score_Details/Level_Score_Details.component';


@NgModule({
imports: [ RouterModule.forChild(AdminRoutes),SharedModule,MatTableModule,HttpClientModule,MatPaginatorModule,
    MatSortModule, MatIconModule,MatMenuModule,GoogleChartsModule,MatSelectModule, MatButtonModule,
    MatDialogModule, MatToolbarModule, MatExpansionModule, MatSidenavModule, MatAutocompleteModule,
    MatProgressSpinnerModule,MatFormFieldModule,MatDatepickerModule,ScrollingModule,FormsModule,
    HttpModule  ],
declarations: [AdminComponent, Home_PageComponent, AccountsComponent,AgentComponent,AttendanceComponent,
  Attendance_ReportComponent,Agent_CommisionComponent,Agent_Course_TypeComponent,BatchComponent,CandidateComponent,
  Candidate_FollowupComponent,Applied_CandidateComponent,CategoryComponent,Certificate_RequestComponent,
  CertificatesComponent,CourseComponent,Course_FeesComponent,Course_Import_DetailsComponent,Admission_ReportComponent,
  Course_Import_MasterComponent,Course_SubjectComponent,Course_TypeComponent,DocumentComponent,Lead_ReportComponent,
  Exam_DetailsComponent,Exam_MasterComponent,ExperienceComponent,Fees_Outstanding_ReportComponent,Fees_ReceiptComponent,
  Fees_TypeComponent,Followup_TypeComponent,Functionl_AreaComponent,Job_PostingComponent,Fees_Collection_ReportComponent,
  Mark_ListComponent,PartComponent,QualificationComponent,QuestionComponent,Question_ImportComponent,
  SettingsComponent,SpecializationComponent,StatusComponent,StudentComponent,Student_CourseComponent,Enquiry_SourceComponent,
  Student_Course_SubjectComponent,Student_FollowupComponent, Home_PageComponent,Study_MaterialsComponent,
  SubjectComponent,UniversityComponent,University_FollowupComponent,User_RoleComponent,User_TypeComponent,
  UsersComponent,Employer_DetailsComponent,TransactionComponent,InterviewComponent,PlacedComponent,Placed_ReportComponent,DashboardComponent,
  Registration_ReportComponent,Interview_ReportComponent,Transaction_ReportComponent,Candidate_Job_ApplyComponent,
  Fees_InstalmentComponent,Question_Import_MasterComponent,Question_Import_DetailsComponent,StateComponent,Pending_FollowUpComponent,
  Fees_Due_ReportComponent,Student_ImportComponent,CompanyComponent,Batch_ReportComponent,DropOut_ReportComponent,Student_DataComponent,
  JobPosting_ReportComponent,Student_Job_ReportComponent,Jobposting_Detailed_ReportComponent,Job_RejectionsComponent,Conversion_ReportComponent,Active_Batch_ReportComponent,
Application_SettingsComponent,Company_List_ReportComponent,Syllabus_CoverageComponent,Batch_CompletionComponent,Interview_Scheduled_ReportComponent ,Placement_Report_NewComponent,
Complaint_DetailsComponent,Employer_FollowupComponent,Employer_StatusComponent,Vacancy_SourceComponent,Syllabus_ImportComponent,
Job_Opening_Pending_Followups_ReportComponent,PeriodComponent,Agreement_DetailsComponent,Recruitment_DrivesComponent ,
Followup_ReportComponent,Final_ExampageComponent,Exam_CreationComponent,Level_Details_StatusComponent,Score_Card_ReportComponent,
Batch_AttendanceComponent,Level_Score_DetailsComponent]



})

export class AdminModule { }
