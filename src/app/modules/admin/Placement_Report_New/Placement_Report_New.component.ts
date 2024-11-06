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
import { sum } from 'chartist';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Placement_Report_New',
templateUrl: './Placement_Report_New.component.html',
styleUrls: ['./Placement_Report_New.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Placement_Report_NewComponent implements OnInit {
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

    
  Placement_Report_New_Data:any;
  Placement_Report_New_AppliedcountdetailsData:any;
  Placement_Report_New_Appliedcountdetails_Full_Data:any;
  Placement_Report_New_Appliedcountdetails_Placed_Data:any;
  Placement_Report_New_RejectedcountdetailsData:any;

  Job_Posting_Data_List:Job_Posting_Array[];

  Resumefiledata:any;
    Edit_Page_Permission: any;

    Jobs: number ;
    Vacancies: number=0; 

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
   Interview_Time:string;
   Interview_Location:string;

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


    Faculty_Data: Users[];
    Faculty_:Users=new Users;
    Faculty_Temp: Users = new Users;
    Faculty_Data_Filter: Users[];


    company_name_zip:string;
    Interview_Scheduled_Details_Data:any;

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
    this.Permissions = Get_Page_Permission(82);
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
    this.Search_Placement_Report_New();
}

Export()
{
    
        this.Student_Service_.exportExcel(this.Placement_Report_New_Data,'Jobposting Report')
       
}
Export_Appliedcount_Data()
{
    
        this.Student_Service_.exportExcel(this.selectedDataArray,'Jobposting Applied Report')
       
}



Export_Rejectedcount_Data()
{
    
        this.Student_Service_.exportExcel(this.Placement_Report_New_RejectedcountdetailsData,'Jobposting Rejected Report')
       
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

Search_Placement_Report_New()
{
    var  search_name_ = undefined,look_In_Date_Value=0,Company_id_ =0,Job_id_=0,Course_Id_=0,Faculty_Id=0;
   this.Total_Entries =0;
    if (this.Is_Date == true)
        look_In_Date_Value = 1;

        // if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
        // search_name_ = this.Search_Name;

        // if (this.Employeedetails_ != undefined && this.Employeedetails_ != null && this.Employeedetails_ != '')
        // Company_Name_ = this.Company_Name;

        if (this.Faculty_ != undefined && this.Faculty_ != null)
    if (this.Faculty_.Users_Id != undefined && this.Faculty_.Users_Id != null)
    Faculty_Id = this.Faculty_.Users_Id;

        if (this.Job_Title_ != undefined && this.Job_Title_ != null)
        if (this.Job_Title_.Job_Posting_Id != undefined && this.Job_Title_.Job_Posting_Id != null)
        Job_id_ = this.Job_Title_.Job_Posting_Id;

        if (this.Employeedetails_ != undefined && this.Employeedetails_ != null)
        if (this.Employeedetails_.Employer_Details_Id != undefined && this.Employeedetails_.Employer_Details_Id != null)
        Company_id_ = this.Employeedetails_.Employer_Details_Id;  


        if (this.Course_ != undefined && this.Course_ != null)
        if (this.Course_.Course_Id != undefined && this.Course_.Course_Id != null)
        Course_Id_ = this.Course_.Course_Id;  
        
    this.issLoading = true;
   
    this.Job_Posting_Service_.Search_Placement_Report_New(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),Faculty_Id,
    Course_Id_
    ,this.Pointer_Start_,
    this.Pointer_Stop_,
    this.Page_Length_).subscribe(Rows =>{
       debugger
        this.Placement_Report_New_Data=Rows[0];
      
        this.Total_Entries =  this.Placement_Report_New_Data.length;
        // this.Jobs =  this.Placement_Report_New_Data.length;
        // this.Vacancies =  sum(0,this.Placement_Report_New_Data[i].No_Of_Vaccancy);

        let Vacancies = 0;

        for (let i = 0; i < this.Placement_Report_New_Data.length; i++) {
        //   Vacancies = sum(0,this.Placement_Report_New_Data[i].No_Of_Vaccancy);
          Vacancies = Number(Vacancies) + Number(this.Placement_Report_New_Data[i].No_Of_Vaccancy);
        }
        
        this.Vacancies = Vacancies;
        

    this.issLoading = false;
    if(this.Placement_Report_New_Data.length==0)
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
   
    if (this.Placement_Report_New_Data.length == this.Page_Length_) {
        this.Pointer_Start_ = this.Pointer_Start_ + this.Page_Length_;
        this.Pointer_Stop_ = this.Pointer_Stop_ + this.Page_Length_;
        this.nextflag = 1;
        if (this.Placement_Report_New_Data.length > 0) {
            this.Search_Placement_Report_New();
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
        this.Search_Placement_Report_New();
    }

    else {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "No Other Details", Type: "3" },
        });
        }
  }
  
  
Show_interview_Scheduled(status_id)
{

    
    this.Show_Placement_Interview_Scheduled(this.Placement_Status_, status_id,this.Inteview_Attending_Status_)
    // 
    // this.Placement_Report_New_AppliedcountdetailsData=[];
    // for (var i=0;i<this.Placement_Report_New_Appliedcountdetails_Full_Data.length;i++)
    // {
    //     if(this.Placement_Report_New_Appliedcountdetails_Full_Data[i].Interview_Status==status_id)
    //     {
    //         this.Placement_Report_New_AppliedcountdetailsData.push(this.Placement_Report_New_Appliedcountdetails_Full_Data[i])
    //     }
    // }
}

Show_Placement_Scheduled(placement_status)
{
    
    this.Show_Placement_Interview_Scheduled(placement_status,this.Interview_Status_,this.Inteview_Attending_Status_)
    // this.Placement_Report_New_AppliedcountdetailsData=[];
    // for (var i=0;i<this.Placement_Report_New_Appliedcountdetails_Placed_Data.length;i++)
    // {
    //             if(this.Placement_Report_New_Appliedcountdetails_Placed_Data[i].Placement_Status==placement_status || placement_status ==-1
    //     )  
    //         this.Placement_Report_New_AppliedcountdetailsData.push(this.Placement_Report_New_Appliedcountdetails_Placed_Data[i])
    //     }
    // }
}


Show_Inteview_Attending_Status(inteview_attending_status_)
{
   
    debugger
    this.Show_Placement_Interview_Scheduled(this.Placement_Status_,this.Interview_Status_,inteview_attending_status_,)
   
}

Show_Placement_Interview_Scheduled(placement_status, Interview_Status,inteview_attending_status)
{
    debugger
    this.Placement_Report_New_AppliedcountdetailsData=[];
    for (var i=0;i<this.Placement_Report_New_Appliedcountdetails_Placed_Data.length;i++)
    {
        
        // if(this.Placement_Report_New_Appliedcountdetails_Placed_Data[i].Placement_Status==placement_status)
        if((this.Placement_Report_New_Appliedcountdetails_Placed_Data[i].Placement_Status==placement_status || placement_status ==-1
        ) && (this.Placement_Report_New_Appliedcountdetails_Placed_Data[i].Interview_Status==Interview_Status || Interview_Status ==-1)
        && (this.Placement_Report_New_Appliedcountdetails_Placed_Data[i].Interview_Attending_Rejecting==inteview_attending_status || inteview_attending_status ==0)
            )
        {
            this.Placement_Report_New_AppliedcountdetailsData.push(this.Placement_Report_New_Appliedcountdetails_Placed_Data[i])
        }
    }
}





// Show_Inteview_Attending_Status_Scheduled(inteview_attending_status, Interview_Status,placement_status)
// {
    
//     this.Placement_Report_New_AppliedcountdetailsData=[];
//     for (var i=0;i<this.Placement_Report_New_Appliedcountdetails_Placed_Data.length;i++)
//     {
//         if((this.Placement_Report_New_Appliedcountdetails_Placed_Data[i].Placement_Status==placement_status || placement_status ==-1
//         ) && (this.Placement_Report_New_Appliedcountdetails_Placed_Data[i].Interview_Status==Interview_Status || Interview_Status ==-1)
//         && (this.Placement_Report_New_Appliedcountdetails_Placed_Data[i].Interview_Status==inteview_attending_status || inteview_attending_status ==-1)
//             )
//         {
//             this.Placement_Report_New_AppliedcountdetailsData.push(this.Placement_Report_New_Appliedcountdetails_Placed_Data[i])
//         }
//     }
// }

Search_Appliedcount_Details(JobPostingId,JobTitle,Company_Name)
{
   
    this.Appliedcount_Div=true;
    this.Entry_View=false;
    this.select_Resume =false;
    // var  JobPostingId= 0;

    this.JobPostingId_Public =JobPostingId;
    this.JobTitle_Public =JobTitle;
    this.Company_Name_Public =Company_Name;
    this.issLoading = true;
    
    this.Job_Posting_Service_.Search_Appliedcount_Details(JobPostingId,JobTitle).subscribe(Rows =>{
        this.Placement_Report_New_AppliedcountdetailsData=Rows[0];
        
        for (var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
        {
            if(this.Placement_Report_New_AppliedcountdetailsData[i].Placement_Status==1)
            {
                this.Placement_Report_New_AppliedcountdetailsData[i].Placement_Status_Name="Placed"
            }
            else (this.Placement_Report_New_AppliedcountdetailsData[i].Placement_Status_Name = "Not Placed");
            
        }

        for (var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
        {
            if(this.Placement_Report_New_AppliedcountdetailsData[i].Interview_Status==1)
            {
                this.Placement_Report_New_AppliedcountdetailsData[i].Interview_Status_Name="Inteview Scheduled"
            }
            else (this.Placement_Report_New_AppliedcountdetailsData[i].Interview_Status_Name = "Inteview Not Scheduled");
            
        }


        // for (var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
        // {
        //     if(this.Placement_Report_New_AppliedcountdetailsData[i].Interview_Attending_Rejecting==1)
        //     {
        //         this.Placement_Report_New_AppliedcountdetailsData[i].Interview_Attending_Rejecting_Name="Inteview Apply"
        //     }
        //     if(this.Placement_Report_New_AppliedcountdetailsData[i].Interview_Attending_Rejecting==2)
        //     {
        //         this.Placement_Report_New_AppliedcountdetailsData[i].Interview_Attending_Rejecting_Name="Inteview Reject"
        //     }
        //     if(this.Placement_Report_New_AppliedcountdetailsData[i].Interview_Attending_Rejecting==3)
        //     {
        //         this.Placement_Report_New_AppliedcountdetailsData[i].Interview_Attending_Rejecting_Name="Not Responded"
        //     }
        // }


        for (var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
        {
            if(this.Placement_Report_New_AppliedcountdetailsData[i].Image_ResumeFilename==null||this.Placement_Report_New_AppliedcountdetailsData[i].Image_ResumeFilename==undefined||this.Placement_Report_New_AppliedcountdetailsData[i].Image_ResumeFilename=="")
            {
                this.Placement_Report_New_AppliedcountdetailsData[i].resume_button_view =0
            }
            else ( this.Placement_Report_New_AppliedcountdetailsData[i].resume_button_view =1);
            
        }
       
      debugger  

 this.selectedDataArray = [];
for (var i = 0; i < this.Placement_Report_New_AppliedcountdetailsData.length; i++) {
  var data = this.Placement_Report_New_AppliedcountdetailsData[i];
  var selectedData = {
    Student_Name: data.Student_Name,
    Company: data.Company,
    Mobile: data.Mobile,
    Image_ResumeFilename: data.Image_ResumeFilename,
    Placement_Status: data.Placement_Status_Name,
    Interview_Status: data.Interview_Status_Name,
    CourseName: data.CourseName,
  };

  this.selectedDataArray.push(selectedData);
}




        this.Placement_Report_New_Appliedcountdetails_Full_Data=Rows[0];
        this.Placement_Report_New_Appliedcountdetails_Placed_Data=Rows[0];
        
        this.Search_Job = JobTitle
        this.Search_Company = Company_Name
        this.Total_Entries_Appliedcount =this.Placement_Report_New_AppliedcountdetailsData.length;
       
    this.issLoading = false;
    if(this.Placement_Report_New_AppliedcountdetailsData.length==0)
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


Search_Rejectedcount_Details(JobPostingIdrejected,JobTitleRejected)
{
   
    this.Rejectedcount_Div=true;
    this.Appliedcount_Div=false;
    this.Entry_View=false;

    this.issLoading = true;
   
    this.Job_Posting_Service_.Search_Rejectedcount_Details(JobPostingIdrejected,JobTitleRejected).subscribe(Rows =>{
        this.Placement_Report_New_RejectedcountdetailsData=Rows[0];
       
        this.Search_Job = JobTitleRejected
        this.Total_Entries_Rejectedcount =this.Placement_Report_New_RejectedcountdetailsData.length;
       
    this.issLoading = false;
    if(this.Placement_Report_New_RejectedcountdetailsData.length==0)
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


Download_Resume_File(File_Name,StudentId) {
    
    this.issLoading = true;
    
    this.Job_Posting_Service_.Get_Resumefilefor_Report(StudentId).subscribe(
    (Rows) => {
        this.Resumefiledata=Rows[0];
    this.issLoading = false;
    var File_Name_Temp;
    if(File_Name=='Image_ResumeFilename')
    
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


    Download_ResumeRejected_File(File_Name,StudentId) {
        
        this.issLoading = true;
        
        this.Job_Posting_Service_.Get_Resumefilefor_Report(StudentId).subscribe(
        (Rows) => {
            this.Resumefiledata=Rows[0];
        this.issLoading = false;
        var File_Name_Temp;
        if(File_Name=='Image_ResumeFilename')
        
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
    

    Download_Resume_File_1(File_Name)
    {
    
    var File_Name_Temp;
    if(File_Name=='Image_ResumeFilename')
    
    // for (var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
    // {
        File_Name_Temp=this.Placement_Report_New_AppliedcountdetailsData.Image_ResumeFilename;  
    // }
    
    // var bs= environment.FilePath;//'C:/Teena/Edabroad/Back End/Uploads/'
    var bs= environment.FilePath;
    var s=bs+File_Name_Temp;
    window.open(s,'_blank');  
    
    }
    


ViewDetails_AppliedCount()
{
    this.Appliedcount_Div=true;
    this.Entry_View=false;
}

Close_Applied_count()
{
    this.Appliedcount_Div=false;
    this.Entry_View=true;
    // this.Search_Placement_Report_New();
}


ViewDetails_RejectedCount()
{
    this.Rejectedcount_Div=true;
    this.Appliedcount_Div=false;
    this.Entry_View=false;
}

Close_RejectedCount()
{
    this.Appliedcount_Div=false;
    this.Rejectedcount_Div=false;
    this.Entry_View=true;
}



Download_ResumeRejected_File1(File_Name)
{

var File_Name_Temp;
if(File_Name=='Image_ResumeFilename')

for (var i=0;i<this.Placement_Report_New_RejectedcountdetailsData.length;i++)
{
    File_Name_Temp=this.Placement_Report_New_RejectedcountdetailsData[0].Image_ResumeFilename;  
}

var bs= environment.FilePath;//'C:/Teena/Edabroad/Back End/Uploads/'
var s=bs+File_Name_Temp;
window.open(s,'_blank');  

}


Resume_Click()
{
    
    for(var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
    {
        if(this.select_Resume==false)
            this.Placement_Report_New_AppliedcountdetailsData[i].Check_Box=true;
        else
            this.Placement_Report_New_AppliedcountdetailsData[i].Check_Box=false;
    }

}


// downloadZip(index_) {
//     
//     //  this.issLoading =true;
//     // this.Placement_Report_New_AppliedcountdetailsData=this.Job_Posting_Data_List[index_].Placement_Report_New_AppliedcountdetailsData;
//     var selectioncount=0;
//         for(var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
//           if(this.Placement_Report_New_AppliedcountdetailsData[i].Check_Box==true)
//             {
//               selectioncount=1;
//               break;
//             }
//     if(selectioncount==0)
//     {
//     const dialogRef = this.dialogBox.open    ( DialogBox_Component,
//        {panelClass:'Dialogbox-Class',data:{Message:'Please select Student',Type:"3"}});
//        return
//     }
//     // ;
//     this.issLoadingapi=true;
  
//     var ar=[];
//     this.zip.forEach(function (relativePath, file){
//       ar.push(relativePath)
       
//     });
//     for(var i=0;i<ar.length;i++)
//         this.zip.remove(ar[i])

//         var tempfile_size=0
//         this.files=[];
//         for(var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
//         {
//           if(this.Placement_Report_New_AppliedcountdetailsData[i].Check_Box==true)
//           {
            
//             this.files.push({'filename':environment.FilePath + this.Placement_Report_New_AppliedcountdetailsData[i].Image_ResumeFilename,'Originalfilename':this.Placement_Report_New_AppliedcountdetailsData[i].Image_ResumeFilename})
//             // tempfile_size=tempfile_size+Number(this.Placement_Report_New_AppliedcountdetailsData[i].Album_Id) ;   "http://oneteamdemo.trackbox.co.in/bina/Uploads/"
//           }
//         }

//         //    this.files.push({'filename': "https://www.keycdn.com/img/support/difference-between-jpeg-and-jpg-lg.webp",'Originalfilename':"difference-between-jpeg-and-jpg-lg.webp"})
//            tempfile_size=120202;
//         var value=((tempfile_size)/(1024))/(1024);
//         this.Actualfile_size=Math.round(value);
    
//         this.startDownload(0)
//         // this.issLoading=false;
//       }

downloadZip(index_) {
   debugger
   //  this.issLoading =true;
   // this.Placement_Report_New_AppliedcountdetailsData=this.Job_Posting_Data_List[index_].Placement_Report_New_AppliedcountdetailsData;
   var selectioncount=0;
       for(var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
         if(this.Placement_Report_New_AppliedcountdetailsData[i].Check_Box==true)
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
       for(var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
       {
         if(this.Placement_Report_New_AppliedcountdetailsData[i].Check_Box==true)
         {
           
           //this.files.push({'filename':environment.FilePath + this.Placement_Report_New_AppliedcountdetailsData[i].Image_ResumeFilename,'Originalfilename':this.Placement_Report_New_AppliedcountdetailsData[i].Image_ResumeFilename})
           this.files.push({
               filename: environment.FilePath + this.Placement_Report_New_AppliedcountdetailsData[i].Image_ResumeFilename,
               Originalfilename: this.Placement_Report_New_AppliedcountdetailsData[i].Image_ResumeFilename,
             });
            //console.log(this.files)
           // tempfile_size=tempfile_size+Number(this.Placement_Report_New_AppliedcountdetailsData[i].Album_Id) ;   "http://oneteamdemo.trackbox.co.in/bina/Uploads/"
         }
       }





    //    for (var i = 0; i < this.Placement_Report_New_AppliedcountdetailsData.length; i++) {
    //     if (this.Placement_Report_New_AppliedcountdetailsData[i].Check_Box == true) {
    //       const fileWithExtension = this.Placement_Report_New_AppliedcountdetailsData[i].Image_ResumeFilename;
    //       const fileExtension = fileWithExtension.split('.').pop();
      
    //       if (fileExtension && fileExtension === 'pdf') {
    //         this.files.push({
    //           filename: environment.FilePath + fileWithExtension,
    //           Originalfilename: fileWithExtension,
    //         });
    //       }
    //     }
    //   }
      




       //    this.files.push({'filename': "https://www.keycdn.com/img/support/difference-between-jpeg-and-jpg-lg.webp",'Originalfilename':"difference-between-jpeg-and-jpg-lg.webp"})
          tempfile_size=120202;
       var value=((tempfile_size)/(1024))/(1024);
       this.Actualfile_size=Math.round(value);
     
           this.startDownload(0)

      
       // this.issLoading=false;
     }


private startDownload(fileId)
  {
    
    // ;
   ;
    // this.issLoading =false;
    debugger
    this.issLoading =true;
    this.loadSvgData(this.files[fileId].filename, fileId, this.saveAsZip);
    this.issLoading =false;
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
    
    if(fileid==this.files.length)
      this.download();
    else
      this.startDownload(fileid)

  };

save_zipfile(blob)
{
    debugger
    this.company_name_zip =this.Company_Name_Public+'.zip'
//   saveAs(blob, 'image.zip')
    saveAs(blob, this.company_name_zip)
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



Schedule_Interview()
{

    var selectioncount=0,Interviewschedulecount=0;
    for(var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
      if(this.Placement_Report_New_AppliedcountdetailsData[i].Check_Box==true)
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

debugger

for(var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
if(this.Placement_Report_New_AppliedcountdetailsData[i].Check_Box==true)
{
    if(this.Placement_Report_New_AppliedcountdetailsData[i].Interview_Status==1)
        {
          Interviewschedulecount=1;
          break;
        }
}
      
if(Interviewschedulecount==1)
{
const dialogRef = this.dialogBox.open    ( DialogBox_Component,
   {panelClass:'Dialogbox-Class',data:{Message:'Already interview scheduled students are in the selected list ',Type:"3"}});
   return
}



else
{
//  this.Interview_Schedule_Date=this.New_Date(this.Interview_Schedule_Date)
 this.Scheduleinterview_View=true;
 this.Entry_View=false;
 this.Appliedcount_Div=false;
}

}


Close_Schedule_Interview()
{
    
    this.clr_Schedule_Interview(); 
    this.Scheduleinterview_View=false;
    this.Entry_View=false;
    this.Appliedcount_Div=true; 
    this.Interview_Schedule_Date="";
     
}

clr_Schedule_Interview()
{   
    // this.Interview_Schedule_Date=this.New_Date(this.Interview_Schedule_Date)
    this.Interview_Schedule_Description="";
    this.Interview_Location="";
    this.Interview_Time="";

}

 
// Save_Schedule_Interview()
// {
    
//     if (this.Interview_Schedule_Date == undefined || this.Interview_Schedule_Date == null ||this.Interview_Schedule_Date == "" ) 
//     {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Schedule Date', Type: "3" } });
//         return;
//     } 
//     if (this.Interview_Schedule_Description == undefined || this.Interview_Schedule_Description == null || this.Interview_Schedule_Description == "" ) 
//     {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Description', Type: "3" } });
//         return;
//     }

 
   
// 
//     var temp_Applied_jobs='';
//     for(var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
//         {
//           if(this.Placement_Report_New_AppliedcountdetailsData[i].Check_Box==true)
//           {
//             temp_Applied_jobs=temp_Applied_jobs + this.Placement_Report_New_AppliedcountdetailsData[i].Applied_Jobs_Id + ','
//           }
//         }
//         temp_Applied_jobs=temp_Applied_jobs.substring(0,temp_Applied_jobs.length-1)


//         var temp_Student_d='';
//         for(var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
//             {
//               if(this.Placement_Report_New_AppliedcountdetailsData[i].Check_Box==true)
//               {
//                 temp_Student_d=temp_Student_d + this.Placement_Report_New_AppliedcountdetailsData[i].Student_Id + ','
//               }
//             }
//             temp_Student_d=temp_Student_d.substring(0,temp_Student_d.length-1)


//     
//     this.Interview_Schedule_Date = this.New_Date(new Date(moment(this.Interview_Schedule_Date).format("YYYY-MM-DD")) );
  
    
//     this.Interview_Schedule_.Interview_Schedule_Date =  this.Interview_Schedule_Date;
//     this.Interview_Schedule_.Applied_jobs =  temp_Applied_jobs;
//     this.Interview_Schedule_.Interview_Schedule_Description =  this.Interview_Schedule_Description;
//     this.Interview_Schedule_.Login_User =  this.Login_User;
//     this.Interview_Schedule_.Student_Id =  temp_Student_d;




//  this.issLoading = true;
//     this.Job_Posting_Service_.Save_Schedule_Interview(this.Interview_Schedule_Date,temp_Applied_jobs,this.Interview_Schedule_Description,this.Login_User,temp_Student_d).subscribe(Save_status => {
//         
//         if(Number(Save_status[0][0].status_)>0)
//         { 
//             this.issLoading=false;
//         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
//         //    this.Save_Call_Status = false;
//             this.Search_Appliedcount_Details(this.JobPostingId_Public, this.JobTitle_Public);
//             this.Close_Schedule_Interview()
//         }
//         else 
//         {  
//             this.issLoading=false;
//         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error ',Type:"2"}});
//             //  this.Save_Call_Status = false;
//         }
//         },
//         Rows => { 
//         this.issLoading=false;
//         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//             // this.Save_Call_Status = false;
//     });
// }




Save_Schedule_Interview()
{
   
    
    if (this.Interview_Schedule_Date == undefined || this.Interview_Schedule_Date == null ||this.Interview_Schedule_Date == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Schedule Date', Type: "3" } });
        return;
    } 
    if (this.Interview_Schedule_Description == undefined || this.Interview_Schedule_Description == null || this.Interview_Schedule_Description == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Description', Type: "3" } });
        return;
    }

    if (this.Interview_Time == undefined || this.Interview_Time == null || this.Interview_Time == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Interview Time', Type: "3" } });
        return;
    }


    if (this.Interview_Location == undefined || this.Interview_Location == null || this.Interview_Location == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Interview Location', Type: "3" } });
        return;
    }


 
   

    var temp_Applied_jobs='';
    for(var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
        {
          if(this.Placement_Report_New_AppliedcountdetailsData[i].Check_Box==true)
          {
            temp_Applied_jobs=temp_Applied_jobs + this.Placement_Report_New_AppliedcountdetailsData[i].Applied_Jobs_Id + ','
          }
        }
        temp_Applied_jobs=temp_Applied_jobs.substring(0,temp_Applied_jobs.length-1)


        var temp_Student_d='';
        for(var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
            {
              if(this.Placement_Report_New_AppliedcountdetailsData[i].Check_Box==true)
              {
                temp_Student_d=temp_Student_d + this.Placement_Report_New_AppliedcountdetailsData[i].Student_Id + ','
              }
            }
            temp_Student_d=temp_Student_d.substring(0,temp_Student_d.length-1)


   
    this.Interview_Schedule_Date = this.New_Date(new Date(moment(this.Interview_Schedule_Date).format("YYYY-MM-DD")) );
  
    
    this.Interview_Schedule_.Interview_Schedule_Date =  this.Interview_Schedule_Date;
    this.Interview_Schedule_.Applied_jobs =  temp_Applied_jobs;
    this.Interview_Schedule_.Interview_Schedule_Description =  this.Interview_Schedule_Description;
    this.Interview_Schedule_.Login_User =  this.Login_User;
    this.Interview_Schedule_.Student_Id =  temp_Student_d;
    this.Interview_Schedule_.Job_Id = this.JobPostingId_Public

    this.Interview_Schedule_.Interview_Location =  this.Interview_Location;
    this.Interview_Schedule_.Interview_Time = this.Interview_Time;





 this.issLoading = true;
    this.Job_Posting_Service_.Save_Schedule_Interview(this.Interview_Schedule_).subscribe(Save_status => {
       
        if(Number(Save_status[0].status_)>0)
        { 
            this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
        //    this.Save_Call_Status = false;
            this.Search_Appliedcount_Details(this.JobPostingId_Public, this.JobTitle_Public, this.Company_Name_Public);
            this.Close_Schedule_Interview()
        }
        else 
        {  
            this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error ',Type:"2"}});
            //  this.Save_Call_Status = false;
        }
        },
        Rows => { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            // this.Save_Call_Status = false;
    });
}


Mark_Placement()
{
//  this.Mark_Placement_Date=this.New_Date(this.Mark_Placement_Date)
var selectioncount=0;
    for(var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
      if(this.Placement_Report_New_AppliedcountdetailsData[i].Check_Box==true)
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
else
{
    this.Mark_Placement_View=true;
    this.Entry_View=false;
    this.Appliedcount_Div=false;
}

}

Close_Mark_Placement()
{
    
    this.clr_Mark_Placement(); 
    this.Mark_Placement_View=false;
    this.Entry_View=false;
    this.Appliedcount_Div=true;
    this.Mark_Placement_Date =""; 
    
}

clr_Mark_Placement()
{   
    // this.Mark_Placement_Date=this.New_Date(this.Mark_Placement_Date)
    this.Mark_Placement_Description="";
}

 
Save_Mark_Placement()
{
    
    if (this.Mark_Placement_Date == undefined || this.Mark_Placement_Date == null|| this.Mark_Placement_Date == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Schedule Date', Type: "3" } });
        return;
    } 
    if (this.Mark_Placement_Description == undefined || this.Mark_Placement_Description == null || this.Mark_Placement_Description == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Description', Type: "3" } });
        return;
    }
   

    var temp_Applied_jobs='';
    for(var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
        {
          if(this.Placement_Report_New_AppliedcountdetailsData[i].Check_Box==true)
          {
            temp_Applied_jobs=temp_Applied_jobs + this.Placement_Report_New_AppliedcountdetailsData[i].Applied_Jobs_Id + ','
          }
        }
        temp_Applied_jobs=temp_Applied_jobs.substring(0,temp_Applied_jobs.length-1)


        var temp_Student_d='';
        for(var i=0;i<this.Placement_Report_New_AppliedcountdetailsData.length;i++)
            {
              if(this.Placement_Report_New_AppliedcountdetailsData[i].Check_Box==true)
              {
                temp_Student_d=temp_Student_d + this.Placement_Report_New_AppliedcountdetailsData[i].Student_Id + ','
              }
            }
            temp_Student_d=temp_Student_d.substring(0,temp_Student_d.length-1)

    
    this.Mark_Placement_Date = this.New_Date(new Date(moment(this.Mark_Placement_Date).format("YYYY-MM-DD")) );



    this.Placement_Schedule_.Placement_Schedule_Date =  this.Mark_Placement_Date;
    this.Placement_Schedule_.Applied_jobs =  temp_Applied_jobs;
    this.Placement_Schedule_.Placement_Schedule_Description =  this.Mark_Placement_Description;
    this.Placement_Schedule_.Login_User =  this.Login_User;
    this.Placement_Schedule_.Student_Id =  temp_Student_d;
    this.Placement_Schedule_.Job_Id = this.JobPostingId_Public;




    
   
 this.issLoading = true;
    this.Job_Posting_Service_.Save_Mark_Placement(this.Placement_Schedule_).subscribe(Save_status => {
        
        if(Number(Save_status[0].status_)>0)
        { 
            this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
        //    this.Save_Call_Status = false;
            // this.clr_Mark_Placement()
            this.Search_Appliedcount_Details(this.JobPostingId_Public, this.JobTitle_Public, this.Company_Name_Public);
            this.Close_Mark_Placement();
        }
        else 
        {  
            this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error ',Type:"2"}});
            //  this.Save_Call_Status = false;
        }
        },
        Rows => { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            // this.Save_Call_Status = false;
    });
}

Show_All()
{
    this.Search_Appliedcount_Details(this.JobPostingId_Public, this.JobTitle_Public, this.Company_Name_Public);
}

Search_Interview_Scheduled_Details(Job_id_,Company_Id,Interview_Date,Interview_Time)
{

    this.Appliedcount_Div=true;
    this.Entry_View=false;
    this.select_Resume =false;
     
    var  search_name_ = undefined,look_In_Date_Value=0,Company_id_ =0,course_id=0;
   this.Total_Entries =0;
    if (this.Is_Date == true)
        look_In_Date_Value = 1;

       
        if (this.Job_Title_ != undefined && this.Job_Title_ != null)
        if (this.Job_Title_.Job_Posting_Id != undefined && this.Job_Title_.Job_Posting_Id != null)
        Job_id_ = this.Job_Title_.Job_Posting_Id;

        if (this.Employeedetails_ != undefined && this.Employeedetails_ != null)
        if (this.Employeedetails_.Employer_Details_Id != undefined && this.Employeedetails_.Employer_Details_Id != null)
        Company_id_ = this.Employeedetails_.Employer_Details_Id;  


        if (this.Course_ != undefined && this.Course_ != null)
        if (this.Course_.Course_Id != undefined && this.Course_.Course_Id != null)
        course_id = this.Course_.Course_Id; 
        debugger
        // Interview_Date = this.New_Date(new Date(moment(Interview_Date).format("YYYY-MM-DD")) );

        if(Interview_Time==null){Interview_Time='00:00:00'}
        
    this.issLoading = true;
   
    this.Job_Posting_Service_.Search_Interview_Scheduled_Details(Job_id_,Company_Id,Interview_Date,Interview_Time,course_id).subscribe(Rows =>{
       debugger
        this.Interview_Scheduled_Details_Data=Rows[0];
      
        this.Total_Entries =  this.Interview_Scheduled_Details_Data.length;
        // this.Jobs =  this.Interview_Scheduled_Details_Data.length;
        // this.Vacancies =  sum(0,this.Interview_Scheduled_Details_Data[i].No_Of_Vaccancy);

        let Vacancies = 0;

        for (let i = 0; i < this.Interview_Scheduled_Details_Data.length; i++) {
        //   Vacancies = sum(0,this.Interview_Scheduled_Details_Data[i].No_Of_Vaccancy);
          Vacancies = Number(Vacancies) + Number(this.Interview_Scheduled_Details_Data[i].No_Of_Vaccancy);
        }
        
        this.Vacancies = Vacancies;
        

    this.issLoading = false;
    if(this.Interview_Scheduled_Details_Data.length==0)
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

Search_Faculty_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;       
     if(this.Faculty_Data==undefined || this.Faculty_Data.length==0)
           {
            this.issLoading = true;
         this.Student_Service_.Search_Typeahead_Loadfaculty('').subscribe(Rows => {
        if (Rows != null) {
            this.Faculty_Data = Rows[0];
            this.issLoading = false;

            this.Faculty_Data_Filter=[];

            for (var i=0;i<this.Faculty_Data.length;i++)
            {
                if(this.Faculty_Data[i].Users_Name.toLowerCase().includes(Value))
                    this.Faculty_Data_Filter.push(this.Faculty_Data[i])
            }
        }
    },
        Rows => {
            this.issLoading = false;
          });
    } 

    else
    {
        
        this.Faculty_Data_Filter=[];
        for (var i=0;i<this.Faculty_Data.length;i++)
        {
            if(this.Faculty_Data[i].Users_Name.toLowerCase().includes(Value))
                this.Faculty_Data_Filter.push(this.Faculty_Data[i])
        }
    }
}

display_Faculty(Users_: Users)
{     
    if (Users_) { return Users_.Users_Name; }
}



}

