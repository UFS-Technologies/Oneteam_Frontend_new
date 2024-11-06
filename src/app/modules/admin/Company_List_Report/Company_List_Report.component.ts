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
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Candidate_Job_Apply } from 'app/models/Candidate_Job_Apply';
import { Employer_Details } from 'app/models/Employer_Details';
import { Job_Posting } from 'app/models/Job_Posting';
import { Interview_Schedule } from 'app/models/Interview_Schedule';
import { Placement_Schedule } from 'app/models/Placement_Schedule';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Company_List_Report',
templateUrl: './Company_List_Report.component.html',
styleUrls: ['./Company_List_Report.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Company_List_ReportComponent implements OnInit {
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

    Scheduleinterview_View:boolean=false;

    User_Search: Users = new Users();
    Users_Data: Users[]
    Users_Temp: Users = new Users();

    Enquiry_Status_Search: Status=new Status();
    Enquiry_Status_Data: Status[]
    Enquiry_Status_Temp: Status=new Status();


    Interview_Schedule_: Interview_Schedule=new Interview_Schedule();
    Interview_Schedule_Data: Interview_Schedule[]
    Interview_Schedule_Temp: Interview_Schedule=new Interview_Schedule();

    Placement_Schedule_: Placement_Schedule =new Placement_Schedule ();
    Placement_Schedule_Data: Placement_Schedule []
    Placement_Schedule_Temp: Placement_Schedule  =new Placement_Schedule ();

    // Search_Status: Status = new Status;
    // Search_Status_Temp: Status = new Status;
    // Status_Data: Status[];


    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
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

    
  Company_List_Report_Data:any;
  Company_List_Report_AppliedcountdetailsData:any;
  Company_List_Report_Appliedcountdetails_Full_Data:any;
  Company_List_Report_Appliedcountdetails_Placed_Data:any;
  Company_List_Report_RejectedcountdetailsData:any;

  Job_Posting_Data_List:Job_Posting_Array[];

  Resumefiledata:any;
    Edit_Page_Permission: any;

    Enquiry_Source_: Enquiry_Source = new Enquiry_Source;
    Enquiry_Source_Temp: Enquiry_Source = new Enquiry_Source;
    Enquiry_Source_Data: Enquiry_Source[] 

    select_Resume:boolean=false;
    Applied_Resume_Check_Box:boolean=false;
    
    Search_Name: "";
    Company_Name: "";
    Search_Job:"";
    jobpositingid:number=0;
    student_id: number;
   Student_: Student = new Student();

   Interview_Schedule_Date:string="";
   Interview_Schedule_Description:string;

    Mark_Placement_Date:string="";
    Mark_Placement_Description:string;
   Mark_Placement_View:boolean=false;

   resume_button_view:number;
   JobPostingId_Public:number;
   JobTitle_Public:string;

   Interview_Status_ :number =-1 ;
   Placement_Status_ :number  =-1 ;
   Inteview_Attending_Status_ :number =0 ;

   Interview_Schedule_Details_ : Candidate_Job_Apply =new Candidate_Job_Apply();

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

    Page_Length_: number = 50;
    Pointer_Start_: number;
    Pointer_Stop_: number;
    nextflag: number;
    Search_Company:string;
    Company_Name_Public:string;

    company_name_zip:string;


   issLoadingapi:boolean;
   zip = new JSZip();
   files = [
];
Actualfile_size:number;
Resume_Data:any;
selectedDataArray:any=[];

constructor(public Student_Service_:Student_Service,private _http: HttpClient, 
    public Job_Posting_Service_:Job_Posting_Service, 
    private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(77);
    this.Export_Permission=Get_Page_Permission(50);
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
    this.select_Resume=false;
    this.Applied_Resume_Check_Box=false;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Load_Enquiry_Source();
    this.Get_Lead_Load_Data();
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight -170
    this.myTotalHeight=this.myTotalHeight-250;
    this.myInnerHeight = this.myInnerHeight - 220;
    this.Pointer_Start_ = 1;
    this.Pointer_Stop_ = this.Page_Length_;
    this.Search_Company_List_Report();
}

Export()
{
    
        this.Student_Service_.exportExcel(this.Company_List_Report_Data,'Jobposting Report')
       
}
Export_Appliedcount_Data()
{
    
        this.Student_Service_.exportExcel(this.selectedDataArray,'Jobposting Applied Report')
       
}



Export_Rejectedcount_Data()
{
    
        this.Student_Service_.exportExcel(this.Company_List_Report_RejectedcountdetailsData,'Jobposting Rejected Report')
       
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
Edit_Lead(Student_Id, i) {

    localStorage.setItem('Student_Id', Student_Id);
    console.log(Student_Id)
    this.Edit_Page_Permission = Get_Page_Permission(14);
    if (this.Edit_Page_Permission == undefined) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
    }
    else if (this.Edit_Page_Permission.View == true)
       // this.router.navigateByUrl('/Stu');
      // window.open('/Student')
      this.goToLink();
    else {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
    }
}
goToLink() {
    
    return;
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/Student'])
    );
    // window.open('/Student');
    window.open(url, '_blank');
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
        
        this.Job_Posting_Service_.Search_Company_Typeahead('').subscribe(Rows => {
            
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
        
        this.Job_Posting_Service_.Search_Job_Typeahead('').subscribe(Rows => {
            
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

Search_Company_List_Report()
{
    var  search_name_ = undefined,look_In_Date_Value=0,Company_id_ =0,Job_id_=0;
   this.Total_Entries =0;
    if (this.Is_Date == true)
        look_In_Date_Value = 1;

        

        if (this.Employeedetails_ != undefined && this.Employeedetails_ != null)
        if (this.Employeedetails_.Employer_Details_Id != undefined && this.Employeedetails_.Employer_Details_Id != null)
        Company_id_ = this.Employeedetails_.Employer_Details_Id;  
        
    this.issLoading = true;
   debugger
    this.Job_Posting_Service_.Search_Company_List_Report(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),Company_id_
    ,this.Pointer_Start_,
    this.Pointer_Stop_,
    this.Page_Length_).subscribe(Rows =>{
        debugger
        this.Company_List_Report_Data=Rows[0];
      
        this.Total_Entries =  this.Company_List_Report_Data.length;

    this.issLoading = false;
    if(this.Company_List_Report_Data.length==0)
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
Next_Click() {
   
    if (this.Company_List_Report_Data.length == this.Page_Length_) {
        this.Pointer_Start_ = this.Pointer_Start_ + this.Page_Length_;
        this.Pointer_Stop_ = this.Pointer_Stop_ + this.Page_Length_;
        this.nextflag = 1;
        if (this.Company_List_Report_Data.length > 0) {
            this.Search_Company_List_Report();
        }
    }

    else {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "No Other Details", Type: "3" },
        });
        }

  }
  
  previous_Click() {
   
    if (this.Pointer_Start_ > 1) {
        this.Pointer_Start_ = this.Pointer_Start_ - this.Page_Length_;
        this.Pointer_Stop_ = this.Pointer_Stop_ - this.Page_Length_;
        this.Search_Company_List_Report();
    }

    else {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "No Other Details", Type: "3" },
        });
        }
  }
  
  







}

