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
import { Employer_Details } from 'app/models/Employer_Details';
import { Job_Posting } from 'app/models/Job_Posting';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Job_Rejections',
templateUrl: './Job_Rejections.component.html',
styleUrls: ['./Job_Rejections.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Job_RejectionsComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number=0;
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
    Is_Date:boolean=true;   

    Course_Data: Course[];
    Course_:Course=new Course;
    Course_Temp: Course = new Course;
    Course_Data_Filter: Course[]  

    
  // Search_Jobposting_Detailed_Data:any;
  Search_Jobposting_Detailed_Data:any;
  // Student_Job_Report_AppliedcountdetailsData:any;
  // Student_Job_Report_RejectedcountdetailsData:any;

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


   Company_Name_Search: "";
   Job_Name_Search: "";

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
Page_Length_: number = 25;
Black_Start: number = 1;
Black_Stop: number = 0;
Red_Start: number = 1;
Red_Stop: number = 0;
Total_Rows: number = 0;
missedfollowup_count: number = 1;
followup_count: number = 0;
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

   Employeedetails_Data: Employer_Details[];
    Employeedetails_:Employer_Details=new Employer_Details();
    Employeedetails_Search:Employer_Details=new Employer_Details();
    Employeedetails_Temp: Employer_Details = new Employer_Details();
    Employeedetails_Data_Filter: Employer_Details[] 

    Job_Title_Data: Job_Posting[];
    Job_Title_:Job_Posting=new Job_Posting();
    Job_Title_Search:Job_Posting=new Job_Posting();
    Job_Title_Temp: Job_Posting = new Job_Posting();
    Job_Title_Data_Filter: Job_Posting[] 

constructor(public Student_Service_:Student_Service,private _http: HttpClient, 
    public Job_Posting_Service_:Job_Posting_Service, 
    private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(73);
    this.Export_Permission=Get_Page_Permission(50);

//     this.Enable_Permissions = Get_Page_Permission(64);

// this.Disable_Permissions = Get_Page_Permission(65);
// this.Movedtoblacklist_Permissions = Get_Page_Permission(66);
// this.Removedfromblacklist_Permissions = Get_Page_Permission(67);
// this.Activate_Permissions = Get_Page_Permission(68);
// this.Deactivate_Permissions = Get_Page_Permission(69);


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
    this.Page_Load()
    if(this.Export_Permission !=undefined && this.Export_Permission !=null)
    this.Export_View=this.Export_Permission.Edit
    
    }
     
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
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Load_Enquiry_Source();
    this.Get_Lead_Load_Data();
    this.Load_Resume_Status();
    // this.Search_Student()
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight -200
    this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeight = this.myInnerHeight - 210;
    this.Search_Job_Rejections();
}

Export()
{
    
        this.Student_Service_.exportExcel(this.Search_Jobposting_Detailed_Data,'Job Rejections')
       
}
// Export_Appliedcount_Data()
// {
    
//         this.Student_Service_.exportExcel(this.Student_Job_Report_AppliedcountdetailsData,'Student_Job Applied Report')
       
// }



// Export_Rejectedcount_Data()
// {
    
//         this.Student_Service_.exportExcel(this.Student_Job_Report_RejectedcountdetailsData,'Student_Job Rejected Report')
       
// }




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
    this.issLoading = false;
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


Search_Company_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    if (this.Employeedetails_Data == undefined || this.Employeedetails_Data.length==0)
    {
        this.issLoading = true;
        //debugger
        this.Job_Posting_Service_.Search_Company_Typeahead('').subscribe(Rows => {
            //debugger
    if (Rows != null) 
    {
        this.Employeedetails_Data = Rows[0];
        this.Employeedetails_Data_Filter=[];
        this.issLoading = false;

        for (var i=0;i<this.Employeedetails_Data.length;i++)
        {
            if(this.Employeedetails_Data[i].Company_Name.toLowerCase().includes(Value))
                this.Employeedetails_Data_Filter.push(this.Employeedetails_Data[i])
        }
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 
    else
    {
        
        this.Employeedetails_Data_Filter=[];
        for (var i=0;i<this.Employeedetails_Data.length;i++)
        {
            if(this.Employeedetails_Data[i].Company_Name.toLowerCase().includes(Value))
                this.Employeedetails_Data_Filter.push(this.Employeedetails_Data[i])
        }
    }
}

display_Company(Employeedetails_e: Employer_Details)
{     
    if (Employeedetails_e) { return Employeedetails_e.Company_Name; }
}

Search_Job_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    if (this.Job_Title_Data == undefined || this.Job_Title_Data.length==0)
    {
        this.issLoading = true;
        //debugger
        this.Job_Posting_Service_.Search_Job_Typeahead('').subscribe(Rows => {
            //debugger
    if (Rows != null) 
    {
        this.Job_Title_Data = Rows[0];
        this.Job_Title_Data_Filter=[];
        this.issLoading = false;

        for (var i=0;i<this.Job_Title_Data.length;i++)
        {
            if(this.Job_Title_Data[i].Job_Title.toLowerCase().includes(Value))
                this.Job_Title_Data_Filter.push(this.Job_Title_Data[i])
        }
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 
    else
    {
        
        this.Job_Title_Data_Filter=[];
        for (var i=0;i<this.Job_Title_Data.length;i++)
        {
            if(this.Job_Title_Data[i].Job_Title.toLowerCase().includes(Value))
                this.Job_Title_Data_Filter.push(this.Job_Title_Data[i])
        }
    }
}

display_Job(Job_Title_Data_e: Job_Posting)
{     
    if (Job_Title_Data_e) { return Job_Title_Data_e.Job_Title; }
}


Search_Job_Rejections()
{
    debugger
    var  company_ = "",look_In_Date_Value=0;var  Company_id_ =0,Job_id_=0;
   this.Total_Entries =0;
    if (this.Is_Date == true)
        look_In_Date_Value = 1;

        // if (this.Company_Name_Search != undefined && this.Company_Name_Search != null && this.Company_Name_Search != "")
        // company_ = this.Company_Name_Search;

        // if (this.Job_Name_Search != undefined && this.Job_Name_Search != null && this.Job_Name_Search != "")
        // job_ = this.Job_Name_Search;

        if (this.Job_Title_ != undefined && this.Job_Title_ != null)
        if (this.Job_Title_.Job_Posting_Id != undefined && this.Job_Title_.Job_Posting_Id != null)
        Job_id_ = this.Job_Title_.Job_Posting_Id;

        if (this.Employeedetails_ != undefined && this.Employeedetails_ != null)
        if (this.Employeedetails_.Employer_Details_Id != undefined && this.Employeedetails_.Employer_Details_Id != null)
        Company_id_ = this.Employeedetails_.Employer_Details_Id;  
        
    this.issLoading = true;
    debugger
    this.Job_Posting_Service_.Search_Job_Rejections(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD')).subscribe(Rows =>{
        debugger
        this.Search_Jobposting_Detailed_Data=Rows[0];


       


      
        this.Total_Entries =  this.Search_Jobposting_Detailed_Data.length;

    this.issLoading = false;
    if(this.Search_Jobposting_Detailed_Data.length==0)
    { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    }
    this.issLoading=false;
    },
    Rows => 
    { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
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


            // Close_Click()
            // {
            //     this.Student_Details_View = false;
            //     this.Entry_View =true;
            //     this.Search_Student_Job_Report();
            // }



// Update_Resume_Status()
// {
//     if(this.Resume_Status_.Resume_Status_Id===undefined || this.Resume_Status_.Resume_Status_Id==null || this.Resume_Status_.Resume_Status_Id==0)
//     {
//     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Resume Status ',Type: "3" }});
//     return  
//     }
//      this.issLoading=true;

//      this.Resume_Status_Id_ =this.Resume_Status_.Resume_Status_Id;
//       this.Resume_Status_Name_ =this.Resume_Status_.Resume_Status_Name;

//     this.Student_Service_.Update_Resume_Status(this.Resume_Status_Id_,this.Resume_Status_Name_,this.Student_Id).subscribe(Save_status => {
//      debugger   
//     Save_status=Save_status[0];
//     if(Number(Save_status[0].Student_Id_)>0)
//     {
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
//     this.Close_Click();
//     }
//     else{
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//     }
//     this.issLoading=false;
//     },
//     Rows => { 
//     this.issLoading=false;
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
//     });
// }




}

