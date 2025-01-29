import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Student_Service } from "../../../services/Student.service";
import { DialogBox_Component } from "../DialogBox/DialogBox.component";
import { Student } from "../../../models/Student";
import { Student_Followup } from "../../../models/Student_Followup";
import { Course } from "../../../models/Course";
import { Batch } from "../../../models/Batch";
import { Installment_Type } from "../../../models/Installment_Type";
import { Enquiry_Source } from "../../../models/Enquiry_Source";
import { Gender } from "../../../models/Gender";
import { Status } from "../../../models/Status";
import { Users } from "../../../models/Users";
import { Student_Course } from "../../../models/Student_Course";
import { Batch_Service } from "../../../services/Batch.service";
import { Student_Course_Subject } from "../../../models/Student_Course_Subject";
import { Student_Fees_Installment_Master } from "../../../models/Student_Fees_Installment_Master";
import { Student_Fees_Installment_Details } from "../../../models/Student_Fees_Installment_Details";
import { Student_Fees_Installment_Save } from "../../../models/Student_Fees_Installment_Save";
import { Mode } from "../../../models/Mode";
import { Client_Accounts } from "../../../models/Client_Accounts";
import { Receipt_Voucher } from "../../../models/Receipt_Voucher";
import { environment } from "../../../../environments/environment";
import { Course_Subject } from "../../../models/Course_Subject";
import { Exam_Status } from "../../../models/Exam_Status";
import { Company } from "../../../models/Company";
import { State } from "../../../models/State";
import { Laptopdetails } from "../../../models/Laptopdetails";
import { Agent } from "../../../models/Agent";
import { State_District } from "../../../models/State_District";
import { Qualification } from "../../../models/Qualification";
import { Mark_List_Master } from "../../../models/Mark_List_Master";
import { Mark_List } from "../../../models/Mark_List";
import * as io from "socket.io-client";
import {
ROUTES,
Get_Page_Permission,
} from "../../../components/sidebar/sidebar.component";
import {
MatDialog,
MatDialogRef,
MAT_DIALOG_DATA,
MatDialogConfig,
MatGridTileHeaderCssMatStyler,
} from "@angular/material";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
DateAdapter,
MAT_DATE_FORMATS,
MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";
import { default as _rollupMoment } from "moment";
import { Id_Proof } from "../../../models/Id_Proof";
import { Resume_Status } from "../../../models/Resume_Status";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Job_Posting_Service } from "../../../services/Job_Posting.Service";
import { Register_Whatsapp } from "../../../models/Register_Whatsapp";
import { Course_Whatsapp } from "../../../models/Course_Whatsapp";
import internal from "assert";
import { Fees_Whatsapp } from "../../../models/Fees_Whatsapp";
import { Year_Of_Pass } from "app/models/Year_Of_Pass";
import { Save_Whatsapp } from "app/models/Save_Whatsapp";
import { Self_Placement } from "app/models/Self_Placement";
import { Attendance_Master } from "app/models/Attendance_Master";
import { Attendance_Student } from "app/models/Attendance_Student";
import { Sms } from "app/models/Sms";
import { SmsService } from "app/services/sms.Service";

// import { TDocumentDefinitions, pdfMake } from 'pdfmake/build/pdfmake';
// import { pdfFonts } from 'pdfmake/build/vfs_fonts';

//import { debug } from 'console';
// import { userInfo } from 'os';
// import { debug } from 'console';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
parse: { dateInput: "DD/MM/YYYY" },
display: {
dateInput: "DD/MM/YYYY",
monthYearLabel: "MMM YYYY",
dateA11yLabel: "DD/MM/YYYY",
monthYearA11yLabel: "MMMM YYYY",
},
};
@Component({
selector: "app-Student",
templateUrl: "./Student.component.html",
styleUrls: ["./Student.component.css"],
providers: [
{
provide: DateAdapter,
useClass: MomentDateAdapter,
deps: [MAT_DATE_LOCALE],
},
{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
],
})
export class StudentComponent implements OnInit {

  url = environment.NotificationPath; // 'http://regnewapi.trackbox.co.in:3646/'

	private socket;
	
	Hours: any;
	Minutes: any;
	Seconds: any;

EditIndex: number;
Total_Entries: number = 0;
color = "primary";
mode = "indeterminate";
value = 50;
issLoading: boolean;
Permissions: any;
Fees_Receipt_Permissions: any;
Student_Edit: boolean;
Student_Save: boolean;
Student_Delete: boolean;
myInnerHeight: number;
myTotalHeight: number;
Installment_Index: number;
year: any;
month: any;
DOB: string;
day: any;
date: any;
More_Search_Options: boolean = true;
myInnerHeighttemp: number;
Entry_View: boolean = true;
tab_view: boolean = true;
Course_Tab: boolean = true;
clickview: boolean = true;
profile_View: boolean = true;
profile_View_followup: boolean = true;
Fees_View: boolean = false;
Attendance_View: boolean = false;
Resumesending_View: boolean = false;
Interview_View: boolean = false;
Placement_View: boolean = false;
Course_Details_View: boolean = false;
Resume_Sending_tab_Permission: any;
Resume_Sending_View: boolean = false;
Fees_tab_Permission: any;
Fees_tab_View: boolean = false;
Fees_tab_Edit: boolean = false;
Student_CourseDetails_Edit:boolean = false;
Fees_tab_Delete: boolean = false;
Course_View: boolean = false;
Course_Tab_Permission: any;
Profile_Tab_Permission: any;
Profile_Tab_View: boolean = false;
Course_Tab_View: boolean = false;
Resume_Sending_Tab_View: boolean = false;
Course_Tab_Edit: boolean = false;
Resume_Sending_Tab_Edit: boolean = false;
Profile_Tab_Edit: boolean = false;
Mark_tab_Permission: any;
Mark_tab_View: boolean = false;
Mark_tab_Edit: boolean = false;

To_Account_Id :number;

Document_File_Array: any[];
Document_File_Array1: any[];
Document_File_Array2: any[];

Mark_View: boolean = true;
Show_Followup_History: boolean = true;
View_Follow_: boolean = true;
View_Student_: boolean = true;
Show_FollowUp: boolean = true;
View_History_: boolean = true;

Flag_Followup: number = 0;
Flag_Student: number = 0;
Flag_Course: number = 0;
Student_Id_Edit: number = 0;
Registration: boolean = false;
Student_Id: number = 0;
Student_Name: string;

Student_Data: Student[];
Student_: Student = new Student();
Student_Name_Search: string;

Student_Followup_: Student_Followup = new Student_Followup();
Student_Followup_Data: Student_Followup[];

Gender_: Gender = new Gender();
Gender_Temp: Gender = new Gender();
Gender_Data: Gender[];
Missed_Count: number = 0;

Enquiry_Source_: Enquiry_Source = new Enquiry_Source();
Enquiry_Source_Temp: Enquiry_Source = new Enquiry_Source();
Enquiry_Source_Data: Enquiry_Source[];


Resume_Status_: Resume_Status = new Resume_Status();
Resume_Status_Temp: Resume_Status = new Resume_Status();
Resume_Status_Data: Resume_Status[];

State_: State = new State();
State_Temp: State = new State();
State_Data: State[];

District_: State_District = new State_District();
State_District_Temp: State_District = new State_District();
State_District_Data: State_District[];
State_District_Data_Filter: State_District[];

Qualification_: Qualification = new Qualification();
Qualification_Search: Qualification = new Qualification();
Qualification_Temp: Qualification = new Qualification();
Qualification_Data: Qualification[];

Course_Student_Search: Course = new Course();
Course_Student: Course = new Course();
Course_: Course = new Course();
Course_Temp: Course = new Course();
Course_Data: Course[];
Course_Data_Filter: Course[];

Batch_: Batch = new Batch();
Batch_Temp: Batch = new Batch();
Batch_Data: Batch[];
Batch_Data_Filter: Batch[];
Next_Batch_Date_Visible: boolean = true;

Followp_History_Data: Student[];

Search_Status: Status = new Status();
Search_Status_Temp: Status = new Status();
Status_Data: Status[];

Followup_Status_: Status = new Status();
Followup_Status_Data: Status[];
Followup_Status_Data_Filter: Status[];
Followup_Status_Temp: Status = new Status();
Next_FollowUp_Date_Visible: boolean = true;

Users_Search: Users = new Users();
Users_Search_Temp: Users = new Users();
Users_Data: Users[];

Followup_Users_: Users = new Users();
Followup_Users_Data: Users[];
Faculty_Users_Data: Users[];
Followup_Users_Data_Filter: Users[];
Faculty_Users_Data_Filter: Users[];
Followup_Users_Temp: Users = new Users();
Faculty_: Users = new Users();
Faculty_Temp: Users = new Users();

Save_Call_Status: boolean = false;
Photo: string;
Display_Photo_: string;
ImageFile_Photo: any;
ResumeImageFilename: any;
ImageFile:any;
Login_User: number = 0;
Is_Registered: any;

Page_Start: number = 0;
Page_End: number = 0;
Page_Length: number = 25;
Page_Length_: number = 25;
Black_Start: number = 1;
Black_Stop: number = 0;
Red_Start: number = 1;
Red_Stop: number = 0;
Total_Rows: number = 0;
missedfollowup_count: number = 1;
followup_count: number = 0;
nextflag: number;
Search_Name:String= "";

Look_In_Date: boolean = true;
Search_FromDate: Date = new Date();
Search_ToDate: Date = new Date();

Registration_Visiblility: boolean;
Remove_Registration_Visibility: boolean;
Registration_Permissions: any;
Remove_Registration_Permissions: any;

Course_Selection_Permission: any;
Course_Selection_Visibility: boolean;
resumeimg:string;

Student_EditIndex: number = -1;

Student_Course_Subject_: Student_Course_Subject =
new Student_Course_Subject();
Student_Course_Subject_Temp: Student_Course_Subject =
new Student_Course_Subject();
Student_Course_Subject_Data: Student_Course_Subject[];

Student_Course_: Student_Course = new Student_Course();
Student_Course_Temp: Student_Course = new Student_Course();
Student_Course_Data: Student_Course[];
Student_Course_Click_Data: Student_Course[];

Student_Fees_Installment_Master_: Student_Fees_Installment_Master =
new Student_Fees_Installment_Master();
Student_Fees_Installment_Master_Temp: Student_Fees_Installment_Master =
new Student_Fees_Installment_Master();
Student_Fees_Installment_Master_Data: Student_Fees_Installment_Master[];
Student_Fees_Installment_Details_: Student_Fees_Installment_Details =
new Student_Fees_Installment_Details();
Student_Fees_Installment_Details_Temp: Student_Fees_Installment_Details =
new Student_Fees_Installment_Details();
Student_Fees_Installment_Details_Data: Student_Fees_Installment_Details[];

Fees_Master_Id: number = 0;
Student_Fees_Installment_Save_: Student_Fees_Installment_Save =
new Student_Fees_Installment_Save();
Student_Fees_Installment_Save_Data: Student_Fees_Installment_Save[];
Student_Fees_Installment_Save_Temp: Student_Fees_Installment_Save =
new Student_Fees_Installment_Save();

Course_Click_Status: boolean = false;
Fees_Click_Status: boolean = false;
Mark_Click_Status: boolean = false;
date_Temp: Date = new Date();


Course_Id_Edit: number = 0;
Student_Course_Id_Edit: number = 0;
Subject_: Course_Subject = new Course_Subject();
Course_Subject_Data: Course_Subject[];
Subject_Temp: Course_Subject = new Course_Subject();

Exam_Status_: Exam_Status = new Exam_Status();
Exam_Status_Temp: Exam_Status = new Exam_Status();
Exam_Status_Data: Exam_Status[];

Mark_List_Master_: Mark_List_Master = new Mark_List_Master();
Mark_List_Master_Data: Mark_List_Master[];

Mark_List_: Mark_List = new Mark_List();
Mark_List_Data: Mark_List[];
Mark_List_Index: number = -1;

Receipt_History_View: boolean = false;
Receipt_View: boolean = false;
Mode: Mode = new Mode();
Mode_Temp: Mode = new Mode();
Mode_Data: Mode[];


Laptopdetails_: Laptopdetails = new Laptopdetails();
Laptopdetails_Temp: Laptopdetails = new Laptopdetails();
Laptopdetails_Data: Laptopdetails[];

Student_Id_localStorage: string = "";
User_Mobile: number;

Installment_Type: Installment_Type = new Installment_Type();
Installment_Type_Temp: Installment_Type = new Installment_Type();
Installment_Type_Data: Installment_Type[];

Receipt_Voucher_: Receipt_Voucher = new Receipt_Voucher();
Receipt_Voucher_Data: Receipt_Voucher[];

Attendance_Data: Attendance_Student[];
Sunday_Data: any;
No_Of_Sundays:number;

Client_Accounts_: Client_Accounts = new Client_Accounts();
Client_Accounts_Temp: Client_Accounts = new Client_Accounts();
Client_Accounts_Data: Client_Accounts[];

Company_Name: string;
Address1: string;
Address2: string;
Address3: string;
PinCode: string;
GSTNo: string;

Old_Course_Id: number;

course_name: string;

ImageFile_Photo_view: string;
ImageFile_psid_view: string;
ImageFile_Photo_view1: string;
ImageFile_Resume_view: string;
Batch_View: boolean = true;
Start_Date: Date;
End_Date: Date;
batch_id: number;
Resume_Click_Status: boolean = false;

Transaction_Report_Master_Data: any;
Is_Date: boolean = true;
FromDate_: Date = new Date();
ToDate_: Date = new Date();

Interview_Report_Master_Data: any;
Placed_Report_Master_Data: any;

minDate = new Date();
Login_User_Name: string;
Mail_sms_Status: number;
Status_Id: number;

User_Id: number;
print_Agent_Name: string;
print_Agent_Address1: string;
print_Agent_Address2: string;
print_Agent_Address3: string;
print_Agent_Address4: string;
print_Agent_pincode: string;
print_Agent_Phone: string;
print_Agent_Mobile: string;
print_Agent_Email: string;

Companyprint_Data: Company[];
print_Company_Name: string;
print_Company_Address1: string;
print_Company_Address2: string;
print_Company_Address3: string;
print_Company_Address4: string;
print_Company_pincode: string;
print_Company_Phone: string;
print_Company_Mobile: string;
print_Company_Email: string;
print_Company_Website: string;
Company_: Company = new Company();

Enable_Visiblility: boolean;
Disable_Visiblility: boolean;
Enable_Permissions: any;
Disable_Permissions: any;


Activate_Visiblility: boolean;
Deactivate_Visiblility: boolean;
Activate_Permissions: any;
Deactivate_Permissions: any;

ToStaff_Mobile: string;

Tostaff_Data : any;

View_Password:string;



Movedtoblacklist_Visiblility: boolean;
Removedfromblacklist_Visiblility: boolean;
Movedtoblacklist_Permissions: any;
Removedfromblacklist_Permissions: any;


  ImageFile_Photo1: any;
  Display_Photo_1_: string;

  ImageFile_Photo2: any;
  Display_Photo_2_: string;

  ReceiptImageFile_Photo1: any;

  Get_Data:any;
  Get_Receipt_VoucherData:any;
  Receipt_Image_view:number=0;

// Enable_Permissions: any;
// Disable_Permissions: any;
// Activate_Permissions: any;
// Deactivate_Permissions: any;
// Movedtoblacklist_Permissions: any;
// Removedfromblacklist_Visiblility: any;



print_voucher_no: number;
print_account_name: string;
print_Paid_date: Date;
print_Description: string;
print_amount: number;
print_paid: string;

Agentprint_Data: Agent[];
Fees_edit_permission:any;
Edit_Student_CourseDetails:any;
Fees_Amount_Edit: boolean = false;
coursedetails_Edit: boolean = false;

Id_Proof_: Id_Proof = new Id_Proof();
Id_Proof_Temp: Id_Proof = new Id_Proof();
Id_Proof_Data: Id_Proof[];

Year_Of_Pass_: Year_Of_Pass = new Year_Of_Pass();
Year_Of_Pass_Temp: Year_Of_Pass = new Year_Of_Pass();
Year_Of_Pass_Data: Year_Of_Pass[];

 Resumefiledata:any;

 Start_Date_Edit_Permission: any;
 Start_Date_Edit: boolean = false;
 End_Date_Edit_Permission: any;
 End_Date_Edit: boolean = false;

 Resume_statusview=0;
 Image_downldview=0;
 id_proof_downldview=0;


 Register_Whatsapp_:Register_Whatsapp = new Register_Whatsapp();
 Save_Whatsapp_:Save_Whatsapp = new Save_Whatsapp();
 Python_Whatsapp_:Course_Whatsapp = new Course_Whatsapp();
 Testing_Whatsapp_:Course_Whatsapp = new Course_Whatsapp();
 Dm_Whatsapp_:Course_Whatsapp = new Course_Whatsapp();
 Fees_Whatsapp_:Fees_Whatsapp =new Fees_Whatsapp();

 Save_Whatsapp_1_:Save_Whatsapp = new Save_Whatsapp();

 followup_user_id_ : number;
 Password_View: boolean = false;
 Password_button_View: boolean = false;

 Student_Details_View: boolean = false;
 Search_Applied_Reject_Detaild_Data : any;
 Placement_Add_View: boolean = false;

 Placement_button_View:boolean=true;

 Self_Placement_: Self_Placement = new Self_Placement();
 Self_Placement_Temp: Self_Placement = new Self_Placement();
 Self_Placement_Data: Self_Placement[];

 Data_Count: number;
 Temp_Date_Followup: Date;

 Sms_: Sms = new Sms();
 Sms_Temp: Sms = new Sms();
 Sms_Data: Sms[];
 to_staff_mobile_no_:string;

 Offline_class_preference_ :number=0;
whatsapp_msg_status :number =0;

constructor(
public Batch_Service_: Batch_Service,
public SmsService_: SmsService,
public Student_Service_: Student_Service,
public Job_Posting_Service_:Job_Posting_Service, 
private route: ActivatedRoute,
private router: Router,
public dialogBox: MatDialog
)
{
  this.socket = io(this.url, {
    transports: ["websocket"],
    auth: {
      token: localStorage.getItem("token"),
    },
  });
  this.socket = io(this.url);
}

ngOnInit() {
this.Student_Id_localStorage = localStorage.getItem("Student_Id");
this.User_Mobile = Number(localStorage.getItem("Mobile"));

if (this.Student_Id_localStorage > "0") {
this.Student_Id = Number(this.Student_Id_localStorage);
localStorage.setItem("Student_Id", "0");
}

this.Login_User = Number(localStorage.getItem("Login_User"));
this.Login_User_Name = localStorage.getItem("uname");

this.Permissions = Get_Page_Permission(14);
this.Fees_Receipt_Permissions = Get_Page_Permission(26);

this.Registration_Permissions = Get_Page_Permission(17);
this.Remove_Registration_Permissions = Get_Page_Permission(18);
this.Course_Tab_Permission = Get_Page_Permission(19);
this.Fees_tab_Permission = Get_Page_Permission(20);
this.Mark_tab_Permission = Get_Page_Permission(21);


this.Enable_Permissions = Get_Page_Permission(64);
////debugger
this.Disable_Permissions = Get_Page_Permission(65);
this.Movedtoblacklist_Permissions = Get_Page_Permission(66);
this.Removedfromblacklist_Permissions = Get_Page_Permission(67);
this.Activate_Permissions = Get_Page_Permission(68);
this.Deactivate_Permissions = Get_Page_Permission(69);
this.Start_Date_Edit_Permission = Get_Page_Permission(71);
this.End_Date_Edit_Permission = Get_Page_Permission(72);



this.Course_Selection_Permission = Get_Page_Permission(53);

this.Resume_Sending_tab_Permission = Get_Page_Permission(55);
// this.Course_Selection_Permission = Get_Page_Permission(53)
// this.Course_Selection_Permission = Get_Page_Permission(53)
this.Fees_edit_permission=Get_Page_Permission(58);
//debugger
this.Edit_Student_CourseDetails=Get_Page_Permission(59);
////debugger;
if (this.Permissions == undefined || this.Permissions == null) {
////debugger;
localStorage.removeItem("token");
this.router.navigateByUrl("/auth/login");
} else {
this.Is_Registered = 3;
if (this.Student_Id == 0) {
this.Search_Lead_button();
}
this.Student_Edit = this.Permissions.Edit;
this.Student_Save = this.Permissions.Save;
this.Student_Delete = this.Permissions.Delete;
//debugger
this.Page_Load();
if (
this.Edit_Student_CourseDetails != undefined &&
this.Edit_Student_CourseDetails != null
) {
this.Student_CourseDetails_Edit = this.Edit_Student_CourseDetails.Edit;
}
debugger
if (
  this.Fees_tab_Permission != undefined &&
  this.Fees_tab_Permission != null
  ) {
  this.Fees_tab_Edit = this.Fees_tab_Permission.Edit;

  }

  if (
    this.Fees_tab_Permission != undefined &&
    this.Fees_tab_Permission != null
    ) {
    this.Fees_tab_Delete = this.Fees_tab_Permission.Delete;
  
    }
// if (this.Fees_Receipt_Permissions != undefined && this.Fees_Receipt_Permissions != null)
// {
// this.Fees_tab_Edit=this.Fees_Receipt_Permissions.Edit
// this.Fees_tab_View=this.Fees_Receipt_Permissions.View
// }




////debugger
if (this.Fees_edit_permission != undefined && this.Fees_edit_permission != null)
{
  ////debugger
this.Fees_Amount_Edit=this.Fees_edit_permission.Edit

}

if (
this.Course_Tab_Permission != undefined &&
this.Course_Tab_Permission != null
) {
this.Course_Tab_Edit = this.Course_Tab_Permission.Edit;
this.Course_Tab_View = this.Course_Tab_Permission.View;
}
if (
this.Mark_tab_Permission != undefined &&
this.Mark_tab_Permission != null
) {
this.Mark_tab_View = this.Mark_tab_Permission.View;
this.Mark_tab_Edit = this.Mark_tab_Permission.Edit;
}
if (
this.Resume_Sending_tab_Permission != undefined &&
this.Resume_Sending_tab_Permission != null
) {
this.Resume_Sending_Tab_Edit = this.Resume_Sending_tab_Permission.Edit;
this.Resume_Sending_View = this.Resume_Sending_tab_Permission.View;
}



//debugger
if (
  this.Start_Date_Edit_Permission != undefined &&
  this.Start_Date_Edit_Permission != null
  ) {
  this.Start_Date_Edit = this.Start_Date_Edit_Permission.Edit;
  }

  if (
    this.End_Date_Edit_Permission != undefined &&
    this.End_Date_Edit_Permission != null
    ) {
    this.End_Date_Edit = this.End_Date_Edit_Permission.Edit;
    }
  


// if (this.Profile_Tab_Permission != undefined && this.Profile_Tab_Permission != null)
// {
// this.Profile_Tab_Edit=this.Profile_Tab_Permission.Edit;
// this.Profile_Tab_View=this.Profile_Tab_Permission.View
// }
}
}
Page_Load() {

debugger
this.myInnerHeight = window.innerHeight;
this.myTotalHeight = this.myInnerHeight;
this.myTotalHeight = this.myTotalHeight - 90;
this.myInnerHeight = this.myInnerHeight - 210;
this.myInnerHeighttemp = this.myInnerHeight
this.Clr_Student();
this.Load_Dropdowns();
this.Load_Year_of_Pass()
// this.Load_Gender();
// this.Load_Enquiry_Source();
this.Load_Student_Search_Dropdowns();
this.Load_Resume_Status();
// this.Load_Exam_Status();
// this.Load_Mode();
this.Clr_Receipt_Voucher();
this.Load_Laptopdetails();
this.Load_Id_Proof();
// this.Load_State();
// this.Load_Qualification();
// this.Load_Installment_Type();
this.Entry_View = false;
this.Receipt_History_View = false;
this.profile_View = true;
this.profile_View_followup = true;
this.tab_view = true;
this.Fees_View = false;
this.Attendance_View=false;
this.Resumesending_View = false;
this.Placement_View = false;
this.Interview_View = false;
this.Course_Details_View = false;
this.Resume_Sending_View = false;
this.Course_View = false;
this.Course_View = true;
this.Mark_View = true;

this.Look_In_Date = true;
this.Search_FromDate = this.New_Date(this.Search_FromDate);
this.Search_ToDate = this.New_Date(this.Search_ToDate);
// this.Batch_.Start_Date=new Date();
// this.Batch_.End_Date=new Date();

// this.Batch_.Start_Date = this.New_Date(this.Batch_.Start_Date);
// this.Batch_.End_Date = this.New_Date(this.Batch_.End_Date);

// this.Student_Course_.Start_Date = this.New_Date(this.Student_Course_.Start_Date);
// this.Student_Course_.Join_Date= this.New_Date(this.Student_Course_.Join_Date);
// this.Student_Course_.End_Date= this.New_Date(this.Student_Course_.End_Date);
this.date_Temp = this.New_Date(this.date_Temp);
this.Course_Click_Status = false;
this.Fees_Click_Status = false;
this.Mark_Click_Status = false;
this.Fees_Master_Id = 0;
this.Black_Stop = this.Page_Length_;
this.Red_Stop = this.Page_Length_;
////debugger;
this.Get_Companydetails();
this.Clr_Student_Followup();

//alert("2")
}

Tab_Click(Current_tab) {
this.profile_View = false;
this.Fees_View = false;
this.Attendance_View=false;
this.Resumesending_View = false;
this.Interview_View = false;
this.Placement_View = false;
this.Course_Details_View = false;
this.Resume_Sending_View = false;
this.Course_View = false;
this.Mark_View = false;
this.Clr_Receipt_Voucher();

if (Current_tab == 1) {
this.profile_View = true;
// this.profile_View_followup=true;
this.Course_View = false;
this.Fees_View = false;
this.Attendance_View=false;
this.Course_Details_View = false;
this.Resume_Sending_View = false;

} else if (Current_tab == 2) {
this.profile_View = false;
this.Course_View = true;
this.Fees_View = false;
this.Attendance_View=false;
this.Course_Details_View = false;
this.Resume_Sending_View = false;

if (this.Course_Click_Status == false) {
//this.profile_View=false;
//this.Get_Student_Course(this.Student_Id)
this.Course_Click_Status = true;
}
//  this.Get_Student_Course(this.Student_Id_Edit)
} else if (Current_tab == 3) {
this.Fees_View = true;
this.Receipt_View = false;
this.Resume_Sending_View = false;
if (this.Fees_Click_Status == false) {
this.profile_View = false;
this.Fees_Click_Status = true;
this.Get_Receipt_History();
}
} else if (Current_tab == 4) {
this.Course_Details_View = true;
} else if (Current_tab == 5) {
//
// if( this.Resume_Click_Status==false)
// {
//
//     this.Resume_Sending_View=true;
//     this.Resume_Click_Status=true;
// }
this.Resumesending_View = true;
this.Search_Transaction_Report_Tab();
} else if (Current_tab == 6) {
this.Interview_View = true;
this.Search_Interview_Report_Tab();
} else if (Current_tab == 7) {
  //debugger
this.Placement_View = true;
this.Placement_Add_View=false;
// this.Search_Placed_Report_Tab();

this.Get_Self_Placement();
}
else if (Current_tab == 8) {
  //debugger
this.Attendance_View = true;

// this.Search_Placed_Report_Tab();

this.Get_Attendance_Details();
}

}
isMobileMenu() {
if ($(window).width() > 991) {
return false;
}
return true;
}
isDesktopMenu() {
if ($(window).width() < 991) {
return false;
}
return true;
}
trackByFn(index, item) {
return index;
}
Load_Gender() {
this.issLoading = true;
this.Student_Service_.Load_Gender().subscribe(
(Rows) => {
if (Rows != null) {
this.Gender_Data = Rows[0];
this.Gender_Temp.Gender_Id = 0;
this.Gender_Temp.Gender_Name = "Select";
this.Gender_Data.unshift(this.Gender_Temp);
this.Gender_ = this.Gender_Data[0];
this.issLoading = false;
}
},
(Rows) => {
this.issLoading = false;
}
);
}
Load_State() {
this.issLoading = true;
this.Student_Service_.Load_State().subscribe(
(Rows) => {
if (Rows != null) {
this.State_Data = Rows[0];
this.State_Temp.State_Id = 0;
this.State_Temp.State_Name = "Select";
this.State_Data.unshift(this.State_Temp);
this.State_ = this.State_Data[0];
this.issLoading = false;
}
},
(Rows) => {
this.issLoading = false;
}
);
}

Search_State_District_Typeahead(event: any) {
var Value = "";
if (event.target.value == "") Value = "";
else Value = event.target.value.toLowerCase();
if (this.State_.State_Id == undefined || this.State_.State_Id == 0) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select State", Type: "3" },
});
return;
} else if (
this.State_District_Data == undefined ||
this.State_District_Data.length == 0
) {
this.issLoading = true;

this.Student_Service_.Search_State_District_Typeahead(
"",
this.State_.State_Id
).subscribe(
(Rows) => {
if (Rows != null) {
this.State_District_Data = Rows[0];
this.State_District_Data_Filter = [];
this.issLoading = false;
for (var i = 0; i < this.State_District_Data.length; i++) {
if (
this.State_District_Data[
i
].District_Name.toLowerCase().includes(Value)
)
this.State_District_Data_Filter.push(
this.State_District_Data[i]
);
}
}
},
(Rows) => {
this.issLoading = false;
}
);
} else {
this.State_District_Data_Filter = [];
for (var i = 0; i < this.State_District_Data.length; i++) {
if (
this.State_District_Data[i].District_Name.toLowerCase().includes(
Value
)
)
this.State_District_Data_Filter.push(this.State_District_Data[i]);
}
}
}
display_District(State_District: State_District) {
if (State_District) {
return State_District.District_Name;
}
}
Load_Qualification() {
this.issLoading = true;
this.Student_Service_.Load_Qualification().subscribe(
(Rows) => {
if (Rows != null) {
this.Qualification_Data = Rows[0];
this.Qualification_Temp.Qualification_Id = 0;
this.Qualification_Temp.Qualification_Name = "Select";
this.Qualification_Data.unshift(this.Qualification_Temp);
this.Qualification_ = this.Qualification_Data[0];
this.Qualification_Search = this.Qualification_Data[0];
this.issLoading = false;
}
},
(Rows) => {
this.issLoading = false;
}
);
}
Load_Enquiry_Source() {
this.issLoading = true;
this.Student_Service_.Load_Enquiry_Source().subscribe(
(Rows) => {
if (Rows != null) {
this.Enquiry_Source_Data = Rows[0];
this.Enquiry_Source_Temp.Enquiry_Source_Id = 0;
this.Enquiry_Source_Temp.Enquiry_Source_Name = "Select";
this.Enquiry_Source_Data.unshift(this.Enquiry_Source_Temp);
this.Enquiry_Source_ = this.Enquiry_Source_Data[0];
this.issLoading = false;
}
},
(Rows) => {
this.issLoading = false;
}
);
}

Load_Resume_Status() {
  this.issLoading = true;
  this.Student_Service_.Load_Resume_Status().subscribe(
  (Rows) => {
  if (Rows != null) {
  this.Resume_Status_Data = Rows[0];
  this.Resume_Status_Temp.Resume_Status_Id = 0;
  this.Resume_Status_Temp.Resume_Status_Name = "Select";
  this.Resume_Status_Data.unshift(this.Resume_Status_Temp);
  this.Resume_Status_ = this.Resume_Status_Data[0];
  this.issLoading = false;
  }
  },
  (Rows) => {
  this.issLoading = false;
  }
  );
  }



Load_Id_Proof()
{
    this.issLoading = true;
    this.Student_Service_.Load_Id_Proof().subscribe(Rows => {
        if (Rows != null) {

          ////debugger
            this.Id_Proof_Data = Rows[0];
            this.Id_Proof_Temp.Id_Proof_Id = 0;
            this.Id_Proof_Temp.Id_Proof_Name = "Select";
            this.Id_Proof_Data.unshift(this.Id_Proof_Temp);
            this.Id_Proof_ = this.Id_Proof_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}




Load_Year_of_Pass()
{debugger
    this.issLoading = true;
    this.Student_Service_.Load_Year_of_Pass().subscribe(Rows => {
        if (Rows != null) {

          debugger
            this.Year_Of_Pass_Data = Rows[0];
            this.Year_Of_Pass_Temp.Year_Of_Pass_Id = 0;
            this.Year_Of_Pass_Temp.Year_Of_Pass_Name = "Select";
            this.Year_Of_Pass_Data.unshift(this.Year_Of_Pass_Temp);
            this.Year_Of_Pass_ = this.Year_Of_Pass_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}





Load_Student_Search_Dropdowns() {
this.issLoading = true;
this.Student_Service_.Load_Student_Search_Dropdowns(3).subscribe(
(Rows) => {
if (Rows != null) {
this.Status_Data = Rows[0];
this.Search_Status_Temp.Status_Id = 0;
this.Search_Status_Temp.Status_Name = "Select";
this.Status_Data.unshift(this.Search_Status_Temp);
this.Search_Status = this.Status_Data[0];
this.Followup_Status_=this.Status_Data[0];

this.Users_Data = Rows[1];
this.Users_Search_Temp.Users_Id = 0;
this.Users_Search_Temp.Users_Name = "Select";
this.Users_Data.unshift(this.Users_Search_Temp);
this.Users_Search = this.Users_Data[0];

this.issLoading = false;
}
},
(Rows) => {
this.issLoading = false;
}
);
}
File_Change_Photo(event: Event) {
const file = (event.target as HTMLInputElement).files;
this.ImageFile_Photo = file;
// this.Display_Photo_ = this.ImageFile_Photo[0].name;
this.Student_.Photo = this.ImageFile_Photo[0].name;
}


File_Change_Photo_PSId(event: Event) {
  const file = (event.target as HTMLInputElement).files;
  this.ImageFile_Photo2 = file;
  // this.Display_Photo_ = this.ImageFile_Photo[0].name;
  this.Student_.Parent_spouse_idcard = this.ImageFile_Photo2[0].name;
  }
  

  File_Change_Resume(event: Event) 
{
        const file = (event.target as HTMLInputElement).files;
        this.ResumeImageFilename = file;
        this.resumeimg=  this.ResumeImageFilename[0].name;
        
}

 


  Upload_Resume()
{
   debugger
    // this.Student_.Student_Id = this.Student_Id;
  this.Student_.Resume = this.resumeimg;
  this.Student_Service_.Upload_Resume(
      this.Student_,
      this.ResumeImageFilename,
      this.Document_File_Array
  ).subscribe(
      (Save_status) => {
        debugger
          Save_status = Save_status[0];

          if (Number(Save_status[0].Student_Id_) > 0) {


            debugger
            if (Number(this.Login_User) != Save_status[0].To_User_) {
              var message = {
                Student_Name: Save_status[0].Student_Name_,
                From_User_Name: Save_status[0].Student_Name_,
                Notification_Type_Name: Save_status[0].Notification_Type_Name_,
                Entry_Type: Save_status[0].Entry_Type_,
                To_User: Save_status[0].To_User_,
                Notification_Id: Save_status[0].Notification_Id_,
                Student_Id: Save_status[0].Student_Id_,
              };
              this.socket.emit("new-message", message);
            }

            
              const dialogRef = this.dialogBox.open(DialogBox_Component, {
                  panelClass: "Dialogbox-Class",
                  data: { Message: "Saved", Type: "false" },
              });
              this.Close_Click();
          } else {
             
              const dialogRef = this.dialogBox.open(DialogBox_Component, {
                  panelClass: "Dialogbox-Class",
                  data: { Message: "Error Occured", Type: "2" },
              });
          }

          this.issLoading = false;
      },
      (Rows) => {
        
          this.issLoading = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Error Occured", Type: "2" },
          });
      }
  );
}

Download_Student_File(File_Name) {
var File_Name_Temp;
if (File_Name == "Photo") File_Name_Temp = this.Student_.Photo;
var bs = "F:/Teena/Dist/backend/Uploads/";
var s = bs + File_Name_Temp;
window.open(s, "_blank");
}
New_Date(Date_) {
this.date = Date_;
this.year = this.date.getFullYear();
this.month = this.date.getMonth() + 1;
if (this.month < 10) {
this.month = "0" + this.month;
}
this.day = this.date.getDate().toString();
if (Number.parseInt(this.day) < 10) {
this.day = "0" + this.day;
}
this.date = this.year + "-" + this.month + "-" + this.day;
//  this.date = this.day + "-"+ this.month + "-" + this.year ;
return this.date;
}

Add_Date(Date_, days) {
this.date = new Date(Date_);
//this.date=new Date();

this.date.setDate(this.date.getDate() + days);
this.year = this.date.getFullYear();
this.month = this.date.getMonth() + 1;
if (this.month < 10) {
this.month = "0" + this.month;
}
this.day = this.date.getDate().toString();

if (Number.parseInt(this.day) < 10) {
this.day = "0" + this.day;
}
this.date = this.year + "-" + this.month + "-" + this.day;

return this.date;
}

Create_New() {
this.Entry_View = true;
this.View_Student_ = true;
this.profile_View = true;
this.profile_View_followup = true;
this.Course_Tab = false;
this.clickview = false;
this.Fees_View = false;
this.Attendance_View=false;
this.Resumesending_View = false;
this.Placement_View = false;
this.Interview_View = false;
this.Resume_Sending_View = false;
this.Course_View = false;
this.Course_View = false;
this.Mark_View = false;
this.Show_FollowUp = false;
this.Receipt_History_View = false;
this.Flag_Followup = 1;
this.Flag_Student = 1;
this.Flag_Course = 1;
this.View_Follow_ = true;
this.Student_Id = 0;
this.Student_Id_Edit = 0;

this.whatsapp_msg_status=0;

this.Course_Id_Edit = 0;
this.Mail_sms_Status = 0;
this.Student_.Registered =false;
this.Mark_List_Data = [];
this.Clr_Mark_List();
this.Clr_Mark_List_Master();
this.Clr_Student();
this.Clr_Receipt_Voucher();

// this.Student_Followup_.Next_FollowUp_Date = new Date();
// this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);

// this.Get_Last_Followup();
this.Student_Followup_.Remark = "";
}
Close_Click() {
let top = document.getElementById("Topdiv");
if (top !== null) {
top.scrollIntoView();
top = null;
}
this.Course_Details_View = false;
this.Resume_Sending_View = false;
this.View_Student_ = true;
this.Student_EditIndex = -1;
this.Flag_Followup = 0;
this.Flag_Student = 0;
this.Flag_Course = 0;
this.Student_Id = 0;
this.Student_Id_Edit = 0;
this.Course_Id_Edit = 0;
this.Entry_View = false;
this.View_History_ = true;
this.ImageFile_Photo_view = "";
this.ImageFile_Photo_view1 = "";
this.ImageFile_Resume_view ="";
this.Show_Followup_History = true;
this.View_Follow_ = true;

this.Password_button_View=false;
this.Clr_Student();
this.Clr_Student_Course();
this.Clr_Mark_List_Master();
this.Mark_List_Data = [];
this.Clr_Mark_List();
this.Clr_Receipt_Voucher();
this.Clr_Self_Placement();
this.Total_Rows=0;
this.Search_Student();
this.Fees_Master_Id = 0;

if (
this.Installment_Type_Data != null &&
this.Installment_Type_Data != undefined
)
this.Installment_Type = this.Installment_Type_Data[0];

this.Course_Click_Status = false;
this.Fees_Click_Status = false;
this.Mark_Click_Status = false;
}
course_click() {

  //debugger
this.issLoading = true;
this.tab_view = true;
this.profile_View=false;
this.Show_FollowUp=true;
this.profile_View_followup=false;

////debugger
this.Student_Service_.Get_Course_Details_Student_Check(
this.Student_.Student_Id,
).subscribe(
(Rows) => {

////debugger
this.Student_Course_Click_Data = Rows[0];
////debugger



//debugger

if (this.Student_Course_Click_Data.length ==0)
 {
  this.coursedetails_Edit=true;
 }
 else
 {
  if (this.Edit_Student_CourseDetails != undefined && this.Edit_Student_CourseDetails != null)
  {
    ////debugger
  this.coursedetails_Edit=this.Edit_Student_CourseDetails.Edit;  
  }
  else
  this.coursedetails_Edit=false;
 }
 this.issLoading = false;
if (this.Student_Course_Click_Data.length <= 1)
 {
 //debugger
this.Course_Tab = true;
this.clickview = true;
this.Tab_Click(2);
if (this.Student_Course_Click_Data.length == 1)
this.Get_Student_Course_Click(
this.Student_Course_Click_Data[0].Student_Course_Id,
this.Student_Course_Click_Data[0].Course_Id,
this.Installment_Type.Installment_Type_Id
);
} else 
{
this.coursedetails_Edit=true;
this.Course_Tab = true;
this.clickview = false;
this.Tab_Click(4);
// this.Tab_Click(2);
}
//debugger
this.Student_Id_Edit=1
this.Registration = true 
this.Course_Tab = true 
this.clickview = true
this.tab_view=true


this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
}
);
}
Clr_Student() {

  //debugger
this.Course_Tab = false;
this.clickview = false;
this.Student_.Student_Id = 0;
this.Student_.Student_Name = "";
this.Student_.Address1 = "";
this.Student_.Address2 = "";
this.Student_.Address3 = "";
this.Student_.Address4 = "";
this.Student_.Pincode = "";
this.Student_.Phone = "";
this.Student_.Mobile = "";
this.Student_.Whatsapp = "";
this.Student_.DOB = "";

this.Student_.Year_Of_Passing ="";
this.Student_.Id_Proof_Id = 0;
this.Student_.Id_Proof_Name = "";
this.Student_.Id_Proof_No = ""; 
this.Student_.Id_Proof_FileName = "";
this.Student_.Id_Proof_File= "";

this.Search_Applied_Reject_Detaild_Data=[];

this.Student_.Registered =false;

if (this.Id_Proof_Data != null && this.Id_Proof_Data != undefined)
this.Id_Proof_ = this.Id_Proof_Data[0];

if (this.Year_Of_Pass_Data != null && this.Year_Of_Pass_Data != undefined)
this.Year_Of_Pass_ = this.Year_Of_Pass_Data[0];

if (this.Resume_Status_Data != null && this.Resume_Status_Data != undefined)
this.Resume_Status_ = this.Resume_Status_Data[1];

// this.DOB = new Date();
// this.DOB = this.New_Date(this.DOB);
// this.Student_.Gender=0;
this.Student_.Email = "";
this.Student_.Alternative_Email = "";
this.Student_.Passport_No = "";
this.Student_.Passport_Expiry = "";
this.Student_.User_Name = "";
this.Student_.Password = "";
this.Student_.Role_No = "";
this.Student_.Registration_No = "";
this.Student_.Photo = "";
this.Student_.User_Id = 0;
this.ImageFile_Photo = "";
this.Display_Photo_ = "";
this.ImageFile_Photo_view = "";
this.ImageFile_Photo_view1 = "";
this.ImageFile_Resume_view = "";
this.Remove_Registration_Visibility = false;
this.Enable_Visiblility =false;
this.Disable_Visiblility=false;

this.Activate_Visiblility=false;
this.Deactivate_Visiblility=false;
this.Offline_class_preference_ =0;
this.Movedtoblacklist_Visiblility=false;
this.Removedfromblacklist_Visiblility=false;

this.Course_Selection_Visibility = false;
this.Registration_Visiblility = false;
this.District_ = null;
this.Course_Student = null;
this.Student_.College_Name = "";
if (this.State_Data != null && this.State_Data != undefined)
this.State_ = this.State_Data[0];
if (this.Qualification_Data != null && this.Qualification_Data != undefined)
this.Qualification_ = this.Qualification_Data[0];
if (this.Gender_Data != null && this.Gender_Data != undefined)
this.Gender_ = this.Gender_Data[0];
if (
this.Enquiry_Source_Data != null &&
this.Enquiry_Source_Data != undefined
)
this.Enquiry_Source_ = this.Enquiry_Source_Data[0];

if (
  this.Status_Data != null &&
  this.Status_Data != undefined
  )
  this.Followup_Status_ = this.Status_Data[0];

  if (
    this.Users_Data != null &&
    this.Users_Data != undefined
    )
    this.Followup_Users_ = this.Users_Data[0];

    this.Student_.Parent_spouse_name = "";
    this.Student_.Parent_spouse_contact_no = "";
    this.Student_.Parent_spouse_idcard = "";
    this.Display_Photo_2_ = "";
    this.ImageFile_psid_view="";

   


}
Clr_Student_Followup() {
this.Student_Followup_.Student_Followup_Id = 0;
this.Student_Followup_.Student_Id = 0;
this.Student_Followup_.Entry_Date = new Date();
this.Student_Followup_.Entry_Date = this.New_Date(
this.Student_Followup_.Entry_Date
);
// this.Student_Followup_.Next_FollowUp_Date = new Date();
// this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
this.Student_Followup_.FollowUp_Difference = 0;
// this.Student_Followup_.Status=0;
this.Student_Followup_.By_User_Id = 0;
this.Student_Followup_.Remark = "";
this.Student_Followup_.Remark_Id = 0;
this.Student_Followup_.FollowUp_Type = 0;
this.Student_Followup_.FollowUP_Time = "";
this.Student_Followup_.Actual_FollowUp_Date = new Date();
this.Student_Followup_.Actual_FollowUp_Date = this.New_Date(
this.Student_Followup_.Actual_FollowUp_Date

);
// this.Followup_Status_ = null;
if (
  this.Status_Data != null &&
  this.Status_Data != undefined
  )
  this.Followup_Status_ = this.Status_Data[0];
// this.Followup_Users_ = null;

if (
  this.Users_Data != null &&
  this.Users_Data != undefined
  )
  this.Followup_Users_ = this.Users_Data[0];

}

Load_Dropdowns() {

this.Student_Service_.Get_Load_Dropdowns_Data().subscribe(
(Rows) => {
////debugger
this.Gender_Data = Rows[1];
this.Gender_Temp.Gender_Id = 0;
this.Gender_Temp.Gender_Name = "Select";
this.Gender_Data.unshift(this.Gender_Temp);
this.Gender_ = this.Gender_Data[0];


this.Enquiry_Source_Data = Rows[3];
this.Enquiry_Source_Temp.Enquiry_Source_Id = 0;
this.Enquiry_Source_Temp.Enquiry_Source_Name = "Select";
this.Enquiry_Source_Data.unshift(this.Enquiry_Source_Temp);
this.Enquiry_Source_ = this.Enquiry_Source_Data[0];

this.Exam_Status_Data = Rows[5];
this.Exam_Status_Temp.Exam_Status_Id = 0;
this.Exam_Status_Temp.Exam_Status_Name = "All";
this.Exam_Status_Data.unshift(this.Exam_Status_Temp);
this.Exam_Status_ = this.Exam_Status_Data[0];

this.State_Data = Rows[0];
this.State_Temp.State_Id = 0;
this.State_Temp.State_Name = "Select";
this.State_Data.unshift(this.State_Temp);
this.State_ = this.State_Data[0];

this.Qualification_Data = Rows[2];
this.Qualification_Temp.Qualification_Id = 0;
this.Qualification_Temp.Qualification_Name = "Select";
this.Qualification_Data.unshift(this.Qualification_Temp);
this.Qualification_ = this.Qualification_Data[0];
this.Qualification_Search = this.Qualification_Data[0];

this.Installment_Type_Data = Rows[4];
this.Installment_Type_Temp.Installment_Type_Id = 0;
this.Installment_Type_Temp.Installment_Type_Name = "Select";
this.Installment_Type_Data.unshift(this.Installment_Type_Temp);
this.Installment_Type = this.Installment_Type_Data[0];

this.Mode_Data = Rows[6];
this.Mode_Temp.Mode_Id = 0;
this.Mode_Temp.Mode_Name = "Select";
this.Mode_Data.unshift(this.Mode_Temp);
this.Mode = this.Mode_Data[0];
////debugger
this.Client_Accounts_Data = Rows[7].slice();
this.Client_Accounts_Temp.Client_Accounts_Id = 0;
this.Client_Accounts_Temp.Client_Accounts_Name = "Select";
this.Client_Accounts_Data.unshift(Object.assign({},this.Client_Accounts_Temp));
this.Client_Accounts_ = this.Client_Accounts_Data[0];





if (this.Student_Id > 0) {
//alert(this.Student_Id )
this.Edit_Student(this.Student_Id, 1, 1, 1);
}
},
(Rows) => {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}


Search_Status_Typeahead(event: any) {

  //debugger
var Value = "";
if (event.target.value == "") Value = undefined;
else Value = event.target.value;
if (
this.Followup_Status_Data == undefined ||
this.Followup_Status_Data.length == 0
) {
this.issLoading = true;

//debugger
this.Student_Service_.Search_Status_Typeahead("", 3).subscribe(
(Rows) => {
if (Rows != null) {
  //debugger
this.Followup_Status_Data = Rows[0];
this.issLoading = false;
this.Followup_Status_Data_Filter = [];

for (var i = 0; i < this.Followup_Status_Data.length; i++) {
if (
this.Followup_Status_Data[i].Status_Name.toLowerCase().includes(
Value
)
)
this.Followup_Status_Data_Filter.push(
this.Followup_Status_Data[i]
);
}

}
},
(Rows) => {
this.issLoading = false;
}
);
}
else {
  this.Followup_Status_Data_Filter = [];
  for (var i = 0; i < this.Followup_Status_Data.length; i++) {
  if (
  this.Followup_Status_Data[i].Status_Name.toLowerCase().includes(Value)
  )
  this.Followup_Status_Data_Filter.push(this.Followup_Status_Data[i]);
  }
  }
}
display_Followup_Status(Status_: Status) {
if (Status_) {
return Status_.Status_Name;
}
}
Status_Change(Status) {
  debugger
this.Followup_Status_ = Status;
if (this.Followup_Status_.FollowUp == true)
this.Next_FollowUp_Date_Visible = false;
else this.Next_FollowUp_Date_Visible = true;
//this.Student_Followup_.Next_FollowUp_Date=new Date();
//this.Student_Followup_.Next_FollowUp_Date=this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
}
Batch_Change(Batch_) {
// this.Batch_= Batch_;
this.Student_Course_.Start_Date = new Date();
this.Student_Course_.Start_Date = this.New_Date(
this.Student_Course_.Start_Date
);
this.Student_Course_.End_Date = new Date();
this.Student_Course_.End_Date = this.New_Date(
this.Student_Course_.End_Date
);

this.Student_Course_.Start_Time = "";
this.Student_Course_.End_Time ="";

this.Student_Course_.Faculty_Id=0;
this.Student_Course_.Faculty_Name="";
//this.Get_Batch(this.batch_id);
}
Get_Batch(Batch_11) {
this.batch_id = Batch_11.Batch_Id;
this.Batch_ = Batch_11;
this.issLoading = true;
this.Batch_Service_.Get_Batch(this.batch_id).subscribe(
(Rows) => {
//this.Batch_Data=Rows[0];
this.Student_Course_.Start_Date = Rows[0][0].Actual_Start_Date;
this.Student_Course_.End_Date = Rows[0][0].Actual_End_Date;
debugger
this.Student_Course_.Start_Time = Rows[0][0].Batch_Start_Time;
this.Student_Course_.End_Time = Rows[0][0].Batch_End_Time;

this.Student_Course_.Faculty_Id=Rows[0][0].Trainer_Id;
this.Student_Course_.Faculty_Name=Rows[0][0].Trainer_Name;


this.Faculty_Temp.Users_Id = this.Student_Course_.Faculty_Id;
this.Faculty_Temp.Users_Name = this.Student_Course_.Faculty_Name;
this.Faculty_ = Object.assign(this.Faculty_Temp);

// this.Faculty_.Users_Id = this.Student_Course_.Faculty_Id;
// this.Faculty_Temp.Users_Name = this.Student_Course_.Faculty_Name;
// this.Faculty_ = Object.assign(this.Faculty_Temp);

this.Instalment_Change();
//this.Total_Entries=this.Batch_Data.length;
// if(this.Batch_Data.length==0)
// {
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
// this.issLoading=false;
// }
this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}


Search_User_Typeahead_Faculty(event: any) {
  ////debugger
  var Value = "";
  if (event.target.value == "") Value = "";
  else Value = event.target.value;
  if (
  this.Faculty_Users_Data == undefined ||
  this.Faculty_Users_Data.length == 0
  ) {
  this.issLoading = true;
  this.Student_Service_.Search_Typeahead_Loadfaculty("").subscribe(
  (Rows) => {
  if (Rows != null) {
  this.Faculty_Users_Data = Rows[0];
  this.issLoading = false;
  
  this.Faculty_Users_Data_Filter = [];
  
  for (var i = 0; i < this.Faculty_Users_Data.length; i++) {
  if (
  this.Faculty_Users_Data[i].Users_Name.toLowerCase().includes(
  Value
  )
  )
  this.Faculty_Users_Data_Filter.push(
  this.Faculty_Users_Data[i]
  );
  }
  }
  },
  (Rows) => {
  this.issLoading = false;
  }
  );
  } else {
  this.Faculty_Users_Data_Filter = [];
  for (var i = 0; i < this.Faculty_Users_Data.length; i++) {
  if (
  this.Faculty_Users_Data[i].Users_Name.toLowerCase().includes(Value)
  )
  this.Faculty_Users_Data_Filter.push(this.Faculty_Users_Data[i]);
  }
  }
  }


Search_User_Typeahead(event: any) {
var Value = "";
if (event.target.value == "") Value = "";
else Value = event.target.value;
if (
this.Followup_Users_Data == undefined ||
this.Followup_Users_Data.length == 0
) {
this.issLoading = true;
this.Student_Service_.Search_Faculty_Typeahead("",0).subscribe(
(Rows) => {
if (Rows != null) {
this.Followup_Users_Data = Rows[0];
this.issLoading = false;

this.Followup_Users_Data_Filter = [];

for (var i = 0; i < this.Followup_Users_Data.length; i++) {
if (
this.Followup_Users_Data[i].Users_Name.toLowerCase().includes(
Value
)
)
this.Followup_Users_Data_Filter.push(
this.Followup_Users_Data[i]
);
}
}
},
(Rows) => {
this.issLoading = false;
}
);
} else {
this.Followup_Users_Data_Filter = [];
for (var i = 0; i < this.Followup_Users_Data.length; i++) {
if (
this.Followup_Users_Data[i].Users_Name.toLowerCase().includes(Value)
)
this.Followup_Users_Data_Filter.push(this.Followup_Users_Data[i]);
}
}
}
display_Followup_Users(Users_: Users) {
if (Users_) {
return Users_.Users_Name;
}
}
Search_More_Options() {
// if (this.More_Search_Options == true) this.More_Search_Options = false;
// else this.More_Search_Options = true;
if (this.More_Search_Options == true) 
{
  this.myInnerHeight=this.myInnerHeighttemp-100;
  this.More_Search_Options = false;
}

else 
{
  this.More_Search_Options = true;
  this.myInnerHeight=this.myInnerHeighttemp
}
}
Search_Lead_button() {
this.Black_Start = 1;
this.Black_Stop = this.Page_Length_;
this.Red_Start = 1;
this.Total_Rows = 0;
this.Red_Stop = this.Page_Length_;
this.missedfollowup_count = 0;
this.Search_Student();
}




// Search_Student() {
// var value = 1,
// Register_Value = 1,
// Status_Id = 0,
// User_Id = 0,
// search_name_ = undefined,
// Qualification_Id = 0,
// look_In_Date_Value = 0,
// Course_Id = 0;

// // if (this.Search_By_ != undefined && this.Search_By_ != null)
// //     if (this.Search_By_ != undefined && this.Search_By_ != null && this.Search_By_ != '')
// //         value = this.Search_By_;
// if (this.Is_Registered != undefined && this.Is_Registered != null)
// if (
// this.Is_Registered != undefined &&
// this.Is_Registered != null &&
// this.Is_Registered != ""
// )
// Register_Value = this.Is_Registered;

// if (this.Look_In_Date == true) look_In_Date_Value = 1;

// if (
// this.Search_Name != undefined &&
// this.Search_Name != null &&
// this.Search_Name != ""
// )
// search_name_ = this.Search_Name;

// if (this.Users_Search != undefined && this.Users_Search != null)
// if (
// this.Users_Search.Users_Id != undefined &&
// this.Users_Search.Users_Id != null
// )
// User_Id = this.Users_Search.Users_Id;

// if (
// this.Qualification_Search != undefined &&
// this.Qualification_Search != null
// )
// if (
// this.Qualification_Search.Qualification_Id != undefined &&
// this.Qualification_Search.Qualification_Id != null
// )
// Qualification_Id = this.Qualification_Search.Qualification_Id;

// if (
// this.Course_Student_Search != undefined &&
// this.Course_Student_Search != null
// )
// if (
// this.Course_Student_Search.Course_Id != undefined &&
// this.Course_Student_Search.Course_Id != null
// )
// Course_Id = this.Course_Student_Search.Course_Id;

// if (this.Search_Status != undefined && this.Search_Status != null)
// if (
// this.Search_Status.Status_Id != undefined &&
// this.Search_Status.Status_Id != null
// )
// Status_Id = this.Search_Status.Status_Id;

// // if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
// // {
// //     debugger
// //     search_name_= this.Search_Name.replace("+","#");
// // }

// debugger
// if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '') {
 
//   search_name_ = this.Search_Name.trim().replace("+", "#");
// }


// this.issLoading = true;
// ////debugger
// this.Student_Service_.Search_Student(
// moment(this.Search_FromDate).format("YYYY-MM-DD"),
// moment(this.Search_ToDate).format("YYYY-MM-DD"),
// search_name_,
// User_Id,
// Status_Id,
// look_In_Date_Value,
// this.Black_Start,
// this.Black_Stop,
// this.Login_User,
// this.Red_Start,
// this.Red_Stop,
// Register_Value,
// Qualification_Id,
// Course_Id
// ).subscribe(
// (Rows) => {
// this.Student_Data = Rows.returnvalue.Student;
// // if ( this.Student_Data.length>0)
// // {
// //debugger
// if (this.Student_Data[0].Duplicate_Found_ == -1) {
// this.issLoading = false;
// const dialogRef = this.dialogBox.open(DialogBox_Component, {
// panelClass: "Dialogbox-Class",
// data: {
// Message:
// "The Phone Number Already Exist for " +
// this.Student_Data[0].Duplicate_Student_Name_ +
// " and is handled by " +
// this.Student_Data[0].Duplicate_User_,
// Type: "2",
// },
// });
// return;
// }

// // }
// else {
// this.Total_Entries =
// this.Student_Data[this.Student_Data.length - 1].Student_Id;
// this.Student_Data.splice(this.Student_Data.length - 1);
// this.Missed_Count =
// this.Student_Data[this.Student_Data.length - 1].Student_Id;
// this.Student_Data.splice(this.Student_Data.length - 1);

// this.missedfollowup_count = 0;
// this.followup_count = 0;

// if (this.Student_Data.length > 0) {
// if (this.Student_Data[0].User_Status == 2) {
// localStorage.clear();
// this.router.navigateByUrl("/auth/login");
// }
// }

// debugger

// for (var i = 0; i < this.Student_Data.length; i++) {
// this.Student_Data[i].RowNo = i + 1 + this.Total_Rows;
// if (this.Student_Data[i].tp == 1)
// this.followup_count = this.followup_count + 1;
// if (this.Student_Data[i].tp == 2)
// this.missedfollowup_count = this.missedfollowup_count + 1;
// }

// if (this.Student_Data.length > 0)
// this.Total_Rows = this.Total_Rows + this.Student_Data.length;
// this.issLoading = false;
// }

// this.issLoading = false;
// if (this.Student_Data.length == 0) {
// this.issLoading = false;
// const dialogRef = this.dialogBox.open(DialogBox_Component, {
// panelClass: "Dialogbox-Class",
// data: { Message: "No Details Found", Type: "3" },
// });
// }
// this.issLoading = false;
// },
// (Rows) => {
// this.issLoading = false;
// const dialogRef = this.dialogBox.open(DialogBox_Component, {
// panelClass: "Dialogbox-Class",
// data: { Message: "Error Occured", Type: "2" },
// });
// }
// );
// }














Search_Student() {
var value = 1,
Register_Value = 1,
Status_Id = 0,
User_Id = 0,
search_name_ = undefined,
Qualification_Id = 0,
look_In_Date_Value = 0,
Course_Id = 0;

if (this.Is_Registered != undefined && this.Is_Registered != null)
if (
this.Is_Registered != undefined &&
this.Is_Registered != null &&
this.Is_Registered != ""
)
Register_Value = this.Is_Registered;

if (this.Look_In_Date == true) look_In_Date_Value = 1;

if (
this.Search_Name != undefined &&
this.Search_Name != null &&
this.Search_Name != ""
)
search_name_ = this.Search_Name;

if (this.Users_Search != undefined && this.Users_Search != null)
if (
this.Users_Search.Users_Id != undefined &&
this.Users_Search.Users_Id != null
)
User_Id = this.Users_Search.Users_Id;

if (
this.Qualification_Search != undefined &&
this.Qualification_Search != null
)
if (
this.Qualification_Search.Qualification_Id != undefined &&
this.Qualification_Search.Qualification_Id != null
)
Qualification_Id = this.Qualification_Search.Qualification_Id;

if (
this.Course_Student_Search != undefined &&
this.Course_Student_Search != null
)
if (
this.Course_Student_Search.Course_Id != undefined &&
this.Course_Student_Search.Course_Id != null
)
Course_Id = this.Course_Student_Search.Course_Id;

if (this.Search_Status != undefined && this.Search_Status != null)
if (
this.Search_Status.Status_Id != undefined &&
this.Search_Status.Status_Id != null
)
Status_Id = this.Search_Status.Status_Id;


debugger
if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '') {
 
  search_name_ = this.Search_Name.trim().replace("+", "#");
}
this.Student_Data = [];

this.issLoading = true;
////debugger
this.Student_Service_.Search_Student(
moment(this.Search_FromDate).format("YYYY-MM-DD"),
moment(this.Search_ToDate).format("YYYY-MM-DD"),
search_name_,
User_Id,
Status_Id,
look_In_Date_Value,
this.Black_Start,
this.Black_Stop,
this.Login_User,
this.Red_Start,
this.Red_Stop,
Register_Value,
Qualification_Id,
Course_Id
).subscribe(
(Rows) => {

  debugger
  this.Student_Data = Rows.returnvalue.Student;

  for (var i=0;i<this.Student_Data.length;i++)
  {
      if(this.Student_Data[i].Followupcount==1 ||this.Student_Data[i].Followupcount==0)
      {
          this.Student_Data[i].Followupcount_Name="New "
      }
      else(this.Student_Data[i].Followupcount_Name="Followup ")
    
      
  }



// if ( this.Student_Data.length>0)
// {
//debugger
// if (this.Student_Data[0].Duplicate_Found_ == -1) {
// this.issLoading = false;
// const dialogRef = this.dialogBox.open(DialogBox_Component, {
// panelClass: "Dialogbox-Class",
// data: {
// Message:
// "The Phone Number Already Exist for " +
// this.Student_Data[0].Duplicate_Student_Name_ +
// " and is handled by " +
// this.Student_Data[0].Duplicate_User_,
// Type: "2",
// },
// });
// return;
// }

// }
// else {
// this.Total_Entries =
// this.Student_Data[this.Student_Data.length - 1].Student_Id;
// this.Student_Data.splice(this.Student_Data.length - 1);
// this.Missed_Count =
// this.Student_Data[this.Student_Data.length - 1].Student_Id;
// this.Student_Data.splice(this.Student_Data.length - 1);

// this.missedfollowup_count = 0;
// this.followup_count = 0;

// if (this.Student_Data.length > 0) {
// if (this.Student_Data[0].User_Status == 2) {
// localStorage.clear();
// this.router.navigateByUrl("/auth/login");
// }
// }

// debugger

// for (var i = 0; i < this.Student_Data.length; i++) {
// this.Student_Data[i].RowNo = i + 1 + this.Total_Rows;
// if (this.Student_Data[i].tp == 1)
// this.followup_count = this.followup_count + 1;
// if (this.Student_Data[i].tp == 2)
// this.missedfollowup_count = this.missedfollowup_count + 1;
// }

// if (this.Student_Data.length > 0)
// this.Total_Rows = this.Total_Rows + this.Student_Data.length;
// this.issLoading = false;
// }






// for (var i=0;i<this.Student_Data.length;i++)
// {
//   if(this.Student_Data[i].Priority_Color==null)
//   {
//     this.Student_Data[i].Priority_Color="#f3f5f6"
//   }
  
  
// }




debugger

this.issLoading = false;
if ( this.Student_Data.length>0)
{
debugger
if (this.Student_Data[0].Duplicate_Found_ == -1) {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: {
Message:
"The Phone Number Already Exist for " +
this.Student_Data[0].Duplicate_Student_Name_ +
" and is handled by " +
this.Student_Data[0].Duplicate_User_,
Type: "2",
},
});
return;
}

}

// if(this.Student_Data.length>0){


this.Data_Count =
  this.Student_Data[this.Student_Data.length - 1].Student_Id;
this.Student_Data.splice(this.Student_Data.length - 1);
this.Missed_Count =
  this.Student_Data[this.Student_Data.length - 1].Student_Id;
this.Student_Data.splice(this.Student_Data.length - 1);
this.Total_Entries = this.Student_Data.length;
this.missedfollowup_count = 0;
this.followup_count = 0;
if (this.Student_Data.length > 0) {
  if (this.Student_Data[0].User_Status == 2) {
    localStorage.clear();
    this.router.navigateByUrl("/auth/login");
  }
}
  
// }

debugger

this.Temp_Date_Followup = new Date();
var temp = this.New_Date(this.Temp_Date_Followup);
for (var i = 0; i < this.Student_Data.length; i++) {
  var temp_next = moment(
    this.Student_Data[i].Actual_Next_FollowUp_Date
  ).format("YYYY-MM-DD");

  if (temp_next < temp) this.Student_Data[i].tp = 2;
  else this.Student_Data[i].tp = 1;

  this.Student_Data[i].RowNo =
    this.Total_Rows + this.Student_Data.length - i;

    //No setting in student list begin
  this.Student_Data[i].RowNo =
    this.Total_Rows+ i+1;
    //No setting in student list end

  this.Student_Data[i].RowNo_sort = i + 1 + this.Total_Rows;
  if (this.Student_Data[i].tp == 1)
    this.followup_count = this.followup_count + 1;
  if (this.Student_Data[i].tp == 2)
    this.missedfollowup_count = this.missedfollowup_count + 1;
}













if (this.Student_Data.length == 0) {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "No Details Found", Type: "3" },
});
}
this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}


















Next_Click() {
if (this.Student_Data.length == this.Page_Length_) {
this.Black_Start = this.Black_Start + this.Page_Length_;
this.Black_Stop = this.Black_Stop + this.Page_Length_;
if (this.missedfollowup_count > 0) {
this.Red_Start = this.Red_Start + this.missedfollowup_count;
this.Red_Stop = this.Red_Start + this.Page_Length_;
}
this.nextflag = 1;

if (this.Student_Data.length > 0) {
this.Search_Student();
}
} else {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "No Other Details", Type: "3" },
});
}
}
previous_Click() {
if (this.Black_Start > 1) {
{
this.Black_Start = this.Black_Start - this.Page_Length_;
this.Black_Stop = this.Black_Stop - this.Page_Length_;
}
if (this.missedfollowup_count > 0 || this.Red_Start > 1) {
this.Red_Start = this.Red_Start - this.Page_Length_;
if (this.Red_Start <= 0) this.Red_Start = 1;
this.Red_Stop = this.Red_Start + this.Page_Length_;
}
this.Total_Rows =
this.Total_Rows - this.Student_Data.length - this.Page_Length_;
if (this.Total_Rows < 0) {
this.Total_Rows = 0;
}
this.Search_Student();
} else {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "No Other Details", Type: "3" },
});
}
}
Delete_Student(Student_Id, index) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: {
Message: "Do you want to delete ?",
Type: true,
Heading: "Confirm",
},
});
dialogRef.afterClosed().subscribe((result) => {
if (result == "Yes") {
this.issLoading = true;
//debugger
this.Student_Service_.Delete_Student(Student_Id).subscribe(
(Delete_status) => {
  //debugger
   Delete_status = Delete_status[0];
  Delete_status = Delete_status[0].DeleteStatus_;
  //
  // this.Total_Rows = this.Total_Rows - this.Student_Data.length;
if(Delete_status==1)
{
//  this.Student_Data.splice(index, 1);
////debugger
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
this.Close_Click();

// this.Search_Student();

}
else {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}
});
}




State_Change() {
this.District_ = null;
}




Fill_Student() {
if (this.Flag_Student == 1) {
if (
this.Student_.DOB == undefined ||
this.Student_.DOB == null ||
this.Student_.DOB == "NaN" ||
this.Student_.DOB == ""
) {
this.Student_.DOB = "";
} else
this.Student_.DOB = this.New_Date(
new Date(moment(this.Student_.DOB).format("YYYY-MM-DD"))
);
// this.Student_.Student_Id=0;
this.Student_.User_Id = this.Login_User;
this.Student_.State_Id = this.State_.State_Id;
this.Student_.Gender = this.Gender_.Gender_Id;
this.Student_.District_Id = this.District_.State_District_Id;
this.Student_.District_Name = this.District_.District_Name;
this.Student_.Course_Id = this.Course_Student.Course_Id;
this.Student_.Course_Name = this.Course_Student.Course_Name;
this.Student_.Qualification_Id = this.Qualification_.Qualification_Id;
this.Student_.Qualification_Name = this.Qualification_.Qualification_Name;
this.Student_.Enquiry_Source = this.Enquiry_Source_.Enquiry_Source_Id;
debugger
this.Student_.Enquiry_Source_Name = this.Enquiry_Source_.Enquiry_Source_Name;

////debugger
this.Student_.Id_Proof_Id =this.Id_Proof_.Id_Proof_Id;
this.Student_.Id_Proof_Name =this.Id_Proof_.Id_Proof_Name;

this.Student_.Year_Of_Pass_Id =this.Year_Of_Pass_.Year_Of_Pass_Id;
this.Student_.Year_Of_Passing =this.Year_Of_Pass_.Year_Of_Pass_Name;
this.Student_.Offline_class_preference=this.Offline_class_preference_;

// this.Student_.Resume_Status_Id =this.Resume_Status_.Resume_Status_Id;
// this.Student_.Resume_Status_Name =this.Resume_Status_.Resume_Status_Name;

// this.Student_.Id_Proof_FileName= this.Display_Photo_1_;

return this.Student_;
} else return null;
}
Fill_Followup() {
if (this.Flag_Followup == 1) {
// if (this.Student_Followup_.Next_FollowUp_Date == undefined || this.Student_Followup_.Next_FollowUp_Date==null)
// {
//     this.Student_Followup_.Next_FollowUp_Date=new Date();
// }

this.Student_Followup_.Student_Id = this.Student_Id;
if (this.Followup_Status_.FollowUp != false)
this.Student_Followup_.Next_FollowUp_Date = this.New_Date(
new Date(
moment(this.Student_Followup_.Next_FollowUp_Date).format(
"YYYY-MM-DD"
)
)
);
else {
this.Student_Followup_.Next_FollowUp_Date = new Date();
this.Student_Followup_.Next_FollowUp_Date = this.New_Date(
new Date(
moment(this.Student_Followup_.Next_FollowUp_Date).format(
"YYYY-MM-DD"
)
)
);
}

this.Student_Followup_.Status = this.Followup_Status_.Status_Id;
this.Student_Followup_.FollowUp = this.Followup_Status_.FollowUp;
this.Student_Followup_.Status_Name = this.Followup_Status_.Status_Name;
this.Student_Followup_.To_User_Id = this.Followup_Users_.Users_Id;
this.followup_user_id_ =this.Student_Followup_.To_User_Id;
this.Student_Followup_.To_User_Name = this.Followup_Users_.Users_Name;
this.Student_Followup_.By_User_Id = this.Login_User;
this.Student_Followup_.By_User_Name = this.Login_User_Name;
this.Student_Followup_.Entry_Date = this.New_Date(
new Date(moment(this.Student_Followup_.Entry_Date).format("YYYY-MM-DD"))
);
this.Student_Followup_.Actual_FollowUp_Date = this.New_Date(new Date(moment(this.Student_Followup_.Actual_FollowUp_Date).format("YYYY-MM-DD")));
this.Status_Id = this.Followup_Status_.Status_Id;
return this.Student_Followup_;
} else return null;
}
Save_Student() {
  debugger
if (this.Flag_Student == 1) {
if (
this.Enquiry_Source_ == undefined ||
this.Enquiry_Source_ == null ||
this.Enquiry_Source_.Enquiry_Source_Id == undefined ||
this.Enquiry_Source_.Enquiry_Source_Id == 0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select Enquiry Source", Type: "3" },
});
return;
}
if (
this.Student_.Student_Name == undefined ||
this.Student_.Student_Name == null ||
this.Student_.Student_Name == ""
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Enter Student", Type: "3" },
});
return;
}
if (
this.Gender_ == undefined ||
this.Gender_ == null ||
this.Gender_.Gender_Id == undefined ||
this.Gender_.Gender_Id == 0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select Gender", Type: "3" },
});
return;
}
if (
this.Student_.Phone == undefined ||
this.Student_.Phone == null ||
this.Student_.Phone == ""
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Enter Phone", Type: "3" },
});
return;
}
debugger
if (this.Student_.Phone.length > 15) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Enter valid Phone", Type: "3" },
});
return;
}
// if (
// this.Student_.Mobile != "" ||
// this.Student_.Mobile != null ||
// this.Student_.Mobile != undefined
// ) {
// if (this.Student_.Mobile.toString().length != 10) {
// const dialogRef = this.dialogBox.open(DialogBox_Component, {
// panelClass: "Dialogbox-Class",
// data: { Message: "Enter valid Mobile", Type: "3" },
// });
// return;
// }
// }
//debugger;

this.Student_.Whatsapp = this.Student_.Whatsapp.replace(/\s+/g, "");


if (
this.Student_.Whatsapp != "" ||
this.Student_.Whatsapp != null ||
this.Student_.Whatsapp != undefined
) {
if (this.Student_.Whatsapp.toString().length != 10) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Enter  Whatsapp", Type: "3" },
});
return;
}
}
if (
this.Student_.Email == undefined ||
this.Student_.Email == null ||
this.Student_.Email == ""
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Enter Email", Type: "3" },
});
return;
}
if (
this.State_ == undefined ||
this.State_ == null ||
this.State_.State_Id == undefined ||
this.State_.State_Id == 0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select State", Type: "3" },
});
return;
}
if (
this.District_ == undefined ||
this.District_ == null ||
this.District_.State_District_Id == undefined ||
this.District_.State_District_Id == 0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select District", Type: "3" },
});
return;
}
if (
this.Qualification_ == undefined ||
this.Qualification_ == null ||
this.Qualification_.Qualification_Id == undefined ||
this.Qualification_.Qualification_Id == 0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select Qualification", Type: "3" },
});
return;
}
if (
this.Course_Student == undefined ||
this.Course_Student == null ||
this.Course_Student.Course_Id == undefined ||
this.Course_Student.Course_Id == 0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select Course", Type: "3" },
});
return;
}
// if(this.Student_.Year_Of_Passing=="" || this.Student_.Year_Of_Passing==null || this.Student_.Year_Of_Passing==undefined)
// {
//   const dialogRef = this.dialogBox.open(DialogBox_Component, {
//     panelClass: "Dialogbox-Class",
//     data: { Message: "Enter year of Pass", Type: "3" },
//     });
//     return;
// }

if(this.Year_Of_Pass_.Year_Of_Pass_Id ==null || this.Year_Of_Pass_.Year_Of_Pass_Id==undefined || this.Year_Of_Pass_.Year_Of_Pass_Id==0)
  {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
      panelClass: "Dialogbox-Class",
      data: { Message: "Select Year Of Pass", Type: "3" },
      });
      return;
  }

if (this.Student_.Registered==true)
{
  if(this.Id_Proof_.Id_Proof_Id ==null || this.Id_Proof_.Id_Proof_Id==undefined || this.Id_Proof_.Id_Proof_Id==0)
  {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
      panelClass: "Dialogbox-Class",
      data: { Message: "Select Id Proof", Type: "3" },
      });
      return;
  }
  if(this.Student_.Id_Proof_No=="" || this.Student_.Id_Proof_No==undefined || this.Student_.Id_Proof_No==null)
  {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
      panelClass: "Dialogbox-Class",
      data: { Message: "Enter Id Proof No", Type: "3" },
      });
      return;
  }

}




// if(this.Resume_Status_.Resume_Status_Id===undefined || this.Resume_Status_.Resume_Status_Id==null || this.Resume_Status_.Resume_Status_Id==0)
// {
// const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Resume Status ',Type: "3" }});
// return  
// }

}

debugger
if (this.Flag_Followup == 1) {
if (
this.Followup_Status_ == null ||
this.Followup_Status_ == undefined ||
this.Followup_Status_.Status_Id == undefined ||
this.Followup_Status_.Status_Id == null||this.Followup_Status_.Status_Id==0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select Status", Type: "3" },
});
return;
}
if (
this.Followup_Users_ == null ||
this.Followup_Users_ == undefined ||
this.Followup_Users_.Users_Id == undefined ||
this.Followup_Users_.Users_Id == null||this.Followup_Users_.Users_Id==0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select To Staff", Type: "3" },
});
return;
}

if (
this.Student_Followup_.Remark == undefined ||
this.Student_Followup_.Remark == null ||
this.Student_Followup_.Remark == ""
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Enter Remark", Type: "3" },
});
return;
}

if (this.Followup_Status_.FollowUp != false) {
if (
this.Student_Followup_.Next_FollowUp_Date == undefined ||
this.Student_Followup_.Next_FollowUp_Date == null
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Choose Next Follow Up Date", Type: "3" },
});
return;
}
}
}
var Main_Array = {
Student: this.Fill_Student(),
Followup: this.Fill_Followup(),
};
if (Main_Array.Student == null && Main_Array.Followup == null) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Saved", Type: "false" },
});
return;
}

if (this.Save_Call_Status == true) return;
else this.Save_Call_Status = true;
this.issLoading = true;
debugger
this.Student_Service_.Save_Student(
Main_Array,
this.ImageFile_Photo,this.ImageFile_Photo1,this.ImageFile_Photo2,this.Document_File_Array1
).subscribe(
(Save_status) => {
  debugger
  console.log(Save_status)
if (Number(Save_status[0][0].Student_Id_) > 0) {
if (this.Flag_Student == 1)
{
this.Student_.Student_Id = Number(Save_status[0][0].Student_Id_);
//debugger
// this.Registration_Visiblility=true;

//debugger
if (this.Student_.Registered == true) {
  if (
  this.Remove_Registration_Permissions != undefined &&
  this.Remove_Registration_Permissions != null
  )
  if (this.Remove_Registration_Permissions.View == true)
  this.Remove_Registration_Visibility = true;
  } else {
  if (
  this.Registration_Permissions != undefined &&
  this.Registration_Permissions != null
  )
  if (this.Registration_Permissions.View == true)
  this.Registration_Visiblility = true;
  }

//debugger
if(this.Student_.Registered == true){
  this.Disable_Visiblility =true
  // this.Enable_Visiblility =true;
this.Activate_Visiblility=true;
this.Movedtoblacklist_Visiblility=true;

}

this.View_History_ = false;
this.View_Follow_= false;
this.Student_Delete= true;
this.Student_Id_Edit=1;
// this.tab_view = true;


this.profile_View_followup=false;
}
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Saved", Type: "false" },
});
// this.Get_OTP()
this.Save_Call_Status = false;
this.Clr_Student_Followup();


debugger
this.Flag_Followup=0;
//debugger
// if(this.Flag_Student==1 && this.Student_Id==0)
// var userid,username;

// userid=this.Student_Followup_.To_User_Id ;
// username =this.Student_Followup_.To_User_Name;

// this.Get_ToStaff_Mobile(userid);
// if (this.Mail_sms_Status == 0 && (this.Status_Id == 18 || this.Status_Id == 22)
// ){this.Save_Student_Whatsapp()};

debugger
if (this.Mail_sms_Status == 0 && !(this.Status_Id == 18 || this.Status_Id == 22))
{ 
  //debugger
var user_id =this.followup_user_id_;
this.Get_ToStaff_WhatsappMobile(user_id)
// this.Save_Student_Whatsapp();
};

this.to_staff_mobile_no_ =Save_status[0][0].to_staff_mobile_no_
// whatsapp course msg start
debugger
console.log(Save_status[0][0].Course_Id_,'d')
  if(Save_status[0][0].WhatsApp_Msg_Status_ == 0 && Save_status[0][0].Course_Id_ ==1)
  {
  this.api_brochure_python_arjun_jan2025(Save_status[0][0].Student_Name_,Save_status[0][0].Whatsapp_,Save_status[0][0].Course_Name_,Save_status[0][0].to_staff_name_,
  Save_status[0][0].to_staff_mobile_no_,Save_status[0][0].Course_Id_,Save_status[0][0].Student_Id_ );
  }

  if(Save_status[0][0].WhatsApp_Msg_Status_ == 0 && Save_status[0][0].Course_Id_ ==2)
  {
  this.api_dm_brochure_arjun_jan2025(Save_status[0][0].Student_Name_,Save_status[0][0].Whatsapp_,Save_status[0][0].Course_Name_,Save_status[0][0].to_staff_name_,
  Save_status[0][0].to_staff_mobile_no_,Save_status[0][0].Course_Id_ ,Save_status[0][0].Student_Id_);
  }

  if(Save_status[0][0].WhatsApp_Msg_Status_ == 0 && Save_status[0][0].Course_Id_ ==6||Save_status[0][0].Course_Id_ ==14)
  {
  this.api_brochure_mernstack_arjun_jan2025(Save_status[0][0].Student_Name_,Save_status[0][0].Whatsapp_,Save_status[0][0].Course_Name_,Save_status[0][0].to_staff_name_,
  Save_status[0][0].to_staff_mobile_no_,Save_status[0][0].Course_Id_ ,Save_status[0][0].Student_Id_);
  }

  if(Save_status[0][0].WhatsApp_Msg_Status_ == 0 && Save_status[0][0].Course_Id_ ==3)
  {
  this.api_brochure_softwaretesting_arjun_jan2025(Save_status[0][0].Student_Name_,Save_status[0][0].Whatsapp_,Save_status[0][0].Course_Name_,Save_status[0][0].to_staff_name_,
  Save_status[0][0].to_staff_mobile_no_,Save_status[0][0].Course_Id_,Save_status[0][0].Student_Id_ );
  }

// whatsapp course msg end
 



if (
this.Mail_sms_Status == 0 &&
!(this.Status_Id == 18 || this.Status_Id == 22)
) {
var Student = "";
if (Save_status[0][0].Student_Name_ == null)
Student = this.Student_Name;
else Student = Save_status[0][0].Student_Name_;
if (Save_status[0] != undefined && Save_status[0] != "") {
var Sms =
"Hi, " +
Student +
" Thank you for Your Enquiry at ONE TEAM. Our Experienced trainers look forward to Train you. Visit oneteamsolutions.in or call " +
this.User_Mobile +
" ONE TEAM SOLUTIONS";


// var Whatsapp =
// "Hello, " +
// Student +
// " Thank you for Your Enquiry at One Team Solutions!"+
// "Our Experienced trainers are looking forward to Training you."+
// "Feel free to contact your Academic Counsellor  "+this.Login_User_Name+ "on" +this.User_Mobile+ "for any further queries."+

// "Watch the Below Videos featuring One Team Solutions :"+
// "• Mathrubhumi News Featured One Team Solutions - https://www.youtube.com/watch?v=7mxRTnA64Ds"
// "• Dr.Brijesh George John Featured One Team Solutions - https://youtu.be/o1vYRX74b54"+

// "• Ebadu Rahman Famous YouTuber Featured One Team Solutions - https://youtu.be/FU3g63bbqTY"+

// "• Our Students Got Featured in a Career Related Program - https://www.youtube.com/watch?v=6Idq42W7wcU&t=2s"

// ;
////debugger
// var Sms='Hello '+Save_status[1][0].Student_Name_+
// ' Thank you for Enquiring about Hands on-Training Programs at One Team. Our Experienced Trainers look forward to train you.Visit oneteamsolutions.in or call 9567440597 for any support.';
this.Student_Service_.Send_Sms_Email(
Save_status[0][0].Phone_,
Save_status[0][0].Email_,
Sms,
Student,
this.User_Mobile,
this.Login_User_Name
).subscribe(
(Rows) => {
  ////debugger
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: Sms, Type: "false" },
});

this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}


//  this.Save_Whatsapp();

this.issLoading = false;
}
//debugger
if (this.profile_View == true) {
// this.Create_New();
this.Search_Student();


this.Total_Rows = this.Total_Rows - this.Student_Data.length;
// this.Clr_Student();
//this.Close_Click();
} else {
this.Close_Click();
this.Search_Student();
this.Total_Rows = this.Total_Rows - this.Student_Data.length;
}
//debugger
} else if (Number(Save_status[0][0].Student_Id_) == -1) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: {
Message:
"The Phone Number Already Exist for " +
Save_status[0][0].Duplicate_Student_Name +
" and is handled by " +
Save_status[0][0].Duplicate_User_Name,
Type: "2",
},
});
this.Save_Call_Status = false;
} else if (Number(Save_status[0][0].Student_Id_) == -2) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: {
Message:
" Email is Already Exist for " +
Save_status[0][0].Duplicate_Student_Name +
" and is handled by " +
Save_status[0][0].Duplicate_User_Name,
Type: "2",
},
});
this.Save_Call_Status = false;
} 

else if (Number(Save_status[0][0].Student_Id_) == -3) {
  const dialogRef = this.dialogBox.open(DialogBox_Component, {
  panelClass: "Dialogbox-Class",
  data: {
  Message:
  " Whatsapp is Already Exist for " +
  Save_status[0][0].Duplicate_Student_Name +
  " and is handled by " +
  Save_status[0][0].Duplicate_User_Name,
  Type: "2",
  },
  });
  this.Save_Call_Status = false;
  }
else {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error ", Type: "2" },
});
this.Save_Call_Status = false;
}
this.issLoading = false;
},
(Rows) => {
this.issLoading = false;

const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
this.Save_Call_Status = false;
}
);
}

Register_Student() {


  if (this.Student_.Photo == undefined || this.Student_.Photo == null || this.Student_.Photo == '') {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
    panelClass: "Dialogbox-Class",
    data: { Message: "Select Photo", Type: "3" },
    });
    return;
    }


    
if (
  this.Student_.Parent_spouse_name == undefined ||
  this.Student_.Parent_spouse_name == null ||
  this.Student_.Parent_spouse_name == ""
  ) {
  const dialogRef = this.dialogBox.open(DialogBox_Component, {
  panelClass: "Dialogbox-Class",
  data: { Message: "Enter Parent/Spouse Name", Type: "3" },
  });
  return;
  }

if (
  this.Student_.Parent_spouse_contact_no == undefined ||
  this.Student_.Parent_spouse_contact_no == null ||
  this.Student_.Parent_spouse_contact_no == ""
  ) {
  const dialogRef = this.dialogBox.open(DialogBox_Component, {
  panelClass: "Dialogbox-Class",
  data: { Message: "Enter Parent/Spouse Contact No", Type: "3" },
  });
  return;
  }



const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: {
Message: "Do you want to Register ?",
Type: true,
Heading: "Confirm",
},
});
dialogRef.afterClosed().subscribe((result) => {
if (result == "Yes") {
this.issLoading = true;
debugger
this.Student_Service_.Register_Student(
this.Student_.Student_Id,
this.Login_User,
this.Student_.Student_Name,
this.Student_.Course_Name
).subscribe(
(Save_status) => {
debugger
// var code ;

// if(code=="ER_TRUNCATED_WRONG_VALUE_FOR_FIELD")
// {
//   const dialogRef = this.dialogBox.open(DialogBox_Component, {
//   panelClass: "Dialogbox-Class",
//   data: { Message: "E-mail is not valid", Type: "2" },
//   });
//   }


if(Save_status[0]==undefined) {
  const dialogRef = this.dialogBox.open(DialogBox_Component, {
  panelClass: "Dialogbox-Class",
  data: { Message: "Error Occured", Type: "2" },
  });
  }
  this.issLoading = false;


if (Number(Save_status[0].FollowUp[0].Student_Id_) > 0)
{
debugger

this.Student_Id_Edit = Number(Save_status[0].FollowUp[0].Student_Id_);

this.Student_.Registered = true;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Registered", Type: "false" },
});

//  this.Register_Whatsapp()
// this.Search_Student();
////debugger










this.Enable_Visiblility = false;
this.Disable_Visiblility = false;

		if (this.Student_.Student_Status == true && this.Student_.Registered == true) {
			if (
				this.Enable_Permissions != undefined &&
				this.Enable_Permissions != null
			)
				if (this.Enable_Permissions.View == true)
					this.Disable_Visiblility = true;
		} else {
			if (
				this.Disable_Permissions != undefined &&
				this.Disable_Permissions != null
			)
				if (this.Disable_Permissions.View == true)
					this.Enable_Visiblility = true;
		}




debugger
this.Activate_Visiblility = false;
this.Deactivate_Visiblility = false;

		if (this.Student_.Activate_Status == true) {
			if (
				this.Activate_Permissions != undefined &&
				this.Activate_Permissions != null
			)
				if (this.Activate_Permissions.View == true)
					this.Deactivate_Visiblility = true;
		} else {
			if (
				this.Deactivate_Permissions != undefined &&
				this.Deactivate_Permissions != null
			)
				if (this.Deactivate_Permissions.View == true)
					this.Activate_Visiblility = true;
		}



    ////debugger
    this.Movedtoblacklist_Visiblility = false;
    this.Removedfromblacklist_Visiblility = false;
    
        if (this.Student_.Blacklist_Status == true) {
          if (
          	this.Movedtoblacklist_Permissions != undefined &&
          	this.Movedtoblacklist_Permissions != null
          )
          	if (this.Movedtoblacklist_Permissions.View == true)
              this.Removedfromblacklist_Visiblility = true;
        } else {
          if (
          	this.Removedfromblacklist_Permissions != undefined &&
          	this.Removedfromblacklist_Permissions != null
          )
          	if (this.Removedfromblacklist_Permissions.View == true)
              this.Movedtoblacklist_Visiblility = true;
        }
    














if (
this.Course_Selection_Permission != undefined &&
this.Course_Selection_Permission != null
)
////debugger
if (this.Course_Selection_Permission.View == true)
this.Course_Selection_Visibility = true;

////debugger
// this.Total_Rows = this.Total_Rows - this.Student_Data.length;


// var Is_Mail_Status_ = 0;var Is_Status_ = 0;
// Is_Mail_Status_ = Save_status[0][0].Is_Mail_Status_;
// Is_Status_ = Save_status[0][0].Is_Status_;

// this.Edit_Student(this.Student_Id_Edit,Is_Mail_Status_,Is_Status_,1);

this.Course_Selection_Visibility==true
Save_status[0].Is_registered_==1

  this.Remove_Registration_Visibility = false;
  this.Registration_Visiblility = false;

  if (
  this.Remove_Registration_Permissions != undefined &&
  this.Remove_Registration_Permissions != null
  )
  if (this.Remove_Registration_Permissions.View == true)
  this.Remove_Registration_Visibility = true;









// this.Search_Student();
// this.Close_Click();
} else {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}
});
}
Remove_Registration() {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: {
Message: "Do you want to Remove Registration ?",
Type: true,
Heading: "Confirm",
},
});
dialogRef.afterClosed().subscribe((result) => {
if (result == "Yes") {
// this.issLoading=true;
this.Student_Service_.Remove_Registration(
this.Student_.Student_Id
).subscribe(
(update_status) => {
if (update_status[0][0].Student_Id_ > 0) {

this.Student_Id_Edit = Number(update_status[0][0].Student_Id_);

this.Student_.Registered = false;


const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Registration Removed", Type: "false" },
});

////debugger


if (
this.Course_Selection_Permission != undefined &&
this.Course_Selection_Permission != null
)
////debugger
if (this.Course_Selection_Permission.View == false)
this.Course_Selection_Visibility = false;



this.Total_Rows = this.Total_Rows - this.Student_Data.length;

// var Mail_Status_ = 0;var Status_ = 0;var student_id_;
// Mail_Status_ = update_status[0][0].Is_Mail_Status_;
// Status_ = update_status[0][0].Is_Status_;
//  student_id_ = update_status[0][0].Student_Id_;

// this.Edit_Student(student_id_,Mail_Status_,Status_,this.Student_EditIndex);

this.Search_Student();
this.Remove_Registration_Visibility = false;
this.Registration_Visiblility = false;

if (
this.Remove_Registration_Permissions != undefined &&
this.Remove_Registration_Permissions != null
)
if (this.Registration_Permissions.View == true)
this.Registration_Visiblility = true;
} else {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}
});
}
View_Follow_Click_() {
if (this.Fees_View != undefined) {
this.Fees_View = false;
}
this.View_History_ = false;
this.Fees_View = false;
this.New_Followup(
this.Student_Id,
this.Student_Name,
this.Status_Id,
this.Student_EditIndex
);

//this.Create_New=true;
}
New_Followup(Student_Id, Student_Name, Mail_Status, index) {
this.View_Student_ = false;
this.View_Follow_ = true;
this.View_History_ = false;
this.Fees_View = false;
this.Attendance_View=false;
this.Resumesending_View = false;
this.Placement_View = false;
this.Interview_View = false;
this.Resume_Sending_View = false;
this.Show_FollowUp = false;
this.Entry_View = true;
this.tab_view = false;
this.profile_View = false;
this.profile_View_followup = false;
this.Course_View = false;
this.Mark_View = false;
this.Next_FollowUp_Date_Visible = true;
this.Mail_sms_Status = Mail_Status;
this.Student_Id = Student_Id;
this.Student_Name = Student_Name;

this.Student_EditIndex = index;
// this.Next_FollowUp_Date_Visible=true;
this.Get_FollowUp_Details();

this.Student_Followup_.Student_Id = Student_Id;

this.Flag_Followup = 1;
this.Flag_Student = 0;
// this.Student_Followup_.Next_FollowUp_Date=new Date();
// this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
}
Get_Last_Followup() {
this.issLoading = true;
this.Student_Service_.Get_Last_Followup(this.Login_User).subscribe(
(Rows) => {
  this.Student_Name='';
this.Student_Followup_Data = Rows[0];
if (this.Student_Followup_Data.length > 0) {
this.issLoading = false;
this.Student_Followup_ = this.Student_Followup_Data[0];

this.Followup_Status_Temp.FollowUp = this.Student_Followup_.FollowUp;
// this.Followup_Status_Temp.Status_Id = this.Student_Followup_.Status;
// this.Followup_Status_Temp.Status_Name =
// this.Student_Followup_.Status_Name;
// this.Followup_Status_ = this.Followup_Status_Temp;

for (var i = 0; i < this.Status_Data.length; i++) {
  if (
    this.Student_Followup_.Status ==
  this.Status_Data[i].Status_Id
  )
  this.Followup_Status_ = this.Status_Data[i];
  }

this.Followup_Users_Temp.Users_Id = this.Student_Followup_.To_User_Id;
// this.Followup_Users_Temp.Users_Name =
// this.Student_Followup_.To_User_Name;
// this.Followup_Users_ = this.Followup_Users_Temp;

for (var i = 0; i < this.Users_Data.length; i++) {
  if (
    this.Student_Followup_.To_User_Name ==
  this.Users_Data[i].Users_Name
  )
  this.Followup_Users_ = this.Users_Data[i];
  }

if (this.Student_Followup_.FollowUp == true)
this.Next_FollowUp_Date_Visible = false;
else this.Next_FollowUp_Date_Visible = true;

// this.Student_Followup_.Next_FollowUp_Date = new Date();
// this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);

this.Student_Followup_.Remark = "";
}
this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}

Get_FollowUp_Details() {
this.issLoading = true;

this.Student_Service_.Get_FollowUp_Details(this.Student_Id).subscribe(
(Rows) => {
this.issLoading = false;
this.Student_Followup_ = Rows[0].FollowUp[0];
if (
this.Student_Followup_ != null &&
this.Student_Followup_ != undefined
) {
this.Followup_Status_Temp.FollowUp = this.Student_Followup_.FollowUp;
// this.Followup_Status_Temp.Status_Id = this.Student_Followup_.Status;
// this.Followup_Status_Temp.Status_Name =
// this.Student_Followup_.Status_Name;
// this.Followup_Status_ = Object.assign({}, this.Followup_Status_Temp);

for (var i = 0; i < this.Status_Data.length; i++) {
  if (
    this.Student_Followup_.Status ==
  this.Status_Data[i].Status_Id
  )
  this.Followup_Status_ = this.Status_Data[i];
  }


this.Followup_Users_Temp.Users_Id = this.Student_Followup_.To_User_Id;
// this.Followup_Users_Temp.Users_Name =
// this.Student_Followup_.To_User_Name;
// this.Followup_Users_ = Object.assign({}, this.Followup_Users_Temp);

for (var i = 0; i < this.Users_Data.length; i++) {
  if (
    this.Student_Followup_.To_User_Name ==
  this.Users_Data[i].Users_Name
  )
  this.Followup_Users_ = this.Users_Data[i];
  }

this.Student_Followup_.Remark = "";

if (this.Student_Followup_.FollowUp == true) {
this.Next_FollowUp_Date_Visible = false;
} else this.Next_FollowUp_Date_Visible = true;

this.Student_Followup_.Next_FollowUp_Date = null;
//  this.Student_Followup_.Next_FollowUp_Date=new Date();
//  this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
}
},

(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}
Followup_History() {
let bottom = document.getElementById("show_History");
if (bottom !== null) {
bottom.scrollIntoView();
bottom = null;
}
// this.Student_Id=this.Student_Data[this.Student_EditIndex].Student_Id;
if (this.Show_Followup_History == true) {
this.Show_Followup_History = false;
this.issLoading = true;

this.Student_Service_.Followup_History(this.Student_Id).subscribe(
(Rows) => {
this.issLoading = false;
if (Rows[0].FollowUp.length > 0)
this.Followp_History_Data = Rows[0].FollowUp;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: false },
});
}
);
} else this.Show_Followup_History = true;
}
View_Student_Click_() {
this.View_History_ = true;
this.Show_FollowUp = true;
this.Show_Followup_History = true;

this.Edit_Student(
this.Student_Id,
this.Mail_sms_Status,
this.Status_Id,
this.Student_EditIndex
);
// this.Edit_Student(this.Student_Data[0], this.Student_EditIndex);
}
numberToEnglish(n, custom_join_character) {

  //debugger
var string = n.toString(),
units,
tens,
scales,
start,
end,
chunks,
chunksLen,
chunk,
ints,
i,
word,
words;

var and = custom_join_character || "and";

/* Is number zero? */
if (parseInt(string) === 0) {
return "zero";
}

/* Array of units as words */
units = [
"",
"One",
"Two",
"Three",
"Four",
"Five",
"Six",
"Seven",
"Eight",
"Nine",
"Ten",
"Eleven",
"Twelve",
"Thirteen",
"Fourteen",
"Fifteen",
"Sixteen",
"Seventeen",
"Eighteen",
"Nineteen",
];

/* Array of tens as words */
tens = [
"",
"",
"Twenty",
"Thirty",
"Forty",
"Fifty",
"Sixty",
"Seventy",
"Eighty",
"Ninety",
];

/* Array of scales as words */
scales = ["", "", "Thousand", "Lakh", "Billion"];

/* Split user arguemnt into 3 digit chunks from right to left */
start = string.length;
chunks = [];
while (start > 0) {
end = start;
chunks.push(string.slice((start = Math.max(0, start - 3)), end));
}

/* Check if function has enough scale words to be able to stringify the user argument */
chunksLen = chunks.length;
if (chunksLen > scales.length) {
return "";
}

/* Stringify each integer in each chunk */
words = [];
for (i = 0; i < chunksLen; i++) {
chunk = parseInt(chunks[i]);

if (chunk) {
/* Split chunk into array of individual integers */
ints = chunks[i].split("").reverse().map(parseFloat);

/* If tens integer is 1, i.e. 10, then add 10 to units integer */
if (ints[1] === 1) {
ints[0] += 10;
}

/* Add scale word if chunk is not zero and array item exists */
if ((word = scales[i])) {
words.push(word);
}

/* Add unit word if array item exists */
if ((word = units[ints[0]])) {
words.push(word);
}

/* Add tens word if array item exists */
if ((word = tens[ints[1]])) {
words.push(word);
}

/* Add 'and' string after units or tens integer if: */
if (ints[0] || ints[1]) {
/* Chunk has a hundreds integer or chunk is the first of multiple chunks */
if (ints[2] || (!i && chunksLen)) {
words.push(and);
}
}

/* Add hundreds word if array item exists */
if ((word = units[ints[2]])) {
words.push(word + " hundred");
}
}
}

return words.reverse().join(" ");
}







print_receipt(Receipt_Voucher_e: Receipt_Voucher, index) {

//debugger

this.Get_Companydetails();
this.Receipt_Voucher_ = Receipt_Voucher_e;
this.print_voucher_no = this.Receipt_Voucher_.Voucher_No;
this.print_Paid_date = this.Receipt_Voucher_.Date;
this.print_account_name = this.Receipt_Voucher_.FromAccount_Name;
this.print_amount = this.Receipt_Voucher_.Amount;
this.print_Description = this.Receipt_Voucher_.Description;

this.To_Account_Id =this.Receipt_Voucher_.To_Account_Id;
////debugger
this.Company_Name = this.Receipt_Voucher_.Company_Name;
this.Address1 = this.Receipt_Voucher_.Address1;
this.Address2 = this.Receipt_Voucher_.Address2;
this.Address3 = this.Receipt_Voucher_.Address3;
this.PinCode = this.Receipt_Voucher_.PinCode;
this.GSTNo = this.Receipt_Voucher_.GSTNo;



this.print_paid = this.numberToEnglish(this.print_amount, "");
////debugger;
setTimeout(function () {
// this.print_Mark()
let popupWinindow;

let innerContents = document.getElementById("Print_Div").innerHTML;
popupWinindow = window.open(
"",
"_blank",
"width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no"
);
popupWinindow.document.open();
popupWinindow.document.write(
'<html><head><style>@page { size: auto; margin: 0mm; } </style><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' +
innerContents +
"</html>"
);
popupWinindow.document.close();
}, 1000);
}

Get_Companydetails() {
this.issLoading = true;
this.Student_Service_.Get_Companydetails().subscribe(
(Rows) => {
this.issLoading = false;
this.Companyprint_Data = Rows[0];
this.print_Company_Name = Rows[0][0].Company_Name;
this.print_Company_Address1 = Rows[0][0].Address1;
this.print_Company_Address2 = Rows[0][0].Address2;
this.print_Company_Address3 = Rows[0][0].Address3;
this.print_Company_Address4 = Rows[0][0].Address4;
this.print_Company_pincode = Rows[0][0].Pincode;
this.print_Company_Phone = Rows[0][0].Phone1;
this.print_Company_Mobile = Rows[0][0].Mobile;
this.print_Company_Email = Rows[0][0].Email;
this.print_Company_Website = Rows[0][0].Website;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: false },
});
}
);
}

// Get_Companydetails()
// {

//    ////debugger
//     this.issLoading = true;
//     this.Hotel_Booking_Master_Service_.Get_Companydetails().subscribe(Rows => {

//         this.issLoading = false;
//         this.Companyprint_Data = Rows[0];
//         this.print_Company_Name=Rows[0][0].Company_Name;
//         this.print_Company_Address1=Rows[0][0].Address1;
//         this.print_Company_Address2=Rows[0][0].Address2;
//         this.print_Company_Address3=Rows[0][0].Address3;
//         this.print_Company_Address4=Rows[0][0].Address4;
//         this.print_Company_pincode=Rows[0][0].Pincode;
//         this.print_Company_Phone=Rows[0][0].Phone1;
//         this.print_Company_Mobile=Rows[0][0].Mobile;
//         this.print_Company_Email=Rows[0][0].Email;
//         this.print_Company_Website=Rows[0][0].Website;

//     },
//         Rows => {
//             this.issLoading = false;
//             const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
//         });
// }

Edit_Student(Student_Id_Temp, Mail_Status_, Status, index) {

//debugger
//alert(Mail_Status_)
this.Clr_Student();
this.Student_EditIndex = index;
this.whatsapp_msg_status =1;

this.Placement_button_View=true;

// this.Student_Details_View= true;
this.Applied_Reject_Detaild_Report(Student_Id_Temp);
this.Flag_Followup = 0;
this.Flag_Student = 1;
this.Mail_sms_Status = Mail_Status_;
this.Status_Id = Status;
this.Student_Followup_.Remark = "";
// this.Student_Id = Student_e.Student_Id;
// this.Student_Id_Edit = Student_e.Student_Id;

this.Student_Id = Student_Id_Temp;
this.Student_Id_Edit = Student_Id_Temp;

this.View_Student_ = true;
this.Course_Tab = false;
this.clickview = false;
this.View_Follow_ = false;
this.Entry_View = true;
this.profile_View = true;
this.profile_View_followup = false;
this.Receipt_History_View = false;
this.tab_view = true;
this.Course_View = false;

this.View_History_ = false;
this.Show_FollowUp = true;
this.Fees_View = false;
this.Attendance_View=false;
this.Resumesending_View = false;
this.Placement_View = false;
this.Interview_View = false;
this.Resume_Sending_View = false;
this.Mark_View = false;
this.Course_Click_Status = false;
this.Fees_Click_Status = false;
this.Mark_Click_Status = false;
// this.Student_.Registered == true

this.Resume_statusview =1
// this.Save_Agent_.Client_Accounts_Name=Student_e.Client_Accounts_Name;
// this.Save_Agent_.Client_Accounts_Id=Student_e.Agent_Id;

this.issLoading = true;
//Student_e.Student_Id
this.Student_Service_.Get_Student(Student_Id_Temp).subscribe(
(Rows) => {

debugger
this.Student_ = Object.assign({}, Rows[0][0]);

this.View_Password = this.Student_.Password
if(this.View_Password!=""){this.Password_button_View=true;}
this.Password_View=false;


this.Student_Name = this.Student_.Student_Name;
this.Registration = this.Student_.Registered;
this.Remove_Registration_Visibility = false;
this.Registration_Visiblility = false;
this.Course_Selection_Visibility = false;

this.followup_user_id_ =this.Student_.To_User_Id;

if (this.Student_.Registered == true) {
if (
this.Remove_Registration_Permissions != undefined &&
this.Remove_Registration_Permissions != null
)
if (this.Remove_Registration_Permissions.View == true)
this.Remove_Registration_Visibility = true;
} else {
if (
this.Registration_Permissions != undefined &&
this.Registration_Permissions != null
)
if (this.Registration_Permissions.View == true)
this.Registration_Visiblility = true;
}
if (
this.Course_Selection_Permission != undefined &&
this.Course_Selection_Permission != null
)
if (this.Course_Selection_Permission.View == true)
this.Course_Selection_Visibility = true;

this.Display_Photo_ = this.Student_.Photo;
//debugger
this.resumeimg =this.Student_.Resume

if(this.Student_.Image_ResumeFilename !=null||this.Student_.Image_ResumeFilename !=undefined)
{
  this.Image_downldview =1
}


if(this.Student_.Id_Proof_File !=null && this.Student_.Id_Proof_File !=undefined && this.Student_.Id_Proof_File != "" )
{
  this.id_proof_downldview =1
}

this.ImageFile_Photo_view = environment.FilePath + this.Student_.Photo;
this.ImageFile_psid_view = environment.FilePath + this.Student_.Parent_spouse_idcard;

this.ImageFile_Photo_view1 = environment.FilePath + this.Student_.Id_Proof_File;

this.ImageFile_Resume_view =environment.FilePath + this.Student_.Image_ResumeFilename;

for (var i = 0; i < this.Gender_Data.length; i++) {
if (this.Student_.Gender == this.Gender_Data[i].Gender_Id)
this.Gender_ = this.Gender_Data[i];
}
for (var i = 0; i < this.Enquiry_Source_Data.length; i++) {
if (
this.Student_.Enquiry_Source ==
this.Enquiry_Source_Data[i].Enquiry_Source_Id
)
this.Enquiry_Source_ = this.Enquiry_Source_Data[i];
}

for (var i = 0; i < this.Id_Proof_Data.length; i++) {
  if (
  this.Student_.Id_Proof_Id ==
  this.Id_Proof_Data[i].Id_Proof_Id
  )
  this.Id_Proof_ = this.Id_Proof_Data[i];
  }

  for (var i = 0; i < this.Year_Of_Pass_Data.length; i++) {
    if (
    this.Student_.Year_Of_Pass_Id ==
    this.Year_Of_Pass_Data[i].Year_Of_Pass_Id
    )
    this.Year_Of_Pass_ = this.Year_Of_Pass_Data[i];
    }

    


  for (var i = 0; i < this.Resume_Status_Data.length; i++) {
    if (
    this.Student_.Resume_Status_Id ==
    this.Resume_Status_Data[i].Resume_Status_Id
    )
    this.Resume_Status_ = this.Resume_Status_Data[i];
    }



////debugger

this.Enable_Visiblility = false;
this.Disable_Visiblility = false;

		if (this.Student_.Student_Status == true && this.Student_.Registered == true) {
			if (
				this.Enable_Permissions != undefined &&
				this.Enable_Permissions != null
			)
				if (this.Enable_Permissions.View == true)
					this.Disable_Visiblility = true;
		} else {
			if (
				this.Disable_Permissions != undefined &&
				this.Disable_Permissions != null
			)
				if (this.Disable_Permissions.View == true)
					this.Enable_Visiblility = true;
		}




////debugger
this.Activate_Visiblility = false;
this.Deactivate_Visiblility = false;

		if (this.Student_.Activate_Status == true) {
			if (
				this.Activate_Permissions != undefined &&
				this.Activate_Permissions != null
			)
				if (this.Activate_Permissions.View == true)
					this.Deactivate_Visiblility = true;
		} else {
			if (
				this.Deactivate_Permissions != undefined &&
				this.Deactivate_Permissions != null
			)
				if (this.Deactivate_Permissions.View == true)
					this.Activate_Visiblility = true;
		}



    ////debugger
    this.Movedtoblacklist_Visiblility = false;
    this.Removedfromblacklist_Visiblility = false;
    
        if (this.Student_.Blacklist_Status == true) {
          if (
          	this.Movedtoblacklist_Permissions != undefined &&
          	this.Movedtoblacklist_Permissions != null
          )
          	if (this.Movedtoblacklist_Permissions.View == true)
              this.Removedfromblacklist_Visiblility = true;
        } else {
          if (
          	this.Removedfromblacklist_Permissions != undefined &&
          	this.Removedfromblacklist_Permissions != null
          )
          	if (this.Removedfromblacklist_Permissions.View == true)
              this.Movedtoblacklist_Visiblility = true;
        }
    
    
        this.Offline_class_preference_ = this.Student_.Offline_class_preference_id ;







for (var i = 0; i < this.Qualification_Data.length; i++) {
if (
this.Student_.Qualification_Id ==
this.Qualification_Data[i].Qualification_Id
)
this.Qualification_ = this.Qualification_Data[i];
}

for (var i = 0; i < this.State_Data.length; i++) {
if (this.Student_.State_Id == this.State_Data[i].State_Id)
this.State_ = this.State_Data[i];
}

this.State_District_Temp.State_District_Id = this.Student_.District_Id;
this.State_District_Temp.District_Name = this.Student_.District_Name;
this.District_ = Object.assign(this.State_District_Temp);

this.Course_Temp.Course_Id = this.Student_.Course_Id;
this.Course_Temp.Course_Name = this.Student_.Course_Name;
this.Course_Student = Object.assign(this.Course_Temp);
this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}
Clr_Student_Course() {
let top = document.getElementById("tab");
if (top !== null) {
top.scrollIntoView();
top = null;
}

this.Student_Course_.Student_Course_Id = 0;
this.Student_Course_.Student_Id = 0;
this.Student_Course_.Entry_Date = new Date();
this.Student_Course_.Entry_Date = this.New_Date(
this.Student_Course_.Entry_Date
);
this.Student_Course_.Course_Name_Details = "";
this.Student_Course_.Agent_Amount = 0;
this.Student_Course_.Total_Fees = 0;
this.Student_Course_.Course_Type_Id = 0;
this.Student_Course_.Course_Type_Name = "";
this.Student_Course_.Start_Date = new Date();
this.Student_Course_.Start_Date = this.New_Date(
this.Student_Course_.Start_Date
);
this.Student_Course_.End_Date = new Date();
this.Student_Course_.End_Date = this.New_Date(
this.Student_Course_.End_Date
);
this.Student_Course_.Join_Date = new Date();
this.Student_Course_.Join_Date = this.New_Date(
this.Student_Course_.Join_Date
);
this.Student_Course_.By_User_Id = 0;
this.Student_Course_.Status = 0;
this.Student_Course_.Installment_Type_Id = 0;
this.Student_Course_.No_Of_Installment = 0;
this.Student_Course_.Duration = 0;
this.Course_ = null;
this.Batch_ = null;
this.Faculty_ = null;
this.Student_Fees_Installment_Master_Data = [];
this.Student_Fees_Installment_Details_Data = [];
this.Student_Course_Subject_Data = [];
this.Student_Course_Id_Edit = 0;
if (
this.Installment_Type_Data != undefined &&
this.Installment_Type_Data != null
)
this.Installment_Type = this.Installment_Type_Data[0];

if (
  this.Laptopdetails_Data != undefined &&
  this.Laptopdetails_Data != null
  )
  this.Laptopdetails_ = this.Laptopdetails_Data[0];
}


Course_Change() {
// this.Student_Course_.Entry_Date = new Date();
// this.Student_Course_.Entry_Date = this.New_Date(
// this.Student_Course_.Entry_Date
// );
this.Student_Course_.Course_Name_Details = "";
this.Student_Course_.Agent_Amount = 0;
this.Student_Course_.Total_Fees = 0;
this.Student_Course_.Course_Type_Id = 0;
this.Student_Course_.Course_Type_Name = "";
this.Student_Course_.Entry_Date = null;
this.Student_Course_.Start_Date = null;
this.Batch_Data_Filter=[];
this.Batch_=null;
this.Batch_Data=[];
// this.Student_Course_.Start_Date = new Date();
// this.Student_Course_.Start_Date = this.New_Date(
// this.Student_Course_.Start_Date
// );
// this.Student_Course_.End_Date = new Date();
// this.Student_Course_.End_Date = this.New_Date(
// this.Student_Course_.End_Date
// );
this.Student_Course_.Join_Date = new Date();
this.Student_Course_.Join_Date = this.New_Date(
this.Student_Course_.Join_Date
);
this.Student_Course_.By_User_Id = 0;
this.Student_Course_.Status = 0;
this.Student_Course_.Installment_Type_Id = 0;
this.Student_Course_.No_Of_Installment = 0;
this.Student_Course_.Duration = 0;
this.Batch_ = null;
this.Faculty_ = null;
this.Student_Fees_Installment_Master_Data = [];
this.Student_Course_Subject_Data = [];
if (
this.Installment_Type_Data != undefined &&
this.Installment_Type_Data != null
)
this.Installment_Type = this.Installment_Type_Data[0];
}
Search_Course_Typeahead(event: any) {
var Value = "";
if (event.target.value == "") Value = "";
else Value = event.target.value;
if (this.Course_Data == undefined || this.Course_Data.length == 0) {
this.issLoading = true;
this.Student_Service_.Search_Course_Typeahead("").subscribe(
(Rows) => {
if (Rows != null) {
this.Course_Data = Rows[0];
this.issLoading = false;

this.Course_Data_Filter = [];

for (var i = 0; i < this.Course_Data.length; i++) {
if (this.Course_Data[i].Course_Name.toLowerCase().includes(Value))
this.Course_Data_Filter.push(this.Course_Data[i]);
}
}
},
(Rows) => {
this.issLoading = false;
}
);
} else {
this.Course_Data_Filter = [];
for (var i = 0; i < this.Course_Data.length; i++) {
if (this.Course_Data[i].Course_Name.toLowerCase().includes(Value))
this.Course_Data_Filter.push(this.Course_Data[i]);
}
}
}
display_Course(Course_: Course) {
if (Course_) {
return Course_.Course_Name;
}
}

Search_Batch_Typeahead1(event: any) {
  debugger
var Value = "";
if (event.target.value == "") Value = "";
else Value = event.target.value;
if (this.Batch_Data == undefined || this.Batch_Data.length == 0) {
this.issLoading = true;
debugger
this.Student_Service_.Search_Batch_Typeahead("").subscribe(
(Rows) => {
if (Rows != null) {
this.Batch_Data = Rows[0];
this.issLoading = false;
this.Batch_Data_Filter = [];

for (var i = 0; i < this.Batch_Data.length; i++) {
if (this.Batch_Data[i].Batch_Name.toLowerCase().includes(Value))
this.Batch_Data_Filter.push(this.Batch_Data[i]);
}
}
},
(Rows) => {
this.issLoading = false;
}
);
} else {
this.Batch_Data_Filter = [];
for (var i = 0; i < this.Batch_Data.length; i++) {
if (this.Batch_Data[i].Batch_Name.toLowerCase().includes(Value))
this.Batch_Data_Filter.push(this.Batch_Data[i]);
}
}
}
display_Batch1(Batch_: Batch) {
if (Batch_) {
return Batch_.Batch_Name;
}
}



Search_Batch_Typeahead(event: any) {
  debugger

  if(this.Course_ ==null||this.Course_ ==undefined||this.Course_.Course_Id==null||
    this.Course_.Course_Id==undefined||this.Course_.Course_Id==0)

    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
    panelClass: "Dialogbox-Class",
    data: { Message: "Choose Course", Type: "3" },
    });
    return;
    }
else
  var Value = "";
  if (event.target.value == "") Value = "";
  else Value = event.target.value;
  if (this.Batch_Data == undefined || this.Batch_Data.length == 0) {
  this.issLoading = true;
  this.Student_Service_.Search_Batch_Typeahead_2("",this.Course_.Course_Id).subscribe(
  (Rows) => {
  if (Rows != null) {
  this.Batch_Data = Rows[0];
  this.issLoading = false;
  this.Batch_Data_Filter = [];
  
  for (var i = 0; i < this.Batch_Data.length; i++) {
  if (this.Batch_Data[i].Batch_Name.toLowerCase().includes(Value))
  this.Batch_Data_Filter.push(this.Batch_Data[i]);
  }
  }
  },
  (Rows) => {
  this.issLoading = false;
  }
  );
  } else {
  this.Batch_Data_Filter = [];
  for (var i = 0; i < this.Batch_Data.length; i++) {
  if (this.Batch_Data[i].Batch_Name.toLowerCase().includes(Value))
  this.Batch_Data_Filter.push(this.Batch_Data[i]);
  }
  }
  }
  display_Batch(Batch_: Batch) {
  if (Batch_) {
  return Batch_.Batch_Name;
  }
  }










Get_Course_Student(Course_Id) {
this.Course_Id_Edit = Course_Id;
this.Student_Service_.Get_Course_Student(Course_Id).subscribe(
(Rows) => {
this.Student_Course_Data = Rows[0];
this.Student_Course_.Agent_Amount =
this.Student_Course_Data[0].Agent_Amount;
this.Student_Course_.Total_Fees =
this.Student_Course_Data[0].Total_Fees;
this.Student_Course_.Course_Type_Id =
this.Student_Course_Data[0].Course_Type_Id;
this.Student_Course_.Course_Type_Name =
this.Student_Course_Data[0].Course_Type_Name;
this.Student_Course_.Entry_Date =
this.Student_Course_Data[0].Entry_Date;
// this.Student_Course_.Start_Date =this.Student_Course_Data[0].Start_Date;
// this.Student_Course_.End_Date = this.Student_Course_Data[0].End_Date;
this.Student_Course_.Join_Date = this.Student_Course_Data[0].Join_Date;

if (
this.Student_Course_.Entry_Date == null ||
this.Student_Course_.Entry_Date == undefined
) {
this.Student_Course_.Entry_Date = new Date();
this.Student_Course_.Entry_Date = this.New_Date(
this.Student_Course_.Entry_Date
);
}
// if (
// this.Student_Course_.Start_Date == null ||
// this.Student_Course_.Start_Date == undefined
// ) {
// this.Student_Course_.Start_Date = new Date();
// //this.Student_Course_.Start_Date = this.New_Date(this.Student_Course_.Start_Date);
// }
// if (
// this.Student_Course_.End_Date == null ||
// this.Student_Course_.End_Date == undefined
// ) {
// this.Student_Course_.End_Date = new Date();
// this.Student_Course_.End_Date = this.New_Date(
// this.Student_Course_.End_Date
// );
// }
if (
this.Student_Course_.Join_Date == null ||
this.Student_Course_.Join_Date == undefined
) {
this.Student_Course_.Join_Date = new Date();
this.Student_Course_.Join_Date = this.New_Date(
this.Student_Course_.Join_Date
);
}

this.Student_Course_Subject_Data = Rows[1];
this.date_Temp = this.Student_Course_.Start_Date;
// this.Student_Fees_Installment_Master_Data = Rows[2];
// for (var i = 0; i < this.Student_Fees_Installment_Master_Data.length;i++)
// {
// this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details=[]
// for (var j = 0; j < this.Student_Course_.No_Of_Installment; j++)
// {

//    var A=this.date_Temp.getDate();
//    this.date_Temp.setDate( A + this.Student_Fees_Installment_Master_Data[i].Instalment_Period );
//     this.Student_Fees_Installment_Details_ = new Student_Fees_Installment_Details()
//     this.Student_Fees_Installment_Details_.Fees_Amount=this.Student_Fees_Installment_Master_Data[i].Amount/this.Student_Fees_Installment_Master_Data[i].No_Of_Instalment;
//     this.Student_Fees_Installment_Details_.Fees_Amount = Number(this.Student_Fees_Installment_Details_.Fees_Amount.toFixed(2));
//     this.Student_Fees_Installment_Details_.Tax_Percentage =
//     this.Student_Fees_Installment_Details_.Fees_Amount * this.Student_Fees_Installment_Master_Data[i].Tax/100
//    // this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(this.date_Temp);

//    this.Student_Fees_Installment_Details_.Tax_Percentage = Number(this.Student_Fees_Installment_Details_.Tax_Percentage.toFixed(2));
//    this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(new Date(moment(this.date_Temp).format('YYYY-MM-DD')));

//     // this.Student_Fees_Installment_Details_.Instalment_Date=new Date();
//     // this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(this.date_Temp);
//     this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details.push(Object.assign({}, this.Student_Fees_Installment_Details_));
// }
// }
// for (var j = 0; j < this.Student_Course_.No_Of_Installment; j++)
// {

//    var A=this.date_Temp.getDate();
//    this.date_Temp.setDate( A + this.Student_Course_.Duration );
//     this.Student_Fees_Installment_Details_ = new Student_Fees_Installment_Details()
//     this.Student_Fees_Installment_Details_.Fees_Amount=this.Student_Course_.Agent_Amount/this.Student_Course_.No_Of_Installment;
//     this.Student_Fees_Installment_Details_.Fees_Amount = Number(this.Student_Fees_Installment_Details_.Fees_Amount.toFixed(2));
//     this.Student_Fees_Installment_Details_.Tax_Percentage =
//     this.Student_Fees_Installment_Details_.Fees_Amount
//    // this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(this.date_Temp);

//    this.Student_Fees_Installment_Details_.Tax_Percentage = Number(this.Student_Fees_Installment_Details_.Tax_Percentage.toFixed(2));
//    this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(new Date(moment(this.date_Temp).format('YYYY-MM-DD')));

//     // this.Student_Fees_Installment_Details_.Instalment_Date=new Date();
//     // this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(this.date_Temp);
//     this.Student_Fees_Installment_Master_.Student_Fees_Installment_Details.push(Object.assign({}, this.Student_Fees_Installment_Details_));
// }
this.Student_Course_.Start_Date = this.New_Date(
this.Student_Course_.Start_Date
);
this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}
Get_Student_Course_Click(Student_Course_Id, Course_Id, Installment_Type_Id) {
this.Old_Course_Id = Course_Id;
this.Course_Id_Edit = Course_Id;
this.profile_View = false;
this.Course_View = true;
this.Fees_View = false;
this.Attendance_View=false;
this.Resumesending_View = false;
this.Interview_View = false;
this.Placement_View = false;

this.Course_Details_View = false;
this.Resume_Sending_View = false;
this.Course_Tab = true;
this.clickview = true;
////debugger


////debugger
this.Student_Service_.Get_Student_Course_Click(
this.Student_.Student_Id,
Student_Course_Id,
Installment_Type_Id
).subscribe(
(Rows) => {
this.Student_Course_Data = Rows[0];
if (this.Student_Course_Data.length > 0) {
this.Student_Course_ = this.Student_Course_Data[0];

this.Course_Temp.Course_Id = this.Student_Course_.Course_Id;
this.Course_Temp.Course_Name = this.Student_Course_.Course_Name;
this.course_name = this.Student_Course_.Course_Name;
this.Course_ = Object.assign(this.Course_Temp);

this.Batch_Temp.Batch_Id = this.Student_Course_.Batch_Id;
this.Batch_Temp.Batch_Name = this.Student_Course_.Batch_Name;
this.Batch_ = Object.assign(this.Batch_Temp);

this.Faculty_Temp.Users_Id = this.Student_Course_.Faculty_Id;
this.Faculty_Temp.Users_Name = this.Student_Course_.Faculty_Name;
this.Faculty_ = Object.assign(this.Faculty_Temp);

for (var i = 0; i < this.Installment_Type_Data.length; i++) {
if (
this.Student_Course_.Installment_Type_Id ==
this.Installment_Type_Data[i].Installment_Type_Id
)
this.Installment_Type = this.Installment_Type_Data[i];
}


for (var i = 0; i < this.Laptopdetails_Data.length; i++) {
  if (
  this.Student_Course_.Laptop_details_Id ==
  this.Laptopdetails_Data[i].Laptop_details_Id
  )
  this.Laptopdetails_ = this.Laptopdetails_Data[i];
  }



this.Course_Id_Edit = this.Student_Course_.Course_Id;
this.Student_Course_Id_Edit = this.Student_Course_.Student_Course_Id;
}




this.Student_Course_Subject_Data = Rows[1];
////debugger
this.Student_Fees_Installment_Save_Data = Rows[2];

////debugger
this.Student_Fees_Installment_Details_Data = Rows[2];
var Student_Fees_Installment_Master_Id = 0;
var Student_Fees_Installment_Master_Id_temp = 0;
var Student_Fees_Installment_Master_Index = -1;
this.Student_Fees_Installment_Master_Data = [];
this.Student_Fees_Installment_Details_Data = [];
for (
var i = 0;
i < this.Student_Fees_Installment_Save_Data.length;
i++
) {
Student_Fees_Installment_Master_Id_temp =
this.Student_Fees_Installment_Save_Data[i]
.Student_Fees_Installment_Master_Id;
if (
Student_Fees_Installment_Master_Id !=
Student_Fees_Installment_Master_Id_temp
) {
this.Student_Fees_Installment_Master_ =
new Student_Fees_Installment_Master();
this.Student_Fees_Installment_Master_.Amount =
this.Student_Fees_Installment_Save_Data[i].Amount;
this.Student_Fees_Installment_Master_.Tax =
this.Student_Fees_Installment_Save_Data[i].Tax;
this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id =
this.Student_Fees_Installment_Save_Data[
i
].Student_Fees_Installment_Master_Id;
this.Student_Fees_Installment_Master_.Course_Fees_Id =
this.Student_Fees_Installment_Save_Data[i].Course_Fees_Id;
this.Student_Fees_Installment_Master_.Fees_Type_Id =
this.Student_Fees_Installment_Save_Data[i].Fees_Type_Id;
this.Student_Fees_Installment_Master_.Fees_Type_Name =
this.Student_Fees_Installment_Save_Data[i].Fees_Type_Name;
this.Student_Fees_Installment_Master_.No_Of_Instalment =
this.Student_Fees_Installment_Save_Data[i].No_Of_Instalment;
this.Student_Fees_Installment_Master_.Instalment_Period =
this.Student_Fees_Installment_Save_Data[i].Instalment_Period;
this.Fees_Master_Id =
this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id;
this.Student_Fees_Installment_Master_Data.push(
Object.assign({}, this.Student_Fees_Installment_Master_)
);
Student_Fees_Installment_Master_Index =
Student_Fees_Installment_Master_Index + 1;
this.Student_Fees_Installment_Master_Data[
Student_Fees_Installment_Master_Index
].Student_Fees_Installment_Details =
this.Student_Fees_Installment_Details_Data;

this.Student_Fees_Installment_Details_Data = [];
this.Student_Fees_Installment_Details_Temp =
new Student_Fees_Installment_Details();
this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id =
this.Student_Fees_Installment_Save_Data[
i
].Student_Fees_Installment_Details_Id;
this.Student_Fees_Installment_Details_Temp.Instalment_Date =
this.Student_Fees_Installment_Save_Data[i].Instalment_Date;
this.Student_Fees_Installment_Details_Temp.Fees_Amount =
this.Student_Fees_Installment_Save_Data[i].Fees_Amount;
this.Student_Fees_Installment_Details_Temp.Balance_Amount =
this.Student_Fees_Installment_Save_Data[i].Balance_Amount;
this.Student_Fees_Installment_Details_Temp.Status =
this.Student_Fees_Installment_Save_Data[i].Status;
this.Student_Fees_Installment_Details_Temp.Tax_Percentage = 18;
// this.Student_Fees_Installment_Save_Data[i].Tax_Percentage

this.Student_Fees_Installment_Details_Data.push(
Object.assign({}, this.Student_Fees_Installment_Details_Temp)
);
this.Student_Fees_Installment_Master_Data[
Student_Fees_Installment_Master_Index
].Student_Fees_Installment_Details =
this.Student_Fees_Installment_Details_Data;
} else {
this.Student_Fees_Installment_Details_Temp =
new Student_Fees_Installment_Details();
this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id =
this.Student_Fees_Installment_Save_Data[
i
].Student_Fees_Installment_Details_Id;
this.Student_Fees_Installment_Details_Temp.Instalment_Date =
this.Student_Fees_Installment_Save_Data[i].Instalment_Date;
this.Student_Fees_Installment_Details_Temp.Fees_Amount =
this.Student_Fees_Installment_Save_Data[i].Fees_Amount;
this.Student_Fees_Installment_Details_Temp.Balance_Amount =
this.Student_Fees_Installment_Save_Data[i].Balance_Amount;

this.Student_Fees_Installment_Details_Temp.Status =
this.Student_Fees_Installment_Save_Data[i].Status;
this.Student_Fees_Installment_Details_Temp.Tax_Percentage = 18;
// this.Student_Fees_Installment_Save_Data[i].Tax_Percentage
this.Student_Fees_Installment_Details_Data.push(
Object.assign({}, this.Student_Fees_Installment_Details_Temp)
);
this.Student_Fees_Installment_Master_Data[
Student_Fees_Installment_Master_Index
].Student_Fees_Installment_Details =
this.Student_Fees_Installment_Details_Data;
}
Student_Fees_Installment_Master_Id =
this.Student_Fees_Installment_Save_Data[i]
.Student_Fees_Installment_Master_Id;
}
this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}
Get_Student_Course(Student_Id) {
this.profile_View = false;

this.Student_Service_.Get_Student_Course(Student_Id).subscribe(
(Rows) => {
////debugger
this.Student_Course_Data = Rows[0];

if (this.Student_Course_Data.length > 0) {
this.Student_Course_ = this.Student_Course_Data[0];

this.Course_Temp.Course_Id = this.Student_Course_.Course_Id;
this.Course_Temp.Course_Name = this.Student_Course_.Course_Name;
this.course_name = this.Student_Course_.Course_Name;
this.Course_ = Object.assign(this.Course_Temp);

this.Batch_Temp.Batch_Id = this.Student_Course_.Batch_Id;
this.Batch_Temp.Batch_Name = this.Student_Course_.Batch_Name;
this.Batch_ = Object.assign(this.Batch_Temp);

this.Faculty_Temp.Users_Id = this.Student_Course_.Faculty_Id;
this.Faculty_Temp.Users_Name = this.Student_Course_.Faculty_Name;
this.Faculty_ = Object.assign(this.Faculty_Temp);

for (var i = 0; i < this.Installment_Type_Data.length; i++) {
if (
this.Student_Course_.Installment_Type_Id ==
this.Installment_Type_Data[i].Installment_Type_Id
)
this.Installment_Type = this.Installment_Type_Data[i];
}

this.Course_Id_Edit = this.Student_Course_.Course_Id;
this.Student_Course_Id_Edit = this.Student_Course_.Student_Course_Id;

this.Student_Course_Subject_Data = Rows[1];
this.Student_Fees_Installment_Save_Data = Rows[2];
var Student_Fees_Installment_Master_Id = 0;
var Student_Fees_Installment_Master_Id_temp = 0;
var Student_Fees_Installment_Master_Index = -1;
this.Student_Fees_Installment_Master_Data = [];
this.Student_Fees_Installment_Details_Data = [];

// for(var i=0;i<this.Student_Fees_Installment_Save_Data.length;i++)
// {
//     Student_Fees_Installment_Master_Id_temp= this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Master_Id
//     if(Student_Fees_Installment_Master_Id!=Student_Fees_Installment_Master_Id_temp)
//     {
//         this.Student_Fees_Installment_Master_=new Student_Fees_Installment_Master()
//         this.Student_Fees_Installment_Master_.Amount=this.Student_Fees_Installment_Save_Data[i].Amount
//         this.Student_Fees_Installment_Master_.Tax=this.Student_Fees_Installment_Save_Data[i].Tax
//         this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id=this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Master_Id
//         this.Student_Fees_Installment_Master_.Course_Fees_Id=this.Student_Fees_Installment_Save_Data[i].Course_Fees_Id
//         this.Student_Fees_Installment_Master_.Fees_Type_Id=this.Student_Fees_Installment_Save_Data[i].Fees_Type_Id
//         this.Student_Fees_Installment_Master_.Fees_Type_Name=this.Student_Fees_Installment_Save_Data[i].Fees_Type_Name
//         this.Student_Fees_Installment_Master_.No_Of_Instalment=this.Student_Fees_Installment_Save_Data[i].No_Of_Instalment
//         this.Student_Fees_Installment_Master_.Instalment_Period=this.Student_Fees_Installment_Save_Data[i].Instalment_Period
//        this.Fees_Master_Id=this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id
//         this.Student_Fees_Installment_Master_Data.push(Object.assign({},this.Student_Fees_Installment_Master_))
//         Student_Fees_Installment_Master_Index=Student_Fees_Installment_Master_Index+1;
//         this.Student_Fees_Installment_Master_Data[Student_Fees_Installment_Master_Index].Student_Fees_Installment_Details=this.Student_Fees_Installment_Details_Data;

//         this.Student_Fees_Installment_Details_Data=[];
//         this.Student_Fees_Installment_Details_Temp=new Student_Fees_Installment_Details();
//         this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id=this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Details_Id
//         this.Student_Fees_Installment_Details_Temp.Instalment_Date=this.Student_Fees_Installment_Save_Data[i].Instalment_Date
//         this.Student_Fees_Installment_Details_Temp.Fees_Amount=this.Student_Fees_Installment_Save_Data[i].Fees_Amount
//         this.Student_Fees_Installment_Details_Temp.Balance_Amount=this.Student_Fees_Installment_Save_Data[i].Balance_Amount
//         this.Student_Fees_Installment_Details_Temp.Status=this.Student_Fees_Installment_Save_Data[i].Status
//         this.Student_Fees_Installment_Details_Temp.Tax_Percentage=18;

//          this.Student_Fees_Installment_Details_Data.push(Object.assign({},this.Student_Fees_Installment_Details_Temp))
//         this.Student_Fees_Installment_Master_Data[Student_Fees_Installment_Master_Index].Student_Fees_Installment_Details=this.Student_Fees_Installment_Details_Data;
//     }
//     else
//     {

//         this.Student_Fees_Installment_Details_Temp=new Student_Fees_Installment_Details();
//         this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id=this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Details_Id
//         this.Student_Fees_Installment_Details_Temp.Instalment_Date=this.Student_Fees_Installment_Save_Data[i].Instalment_Date
//         this.Student_Fees_Installment_Details_Temp.Fees_Amount=this.Student_Fees_Installment_Save_Data[i].Fees_Amount
//         this.Student_Fees_Installment_Details_Temp.Balance_Amount=this.Student_Fees_Installment_Save_Data[i].Balance_Amount

//         this.Student_Fees_Installment_Details_Temp.Status=this.Student_Fees_Installment_Save_Data[i].Status
//         this.Student_Fees_Installment_Details_Temp.Tax_Percentage=18;

//         this.Student_Fees_Installment_Details_Data.push(Object.assign({},this.Student_Fees_Installment_Details_Temp))
//         this.Student_Fees_Installment_Master_Data[Student_Fees_Installment_Master_Index].Student_Fees_Installment_Details=this.Student_Fees_Installment_Details_Data;
//     }
//     Student_Fees_Installment_Master_Id= this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Master_Id
// }
}
this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}
Instalment_Change() {
debugger;
this.Student_Course_.No_Of_Installment =
this.Installment_Type.No_Of_Installment;
this.Student_Course_.Duration = this.Installment_Type.Duration;
//this.date_Temp=this.New_Date(new Date(moment(this.Student_Course_.Start_Date).format('YYYY-MM-DD'))) ;
this.Student_Fees_Installment_Master_Data = [];
this.Student_Fees_Installment_Master_Temp =
new Student_Fees_Installment_Master();
this.Student_Fees_Installment_Master_Temp.Course_Fees_Id = 1;
this.Student_Fees_Installment_Master_Temp.Fees_Type_Id = 1;
this.Student_Fees_Installment_Master_Temp.Student_Fees_Installment_Details =
[];
this.Student_Fees_Installment_Master_Data.push(
Object.assign({}, this.Student_Fees_Installment_Master_Temp)
);
this.date_Temp = this.Student_Course_.Start_Date;
this.Get_Installment_Details();
// this.Load_Instalmentfn();
}

Get_Installment_Details() {
debugger
var student_course_id =this.Student_Course_.Student_Course_Id 

if (student_course_id==null || student_course_id==undefined)

{
  student_course_id=0
}


this.Student_Service_.Get_Installment_Details(
this.Installment_Type.Installment_Type_Id,
this.Course_Id_Edit,
student_course_id,this.Student_Id
).subscribe(
(Rows) => {
  debugger
if (Rows != null) {
this.Student_Fees_Installment_Details_Data = Rows[0];
this.date_Temp = new Date(
moment(this.Student_Course_.Start_Date).format("YYYY-MM-DD")
);

for (
var j = 0;
j < this.Student_Fees_Installment_Details_Data.length;
j++
) {
this.date_Temp = this.Add_Date(
new Date(
moment(this.Student_Course_.Start_Date).format("YYYY-MM-DD")
),
Number(
this.Student_Fees_Installment_Details_Data[j].Instalment_Period
)
);
this.Student_Fees_Installment_Details_Data[j].Instalment_Date =
this.date_Temp;
}
this.issLoading = false;
}
},
(Rows) => {
this.issLoading = false;
}
);
}

Feesinstallment_change() {}

Save_Student_Course() {

document.getElementById('Save_Button').hidden=true;


if (this.Course_ == undefined || this.Course_ == null) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select Course", Type: "3" },
});
return;
}
if (
this.Course_.Course_Id == null ||
this.Course_.Course_Id == undefined ||
this.Course_.Course_Id == 0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select Course", Type: "3" },
});
return;
}
if (this.Batch_ == undefined || this.Batch_ == null) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select Batch", Type: "3" },
});
return;
}


if (
  this.Laptopdetails_.Laptop_details_Id == null ||
  this.Laptopdetails_.Laptop_details_Id == undefined ||
  this.Laptopdetails_.Laptop_details_Id == 0
  ) {
  const dialogRef = this.dialogBox.open(DialogBox_Component, {
  panelClass: "Dialogbox-Class",
  data: { Message: "Select Lapdetails", Type: "3" },
  });
  return;
  }




if (
this.Batch_.Batch_Id == null ||
this.Batch_.Batch_Id == undefined ||
this.Batch_.Batch_Id == 0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select Batch", Type: "3" },
});
return;
}
if (this.Faculty_ == undefined || this.Faculty_ == null) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select Faculty", Type: "3" },
});
return;
}
if (
this.Faculty_.Users_Id == null ||
this.Faculty_.Users_Id == undefined ||
this.Faculty_.Users_Id == 0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select Faculty", Type: "3" },
});
return;
}
if (this.Installment_Type == undefined || this.Installment_Type == null) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select Installment Type", Type: "3" },
});
return;
}
if (
this.Installment_Type.Installment_Type_Id == null ||
this.Installment_Type.Installment_Type_Id == undefined ||
this.Installment_Type.Installment_Type_Id == 0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select Installment Type", Type: "3" },
});
return;
}
if (
this.Student_Course_.No_Of_Installment == null ||
this.Student_Course_.No_Of_Installment == undefined ||
this.Student_Course_.No_Of_Installment == 0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Enter No Of Installment", Type: "3" },
});
return;
}

var temp_Student_Fees_Installment_Master_Id = 0;
//  if(this.Student_Fees_Installment_Save_Data==undefined)
this.Student_Fees_Installment_Save_Data = [];

for (
var i = 0;
i < Number(this.Student_Fees_Installment_Master_Data.length);
i++
) {
this.Student_Fees_Installment_Save_Temp =
new Student_Fees_Installment_Save();

this.Student_Fees_Installment_Save_Temp.Student_Fees_Installment_Master_Id =
i;
this.Student_Fees_Installment_Save_Temp.Amount =
this.Student_Fees_Installment_Master_Data[i].Amount;
this.Student_Fees_Installment_Save_Temp.Tax =
this.Student_Fees_Installment_Master_Data[i].Tax;
this.Student_Fees_Installment_Save_Temp.Course_Fees_Id =
this.Student_Fees_Installment_Master_Data[i].Course_Fees_Id;
this.Student_Fees_Installment_Save_Temp.Fees_Type_Id =
this.Student_Fees_Installment_Master_Data[i].Fees_Type_Id;
this.Student_Fees_Installment_Save_Temp.Fees_Type_Name =
this.Student_Fees_Installment_Master_Data[i].Fees_Type_Name;
this.Student_Fees_Installment_Save_Temp.No_Of_Instalment =
this.Student_Fees_Installment_Master_Data[i].No_Of_Instalment;
this.Student_Fees_Installment_Save_Temp.Instalment_Period =
this.Student_Fees_Installment_Master_Data[i].Instalment_Period;

this.Student_Course_.Laptop_details_Id=this.Laptopdetails_.Laptop_details_Id;
this.Student_Course_.Laptop_details_Name=this.Laptopdetails_.Laptop_details_Name;
//   this.Student_Fees_Installment_Save_Temp.Delivery_Date=this.New_Date(new Date(moment(this.Student_Fees_Installment_Master_Data[i].Delivery_Date).format('YYYY-MM-DD')));
this.Student_Fees_Installment_Save_Data.push(
Object.assign({}, this.Student_Fees_Installment_Save_Temp)
);
for (var j = 0;j <Number(this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details.length);j++)
{
this.Student_Fees_Installment_Save_Temp.Student_Fees_Installment_Master_Id =i;
this.Student_Fees_Installment_Save_Temp.Instalment_Date = this.New_Date(
new Date(
moment(
this.Student_Fees_Installment_Master_Data[i]
.Student_Fees_Installment_Details[j].Instalment_Date
).format("YYYY-MM-DD")
)
);
this.Student_Fees_Installment_Save_Temp.Fees_Amount =
this.Student_Fees_Installment_Master_Data[
i
].Student_Fees_Installment_Details[j].Fees_Amount;
this.Student_Fees_Installment_Save_Temp.Tax_Percentage = 18;
//    this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details[j].Tax_Percentage
this.Student_Fees_Installment_Save_Data.push(
Object.assign({}, this.Student_Fees_Installment_Save_Temp)
);
}
}

if (this.Student_Fees_Installment_Save_Data.length == 0) {
this.Student_Fees_Installment_Save_Temp =
new Student_Fees_Installment_Save();
this.Student_Fees_Installment_Save_Temp.Student_Fees_Installment_Master_Id =
-1;
this.Student_Fees_Installment_Save_Data.push(
Object.assign({}, this.Student_Fees_Installment_Save_Temp)
);
}

for (var i = 0; i < this.Student_Fees_Installment_Details_Data.length; i++)
this.Student_Fees_Installment_Details_Data[i].Instalment_Date =
this.New_Date(
new Date(
moment(
this.Student_Fees_Installment_Details_Data[i].Instalment_Date
).format("YYYY-MM-DD")
)
);
////debugger
this.Student_Course_.Student_Fees_Installment_Details =
this.Student_Fees_Installment_Details_Data;


if (this.Student_Fees_Installment_Details_Data.length == 0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Please Add Course fees for this course", Type: "3" },
});
return;
}
//debugger
// this.Student_Course_.Student_Id = this.Student_Id;
this.Student_Course_.Student_Id = this.Student_.Student_Id;
//this.Student_Course_.Old_Course_Id = this.Course_.Course_Id;
this.Student_Course_.Course_Id = this.Course_.Course_Id;
this.Student_Course_.Course_Name = this.Course_.Course_Name;
this.Student_Course_.Batch_Id = this.Batch_.Batch_Id;
this.Student_Course_.Batch_Name = this.Batch_.Batch_Name;
this.Student_Course_.Faculty_Id = this.Faculty_.Users_Id;
this.Student_Course_.Faculty_Name = this.Faculty_.Users_Name;
this.Student_Course_.Installment_Type_Id =
this.Installment_Type.Installment_Type_Id;
this.Student_Course_.By_User_Id = Number(this.Login_User);
this.Student_Course_.Student_Course_Subject =
this.Student_Course_Subject_Data;
// this.Student_Course_.Student_Fees_Installment_Master = this.Student_Fees_Installment_Master_Data;

if (this.Save_Call_Status == true) return;
else this.Save_Call_Status = true;

this.issLoading = true;
this.Student_Course_.Entry_Date = this.New_Date(
new Date(moment(this.Student_Course_.Entry_Date).format("YYYY-MM-DD"))
);
this.Student_Course_.Start_Date = this.New_Date(
new Date(moment(this.Student_Course_.Start_Date).format("YYYY-MM-DD"))
);
this.Student_Course_.Join_Date = this.New_Date(
new Date(moment(this.Student_Course_.Join_Date).format("YYYY-MM-DD"))
);
this.Student_Course_.End_Date = this.New_Date(
new Date(moment(this.Student_Course_.End_Date).format("YYYY-MM-DD"))
);
debugger
this.Student_Service_.Save_Student_Course(this.Student_Course_).subscribe(
(Save_status) => {
debugger
if (Number(Save_status[0].Student_Course_Id_) > 0) {
this.Save_Call_Status = false;
this.to_staff_mobile_no_=Save_status[0].to_userid_phone_;
if (this.Student_Course_Id_Edit == 0) {
  //debugger
if (this.Student_Course_.Course_Id ==2){this.Save_Dm_Course_Whatsapp()};
if (this.Student_Course_.Course_Id ==1){this.Save_Python_Course_Whatsapp()};
if (this.Student_Course_.Course_Id ==3){this.Save_Test_Course_Whatsapp()}; 
// if(this.Flag_Course==1 && this.Student_.Course_Id==0)

// {
//     Hi, {#var#}. Thank you for joining for Python {#var#} at One
// Team! We are really happy and excited to have you on board. Feel free to contact us on {#var#} for any support.

// var Sms='Hi, '+Save_status[0].Student_Name_+'.'+' Thank you for joining for '+Save_status[0].Course_Name_+
// ' at One Team! We are really happy and excited to have you on board. Feel free to contact us on '+this.User_Mobile+' for any support.';
// Hi, msg test. Thank you for joining for Software Testing at One Team! We are really happy and excited to have you on board. Feel free to contact us on 9567434151 for any support.

// var Sms1='Hi, '+Save_status[0].Student_Name_+'.'+' Thank you for joining for '+Save_status[0].Course_Name_+' at One Team! We are really happy and excited to have you on board. Feel free to contact us on '+this.User_Mobile+' for any support.';
// var course = Save_status[0].Course_Name_;

var Sms =
"Hi, " +
Save_status[0].Student_Name_ +
"." +
" Thank you for joining for " +
Save_status[0].Course_Name_ +
" at One Team! We are really happy and excited to have you on board. Feel free to contact us on " +
this.User_Mobile +
" for any support.";
//console.log(Sms);
// this.Student_Service_.Send_Sms(Save_status[0].Phone_,Sms).subscribe(Rows => {
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Sms,Type:"false"}});
//
//     this.issLoading=false;
//     },
//     Rows =>
//     {
//         this.issLoading=false;
//         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//         this.Save_Call_Status = false;
//     });
////debugger;
this.Student_Service_.Send_course_Email(
Save_status[0].Phone_,
Save_status[0].Email_,
Sms,
Save_status[0].Student_Name_,
Save_status[0].Course_Name_
).subscribe(
(Rows) => {


////debugger;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: Sms, Type: "false" },
});

this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
this.Save_Call_Status = false;
}
);

this.issLoading = false;
}
// this.Close_Click();
//this.Get_Student_Course(this.Student_Id);
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Saved", Type: "false" },
});

document.getElementById('Save_Button').hidden=false;
// this.after_course_save();
this.course_click();

// else this.coursedetails_Edit=false;
this.Save_Call_Status = false;
} else {
this.Save_Call_Status = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}

this.issLoading = false;
},
(Rows) => {
this.Save_Call_Status = false;
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: Rows.error.error, Type: "2" },
});
}
);
}

// after_course_save()
// {
// ////debugger
// for (var i = 0; i < this.Student_Fees_Installment_Details_Data.length; i++)
// {
// if(this.Student_Fees_Installment_Details_Data[i].Balance_Amount >0 )
// this.Student_Fees_Installment_Details_Data[i].Status =0
// }


// }

Fees_Tab_Click(Fees_Type_Id, Fees_Installment: any, index) {

////debugger
let top = document.getElementById("Topdiv");
if (top !== null) {
top.scrollIntoView();
top = null;
}

this.profile_View = false;
this.Course_View = false;
this.Mark_View = false;
this.Fees_View = true;
this.Attendance_View=false;
this.Receipt_View = true;
debugger
this.Receipt_Voucher_.Fees_Type_Id = Fees_Type_Id;
this.Receipt_Voucher_.Student_Fees_Installment_Details_Id =
Fees_Installment.Student_Fees_Installment_Details_Id;
this.Receipt_Voucher_.Amount = Fees_Installment.Balance_Amount;
this.Receipt_Voucher_.Date = new Date();
this.Receipt_Voucher_.Date = this.New_Date(this.Receipt_Voucher_.Date);
this.Receipt_Voucher_.Tax_Percentage = 18;
this.Installment_Index = index;
this.Get_Receipt_History();
//  this.Clr_Receipt_Voucher();
}
Search_Subject_Course_Typeahead(event: any) {
var Value = "";
if (event.target.value == "") Value = undefined;
else Value = event.target.value;
if (
this.Course_Subject_Data == undefined ||
this.Course_Subject_Data.length == 0
) {
this.issLoading = true;
this.Student_Service_.Search_Subject_Course_Typeahead(
"",
this.Course_Id_Edit
).subscribe(
(Rows) => {
if (Rows != null) {
this.Course_Subject_Data = Rows[0];
this.issLoading = false;
}
},
(Rows) => {
this.issLoading = false;
}
);
}
}
display_Subject(Course_Subject: Course_Subject) {
if (Course_Subject) {
return Course_Subject.Subject_Name;
}
}
Course_Subject_Click(Subject) {
// this.Mark_List_ = Subject
this.Mark_List_.Minimum_Mark = Subject.Minimum_Mark;
this.Mark_List_.Maximum_Mark = Subject.Maximum_Mark;
}
Load_Exam_Status() {
this.issLoading = true;
this.Student_Service_.Load_Exam_Status().subscribe(
(Rows) => {
if (Rows != null) {
this.Exam_Status_Data = Rows[0];
this.Exam_Status_Temp.Exam_Status_Id = 0;
this.Exam_Status_Temp.Exam_Status_Name = "All";
this.Exam_Status_Data.unshift(this.Exam_Status_Temp);
this.Exam_Status_ = this.Exam_Status_Data[0];
this.issLoading = false;
}
},
(Rows) => {
this.issLoading = false;
}
);
}

Clr_Mark_List_Master() {
this.Mark_List_Master_.Mark_List_Master_Id = 0;
this.Mark_List_Master_.Student_Id = 0;
this.Mark_List_Master_.Course_Id = 0;
this.Mark_List_Master_.Course_Name = "";
this.Mark_List_Master_.User_Id = 0;
}
Clr_Mark_List() {
this.Mark_List_.Mark_List_Id = 0;
// this.Mark_List_.Subject_Id=0;
// this.Mark_List_.Subject_Name="";
this.Mark_List_.Minimum_Mark = "";
this.Mark_List_.Maximum_Mark = "";
this.Mark_List_.Mark_Obtained = "";
this.Subject_ = null;

if (this.Exam_Status_Data != undefined && this.Exam_Status_Data != null)
this.Exam_Status_ = this.Exam_Status_Data[0];
}
Add_Mark_List() {
if (
this.Subject_ == null ||
this.Subject_ == undefined ||
this.Subject_.Subject_Id == 0 ||
this.Subject_.Subject_Id == null
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select Subject ", Type: "3" },
});
return;
} else if (
this.Mark_List_.Minimum_Mark == undefined ||
this.Mark_List_.Minimum_Mark == null ||
this.Mark_List_.Minimum_Mark == ""
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Enter the Minimum Mark", Type: "3" },
});
return;
} else if (
this.Mark_List_.Maximum_Mark == undefined ||
this.Mark_List_.Maximum_Mark == null ||
this.Mark_List_.Maximum_Mark == ""
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Enter the Maximum Mark", Type: "3" },
});
return;
} else if (
this.Exam_Status_.Exam_Status_Id == undefined ||
this.Exam_Status_.Exam_Status_Id == null ||
this.Exam_Status_.Exam_Status_Id == 0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select Exam Status", Type: "3" },
});
return;
}

if (this.Mark_List_Data == undefined) this.Mark_List_Data = [];
this.Mark_List_.Subject_Id = this.Subject_.Subject_Id;
this.Mark_List_.Subject_Name = this.Subject_.Subject_Name;
this.Mark_List_.Exam_Status_Id = this.Exam_Status_.Exam_Status_Id;
this.Mark_List_.Exam_Status_Name = this.Exam_Status_.Exam_Status_Name;

if (this.Mark_List_Index >= 0) {
this.Mark_List_Data[this.Mark_List_Index] = Object.assign(
{},
this.Mark_List_
); // this.Sales_Details_;
} else {
this.Mark_List_Data.push(Object.assign({}, this.Mark_List_));
}
this.Mark_List_Index = -1;
this.Clr_Mark_List();
}
Edit_Mark_List(Mark_List_e: Mark_List, index) {
this.Mark_List_Index = index;
this.Mark_List_ = Object.assign({}, Mark_List_e);

this.Subject_Temp.Subject_Id = this.Mark_List_.Subject_Id;
this.Subject_Temp.Subject_Name = this.Mark_List_.Subject_Name;
this.Subject_ = Object.assign({}, this.Subject_Temp);

for (var i = 0; i < this.Exam_Status_Data.length; i++) {
if (
this.Exam_Status_Data[i].Exam_Status_Id ==
this.Mark_List_.Exam_Status_Id
) {
this.Exam_Status_ = this.Exam_Status_Data[i];
}
}
}
Delete_Mark_List(Mark_List: Mark_List, index) {
this.Mark_List_Data.splice(index, 1);
this.Clr_Mark_List();
}

Save_Mark_List_Master() {
if (
this.Mark_List_Data.length === undefined ||
this.Mark_List_Data.length == null ||
this.Mark_List_Data.length == 0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Add Atleast One Mark_List ", Type: "3" },
});
return;
}
this.issLoading = true;
this.Mark_List_Master_.User_Id = this.Login_User;
this.Mark_List_Master_.Course_Id = this.Course_Id_Edit;
this.Mark_List_Master_.Course_Name = this.Course_.Course_Name;
this.Mark_List_Master_.Student_Id = this.Student_Id;
this.Mark_List_Master_.Mark_List = this.Mark_List_Data;
this.Student_Service_.Save_Mark_List_Master(
this.Mark_List_Master_
).subscribe(
(Save_status) => {
// Save_status=Save_status[0];
if (Number(Save_status[0].Mark_List_Master_Id_) > 0) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Saved", Type: "false" },
});
// this.Close_Click();
} else {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: Rows.error.error, Type: "2" },
});
}
);
}
Get_Student_Mark_List(Student_Id) {
this.Student_Service_.Get_Student_Mark_List(Student_Id).subscribe(
(Rows) => {
this.Mark_List_Master_Data = Rows[0];
if (this.Mark_List_Master_Data.length > 0) {
this.Mark_List_Master_ = this.Mark_List_Master_Data[0];
}
this.Mark_List_Data = Rows[1];
this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}
Load_Mode() {
this.Student_Service_.Load_Mode().subscribe(
(Rows) => {
this.Mode_Data = Rows[0];
this.Mode_Temp.Mode_Id = 0;
this.Mode_Temp.Mode_Name = "Select";
this.Mode_Data.unshift(this.Mode_Temp);
this.Mode = this.Mode_Data[0];
},
(Rows) => {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}

Load_Laptopdetails() {
  this.Student_Service_.Load_Laptopdetails().subscribe(
  (Rows) => {
  this.Laptopdetails_Data = Rows[0];
  this.Laptopdetails_Temp.Laptop_details_Id = 0;
  this.Laptopdetails_Temp.Laptop_details_Name = "Select";
  this.Laptopdetails_Data.unshift(this.Laptopdetails_Temp);
  this.Laptopdetails_ = this.Laptopdetails_Data[0];
  },
  (Rows) => {
  const dialogRef = this.dialogBox.open(DialogBox_Component, {
  panelClass: "Dialogbox-Class",
  data: { Message: "Error Occured", Type: "2" },
  });
  }
  );
  }




Load_Installment_Type() {
this.Student_Service_.Load_Installment_Type().subscribe(
(Rows) => {
this.Installment_Type_Data = Rows[0];
this.Installment_Type_Temp.Installment_Type_Id = 0;
this.Installment_Type_Temp.Installment_Type_Name = "Select";
this.Installment_Type_Data.unshift(this.Installment_Type_Temp);
this.Installment_Type = this.Installment_Type_Data[0];
},
(Rows) => {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}
Accounts_Typeahead(event: any) {
var Value = "";
if (event.target.value == "") Value = undefined;
else Value = event.target.value;
if (
this.Client_Accounts_Data == undefined ||
this.Client_Accounts_Data.length == 0
) {
this.issLoading = true;
this.Student_Service_.Accounts_Typeahead("4,5,11", Value).subscribe(
(Rows) => {
if (Rows != null) {
this.Client_Accounts_Data = Rows[0];
this.issLoading = false;
}
},
(Rows) => {
this.issLoading = false;
}
);
}
}
display_Accounts(Client_Accounts_: Client_Accounts) {
if (Client_Accounts_) {
return Client_Accounts_.Client_Accounts_Name;
}
}
Clr_Receipt_Voucher() {
this.Receipt_Voucher_.Receipt_Voucher_Id = 0;
this.Receipt_Voucher_.Date = new Date();
this.Receipt_Voucher_.Date = this.New_Date(this.Receipt_Voucher_.Date);
this.Receipt_Voucher_.Voucher_No = null;
this.Receipt_Voucher_.From_Account_Id = 0;
this.Receipt_Voucher_.Amount = null;
this.Receipt_Voucher_.To_Account_Id = 0;
this.Receipt_Voucher_.Payment_Mode = 0;
this.Receipt_Voucher_.User_Id = 0;
this.Receipt_Voucher_.Description = "";
this.Receipt_Voucher_.Address1 = "";
this.Receipt_Voucher_.Tax_Percentage = 0;
this.Client_Accounts_ = null;
if (this.Mode_Data != null && this.Mode_Data != undefined)
this.Mode = this.Mode_Data[0];
if (this.Client_Accounts_Data != null && this.Client_Accounts_Data != undefined)
this.Client_Accounts_ = this.Client_Accounts_Data[0];
this.Receipt_Voucher_.Payment_Status = 0;

this.Receipt_Voucher_.Receipt_Image_File = "";
this.Receipt_Voucher_.Receipt_Image_File_Name = "";
}
Save_Receipt_Voucher() {
// if (this.Client_Accounts_ == undefined || this.Client_Accounts_ == null || this.Client_Accounts_.Client_Accounts_Id == undefined || this.Client_Accounts_.Client_Accounts_Id == 0) {
//     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select To Account', Type: "3" } });
//     }
//     else
if (
this.Receipt_Voucher_.Amount == undefined ||
this.Receipt_Voucher_.Amount == null ||
this.Receipt_Voucher_.Amount == undefined ||
this.Receipt_Voucher_.Amount == 0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Enter the Amount", Type: "3" },
});
} else if (
this.Mode == null ||
this.Mode == undefined ||
this.Mode.Mode_Id == undefined ||
this.Mode.Mode_Id == 0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select Mode", Type: "3" },
});


}

else if (
this.Client_Accounts_ == null ||
this.Client_Accounts_ == undefined ||
this.Client_Accounts_.Client_Accounts_Id == undefined ||
this.Client_Accounts_.Client_Accounts_Id == 0
) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Select Collected to Which Account?", Type: "3" },
});
}

else if (
  this.Receipt_Voucher_.Receipt_Image_File_Name === undefined ||
  this.Receipt_Voucher_.Receipt_Image_File_Name == null ||
  this.Receipt_Voucher_.Receipt_Image_File_Name == ""
  ) {
  const dialogRef = this.dialogBox.open(DialogBox_Component, {
  panelClass: "Dialogbox-Class",
  data: { Message: "Upload Receipt Image ", Type: "3" },
  });
  return;
  }


else {

  debugger
this.Receipt_Voucher_.User_Id = Number(this.Login_User);
this.Receipt_Voucher_.From_Account_Id = this.Student_.Student_Id;
this.Receipt_Voucher_.Course_Id = this.Course_.Course_Id;
this.Receipt_Voucher_.Student_Course_Id = this.Student_Course_Id_Edit;
this.Receipt_Voucher_.Payment_Status = 0;
this.Receipt_Voucher_.Fees_Type_Id = 1;


////debugger

this.Receipt_Voucher_.To_Account_Id = this.Client_Accounts_.Client_Accounts_Id;
this.Receipt_Voucher_.To_Account_Name = this.Client_Accounts_.Client_Accounts_Name;
this.Receipt_Voucher_.Payment_Mode = this.Mode.Mode_Id;
this.Receipt_Voucher_.Tax_Percentage = 18;
this.Receipt_Voucher_.Date = this.New_Date(
new Date(moment(this.Receipt_Voucher_.Date).format("YYYY-MM-DD"))
);
if (this.Save_Call_Status == true) return;
else this.Save_Call_Status = true;
this.issLoading = true;
debugger
this.Student_Service_.Save_Student_Receipt_Voucher(
this.Receipt_Voucher_,this.ReceiptImageFile_Photo1,this.Document_File_Array2
).subscribe(
(Save_status) => {
this.Get_Receipt_History()
var fees_data = [];
//Save_status=Save_status[0];
//fees_data = Save_status[1];
if (Number(Save_status[0][0].Receipt_Voucher_Id_) > 0) {
this.Student_Fees_Installment_Save_Data = Save_status[1];
var Student_Fees_Installment_Master_Id = 0;
var Student_Fees_Installment_Master_Id_temp = 0;
var Student_Fees_Installment_Master_Index = -1;
this.Student_Fees_Installment_Master_Data = [];
this.Student_Fees_Installment_Details_Data = [];

for (
var i = 0;
i < this.Student_Fees_Installment_Save_Data.length;
i++
) {
Student_Fees_Installment_Master_Id_temp =
this.Student_Fees_Installment_Save_Data[i]
.Student_Fees_Installment_Master_Id;
if (
Student_Fees_Installment_Master_Id !=
Student_Fees_Installment_Master_Id_temp
) {
this.Student_Fees_Installment_Master_ =
new Student_Fees_Installment_Master();
this.Student_Fees_Installment_Master_.Amount =
this.Student_Fees_Installment_Save_Data[i].Amount;
this.Student_Fees_Installment_Master_.Tax =
this.Student_Fees_Installment_Save_Data[i].Tax;

////debugger
this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id =
this.Student_Fees_Installment_Save_Data[
i
].Student_Fees_Installment_Master_Id;
this.Student_Fees_Installment_Master_.Course_Fees_Id =
this.Student_Fees_Installment_Save_Data[i].Course_Fees_Id;
this.Student_Fees_Installment_Master_.Fees_Type_Id =
this.Student_Fees_Installment_Save_Data[i].Fees_Type_Id;
this.Student_Fees_Installment_Master_.Fees_Type_Name =
this.Student_Fees_Installment_Save_Data[i].Fees_Type_Name;
this.Student_Fees_Installment_Master_.No_Of_Instalment =
this.Student_Fees_Installment_Save_Data[i].No_Of_Instalment;
this.Student_Fees_Installment_Master_.Instalment_Period =
this.Student_Fees_Installment_Save_Data[i].Instalment_Period;
this.Fees_Master_Id =
this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id;
this.Student_Fees_Installment_Master_Data.push(
Object.assign({}, this.Student_Fees_Installment_Master_)
);
Student_Fees_Installment_Master_Index =
Student_Fees_Installment_Master_Index + 1;
this.Student_Fees_Installment_Master_Data[
Student_Fees_Installment_Master_Index
].Student_Fees_Installment_Details =
this.Student_Fees_Installment_Details_Data;

this.Student_Fees_Installment_Details_Data = [];
this.Student_Fees_Installment_Details_Temp =
new Student_Fees_Installment_Details();
this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id =
this.Student_Fees_Installment_Save_Data[
i
].Student_Fees_Installment_Details_Id;
this.Student_Fees_Installment_Details_Temp.Instalment_Date =
this.Student_Fees_Installment_Save_Data[i].Instalment_Date;
this.Student_Fees_Installment_Details_Temp.Fees_Amount =
this.Student_Fees_Installment_Save_Data[i].Fees_Amount;
this.Student_Fees_Installment_Details_Temp.Balance_Amount =
this.Student_Fees_Installment_Save_Data[i].Balance_Amount;
this.Student_Fees_Installment_Details_Temp.Status =
this.Student_Fees_Installment_Save_Data[i].Status;
this.Student_Fees_Installment_Details_Temp.Tax_Percentage = 18;
// this.Student_Fees_Installment_Save_Data[i].Tax_Percentage

this.Student_Fees_Installment_Details_Data.push(
Object.assign({}, this.Student_Fees_Installment_Details_Temp)
);
this.Student_Fees_Installment_Master_Data[
Student_Fees_Installment_Master_Index
].Student_Fees_Installment_Details =
this.Student_Fees_Installment_Details_Data;
} else {
this.Student_Fees_Installment_Details_Temp =
new Student_Fees_Installment_Details();
this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id =
this.Student_Fees_Installment_Save_Data[
i
].Student_Fees_Installment_Details_Id;
this.Student_Fees_Installment_Details_Temp.Instalment_Date =
this.Student_Fees_Installment_Save_Data[i].Instalment_Date;
this.Student_Fees_Installment_Details_Temp.Fees_Amount =
this.Student_Fees_Installment_Save_Data[i].Fees_Amount;
this.Student_Fees_Installment_Details_Temp.Balance_Amount =
this.Student_Fees_Installment_Save_Data[i].Balance_Amount;

this.Student_Fees_Installment_Details_Temp.Status =
this.Student_Fees_Installment_Save_Data[i].Status;
this.Student_Fees_Installment_Details_Temp.Tax_Percentage = 18;
// this.Student_Fees_Installment_Save_Data[i].Tax_Percentage
this.Student_Fees_Installment_Details_Data.push(
Object.assign({}, this.Student_Fees_Installment_Details_Temp)
);
this.Student_Fees_Installment_Master_Data[
Student_Fees_Installment_Master_Index
].Student_Fees_Installment_Details =
this.Student_Fees_Installment_Details_Data;
}
Student_Fees_Installment_Master_Id =
this.Student_Fees_Installment_Save_Data[i]
.Student_Fees_Installment_Master_Id;
}

this.Save_Call_Status = false;
this.issLoading = false;

const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Saved", Type: "false" },
});

var Sms =
"Hi," +
Save_status[0][0].Student_Name_ +
". We have received a Payment of Rs" +
Save_status[0][0].Amount_ +
". Thank you for making the payment. Your Pending fee is " +
Save_status[0][0].Balance_Amount_ +
". Support-" +
this.User_Mobile +
".ONE TEAM SOLUTIONS";

this.issLoading = true;

if (Save_status[3].length == 0) {
var Instalment_Date = "Nill";
var BalanceAmount = "Nill";
} else {
var Instalment_Date = Save_status[3][0].Instalment_Date;
var BalanceAmount = Save_status[3][0].BalanceAmount;
var to_userid_phone = Save_status[3][0].to_userid_phone_;
}
debugger
this.Fees_Payment_Whatsapp(Save_status[0][0].Amount_,BalanceAmount,Instalment_Date,to_userid_phone )
this.Student_Service_.Send_Receipt_Sms_Email(
Save_status[0][0].Phone_,
Save_status[0][0].Email_,
Sms,
Save_status[0][0].Student_Name_,
Save_status[0][0].Amount_,
Save_status[0][0].Date_,
Save_status[2][0].Amount,
Instalment_Date,
BalanceAmount
).subscribe(
(Rows) => {
////debugger
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: Sms, Type: "false" },
});
this.issLoading = false;
},
(Rows) => {
////debugger
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
this.Save_Call_Status = false;
this.Get_Receipt_History()
this.Clr_Receipt_Voucher();

this.Receipt_History_View = false;
this.Receipt_View = false;
//this.Get_Receipt_History();
//  this.Receipt_Voucher_.Voucher_No=Save_status[0].Voucher_No_;
} else {
this.Save_Call_Status = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
this.issLoading = false;
},
(Rows) => {
this.Save_Call_Status = false;
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}
}
Get_Receipt_History() {
if (this.Receipt_History_View == false) {
this.Receipt_History_View = true;
this.issLoading = true;

this.Student_Service_.Get_Student_Receipt_History(
this.Student_.Student_Id,
this.Course_.Course_Id
).subscribe(
(Rows) => {
debugger
this.issLoading = false;
this.Receipt_Voucher_Data = Rows[0];

for (var i = 0; i < this.Receipt_Voucher_Data.length; i++) {
  if (this.Receipt_Voucher_Data[i].Receipt_Image_File!=undefined && this.Receipt_Voucher_Data[i].Receipt_Image_File!=null && this.Receipt_Voucher_Data[i].Receipt_Image_File!="")
  this.Receipt_Voucher_Data[i].Receipt_Image_view = 1
  }

},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: false },
});
}
);
} else this.Receipt_History_View = false;
}



Get_Attendance_Details()
{

  this.issLoading = true;
  debugger
  this.Student_Service_.Get_Attendance_Details(
  this.Student_.Student_Id,
  this.Course_.Course_Id
  ).subscribe(
  (Rows) => {
  debugger
  this.issLoading = false;
  this.Attendance_Data = Rows[0];
  this.Sunday_Data = Rows[1];
  this.No_Of_Sundays =Number(this.Sunday_Data[0].number_of_sundays);

debugger
  // for (var i=0;i<this.Attendance_Data.length;i++)
  // {
    
  //     {
  //         this.Attendance_Data[i].Absent_Days=Number((this.Attendance_Data[i].total_no_of_days)-(this.Attendance_Data[i].No_of_attendance))
  //         this.Attendance_Data[i].total_no_of_days=Number((this.Attendance_Data[i].total_no_of_days)-  this.No_Of_Sundays)
  //     }

      
  // }
  
  },
  (Rows) => {
  this.issLoading = false;
  const dialogRef = this.dialogBox.open(DialogBox_Component, {
  panelClass: "Dialogbox-Class",
  data: { Message: "Error Occured", Type: false },
  });
  }
  );
}




Edit_Receipt_Voucher(Receipt_Voucher_e: Receipt_Voucher, index) {

debugger
this.Receipt_View = true;
this.Receipt_Voucher_ = Receipt_Voucher_e;

this.Receipt_Voucher_ = Object.assign({}, Receipt_Voucher_e);

// this.Client_Accounts_Temp.Client_Accounts_Id =
// Receipt_Voucher_e.To_Account_Id;
// this.Client_Accounts_Temp.Client_Accounts_Name =
// Receipt_Voucher_e.ToAccount_Name;
// this.Client_Accounts_ = this.Client_Accounts_Temp;

for (var i = 0; i < this.Mode_Data.length; i++) {
if (Receipt_Voucher_e.Payment_Mode == this.Mode_Data[i].Mode_Id)
this.Mode = this.Mode_Data[i];
}

for (var i = 0; i < this.Client_Accounts_Data.length; i++) {
if (Receipt_Voucher_e.To_Account_Id == this.Client_Accounts_Data[i].Client_Accounts_Id)
this.Client_Accounts_ = this.Client_Accounts_Data[i];
}

}
Delete_Receipt_Voucher(Receipt_Voucher_Id, index) {
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: {
Message: "Do you want to delete ?",
Type: "true",
Heading: "Confirm",
},
});
dialogRef.afterClosed().subscribe((result) => {
if (result == "Yes") {
// this.issLoading=true;

this.Student_Service_.Delete_Receipt_Voucher(
Receipt_Voucher_Id
).subscribe(
(Delete_status) => {

if (Delete_status[0][0].Receipt_Voucher_Id_ > 0) {
this.Receipt_History_View = false;
this.Get_Student_Course(this.Student_Id);

////debugger
this.Get_Student_Course_Click(this.Student_Course_.Student_Course_Id, this.Student_Course_.Course_Id,this.Student_Course_.Installment_Type_Id)
this.Receipt_Voucher_Data.splice(index, 1);
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Deleted", Type: "false" },
});
} else {
//this.Receipt_Voucher_Data.splice(index, 1);
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Deleted", Type: "false" },
});
}
this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}
});
}

Search_Transaction_Report_Tab() {
var look_In_Date_Value = 0;

if (this.Is_Date == true) look_In_Date_Value = 1;
this.issLoading = true;
this.Student_Service_.Search_Transaction_Report_Tab(
look_In_Date_Value,
moment(this.FromDate_).format("YYYY-MM-DD"),
moment(this.ToDate_).format("YYYY-MM-DD"),
this.Login_User,
this.Student_.Student_Id
).subscribe(
(Rows) => {
this.Transaction_Report_Master_Data = Rows[0];
this.issLoading = false;
if (this.Transaction_Report_Master_Data.length == 0) {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "No Details Found", Type: "3" },
});
}
this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}

Search_Interview_Report_Tab() {
var look_In_Date_Value = 0;

if (this.Is_Date == true) look_In_Date_Value = 1;
this.issLoading = true;
this.Student_Service_.Search_Interview_Report_Tab(
look_In_Date_Value,
moment(this.FromDate_).format("YYYY-MM-DD"),
moment(this.ToDate_).format("YYYY-MM-DD"),
this.Login_User,
this.Student_.Student_Id
).subscribe(
(Rows) => {
this.Interview_Report_Master_Data = Rows[0];
this.issLoading = false;
if (this.Interview_Report_Master_Data.length == 0) {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "No Details Found", Type: "3" },
});
}
this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}

Search_Placed_Report_Tab() {
  //debugger
var look_In_Date_Value = 0;

if (this.Is_Date == true) look_In_Date_Value = 1;
this.issLoading = true;
this.Student_Service_.Search_Placed_Report_Tab(
look_In_Date_Value,
moment(this.FromDate_).format("YYYY-MM-DD"),
moment(this.ToDate_).format("YYYY-MM-DD"),
this.Login_User,
this.Student_.Student_Id
).subscribe(
(Rows) => {
this.Placed_Report_Master_Data = Rows[0];
this.issLoading = false;
if (this.Placed_Report_Master_Data.length == 0) {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "No Details Found", Type: "3" },
});
}
this.issLoading = false;
},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: "2" },
});
}
);
}








Enable_Student_Status(Student_Id_, index) {
  // this.ApplicationDetails_.Student_Id=this.Student_.Student_Id;

  const dialogRef = this.dialogBox.open(DialogBox_Component, {
    panelClass: "Dialogbox-Class",
    data: {
      Message: "Do you want to Enable Notification ?",
      Type: true,
      Heading: "Confirm",
    },
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result == "Yes") {
      this.issLoading = true;

      this.Student_Service_.Enable_Student_Status(
        Student_Id_
      ).subscribe(
        (Save_status) => {
          if (Number(Save_status[0][0].Student_Id_) > 0) {
            this.Enable_Visiblility = false;
            this.Disable_Visiblility = false;

            if (
              this.Enable_Permissions != undefined &&
              this.Enable_Permissions != null
            )
            ////debugger
              if (this.Disable_Permissions.View == true)
                this.Disable_Visiblility = true;

            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Enabled", Type: "false" },
            });
            // this.Total_Rows = this.Total_Rows - this.Student_Data.length;
            // this.Search_Student();

            this.Edit_Student(
              Student_Id_,
              this.Mail_sms_Status,
              this.Status_Id,
              this.Student_EditIndex
              );
          } else {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Error Occured", Type: "2" },
            });
          }
          this.issLoading = false;
        },
        (Rows) => {
          this.issLoading = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Error Occured", Type: "2" },
          });
        }
      );
    }
  });
}



Disable_Student_Status(Student_Id_, index) {


  //    application_details_id_
  const dialogRef = this.dialogBox.open(DialogBox_Component, {
    panelClass: "Dialogbox-Class",
    data: {
      Message: "Do you want to Disable Notification ?",
      Type: true,
      Heading: "Confirm",
    },
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result == "Yes") {
      this.issLoading = true;
      this.Student_Service_.Disable_Student_Status(Student_Id_).subscribe(
        (update_status) => {
          if (update_status[0][0].Student_Id_ > 0) {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Disabled", Type: "false" },
            });
            // this.Total_Rows = this.Total_Rows - this.Student_Data.length;
            this.Edit_Student(
              Student_Id_,
              this.Mail_sms_Status,
              this.Status_Id,
              this.Student_EditIndex
              );
            this.Enable_Visiblility = false;
            this.Disable_Visiblility = false;

            if (
              this.Enable_Permissions != undefined &&
              this.Enable_Permissions != null
            )
              if (this.Disable_Permissions.View == true)
                this.Disable_Visiblility = true;
          } else {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Error Occured", Type: "2" },
            });
          }
          this.issLoading = false;
        },
        (Rows) => {
          this.issLoading = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Error Occured", Type: "2" },
          });
        }
      );
    }
  });
}




Activate_Status(Student_Id_, index) {
  // this.ApplicationDetails_.Student_Id=this.Student_.Student_Id;

  const dialogRef = this.dialogBox.open(DialogBox_Component, {
    panelClass: "Dialogbox-Class",
    data: {
      Message: "Do you want to Activate ?",
      Type: true,
      Heading: "Confirm",
    },
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result == "Yes") {
      this.issLoading = true;

      this.Student_Service_.Activate_Status(
        Student_Id_
      ).subscribe(
        (Save_status) => {
          if (Number(Save_status[0][0].Student_Id_) > 0) {
            this.Activate_Visiblility = false;
            this.Deactivate_Visiblility = false;

            if (
              this.Activate_Permissions != undefined &&
              this.Activate_Permissions != null
            )
              if (this.Deactivate_Permissions.View == true)
                this.Deactivate_Visiblility = true;

            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Activate", Type: "false" },
            });
            // this.Total_Rows = this.Total_Rows - this.Student_Data.length;
            // this.Search_Student();

            this.Edit_Student(
              Student_Id_,
              this.Mail_sms_Status,
              this.Status_Id,
              this.Student_EditIndex
              );
          } else {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Error Occured", Type: "2" },
            });
          }
          this.issLoading = false;
        },
        (Rows) => {
          this.issLoading = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Error Occured", Type: "2" },
          });
        }
      );
    }
  });
}

Deactivate_Status(Student_Id_, index) {


  //    application_details_id_
  const dialogRef = this.dialogBox.open(DialogBox_Component, {
    panelClass: "Dialogbox-Class",
    data: {
      Message: "Do you want to Deactivate ?",
      Type: true,
      Heading: "Confirm",
    },
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result == "Yes") {
      this.issLoading = true;
      this.Student_Service_.Deactivate_Status(Student_Id_).subscribe(
        (update_status) => {
          if (update_status[0][0].Student_Id_ > 0) {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Deactivated", Type: "false" },
            });
            // this.Total_Rows = this.Total_Rows - this.Student_Data.length;
            this.Edit_Student(
              Student_Id_,
              this.Mail_sms_Status,
              this.Status_Id,
              this.Student_EditIndex
              );
            this.Activate_Visiblility = false;
            this.Deactivate_Visiblility = false;

            if (
              this.Activate_Permissions != undefined &&
              this.Activate_Permissions != null
            )
              if (this.Deactivate_Permissions.View == true)
                this.Deactivate_Visiblility = true;
          } else {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Error Occured", Type: "2" },
            });
          }
          this.issLoading = false;
        },
        (Rows) => {
          this.issLoading = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Error Occured", Type: "2" },
          });
        }
      );
    }
  });
}




Moveto_Blacklist_Status(Student_Id_, index) {
  // this.ApplicationDetails_.Student_Id=this.Student_.Student_Id;

  const dialogRef = this.dialogBox.open(DialogBox_Component, {
    panelClass: "Dialogbox-Class",
    data: {
      Message: "Do you want to Move to Blacklist ?",
      Type: true,
      Heading: "Confirm",
    },
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result == "Yes") {
      this.issLoading = true;

      this.Student_Service_.Moveto_Blacklist_Status(
        Student_Id_
      ).subscribe(
        (Save_status) => {
          if (Number(Save_status[0][0].Student_Id_) > 0) {
            this.Movedtoblacklist_Visiblility = false;
            this.Removedfromblacklist_Visiblility = false;

            if (
              this.Movedtoblacklist_Permissions != undefined &&
              this.Movedtoblacklist_Permissions != null
            )
              if (this.Removedfromblacklist_Permissions.View == true)
                this.Removedfromblacklist_Visiblility = true;

            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Moved to blacklist", Type: "false" },
            });
            // this.Total_Rows = this.Total_Rows - this.Student_Data.length;
            // this.Search_Student();

            this.Edit_Student(
              Student_Id_,
              this.Mail_sms_Status,
              this.Status_Id,
              this.Student_EditIndex
              );
          } else {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Error Occured", Type: "2" },
            });
          }
          this.issLoading = false;
        },
        (Rows) => {
          this.issLoading = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Error Occured", Type: "2" },
          });
        }
      );
    }
  });
}



Remove_Blacklist_Status(Student_Id_, index) {


  //    application_details_id_
  const dialogRef = this.dialogBox.open(DialogBox_Component, {
    panelClass: "Dialogbox-Class",
    data: {
      Message: "Do you want to Remove from Blacklist ?",
      Type: true,
      Heading: "Confirm",
    },
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result == "Yes") {
      this.issLoading = true;
      this.Student_Service_.Remove_Blacklist_Status(Student_Id_).subscribe(
        (update_status) => {
          if (update_status[0][0].Student_Id_ > 0) {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Removed from Blacklist", Type: "false" },
            });
            // this.Total_Rows = this.Total_Rows - this.Student_Data.length;
            this.Edit_Student(
              Student_Id_,
              this.Mail_sms_Status,
              this.Status_Id,
              this.Student_EditIndex
              );
            this.Movedtoblacklist_Visiblility = false;
            this.Removedfromblacklist_Visiblility = false;

            if (
              this.Movedtoblacklist_Permissions != undefined &&
              this.Movedtoblacklist_Permissions != null
            )
              if (this.Removedfromblacklist_Permissions.View == true)
                this.Removedfromblacklist_Visiblility = true;
          } else {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Error Occured", Type: "2" },
            });
          }
          this.issLoading = false;
        },
        (Rows) => {
          this.issLoading = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Error Occured", Type: "2" },
          });
        }
      );
    }
  });
}



File_Change_Photo4(event: Event) 
{  
    debugger  
    const file = (event.target as HTMLInputElement).files;
    this.ReceiptImageFile_Photo1 = file;
    this.Receipt_Voucher_.Receipt_Image_File_Name = this.ReceiptImageFile_Photo1[0].name;
    

}

Download_Receipt_Image(Receipt_Voucher_Id,index) {

  this.issLoading = true;
debugger
  this.Student_Service_.Get_Student_Receipt_Image(Receipt_Voucher_Id).subscribe(
  (Rows) => {
      this.Get_Receipt_VoucherData=Rows[0];
  this.issLoading = false;
  var File_Name_Temp2;
  // if(File_Name=='Image_ResumeFilename')
debugger
  for (var i=0;i<this.Get_Receipt_VoucherData.length;i++)
  {
    File_Name_Temp2=this.Get_Receipt_VoucherData[i].Receipt_Image_File;  
  }
  
   var bs= environment.FilePath;

  var s=bs+File_Name_Temp2;
  window.open(s,'_blank');  
  },
  (Rows) => {
  this.issLoading = false;
  const dialogRef = this.dialogBox.open(DialogBox_Component, {
  panelClass: "Dialogbox-Class",
  data: { Message: "Error Occured", Type: "2" },
  });
  }
  );
  }


// Download_Receipt_Image(Receipt_Voucher_Id,index) {

//   this.issLoading = true;
// debugger
//   this.Student_Service_.Get_Student_Receipt_Image(Receipt_Voucher_Id).subscribe(
//   (Rows) => {
//       this.Get_Receipt_VoucherData=Rows[0];
//   this.issLoading = false;

//   const docDefinition: TDocumentDefinitions = {
//     content: [],
//   };

//   var File_Name_Temp2;
//   // if(File_Name=='Image_ResumeFilename')
// debugger
//   for (var i=0;i<this.Get_Receipt_VoucherData.length;i++)
//   {
//     File_Name_Temp2=this.Get_Receipt_VoucherData[i].Receipt_Image_File;  
//   }
  
//    var bs= environment.FilePath;

//   var s=bs+File_Name_Temp2;


//   const img = {
//     image: s,
//     width: 500,
//     height: 400,
//   };

//   docDefinition.content.push(img);

//   if (i < this.Get_Receipt_VoucherData.length - 1) {
//     docDefinition.content.push({ text: '', pageBreak: 'after' });
//   }


// pdfMake.createPdf(docDefinition).download('Receipts.pdf');




//   window.open(s,'_blank');  
//   },
//   (Rows) => {
//   this.issLoading = false;
//   const dialogRef = this.dialogBox.open(DialogBox_Component, {
//   panelClass: "Dialogbox-Class",
//   data: { Message: "Error Occured", Type: "2" },
//   });
//   }
//   );
//   }





File_Change_Photo1(event: Event) 
{  
    ////debugger  
    const file = (event.target as HTMLInputElement).files;
    this.ImageFile_Photo1 = file;
    this.Student_.Id_Proof_FileName = this.ImageFile_Photo1[0].name;
    // this.IsImageFile_Photo1_Changed = 1;

}



Download_Resume_File(File_Name,StudentId) {
  ////debugger
  this.issLoading = true;
  ////debugger
  this.Job_Posting_Service_.Get_Resumefilefor_Report(StudentId).subscribe(
  (Rows) => {
      this.Resumefiledata=Rows[0];
  this.issLoading = false;
  var File_Name_Temp;
  if(File_Name=='Image_ResumeFilename')
  ////debugger
  for (var i=0;i<this.Resumefiledata.length;i++)
  {
      File_Name_Temp=this.Resumefiledata[i].Image_ResumeFilename;  
  }
  
   var bs= environment.FilePath;//'C:/Teena/Edabroad/Back End/Uploads/'
  // var bs= "http://oneteamdemoapi.trackbox.co.in/bina/Uploads/";
  var s=bs+File_Name_Temp;
  window.open(s,'_blank');  
  },
  (Rows) => {
  this.issLoading = false;
  const dialogRef = this.dialogBox.open(DialogBox_Component, {
  panelClass: "Dialogbox-Class",
  data: { Message: "Error Occured", Type: "2" },
  });
  }
  );
  }



  Download_Id_Proof() {

    this.issLoading = true;
 //debugger
    this.Student_Service_.Get_Student(this.Student_Id).subscribe(
    (Rows) => {
        this.Get_Data=Rows[0];
    this.issLoading = false;
    var File_Name_Temp1;
    // if(File_Name=='Image_ResumeFilename')
 //debugger
    for (var i=0;i<this.Get_Data.length;i++)
    {
      File_Name_Temp1=this.Get_Data[i].Id_Proof_File;  
    }
    
     var bs= environment.FilePath;
 
    var s=bs+File_Name_Temp1;
    window.open(s,'_blank');  
    },
    (Rows) => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
    panelClass: "Dialogbox-Class",
    data: { Message: "Error Occured", Type: "2" },
    });
    }
    );
    }
  

    Get_ToStaff_WhatsappMobile(userid)
    {
      debugger
        this.issLoading = true;
        this.Student_Service_.Get_ToStaff_Mobile(userid).subscribe(
        (Rows) => {
          //debugger
          this.Tostaff_Data = Rows[0];
        this.ToStaff_Mobile = this.Tostaff_Data[0].Mobile;
        // if (this.Student_Followup_Data.length > 0) {
        // this.issLoading = false;
        // this.Student_Followup_ = this.Student_Followup_Data[0];
        // }
         this.Save_Student_Whatsapp( this.ToStaff_Mobile);
        this.issLoading = false;
        },
        (Rows) => {
        this.issLoading = false;
        // const dialogRef = this.dialogBox.open(DialogBox_Component, {
        // panelClass: "Dialogbox-Class",
        // data: { Message: "Error Occured", Type: "2" },
        // });
        
        }
        );
        
        
    }




    Get_ToStaff_Mobile(userid)
    {
      //debugger
        this.issLoading = true;
        this.Student_Service_.Get_ToStaff_Mobile(userid).subscribe(
        (Rows) => {
          //debugger
          this.Tostaff_Data = Rows[0];
        this.ToStaff_Mobile = this.Tostaff_Data[0].Mobile;
        // if (this.Student_Followup_Data.length > 0) {
        // this.issLoading = false;
        // this.Student_Followup_ = this.Student_Followup_Data[0];
        // }
        // this.Save_Student_Whatsapp();
        this.issLoading = false;
        },
        (Rows) => {
        this.issLoading = false;
        // const dialogRef = this.dialogBox.open(DialogBox_Component, {
        // panelClass: "Dialogbox-Class",
        // data: { Message: "Error Occured", Type: "2" },
        // });
        
        }
        );
        
        
    }

  
  Register_Whatsapp()
{
	//debugger

this.Register_Whatsapp_.whatsAppBusinessId = "108714478695876";
this.Register_Whatsapp_.phoneNumberId = "103915675851161";
this.Register_Whatsapp_.from = "919562813713";

// var Phone = this.Student_.Phone
this.Register_Whatsapp_.to = this.Student_.Whatsapp;
this.Register_Whatsapp_.type = "waba_templates";
this.Register_Whatsapp_.templateName = "thank_you_message_to_customers";
this.Register_Whatsapp_.templateId = "798731017902760";
this.Register_Whatsapp_.language = "en";
this.Register_Whatsapp_.header = null;
this.Register_Whatsapp_.body = null;
this.Register_Whatsapp_.button = null;
//debugger

this.Student_Service_.Register_Whatsapp(this.Register_Whatsapp_).subscribe(Save_status => {
//debugger

 var msg =Save_status[0];

	  return;

},
);}




Save_Student_Whatsapp(ToStaff_Mobile)

{
debugger
// var user_id =this.followup_user_id_;
// this.Get_ToStaff_Mobile(user_id)
debugger
this.Save_Whatsapp_.whatsAppBusinessId = "108714478695876";
this.Save_Whatsapp_.phoneNumberId = "103915675851161";
this.Save_Whatsapp_.from = "919562813713";
this.Save_Whatsapp_.to = ""+this.Student_.Whatsapp+"";
this.Save_Whatsapp_.student = this.Student_.Student_Name;
// this.Save_Whatsapp_.tostaff =  this.ToStaff_Mobile ;
this.Save_Whatsapp_.tostaff =  this.to_staff_mobile_no_ ;
this.Save_Whatsapp_.type = "template";
this.Save_Whatsapp_.templateName = "api_enquiry_arjun_19thjan2023";
this.Save_Whatsapp_.templateId = "677119067230818";
this.Save_Whatsapp_.language = "en";
this.Save_Whatsapp_.header = null;
this.Save_Whatsapp_.body={
  parameters: [
  {
  "type": "text",
  "text": this.Save_Whatsapp_.student
  },
  {
  "type": "text",
  "text": this.Save_Whatsapp_.tostaff
  }
  ]
  },
  this.Save_Whatsapp_.button=null

this.Student_Service_.Save_Student_Whatsapp(this.Save_Whatsapp_).subscribe(Save_status => {
debugger

 var msg =Save_status[0];

	  return;

},
);}






Save_Python_Course_Whatsapp()

{
//debugger
var user_id =this.followup_user_id_;
this.Get_ToStaff_Mobile(user_id)
this.Python_Whatsapp_.whatsAppBusinessId = "108714478695876";
this.Python_Whatsapp_.phoneNumberId = "103915675851161";
this.Python_Whatsapp_.from = "919562813713";
this.Python_Whatsapp_.to = this.Student_.Whatsapp;
this.Python_Whatsapp_.student = this.Student_.Student_Name;
this.Python_Whatsapp_.tostaff =this.to_staff_mobile_no_;
this.Python_Whatsapp_.trainer_name = this.Student_Course_.Faculty_Name;
this.Python_Whatsapp_.batch_start_date = this.Student_Course_.Start_Date;
this.Python_Whatsapp_.type = "template";
this.Python_Whatsapp_.templateName = "api_trackbox_registration_python_jan2023";
this.Python_Whatsapp_.templateId = "677119067230818";
this.Python_Whatsapp_.language = "en";
this.Python_Whatsapp_.header = null;
this.Python_Whatsapp_.body={
  parameters: [
  {
  "type": "text",
  "text": ""
  },
  {
  "type": "text",
  "text": ""
  },
  {
  "type": "text",
  "text": ""
  },
  {
  "type": "text",
  "text": ""
  }
  ]
  },
  this.Python_Whatsapp_.button=null

this.Student_Service_.Save_Python_Course_Whatsapp(this.Python_Whatsapp_).subscribe(Save_status => {
//debugger

this.Python_Fees_Whatsapp(this.Python_Whatsapp_.student,this.Python_Whatsapp_.tostaff,this.Python_Whatsapp_.to);

 var msg =Save_status[0];

	  return;

},
);}

Save_Dm_Course_Whatsapp()

{
//debugger
var user_id =this.followup_user_id_;
this.Get_ToStaff_Mobile(user_id)
this.Dm_Whatsapp_.whatsAppBusinessId = "108714478695876";
this.Dm_Whatsapp_.phoneNumberId = "103915675851161";
this.Dm_Whatsapp_.from = "919562813713";
this.Dm_Whatsapp_.to = this.Student_.Whatsapp;
this.Dm_Whatsapp_.student = this.Student_.Student_Name;
this.Dm_Whatsapp_.tostaff =this.to_staff_mobile_no_;
this.Dm_Whatsapp_.trainer_name = this.Student_Course_.Faculty_Name;
this.Dm_Whatsapp_.batch_start_date = this.Student_Course_.Start_Date;
this.Dm_Whatsapp_.type = "template";
this.Dm_Whatsapp_.templateName = "api_trackbox_registration_digitalmarketing_jan2023";
this.Dm_Whatsapp_.templateId = "677119067230818";
this.Dm_Whatsapp_.language = "en";
this.Dm_Whatsapp_.header = null;
this.Dm_Whatsapp_.body={
  parameters: [
  {
  "type": "text",
  "text": ""
  },
  {
  "type": "text",
  "text": ""
  },
  {
  "type": "text",
  "text": ""
  },
  {
  "type": "text",
  "text": ""
  }
  ]
  },
  this.Dm_Whatsapp_.button=null

this.Student_Service_.Save_Dm_Course_Whatsapp(this.Dm_Whatsapp_).subscribe(Save_status => {
//debugger
this.Dm_Fees_Whatsapp(this.Dm_Whatsapp_.student,this.Dm_Whatsapp_.tostaff,this.Dm_Whatsapp_.to);
 var msg =Save_status[0];

	  return;

},
);}

Save_Test_Course_Whatsapp()

{
//debugger
var user_id =this.followup_user_id_;
this.Get_ToStaff_Mobile(user_id)
this.Testing_Whatsapp_.whatsAppBusinessId = "108714478695876";
this.Testing_Whatsapp_.phoneNumberId = "103915675851161";
this.Testing_Whatsapp_.from = "919562813713";
this.Testing_Whatsapp_.to = this.Student_.Whatsapp;
this.Testing_Whatsapp_.student = this.Student_.Student_Name;
this.Testing_Whatsapp_.tostaff =this.to_staff_mobile_no_;
this.Testing_Whatsapp_.trainer_name = this.Student_Course_.Faculty_Name;
this.Testing_Whatsapp_.batch_start_date = this.Student_Course_.Start_Date;
this.Testing_Whatsapp_.type = "template";
this.Testing_Whatsapp_.templateName = "api_trackbox_registration_testing_jan_2023";
this.Testing_Whatsapp_.templateId = "677119067230818";
this.Testing_Whatsapp_.language = "en";
this.Testing_Whatsapp_.header = null;
this.Testing_Whatsapp_.body={
  parameters: [
  {
  "type": "text",
  "text": ""
  },
  {
  "type": "text",
  "text": ""
  },
  {
  "type": "text",
  "text": ""
  },
  {
  "type": "text",
  "text": ""
  }
  ]
  },
  this.Testing_Whatsapp_.button=null

this.Student_Service_.Save_Test_Course_Whatsapp(this.Testing_Whatsapp_).subscribe(Save_status => {
//debugger
this.Testing_Fees_Whatsapp(this.Testing_Whatsapp_.student,this.Testing_Whatsapp_.tostaff,this.Testing_Whatsapp_.to);
 var msg =Save_status[0];

	  return;

},
);}



Python_Fees_Whatsapp(student,tostaffno,to)

{
//debugger
// var user_id =this.followup_user_id_;
// this.Get_ToStaff_Mobile(user_id)
this.Python_Whatsapp_.whatsAppBusinessId = "108714478695876";
this.Python_Whatsapp_.phoneNumberId = "103915675851161";
this.Python_Whatsapp_.from = "919562813713";
this.Python_Whatsapp_.to = to;
this.Python_Whatsapp_.student = student;
this.Python_Whatsapp_.tostaff =this.to_staff_mobile_no_;
this.Python_Whatsapp_.trainer_name = this.Student_Course_.Faculty_Name;
this.Python_Whatsapp_.batch_start_date = this.Student_Course_.Start_Date;
this.Python_Whatsapp_.type = "template";
this.Python_Whatsapp_.templateName = "api_trackbox_fee_installment_python_jan2023";
this.Python_Whatsapp_.templateId = "677119067230818";
this.Python_Whatsapp_.language = "en";
this.Python_Whatsapp_.header = null;
this.Python_Whatsapp_.body={
  parameters: [
  {
  "type": "text",
  "text": ""
  },
  {
  "type": "text",
  "text": ""
  }
  ]
  },
  this.Python_Whatsapp_.button=null

this.Student_Service_.Python_Fees_Whatsapp(this.Python_Whatsapp_).subscribe(Save_status => {
//debugger



 var msg =Save_status[0];

	  return;

},
);}




Dm_Fees_Whatsapp(student,tostaffno,to)

{
//debugger
// var user_id =this.followup_user_id_;
// this.Get_ToStaff_Mobile(user_id)
this.Dm_Whatsapp_.whatsAppBusinessId = "108714478695876";
this.Dm_Whatsapp_.phoneNumberId = "103915675851161";
this.Dm_Whatsapp_.from = "919562813713";
this.Dm_Whatsapp_.to = to;
this.Dm_Whatsapp_.student = student;
this.Dm_Whatsapp_.tostaff =this.to_staff_mobile_no_;
this.Dm_Whatsapp_.trainer_name = this.Student_Course_.Faculty_Name;
this.Dm_Whatsapp_.batch_start_date = this.Student_Course_.Start_Date;
this.Dm_Whatsapp_.type = "template";
this.Dm_Whatsapp_.templateName = "api_trackbox_registration_digitalmarketing_jan2023";
this.Dm_Whatsapp_.templateId = "677119067230818";
this.Dm_Whatsapp_.language = "en";
this.Dm_Whatsapp_.header = null;
this.Dm_Whatsapp_.body={
  parameters: [
  {
  "type": "text",
  "text": ""
  },
  {
  "type": "text",
  "text": ""
  }
  ]
  },
  this.Dm_Whatsapp_.button=null

this.Student_Service_.Dm_Fees_Whatsapp(this.Dm_Whatsapp_).subscribe(Save_status => {
//debugger

 var msg =Save_status[0];

	  return;

},
);}

Testing_Fees_Whatsapp(student,tostaffno,to)

{
//debugger
// var user_id =this.followup_user_id_;
// this.Get_ToStaff_Mobile(user_id)
this.Testing_Whatsapp_.whatsAppBusinessId = "108714478695876";
this.Testing_Whatsapp_.phoneNumberId = "103915675851161";
this.Testing_Whatsapp_.from = "919562813713";
this.Testing_Whatsapp_.to = to;
this.Testing_Whatsapp_.student = student;
this.Testing_Whatsapp_.tostaff =this.to_staff_mobile_no_;
this.Testing_Whatsapp_.trainer_name = this.Student_Course_.Faculty_Name;
this.Testing_Whatsapp_.batch_start_date = this.Student_Course_.Start_Date;
this.Testing_Whatsapp_.type = "template";
this.Testing_Whatsapp_.templateName = "api_trackbox_registration_testing_jan_2023";
this.Testing_Whatsapp_.templateId = "677119067230818";
this.Testing_Whatsapp_.language = "en";
this.Testing_Whatsapp_.header = null;
this.Testing_Whatsapp_.body={
  parameters: [
  {
  "type": "text",
  "text": ""
  },
  {
  "type": "text",
  "text": ""
  }
  ]
  },
  this.Testing_Whatsapp_.button=null

this.Student_Service_.Testing_Fees_Whatsapp(this.Testing_Whatsapp_).subscribe(Save_status => {
//debugger

 var msg =Save_status[0];

	  return;

},
);}



Fees_Payment_Whatsapp(amount,balance_amnt,due_date,to_userid_phone)

{
debugger
var user_id =this.followup_user_id_;
this.Get_ToStaff_Mobile(user_id)
this.Fees_Whatsapp_.whatsAppBusinessId = "108714478695876";
this.Fees_Whatsapp_.phoneNumberId = "103915675851161";
this.Fees_Whatsapp_.from = "919562813713";
this.Fees_Whatsapp_.to = this.Student_.Whatsapp;
this.Fees_Whatsapp_.student = this.Student_.Student_Name;
this.Fees_Whatsapp_.tostaff =to_userid_phone;
this.Fees_Whatsapp_.trainer_name = this.Student_Course_.Faculty_Name;
this.Fees_Whatsapp_.next_payment_date = due_date;
this.Fees_Whatsapp_.payment_amount = amount;
this.Fees_Whatsapp_.pending_amount = balance_amnt;
this.Fees_Whatsapp_.type = "template";
this.Fees_Whatsapp_.templateName = "api_trackbox_fee_jan2023";
this.Fees_Whatsapp_.templateId = "677119067230818";
this.Fees_Whatsapp_.language = "en";
this.Fees_Whatsapp_.header = null;
this.Fees_Whatsapp_.body={
  parameters: [
  {
  "type": "text",
  "text": ""
  },
  {
  "type": "text",
  "text": ""
  },
  {
  "type": "text",
  "text": ""
  },
  {
  "type": "text",
  "text": ""
  },
  {
  "type": "text",
  "text": ""
  }
  ]
  },
  this.Fees_Whatsapp_.button=null

this.Student_Service_.Fees_Payment_Whatsapp(this.Fees_Whatsapp_).subscribe(Save_status => {
//debugger

// this.Python_Fees_Whatsapp(this.Python_Whatsapp_.student,this.Python_Whatsapp_.tostaff,this.Python_Whatsapp_.to);

 var msg =Save_status[0];

	  return;

},
);}




// Send_Resume_Upload_Notification() {
//   //debugger
//   var student_name_ ="xxxx"
//   this.issLoading = true;
// //debugger
//   this.Student_Service_.Send_Resume_Upload_Notification(
//     student_name_
//   ).subscribe(
//     (Status) => {
//       //debugger
//       var mail_Data = Status;
//       this.issLoading = false;
//       // this.clr_mail_details();
//       if (mail_Data == null) {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, {
//           panelClass: "Dialogbox-Class",
//           data: { Message: "mail Sent", Type: "false" },
//         });
       
//         this.issLoading = false;
       
        
//       }
//     },
//     (Rows) => {
//       this.issLoading = false;
//       const dialogRef = this.dialogBox.open(DialogBox_Component, {
//         panelClass: "Dialogbox-Class",
//         data: { Message: "Error Occured", Type: "2" },
//       });
//     }
//   );
// }


Applied_Reject_Detaild_Report(Student_Id_Temp)
{
    debugger
    var  company_ = "",look_In_Date_Value=0;var  Company_id_ =0,Job_id_=0;
   this.Total_Entries =0;
    if (this.Is_Date == true)
        look_In_Date_Value = 1;

        

       
    this.issLoading = true;
    debugger
    this.Job_Posting_Service_.Applied_Reject_Detaild_Report(Student_Id_Temp).subscribe(Rows =>{
        debugger
        this.Search_Applied_Reject_Detaild_Data=Rows[0];

        if(this.Search_Applied_Reject_Detaild_Data.length>0){this.Student_Details_View=true}
        else(this.Student_Details_View=false);

        for (var i=0;i<this.Search_Applied_Reject_Detaild_Data.length;i++)
        {
            if(this.Search_Applied_Reject_Detaild_Data[i].Apply_Type==1)
            {
                this.Search_Applied_Reject_Detaild_Data[i].Apply_Type_Name="Applied"
            }
            else (this.Search_Applied_Reject_Detaild_Data[i].Apply_Type_Name = "Rejected");
            
        }



        this.Total_Entries =  this.Search_Applied_Reject_Detaild_Data.length;

    this.issLoading = false;
    if(this.Search_Applied_Reject_Detaild_Data.length==0)
    // { 
    // this.issLoading=false;
    // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Job Applied or Rejected Details Found',Type:"3"}});
    // }
    this.issLoading=false;
    },
    Rows => 
    { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}


Password_View_Click(){
  this.Password_View =true;
  this.View_Password=this.Student_.Password;
  
  
  }
  Add_Self_Placement()
  {
  this.Placement_Add_View=true;
  this.Placement_button_View =false;
  this.Clr_Self_Placement()
  }

 
  Save_Self_Placed()
{
    // if(this.Batch_.Batch_Name===undefined || this.Batch_.Batch_Name==null || this.Batch_.Batch_Name=="")
    // {
    // const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Batch ',Type: "3" }});
    // return  
    // }

    this.issLoading=true;
    debugger
   
    this.Self_Placement_.Student_Course_Id=this.Student_Course_Id_Edit;
    this.Self_Placement_.Student_Id=this.Student_.Student_Id;

    this.Self_Placement_.Placed_Date = this.New_Date(new Date(moment(this.Self_Placement_.Placed_Date).format('YYYY-MM-DD')));

    this.Student_Service_.Save_Self_Placed(this.Self_Placement_).subscribe(Save_Placement => {
        
        debugger
        Save_Placement=Save_Placement[0];
    if(Number(Save_Placement[0].Self_Placement_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Close_Click();
  
    }
    else{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
    });
}

Clr_Self_Placement()
{
  debugger
  this.Self_Placement_.Company_Name="";
  this.Self_Placement_.Designation="";
   this.Self_Placement_.Self_Placement_Id=0;
  //  this.Self_Placement_.Placed_Date = this.New_Date( this.Self_Placement_.Placed_Date);

  this.Self_Placement_.Placed_Date = new Date();
this.Self_Placement_.Placed_Date = this.New_Date(
this.Self_Placement_.Placed_Date)
}


Get_Self_Placement() {
  if (this.Receipt_History_View == false) {
  this.Receipt_History_View = true;
  this.issLoading = true;
  debugger
  this.Student_Service_.Get_Self_Placement(
  this.Student_.Student_Id
  ).subscribe(
  (Rows) => {
  debugger
  this.issLoading = false;
  this.Self_Placement_Data = Rows[0];
  
  // for (var i = 0; i < this.Self_Placement_Data.length; i++) {
  //   if (this.Self_Placement_Data[i].Receipt_Image_File!=undefined && this.Self_Placement_Data[i].Receipt_Image_File!=null && this.Self_Placement_Data[i].Receipt_Image_File!="")
  //   this.Self_Placement_Data[i].Receipt_Image_view = 1
  //   }
  
  },
  (Rows) => {
  this.issLoading = false;
  const dialogRef = this.dialogBox.open(DialogBox_Component, {
  panelClass: "Dialogbox-Class",
  data: { Message: "Error Occured", Type: false },
  });
  }
  );
  } else this.Receipt_History_View = false;
  }


  Edit_Self_Placement(Self_Placement_e: Self_Placement, index)
  {

    debugger
    this.Placement_Add_View = true;
    this.Placement_button_View =false;
    this.Self_Placement_ = Self_Placement_e;
    this.Self_Placement_ = Object.assign({}, Self_Placement_e);

    this.Self_Placement_.Placed_Date = new Date(
      moment(this.Self_Placement_.Placed_Date_s).format("YYYY-MM-DD")
      );
    
  }


  Delete_Self_Placement(Self_Placement_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
   this.issLoading=true;
    this.Student_Service_.Delete_Self_Placement(Self_Placement_Id).subscribe(Delete_status => {
      debugger
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].Self_Placement_Id_;
    if(Delete_status==1)
    {
    this.Self_Placement_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
    this.Get_Self_Placement();
    }
    else
    {
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    }
    });
}



sendSms(V1,V2,V3) {
  debugger
    this.Sms_.username = 'oneteamsolutions1',
    this.Sms_.password= 'f9dde2',
    this.Sms_.mobile= V1,
    this.Sms_.message= 'Dear Candidate, Thank you for registering '+ V2 + ' on ' +V3+ '. Please note, all updates will be shared via our Whatsapp group. So if you have missed to join, Join now -https://bit.ly/35WVivh already joined.Please ignore it .ONE TEAM SOLUTIONS',
    this.Sms_.sendername= 'ONETEM',
    this.Sms_.routetype= 1,
    this.Sms_.tid ='1607100000000136194'
  
    this.SmsService_.sendSms(this.Sms_).subscribe(
      response => {
        debugger
        console.log('SMS sent successfully:', response);
      },
      error => {
        console.error('Error sending SMS:', error);
      }
    );
  }
  
  
  
  
  Fees_Payment_Sms(amount,balance_amnt,due_date) {
    debugger
    var student='',payment_amount='',pending_amount='';
  
    var user_id =this.followup_user_id_;
  this.Get_ToStaff_Mobile(user_id)
  
      this.Sms_.username = 'oneteamsolutions1',
      this.Sms_.password= 'f9dde2',
      this.Sms_.mobile= this.Student_.Whatsapp,
       student = this.Student_.Student_Name;
       
    
  
      this.Sms_.message= 'Hi,' + student + '. We have received a Payment of Rs ' + amount + '. Thank you for making the payment. Your Pending fee is ' +balance_amnt+ '. Support- ' +this.ToStaff_Mobile + '.ONE TEAM SOLUTIONS',
      this.Sms_.sendername= 'ONETEM',
      this.Sms_.routetype= 1,
      this.Sms_.tid ='1607100000000133266'
     
    
      this.SmsService_.Fees_Payment_Sms(this.Sms_).subscribe(
        response => {
          debugger
          console.log('SMS sent successfully:', response);
        },
        error => {
          console.error('Error sending SMS:', error);
        }
      );
    }
  
  
  
    // Get_OTP() {
    //   this.Student_Service_.getOTP('8078814078').subscribe(
    //     response => {
    //       debugger
    //       console.log('SMS sent successfully:', response);
    //       // console.log('Student_Id:', response.Student_Id_);
    //       // console.log('OTP:', response.OTP_);
    //     },
    //     error => {
    //       console.error('Error sending SMS:', error);
    //     }
    //   );
    // }
    
  
  
    //  Get_OTP1() {
    //   debugger
      
      
    //     this.Student_Service_.updatePasswordMobile('6454','xyz').subscribe(
    //       response => {
    //         debugger
    //         console.log('SMS sent successfully:', response);
    //       },
    //       error => {
    //         console.error('Error sending SMS:', error);
    //       }
    //     );
    //   }

//     api_brochure_python_arjun_jan2025(student,whatsapp,course,to_staff_name_,to_staff_mobile_,Course_Id)
//     {
//       debugger
// this.Save_Whatsapp_1_.whatsAppBusinessId = "108714478695876";
// this.Save_Whatsapp_1_.phoneNumberId = "103915675851161";
// this.Save_Whatsapp_1_.from = "919562813713";
// this.Save_Whatsapp_1_.to = ""+whatsapp+"";
// this.Save_Whatsapp_1_.student = student;
// this.Save_Whatsapp_1_.tostaff =  to_staff_name_ ;
// this.Save_Whatsapp_1_.tostaff_mobile =  to_staff_mobile_ ;
// this.Save_Whatsapp_1_.Course =  course ;
// this.Save_Whatsapp_1_.Course_Id =  Course_Id ;

// this.Save_Whatsapp_1_.button=null

// this.Student_Service_.api_brochure_course_whatsapp(this.Save_Whatsapp_1_).subscribe(Save_status => {
// debugger

//  var msg =Save_status[0];

// 	  return;

// },
// );
//     }




api_brochure_python_arjun_jan2025(student,whatsapp,course,to_staff_name_,to_staff_mobile_,Course_Id,Student_Id)
{
  debugger
this.Save_Whatsapp_1_.whatsAppBusinessId = "108714478695876";
this.Save_Whatsapp_1_.phoneNumberId = "103915675851161";
this.Save_Whatsapp_1_.from = "919562813713";
this.Save_Whatsapp_1_.to = "91"+whatsapp+"";
this.Save_Whatsapp_1_.student = student;
this.Save_Whatsapp_1_.tostaff =  to_staff_name_ ;
this.Save_Whatsapp_1_.tostaff_mobile =  to_staff_mobile_ ;
this.Save_Whatsapp_1_.Course =  course ;
this.Save_Whatsapp_1_.Course_Id =  Course_Id ;
this.Save_Whatsapp_1_.Student_Id =  Student_Id ;

this.Save_Whatsapp_1_.button=null

this.Student_Service_.api_brochure_python_arjun_jan2025(this.Save_Whatsapp_1_).subscribe(Save_status => {
debugger

var msg =Save_status[0];

return;

},
);
}

api_dm_brochure_arjun_jan2025(student,whatsapp,course,to_staff_name_,to_staff_mobile_,Course_Id,Student_Id)
{
  debugger
this.Save_Whatsapp_1_.whatsAppBusinessId = "108714478695876";
this.Save_Whatsapp_1_.phoneNumberId = "103915675851161";
this.Save_Whatsapp_1_.from = "919562813713";
this.Save_Whatsapp_1_.to = "91"+whatsapp+"";
this.Save_Whatsapp_1_.student = student;
this.Save_Whatsapp_1_.tostaff =  to_staff_name_ ;
this.Save_Whatsapp_1_.tostaff_mobile =  to_staff_mobile_ ;
this.Save_Whatsapp_1_.Course =  course ;
this.Save_Whatsapp_1_.Course_Id =  Course_Id ;
this.Save_Whatsapp_1_.Student_Id =  Student_Id ;

this.Save_Whatsapp_1_.button=null

this.Student_Service_.api_dm_brochure_arjun_jan2025(this.Save_Whatsapp_1_).subscribe(Save_status => {
debugger

var msg =Save_status[0];

return;

},
);
}

api_brochure_mernstack_arjun_jan2025(student,whatsapp,course,to_staff_name_,to_staff_mobile_,Course_Id,Student_Id)
{
  debugger
this.Save_Whatsapp_1_.whatsAppBusinessId = "108714478695876";
this.Save_Whatsapp_1_.phoneNumberId = "103915675851161";
this.Save_Whatsapp_1_.from = "919562813713";
this.Save_Whatsapp_1_.to = "91"+whatsapp+"";
this.Save_Whatsapp_1_.student = student;
this.Save_Whatsapp_1_.tostaff =  to_staff_name_ ;
this.Save_Whatsapp_1_.tostaff_mobile =  to_staff_mobile_ ;
this.Save_Whatsapp_1_.Course =  course ;
this.Save_Whatsapp_1_.Course_Id =  Course_Id ;
this.Save_Whatsapp_1_.Student_Id =  Student_Id ;

this.Save_Whatsapp_1_.button=null

this.Student_Service_.api_brochure_mernstack_arjun_jan2025(this.Save_Whatsapp_1_).subscribe(Save_status => {
debugger

var msg =Save_status[0];

return;

},
);
}

api_brochure_softwaretesting_arjun_jan2025(student,whatsapp,course,to_staff_name_,to_staff_mobile_,Course_Id,Student_Id)
{
  debugger
this.Save_Whatsapp_1_.whatsAppBusinessId = "108714478695876";
this.Save_Whatsapp_1_.phoneNumberId = "103915675851161";
this.Save_Whatsapp_1_.from = "919562813713";
this.Save_Whatsapp_1_.to = "91"+whatsapp+"";
this.Save_Whatsapp_1_.student = student;
this.Save_Whatsapp_1_.tostaff =  to_staff_name_ ;
this.Save_Whatsapp_1_.tostaff_mobile =  to_staff_mobile_ ;
this.Save_Whatsapp_1_.Course =  course ;
this.Save_Whatsapp_1_.Course_Id =  Course_Id ;
this.Save_Whatsapp_1_.Student_Id =  Student_Id ;

this.Save_Whatsapp_1_.button=null

this.Student_Service_.api_brochure_softwaretesting_arjun_jan2025(this.Save_Whatsapp_1_).subscribe(Save_status => {
debugger

var msg =Save_status[0];

return;

},
);
}


 
}



