import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { Job_Posting_Service } from '../../../services/Job_Posting.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Enquiry_Source } from '../../../models/Enquiry_Source';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatGridTileHeaderCssMatStyler } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { environment } from '../../../../environments/environment.js';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Users } from '../../../models/Users';
import { Status } from '../../../models/Status';
import { Course } from '../../../models/Course';
import { Student } from 'app/models/Student';
import * as JSZip from 'jszip';
import { HttpClient } from '@angular/common/http';
import { saveAs } from "file-saver";
import { Job_Posting_Array } from 'app/models/Job_Posting_Array';
import { Resume_Status } from 'app/models/Resume_Status';
import { Student_Course } from 'app/models/Student_Course';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Resume_Status_Change } from 'app/models/Resume_Status_Change';
import { FormControl } from '@angular/forms';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Student_Job_Report',
templateUrl: './Student_Job_Report.component.html',
styleUrls: ['./Student_Job_Report.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Student_Job_ReportComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number=0;
    Total_Entries1: number=0;
    Total_Entries_Appliedcount:number=0;
    Total_Entries_Rejectedcount:number=0;
    Total_Amount:number=0;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Lead_Report_Edit:boolean;
    Lead_Report_Save:boolean;
    Lead_Report_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;
    Export_Permission:any;
    Export_View :boolean =false;
    Appliedcount_Div:boolean=false;
    Rejectedcount_Div:boolean=false;

    User_Search: Users = new Users();
    Users_Data: Users[]
    Users_Temp: Users = new Users();

    Enquiry_Status_Search: Status=new Status();
    Enquiry_Status_Data: Status[]
    Enquiry_Status_Temp: Status=new Status();

    // Search_Status: Status = new Status;
    // Search_Status_Temp: Status = new Status;
    // Status_Data: Status[];


    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    Student_Details_View: boolean = false;
    profile_View:boolean=true;
    
    Login_User: number = 0;
    Lead_Report_EditIndex: number = -1;

    FromDate_: Date = new Date();
    ToDate_: Date = new Date();
    Is_Date:boolean=false;   

    Course_Data: Course[];
    Course_:Course=new Course;
    Course_Temp: Course = new Course;
    Course_Data_Filter: Course[]  

    
  Student_Job_Report_Data:any;
  Student_Job_Report_AppliedcountdetailsData:any;
  Student_Job_Report_RejectedcountdetailsData:any;

  Job_Posting_Data_List:Job_Posting_Array[];

  Resumefiledata:any;
    Edit_Page_Permission: any;

    Enquiry_Source_: Enquiry_Source = new Enquiry_Source;
    Enquiry_Source_Temp: Enquiry_Source = new Enquiry_Source;
    Enquiry_Source_Data: Enquiry_Source[] 

    select_Resume:boolean=false;
    Applied_Resume_Check_Box:boolean=false;
    
    Search_Name: "";
    Search_Job:"";
    jobpositingid:number=0;
    student_id: number;
   Student_: Student = new Student();
   Student_Status_ :number =-1;

   Blacklist_Status_ :number =-1;
   Activate_Status_ :number =-1;
   Fees_Status_ :number =-1;


   Student_Name_Search: "";
   Offered_Count: -1;

   issLoadingapi:boolean;
   zip = new JSZip();
   files = [
];
Actualfile_size:number;
Resume_Data:any;


Fees_Receipt_Permissions: any;
Student_Edit: boolean;
Student_Save: boolean;
Student_Delete: boolean;
Installment_Index: number;
DOB: string;
More_Search_Options: boolean = true;
myInnerHeighttemp: number;
tab_view: boolean = true;
Course_Tab: boolean = true;
clickview: boolean = true;
profile_View_followup: boolean = true;
Fees_View: boolean = false;
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
Student_Name: string ="";
Student_Data: Student[];

Resume_Status_: Resume_Status = new Resume_Status();
Search_Resume_Status_ : Resume_Status = new Resume_Status();
Resume_Status_Temp: Resume_Status = new Resume_Status();
Resume_Status_Data: Resume_Status[];
Course_Student_Search: Course = new Course();
Course_Student: Course = new Course();

Followp_History_Data: Student[];

Search_Status: Status = new Status();
Search_Status_Temp: Status = new Status();
Status_Data: Status[];

Followup_Status_: Status = new Status();
Followup_Status_Data: Status[];
Followup_Status_Temp: Status = new Status();
Next_FollowUp_Date_Visible: boolean = true;

Users_Search: Users = new Users();
Users_Search_Temp: Users = new Users();


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
Is_Registered: any;

Page_Start: number = 0;
Page_End: number = 0;
Page_Length: number = 25;
// Page_Length_: number = 25;
Black_Start: number = 1;
Black_Stop: number = 0;
Red_Start: number = 1;
Red_Stop: number = 0;
Total_Rows: number = 0;
missedfollowup_count: number = 1;
followup_count: number = 0;
// nextflag: number;


    Page_Length_: number = 50;
    Pointer_Start_: number;
    Pointer_Stop_: number;
    nextflag: number;

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



Student_Course_: Student_Course = new Student_Course();
Student_Course_Temp: Student_Course = new Student_Course();
Student_Course_Data: Student_Course[];
Student_Course_Click_Data: Student_Course[];



Course_Click_Status: boolean = false;
Fees_Click_Status: boolean = false;
Mark_Click_Status: boolean = false;
date_Temp: Date = new Date();
Course_Id_Edit: number = 0;
Student_Course_Id_Edit: number = 0;

Company_Name: string;
Address1: string;
Address2: string;
Address3: string;
PinCode: string;
GSTNo: string;
Old_Course_Id: number;
course_name: string;
ImageFile_Photo_view: string;
ImageFile_Photo_view1: string;
ImageFile_Resume_view: string;
Batch_View: boolean = true;
Start_Date: Date;
End_Date: Date;
batch_id: number;
Resume_Click_Status: boolean = false;
Transaction_Report_Master_Data: any;
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

Enable_Visiblility: boolean;
Disable_Visiblility: boolean;
Enable_Permissions: any;
Disable_Permissions: any;


Activate_Visiblility: boolean;
Deactivate_Visiblility: boolean;
Activate_Permissions: any;
Deactivate_Permissions: any;



Movedtoblacklist_Visiblility: boolean;
Removedfromblacklist_Visiblility: boolean;
Movedtoblacklist_Permissions: any;
Removedfromblacklist_Permissions: any;


  ImageFile_Photo1: any;
  Display_Photo_1_: string;

print_voucher_no: number;
print_account_name: string;
print_Paid_date: Date;
print_Description: string;
print_amount: number;
print_paid: string;

Resume_Status_Name_ : string;

Resume_Status_Id_: number;

notification_status: string;
Blacklist_status: string;
activate_status: string;
Fees_status: string;

resume_button_view:number;
resume_button_view1:number;

Search_Applied_Reject_Detaild_Data : any;

is_date_i:number=1;
resume_status_i:number=0;

Search_By_ :number=0;
Batch_Name: string='';
Trainer_Name: string='';
Total_Fees_Paid:number=0;


Resume_Status_Change_: Resume_Status_Change = new Resume_Status_Change();
Resume_Status_Change_Temp: Resume_Status_Change = new Resume_Status_Change();
Resume_Status_Change_Data: Resume_Status_Change[];
Student_Id_localStorage: string = "";

History_Of_Interview_Schedule_Data:any;


Search_Resume_=new FormControl();
Search_Resume_Temp:any


constructor(public Student_Service_:Student_Service,private _http: HttpClient, 
    public Job_Posting_Service_:Job_Posting_Service, 
    private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));

    this.Student_Id_localStorage = localStorage.getItem("Student_Id");

    this.Permissions = Get_Page_Permission(63);
    this.Export_Permission=Get_Page_Permission(50);

    this.Enable_Permissions = Get_Page_Permission(64);
//debugger
this.Disable_Permissions = Get_Page_Permission(65);
this.Movedtoblacklist_Permissions = Get_Page_Permission(66);
this.Removedfromblacklist_Permissions = Get_Page_Permission(67);
this.Activate_Permissions = Get_Page_Permission(68);
this.Deactivate_Permissions = Get_Page_Permission(69);

// debugger
// this.resume_status_i = Number(localStorage.getItem('resume_status_i'));
// this.is_date_i = Number(localStorage.getItem('is_date_i'));

// if(this.is_date_i==0){this.Is_Date=false}



if (this.Student_Id_localStorage > "0") {
  this.Student_Id = Number(this.Student_Id_localStorage);
  localStorage.setItem("Student_Id", "0");
}
// debugger
// if (this.resume_status_i > 0) {
//   localStorage.setItem("resume_status_i", "0");
// }

// if (this.is_date_i ==0) {
//   localStorage.setItem("is_date_i", "1");
// }

    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Lead_Report_Edit=this.Permissions.Edit;
    this.Lead_Report_Save=this.Permissions.Save;
    this.Lead_Report_Delete=this.Permissions.Delete;
   
    if(this.Export_Permission !=undefined && this.Export_Permission !=null)
    this.Export_View=this.Export_Permission.Edit
    
    }
    this.Page_Load()
     
}
Page_Load()
{
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.Entry_View = true;
    this.Student_Details_View = false;
    this.select_Resume=false;
    this.Applied_Resume_Check_Box=false;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_);

    
    this.Load_Enquiry_Source();
    this.Get_Lead_Load_Data();
    this.Load_Resume_Status();

   
    // this.Search_Student()
    // this.myInnerHeight = (window.innerHeight);
    // this.myTotalHeight=this.myInnerHeight-190
    // this.myTotalHeight=this.myTotalHeight-190;
    // this.myInnerHeight = this.myInnerHeight-90;;
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight -200
    this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeight = this.myInnerHeight - 350;
    // debugger
    // if(this.is_date_i==0){this.Is_Date=false}
    // this.Search_Student_Job_Report();
}

Export()
{
    
        this.Student_Service_.exportExcel(this.Student_Job_Report_Data,'Student_Job Report')
       
}
Export_Appliedcount_Data()
{
    
        this.Student_Service_.exportExcel(this.Student_Job_Report_AppliedcountdetailsData,'Student_Job Applied Report')
       
}



Export_Rejectedcount_Data()
{
    
        this.Student_Service_.exportExcel(this.Student_Job_Report_RejectedcountdetailsData,'Student_Job Rejected Report')
       
}




Get_Lead_Load_Data()
{
this.issLoading = true;
this.Student_Service_.Get_Lead_Load_Data().subscribe(Rows => {
   
    if (Rows != undefined)
    {
        
        this.issLoading = false;
        // this.Department_Data = Rows.returnvalue.Department;
         this.Users_Data = Rows.returnvalue.Users;
         this.Enquiry_Status_Data = Rows.returnvalue.Status;
        
        this.Users_Temp.Users_Id = 0;
        this.Users_Temp.Users_Name = "All";
        this.Users_Data.unshift(Object.assign({},this.Users_Temp));
        this.User_Search = this.Users_Data[0];

        this.Enquiry_Status_Temp.Status_Id = 0;
        this.Enquiry_Status_Temp.Status_Name = "All";
        this.Enquiry_Status_Data.unshift(Object.assign({},this.Enquiry_Status_Temp));
        this.Enquiry_Status_Search = this.Enquiry_Status_Data[0];

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}
Load_Enquiry_Source()
{
    this.issLoading = true;
    this.Student_Service_.Load_Enquiry_Source().subscribe(Rows => {
        if (Rows != null) {
            this.Enquiry_Source_Data = Rows[0];
            this.Enquiry_Source_Temp.Enquiry_Source_Id = 0;
            this.Enquiry_Source_Temp.Enquiry_Source_Name = "All";
            this.Enquiry_Source_Data.unshift(this.Enquiry_Source_Temp);
            this.Enquiry_Source_ = this.Enquiry_Source_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
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
    this.Search_Resume_Status_ = this.Resume_Status_Data[1];

    // if(this.resume_status_i!=1)
    // this.Search_Resume_Status_ = this.Resume_Status_Data[1];
    // if(this.resume_status_i==1)
    // this.Search_Resume_Status_ = this.Resume_Status_Data[1];


    debugger
    for (var i=0;i<this.Resume_Status_Data.length;i++)
    {
      this.Search_Resume_.value;
    }


    
     this.Search_Student_Job_Report();
    this.issLoading = false;
    }
debugger
      if (this.Student_Id_localStorage > '0') {         
                          
              
        this.Edit_Student(this.Student_Id_localStorage,1,1,1,'','',
        '','');
        }

    },
    (Rows) => {
    this.issLoading = false;
    }
    );
    }


isMobileMenu() {
    if ($(window).width() > 991)
    {
        return false;
    }
    return true;
};
isDesktopMenu() 
{
    if ($(window).width() < 991)
    {
        return false;
    }
    return true;
};
trackByFn(index, item) 
{
    return index;
}
Search_Course_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    if (this.Course_Data == undefined || this.Course_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Search_Course_Typeahead('').subscribe(Rows => {
    if (Rows != null) 
    {
        this.Course_Data = Rows[0];
        this.issLoading = false;

        this.Course_Data_Filter=[];

        for (var i=0;i<this.Course_Data.length;i++)
        {
            if(this.Course_Data[i].Course_Name.toLowerCase().includes(Value))
                this.Course_Data_Filter.push(this.Course_Data[i])
        }
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 

    else
    {
        
        this.Course_Data_Filter=[];
        for (var i=0;i<this.Course_Data.length;i++)
        {
            if(this.Course_Data[i].Course_Name.toLowerCase().includes(Value))
                this.Course_Data_Filter.push(this.Course_Data[i])
        }
    }
}

display_Course(Course_: Course)
{     
    if (Course_) { return Course_.Course_Name; }
}
New_Date(Date_)
{
         this.date=Date_;
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        if (this.month < 10) {
        this.month = "0" + this.month;
    }
        this.day = this.date.getDate().toString();
        if (Number.parseInt(this.day) <10) {
        this.day = "0" + this.day;
    }
        this.date = this.year + "-" + this.month + "-" + this.day;
      //  this.date = this.day + "-"+ this.month + "-" + this.year ;
        return this.date;
}


Search_Student_Job_Report()
{
    debugger
    var  student_name_ = "",look_In_Date_Value=0;var  offeredcount_ =-1; var      resumestatus="";var Resume_Selection="";
   this.Total_Entries =0;
    if (this.Is_Date == true)
        look_In_Date_Value = 1;

        if (this.Student_Name_Search != undefined && this.Student_Name_Search != null && this.Student_Name_Search != '')
        student_name_ = this.Student_Name_Search;

        if (this.Offered_Count != undefined && this.Offered_Count != null && this.Offered_Count != -1)
        offeredcount_ = this.Offered_Count;

        // if (this.Search_Resume_Status_.Resume_Status_Id != undefined &&this.Search_Resume_Status_.Resume_Status_Id != null)
        // resumestatus = this.Search_Resume_Status_.Resume_Status_Id;
          

        debugger
        this.Search_Resume_Temp=this.Search_Resume_;
        if (this.Search_Resume_.value !=undefined)
        {
            for (var i=0;i<this.Search_Resume_.value.length;i++)
            {
                Resume_Selection=Resume_Selection + this.Search_Resume_.value[i].Resume_Status_Id.toString() +",";
            }
            if(Resume_Selection.length>0)
            Resume_Selection=Resume_Selection.substring(0,Resume_Selection.length-1)
            resumestatus=Resume_Selection;
            
        }

        
    this.issLoading = true;
    debugger
    this.Job_Posting_Service_.Search_Student_Job_Report(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),this.Student_Status_,student_name_,offeredcount_,
    this.Blacklist_Status_,this.Activate_Status_,this.Fees_Status_,resumestatus
   ).subscribe(Rows =>{
      debugger
        this.Student_Job_Report_Data=Rows[0];

        for (var i=0;i<this.Student_Job_Report_Data.length;i++)
        {
            if(this.Student_Job_Report_Data[i].Student_Status==1)
            {
                this.Student_Job_Report_Data[i].Student_Status_Name="Notification Enable"
            }
            else (this.Student_Job_Report_Data[i].Student_Status_Name = "Notification Disable");
            
        }


        for (var i=0;i<this.Student_Job_Report_Data.length;i++)
        {
            if(this.Student_Job_Report_Data[i].Blacklist_Status==1)
            {
                this.Student_Job_Report_Data[i].Blacklist_Status_Name="Blacklist"
            }
            else (this.Student_Job_Report_Data[i].Blacklist_Status_Name = "Whitelist");
            
        }


        for (var i=0;i<this.Student_Job_Report_Data.length;i++)
        {
            if(this.Student_Job_Report_Data[i].Fees_Status==1)
            {
                this.Student_Job_Report_Data[i].Fees_Status_Name="Paid"
            }
            else (this.Student_Job_Report_Data[i].Fees_Status_Name = "Payment Pending");
            
        }


        for (var i=0;i<this.Student_Job_Report_Data.length;i++)
        {
            if(this.Student_Job_Report_Data[i].Activate_Status==1)
            {
                this.Student_Job_Report_Data[i].Activate_Status_Name="Active"
            }
            else (this.Student_Job_Report_Data[i].Activate_Status_Name = "Deactive");
            
        }




        for (var i=0;i<this.Student_Job_Report_Data.length;i++)
        {
            if(this.Student_Job_Report_Data[i].Image_ResumeFilename==null||this.Student_Job_Report_Data[i].Image_ResumeFilename==undefined||this.Student_Job_Report_Data[i].Image_ResumeFilename=="")
            {
                this.Student_Job_Report_Data[i].resume_button_view =0
            }
            else ( this.Student_Job_Report_Data[i].resume_button_view =1);
            
        }
       
        this.Total_Entries =  this.Student_Job_Report_Data.length;
        debugger

   


  
 debugger
    this.issLoading = false;
    if(this.Student_Job_Report_Data.length==0)
    { 
    this.issLoading=false;
    if(this.Student_Id==0)
    {
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});

    }
    }
    this.issLoading=false;
    },
    Rows => 
    { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}







Edit_Student(Student_Id_Temp, Mail_Status_, Status,index,Noti_Status,black_status,activate_status,fees_status ) {

    debugger
    //alert(Mail_Status_)

    this.Applied_Reject_Detaild_Report(Student_Id_Temp);
    this.History_Of_Interview_Schedule(Student_Id_Temp)

    this.Student_Details_View = true;
    this.Entry_View = false;
    this.Clr_Student();
    this.Student_EditIndex = index;
    this.Flag_Followup = 0;
    this.Flag_Student = 1;
    this.Mail_sms_Status = Mail_Status_;
    this.Status_Id = Status;
    // this.Student_Id = Student_e.Student_Id;
    // this.Student_Id_Edit = Student_e.Student_Id;
    
    this.Student_Id = Student_Id_Temp;
    this.Student_Id_Edit = Student_Id_Temp;
    

    this.notification_status = Noti_Status;
    this.Blacklist_status =black_status;
    this.activate_status =activate_status;
    this.Fees_status =fees_status;
    // this.View_Student_ = true;
    // this.Course_Tab = false;
    // this.clickview = false;
    // this.View_Follow_ = false;
    // this.Entry_View = true;
    // this.profile_View = true;
    // this.profile_View_followup = false;
    // this.tab_view = true;
    // this.Course_View = false;
    
    // this.View_History_ = false;
    // this.Show_FollowUp = true;
    // this.Fees_View = false;
    // this.Resumesending_View = false;
    // this.Placement_View = false;
    // this.Interview_View = false;
    // this.Resume_Sending_View = false;
    // this.Mark_View = false;
    // this.Course_Click_Status = false;
    // this.Fees_Click_Status = false;
    // this.Mark_Click_Status = false;
    // this.Save_Agent_.Client_Accounts_Name=Student_e.Client_Accounts_Name;
    // this.Save_Agent_.Client_Accounts_Id=Student_e.Agent_Id;
    
    this.issLoading = true;
    debugger
    //Student_e.Student_Id
    this.Student_Service_.Get_Student(Number(Student_Id_Temp)).subscribe(
    (Rows) => {
    
      debugger
    this.Student_ = Object.assign({}, Rows[0][0]);

    this.Student_Course_ = Object.assign({}, Rows[1][0]);

    this.Batch_Name=   this.Student_Course_.Batch_Name;
    this.Total_Fees_Paid=   this.Student_Course_.Fee_Paid;
    this.Trainer_Name=   this.Student_Course_.trainer;



    this.Student_Name = this.Student_.Student_Name;
    this.Registration = this.Student_.Registered;
    this.Remove_Registration_Visibility = false;
    this.Registration_Visiblility = false;
    this.Course_Selection_Visibility = false;

    if(this.Student_.Activate_Status==true)
    {this.activate_status="Active"}
    else(this.activate_status="Deactive")

    if(this.Student_.Student_Status==true)
    {this.notification_status="Notification Enable"}
    else(this.notification_status="Notification Disable")

    if(this.Student_.Blacklist_Status==true)
    {this.Blacklist_status="Blacklist"}
    else(this.Blacklist_status="Whitelist")

    if(this.Student_.Fees_Status==true)
    {this.Fees_status="Paid"}
    else(this.Fees_status="Payment Pending")



    if(this.Student_.Image_ResumeFilename ==null||this.Student_.Image_ResumeFilename ==undefined||this.Student_.Image_ResumeFilename =="")
    {
      this.resume_button_view1 = 0
    }
    else(this.resume_button_view1 = 1);

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
    debugger
    this.resumeimg =this.Student_.Resume
    
    this.ImageFile_Photo_view = environment.FilePath + this.Student_.Photo;
    
    this.ImageFile_Photo_view1 = environment.FilePath + this.Student_.Id_Proof_File;
    
    this.ImageFile_Resume_view =environment.FilePath + this.Student_.Image_ResumeFilename;
    
   
    for (var i = 0; i < this.Enquiry_Source_Data.length; i++) {
    if (
    this.Student_.Enquiry_Source ==
    this.Enquiry_Source_Data[i].Enquiry_Source_Id
    )
    this.Enquiry_Source_ = this.Enquiry_Source_Data[i];
    }
    
   
    
    
      for (var i = 0; i < this.Resume_Status_Data.length; i++) {
        if (
        this.Student_.Resume_Status_Id ==
        this.Resume_Status_Data[i].Resume_Status_Id
        )
        this.Resume_Status_ = this.Resume_Status_Data[i];
        }
    
    
    
    debugger
    
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
    
    
    
    
    //debugger
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
    
    
    
        //debugger
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
        
        
        
    
    this.Course_Temp.Course_Id = this.Student_Course_.Course_Id;
    this.Course_Temp.Course_Name = this.Student_Course_.Course_Name;
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

    Clr_Student() {
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
        
        this.Student_.Year_Of_Passing = "";
        this.Student_.Id_Proof_Id = 0;
        this.Student_.Id_Proof_Name = "";
        this.Student_.Id_Proof_No = ""; 
        this.Student_.Id_Proof_FileName = "";
        this.Student_.Id_Proof_File= "";
       
        
        if (this.Resume_Status_Data != null && this.Resume_Status_Data != undefined)
        this.Resume_Status_ = this.Resume_Status_Data[0];

        if (this.Resume_Status_Data != null && this.Resume_Status_Data != undefined)
        this.Search_Resume_Status_ = this.Resume_Status_Data[1];
        
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
        
        this.Movedtoblacklist_Visiblility=false;
        this.Removedfromblacklist_Visiblility=false;
        
        this.Course_Selection_Visibility = false;
        this.Registration_Visiblility = false;
        this.Course_Student = null;
        this.Student_.College_Name = "";
        
        if (
        this.Enquiry_Source_Data != null &&
        this.Enquiry_Source_Data != undefined
        )
        this.Enquiry_Source_ = this.Enquiry_Source_Data[0];
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
                      //debugger
                        if (this.Disable_Permissions.View == true)
                          this.Disable_Visiblility = true;
          
                      const dialogRef = this.dialogBox.open(DialogBox_Component, {
                        panelClass: "Dialogbox-Class",
                        data: { Message: "Enabled", Type: "false" },
                      });
                      // this.Total_Rows = this.Total_Rows - this.Student_Data.length;
                      // this.Search_Student();

                      this.notification_status ="Notification Enable"
          
                      this.Edit_Student(
                        Student_Id_,
                        this.Mail_sms_Status,
                        this.Status_Id,
                        this.Student_EditIndex,
                        this.notification_status,
                        this.Blacklist_status,
                        this.activate_status,
                        this.Fees_status


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
                       this.notification_status ="Notification Disable"
                      this.Edit_Student(
                        Student_Id_,
                        this.Mail_sms_Status,
                        this.Status_Id,
                        this.Student_EditIndex
                        ,
                        this.notification_status,
                        this.Blacklist_status,
                        this.activate_status,
                        this.Fees_status
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

                      // this.Search_Student_Job_Report();

                      this.activate_status ="Active"
          
                      this.Edit_Student(
                        Student_Id_,
                        this.Mail_sms_Status,
                        this.Status_Id,
                        this.Student_EditIndex
                        ,
                        this.notification_status,
                        this.Blacklist_status,
                        this.activate_status,
                        this.Fees_status
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
                      this.activate_status ="Deactive"
                      this.Edit_Student(
                        Student_Id_,
                        this.Mail_sms_Status,
                        this.Status_Id,
                        this.Student_EditIndex
                        ,
                        this.notification_status,
                        this.Blacklist_status,
                        this.activate_status,
                        this.Fees_status
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
                      this.Blacklist_status ="Blacklist"
          
                      this.Edit_Student(
                        Student_Id_,
                        this.Mail_sms_Status,
                        this.Status_Id,
                        this.Student_EditIndex
                        ,
                        this.notification_status,
                        this.Blacklist_status,
                        this.activate_status,
                        this.Fees_status
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
                      this.Blacklist_status ="Whitelist"
                      this.Edit_Student(
                        Student_Id_,
                        this.Mail_sms_Status,
                        this.Status_Id,
                        this.Student_EditIndex
                        ,
                        this.notification_status,
                        this.Blacklist_status,
                        this.activate_status,
                        this.Fees_status
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
          
          
          
          
          File_Change_Photo1(event: Event) 
          {  
              //debugger  
              const file = (event.target as HTMLInputElement).files;
              this.ImageFile_Photo1 = file;
              this.Student_.Id_Proof_FileName = this.ImageFile_Photo1[0].name;
              // this.IsImageFile_Photo1_Changed = 1;
          
          }
          
          
          
          Download_Resume_File(File_Name,StudentId) {
            //debugger
            this.issLoading = true;
            debugger
            this.Job_Posting_Service_.Get_Resumefilefor_Report(StudentId).subscribe(
            (Rows) => {
                this.Resumefiledata=Rows[0];
            this.issLoading = false;
            var File_Name_Temp;
            if(File_Name=='Image_ResumeFilename')
            debugger
            for (var i=0;i<this.Resumefiledata.length;i++)
            {
                File_Name_Temp=this.Resumefiledata[i].Image_ResumeFilename;  
            }


            
        // for (var i=0;i<this.Resumefiledata.length;i++)
        // {
        //     if(this.Resumefiledata[i].Image_ResumeFilename==null||this.Resumefiledata[i].Image_ResumeFilename==undefined||this.Resumefiledata[i].Image_ResumeFilename=="")
        //     {
        //         this.Resumefiledata[i].resume_button_view1 =0
        //     }
        //     else ( this.Resumefiledata[i].resume_button_view1 =1);
            
        // }
       

            
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


            Close_Click()
            {
                this.Student_Details_View = false;
                this.Entry_View =true;
                this.Search_Student_Job_Report();
            }



Update_Resume_Status()
{
  debugger
    if(this.Resume_Status_.Resume_Status_Id===undefined || this.Resume_Status_.Resume_Status_Id==null || this.Resume_Status_.Resume_Status_Id==0)
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Resume Status ',Type: "3" }});
    return  
    }
     this.issLoading=true;

     this.Resume_Status_Change_.Resume_Status_Id =this.Resume_Status_.Resume_Status_Id;
      this.Resume_Status_Change_.Resume_Status_Name =this.Resume_Status_.Resume_Status_Name;
      this.Resume_Status_Change_.Student_Id =this.Student_Id;
    this.Student_Service_.Update_Resume_Status(this.Resume_Status_Change_).subscribe(Save_status => {
     debugger   
    // Save_status=Save_status[0];

   
  //  var  Phone =Save_status[0].Phone
    
  //  var  Student_Name =Save_status[0].Student_Name
   

    // if(Number(Save_status[0].Change_status_)==1)
    // {
    //   this.Send_Resume_Notification(this.Resume_Status_Name_,Phone,Student_Name)
    // }

    if(Number(Save_status[0].Student_Id_)>0)
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



Resume_Click()
{
    //debugger
    for(var i=0;i<this.Student_Job_Report_Data.length;i++)
    {
        if(this.select_Resume==false)
            this.Student_Job_Report_Data[i].Check_Box=true;
        else
            this.Student_Job_Report_Data[i].Check_Box=false;
    }

}


downloadZip(index_) {
  debugger
  // this.issLoading =true;
 // this.Jobposting_Report_AppliedcountdetailsData=this.Job_Posting_Data_List[index_].Jobposting_Report_AppliedcountdetailsData;
 var selectioncount=0;
     for(var i=0;i<this.Student_Job_Report_Data.length;i++)
       if(this.Student_Job_Report_Data[i].Check_Box==true)
         {
           selectioncount=1;
           break;
         }
 if(selectioncount==0)
 {
 const dialogRef = this.dialogBox.open    ( DialogBox_Component,
    {panelClass:'Dialogbox-Class',data:{Message:'Please select Student',Type:"3"}});
    return
 }
 // ;
  this.issLoadingapi=true;

 var ar=[];
 this.zip.forEach(function (relativePath, file){
   ar.push(relativePath)
    
 });
 for(var i=0;i<ar.length;i++)
     this.zip.remove(ar[i])

     var tempfile_size=0
     this.files=[];
     for(var i=0;i<this.Student_Job_Report_Data.length;i++)
     {
       if(this.Student_Job_Report_Data[i].Check_Box==true)
       {
         
         this.files.push({
          // filename: "http://oneteam1267.trackbox.co.in/Documents/Uploads/" + this.Student_Job_Report_Data[i].Image_ResumeFilename,
          filename: environment.FilePath + this.Student_Job_Report_Data[i].Image_ResumeFilename,
          Originalfilename:this.Student_Job_Report_Data[i].Image_ResumeFilename})
         // tempfile_size=tempfile_size+Number(this.Jobposting_Report_AppliedcountdetailsData[i].Album_Id) ;   "http://oneteamdemo.trackbox.co.in/bina/Uploads/"
       }
     }

     //    this.files.push({'filename': "https://www.keycdn.com/img/support/difference-between-jpeg-and-jpg-lg.webp",'Originalfilename':"difference-between-jpeg-and-jpg-lg.webp"})
        tempfile_size=120202;
     var value=((tempfile_size)/(1024))/(1024);
     this.Actualfile_size=Math.round(value);
 
     this.startDownload(0)
    
   }



private startDownload(fileId)
{
 
 // ;
 debugger;
 // this.issLoading =false;
 this.issLoading =true;
 this.loadSvgData(this.files[fileId].filename, fileId, this.saveAsZip);
 this.issLoading=false;
}
private loadSvgData(url: string,fileId, callback: Function): void {
 this._http
   .get(url, { responseType: 'arraybuffer' })
   .subscribe(x => callback(x,fileId,url));
}

saveAsZip = (content: Blob,fileid,Extenssion): void => 
{  

 
 // ;
 // var n = Extenssion.lastIndexOf(".");
 // var extn='Image'
 // extn=extn.concat(fileid)
 // extn=extn.concat('.')
 // extn=extn.concat(Extenssion.substring(n+1,Extenssion.length));
 var extn=this.files[fileid].Originalfilename
 this.zip.file(extn, content);
 fileid++;
 //debugger
 if(fileid==this.files.length)
   this.download();
 else
   this.startDownload(fileid)

};

save_zipfile(blob)
{
saveAs(blob, 'image.zip')
this.issLoadingapi=false;
}

private download() {
 // ;
 this.issLoading=false;
 this.zip
   .generateAsync({ type: 'blob' })
   .then(blob => this.save_zipfile(blob));
   //.then(blob => saveAs(blob, 'image.zip'));
}


// Send_Resume_Notification(Resume_Status_Name_,Phone,Student_Name)
// {
//   var Sms =
//   "Hi, " +
//   Student_Name +
//   " Your Resume Status is Changed to " +Resume_Status_Name_ +"."
//   debugger
//  this.Student_Service_.Send_Resume_Notification(
//   Phone,
//   Sms
//   ).subscribe(
//   (Rows) => {
//     //debugger
//   const dialogRef = this.dialogBox.open(DialogBox_Component, {
//   panelClass: "Dialogbox-Class",
//   data: { Message: Sms, Type: "false" },
//   });
  
//   this.issLoading = false;
//   },
//   (Rows) => {
//   this.issLoading = false;
//   const dialogRef = this.dialogBox.open(DialogBox_Component, {
//   panelClass: "Dialogbox-Class",
//   data: { Message: "Error Occured", Type: "2" },
//   });
//   }
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
    // this.History_Of_Interview_Schedule(Student_Id_Temp)
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










History_Of_Interview_Schedule(Student_Id_Temp)
{
    debugger
    var  company_ = "",look_In_Date_Value=0;var  Company_id_ =0,Job_id_=0;
   this.Total_Entries =0;
    if (this.Is_Date == true)
        look_In_Date_Value = 1;

        

       
    this.issLoading = true;
    debugger
    this.Job_Posting_Service_.History_Of_Interview_Schedule(Student_Id_Temp).subscribe(Rows =>{
        debugger
        this.History_Of_Interview_Schedule_Data=Rows[0];

    
        this.Total_Entries1 =  this.History_Of_Interview_Schedule_Data.length;

    this.issLoading = false;
    if(this.History_Of_Interview_Schedule_Data.length==0)
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


}

