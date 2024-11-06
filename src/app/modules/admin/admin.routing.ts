/***
 * All routes with in admin module should be defined here
 */
 import { Routes } from '@angular/router';
 import { AdminComponent } from './admin.component';
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
 import { Lead_ReportComponent } from './Lead_Report/Lead_Report.component';
 import { Candidate_Job_ApplyComponent } from './Candidate_Job_Apply/Candidate_Job_Apply.component';
 import { Fees_InstalmentComponent } from './Fees_Instalment/Fees_Instalment.component';
 import { Question_Import_MasterComponent } from './Question_Import_Master/Question_Import_Master.component';
 import { Question_Import_DetailsComponent } from './Question_Import_Details/Question_Import_Details.component';
import { StateComponent } from './State/State.component';
import { Pending_FollowUpComponent } from './Pending_FollowUp/Pending_FollowUp.component';
import { Fees_Due_ReportComponent } from './Fees_Due_Report/Fees_Due_Report.component';
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
 //import { Userwise_SummaryComponent } from './Userwise_Summary/Userwise_Summary.component';
 
 //import { Enquiry_Source_ReportComponent } from './Enquiry_Source_Report/Enquiry_Source_Report.component';
 export const AdminRoutes: Routes = [
     {
         path: '',
         component: AdminComponent,
         children: [
             { path: '', redirectTo: '/Home_Page', pathMatch: 'full' },
             { path: 'Accounts', component: AccountsComponent },
             { path: 'Agent', component: AgentComponent },
             { path: 'Agent_Commision', component: Agent_CommisionComponent },
             { path: 'Agent_Course_Type', component: Agent_Course_TypeComponent },
             { path: 'Batch', component: BatchComponent },
             { path: 'Candidate', component: CandidateComponent },
             { path: 'Candidate_Followup', component: Candidate_FollowupComponent },
             { path: 'Applied_Candidate', component: Applied_CandidateComponent },
             { path: 'Attendance', component: AttendanceComponent },
             { path: 'Attendance_Report', component: Attendance_ReportComponent },
             { path: 'Category', component: CategoryComponent },
             { path: 'Certificate_Request', component: Certificate_RequestComponent },
             { path: 'Certificates', component: CertificatesComponent },
             { path: 'Course', component: CourseComponent },
             { path: 'Course_Fees', component: Course_FeesComponent },
             { path: 'Course_Import_Details', component: Course_Import_DetailsComponent },
             { path: 'Course_Import_Master', component: Course_Import_MasterComponent },
             { path: 'Course_Subject', component: Course_SubjectComponent },
             { path: 'Course_Type', component: Course_TypeComponent },
             { path: 'Document', component: DocumentComponent },
             { path: 'Exam_Details', component: Exam_DetailsComponent },
             { path: 'Exam_Master', component: Exam_MasterComponent },
             { path: 'Experience', component: ExperienceComponent },
             { path: 'Fees_Collection_Report', component: Fees_Collection_ReportComponent },
             { path: 'Fees_Outstanding_Report', component: Fees_Outstanding_ReportComponent },
             { path: 'Fees_Receipt', component: Fees_ReceiptComponent },
             { path: 'Fees_Type', component: Fees_TypeComponent },
             { path: 'Followup_Type', component: Followup_TypeComponent },
             { path: 'Functionl_Area', component: Functionl_AreaComponent },
             { path: 'Job_Posting', component: Job_PostingComponent },
             { path: 'Mark_List', component: Mark_ListComponent },
             { path: 'Part', component: PartComponent },
             { path: 'Qualification', component: QualificationComponent },
             { path: 'Question', component: QuestionComponent },
             { path: 'Question_Import', component: Question_ImportComponent },
             { path: 'Settings', component: SettingsComponent },
             { path: 'Specialization', component: SpecializationComponent },
             { path: 'Status', component: StatusComponent },
             { path: 'Student', component: StudentComponent },
             { path: 'Student_Course', component: Student_CourseComponent },
             { path: 'Student_Course_Subject', component: Student_Course_SubjectComponent },
             { path: 'Student_Followup', component: Student_FollowupComponent },
             { path: 'Study_Materials', component: Study_MaterialsComponent },
             { path: 'Subject', component: SubjectComponent },
             { path: 'University', component: UniversityComponent },
             { path: 'University_Followup', component: University_FollowupComponent },
             { path: 'User_Role', component: User_RoleComponent },
             { path: 'User_Type', component: User_TypeComponent },
             { path: 'Users', component: UsersComponent },
             { path: 'Employer_Details', component: Employer_DetailsComponent},
             { path: 'Resume', component: TransactionComponent },
             { path: 'Interview', component: InterviewComponent },
             { path: 'Placed', component: PlacedComponent },
             { path: 'Placed_Report', component: Placed_ReportComponent },
             { path: 'Home_Page', component: Home_PageComponent },
             { path: 'Dashboard', component: DashboardComponent },
             { path: 'Registration_Report', component: Registration_ReportComponent },
             { path: 'Interview_Report', component: Interview_ReportComponent },
             { path: 'Resume_Report', component: Transaction_ReportComponent },
             { path: 'Admission_Report', component: Admission_ReportComponent },
             { path: 'Enquiry_Source', component: Enquiry_SourceComponent },
             { path: 'Lead_Report', component: Lead_ReportComponent },
             { path: 'Candidate_Job_Apply', component: Candidate_Job_ApplyComponent },
             { path: 'Fees_Instalment', component: Fees_InstalmentComponent},
             { path: 'Question_Import', component: Question_ImportComponent},
             { path: 'Question_ImportMaster', component: Question_Import_MasterComponent},
             { path: 'Question_Import_Details', component: Question_Import_DetailsComponent},
             { path: 'State', component: StateComponent},
             { path: 'Pending_FollowUp', component: Pending_FollowUpComponent},
             { path: 'Fees_Due_Report', component: Fees_Due_ReportComponent},
             { path: 'Student_Import', component: Student_ImportComponent},
             { path: 'Company', component: CompanyComponent},
             { path: 'Batch_Report', component: Batch_ReportComponent},
             { path: 'DropOut_Report', component: DropOut_ReportComponent},
             { path: 'Student_Data', component: Student_DataComponent},
             { path: 'JobPosting_Report', component: JobPosting_ReportComponent},
             { path: 'Student_Job_Report', component: Student_Job_ReportComponent},
             { path: 'Jobposting_Detailed_Report', component: Jobposting_Detailed_ReportComponent},
             { path: 'Job_Rejections', component: Job_RejectionsComponent},
             { path: 'Conversion_Report', component: Conversion_ReportComponent},
             { path: 'Active_Batch_Report', component: Active_Batch_ReportComponent},
             { path: 'Application_Settings', component: Application_SettingsComponent},
             { path: 'Company_List_Report', component: Company_List_ReportComponent},
             { path: 'Syllabus_Coverage', component: Syllabus_CoverageComponent},
             { path: 'Batch_Completion', component: Batch_CompletionComponent},
             { path: 'Interview_Scheduled_Report', component: Interview_Scheduled_ReportComponent},
             { path: 'Placement_Report_New', component: Placement_Report_NewComponent},
             { path: 'Complaint_Details', component: Complaint_DetailsComponent},

             { path: 'Employer_Followup', component: Employer_FollowupComponent},
             { path: 'Employer_Status', component: Employer_StatusComponent},
             { path: 'Vacancy_Source', component: Vacancy_SourceComponent},
             { path: 'Syllabus_Import', component: Syllabus_ImportComponent},
             { path: 'Job_Opening_Pending_Followups_Report', component: Job_Opening_Pending_Followups_ReportComponent},
             { path: 'Period', component: PeriodComponent},
             { path: 'Agreement_Details', component: Agreement_DetailsComponent},
             { path: 'Recruitment_Drives', component: Recruitment_DrivesComponent},
             { path: 'Followup_Report', component: Followup_ReportComponent},
             { path: 'Final_Exampage', component: Final_ExampageComponent},
             { path: 'Exam_Creation', component: Exam_CreationComponent},
             { path: 'Level_Details_Status', component: Level_Details_StatusComponent},
             { path: 'Score_Card_Report', component: Score_Card_ReportComponent},
             { path: 'Batch_Attendance', component: Batch_AttendanceComponent},
             { path: 'Level_Score_Details', component: Level_Score_DetailsComponent},
             { path: '**', redirectTo: '/auth/login' }
             
         ]
     }
 ];
 