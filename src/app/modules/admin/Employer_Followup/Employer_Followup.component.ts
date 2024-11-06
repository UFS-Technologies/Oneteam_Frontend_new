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
import { Specialization } from 'app/models/Specialization';
import { Experience } from 'app/models/Experience';
import { Functionl_Area } from 'app/models/Functionl_Area';
import { Qualification } from 'app/models/Qualification';
import { Gender } from 'app/models/Gender';
import { Job_Opening } from 'app/models/Job_Opening';
import { Employer_Details_Servive } from 'app/services/Employer_Details.Service';
import { Employer_Status } from 'app/models/Employer_Status';
import { Job_Opening_Followup } from 'app/models/Job_Opening_Followup';
import { Vacancy_Source } from 'app/models/Vacancy_Source';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Employer_Followup',
templateUrl: './Employer_Followup.component.html',
styleUrls: ['./Employer_Followup.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Employer_FollowupComponent implements OnInit {
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
    Employer_Followup_Edit:boolean;
    Employer_Followup_Save:boolean;
    Employer_Followup_Delete:boolean;
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
    Job_Post_Exist_Data:any;


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
    profile_View:boolean=false;
    Followup_View:boolean=false;
    Followup_History_View:boolean=false;

    History_View:boolean=false;
    
    Login_User: number = 0;
    Employer_Followup_EditIndex: number = -1;

    FromDate_: Date = new Date();
    ToDate_: Date = new Date();
    Is_Date:boolean=true;   

    Course_Data: Course[];
    Course_:Course=new Course;
    Course_Temp: Course = new Course;
    Course_Data_Filter: Course[]  ;


    Job_Course_Data: Course[];
    Job_Course_:Course=new Course;
    Job_Course_Temp: Course = new Course;
    Job_Course_Data_Filter: Course[]  ;

    
  Jobposting_Report_Data:any;
  Jobposting_Report_AppliedcountdetailsData:any;
  Jobposting_Report_Appliedcountdetails_Full_Data:any;
  Jobposting_Report_Appliedcountdetails_Placed_Data:any;
  Jobposting_Report_RejectedcountdetailsData:any;

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
    Employeedetails_new_:any;
    JobEmployeedetails_:Employer_Details=new Employer_Details();
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

    Job_Opening_EditIndex: number = -1;
    Job_Opening_Id:number;


   issLoadingapi:boolean;
   zip = new JSZip();
   files = [
];
Actualfile_size:number;
Resume_Data:any;
selectedDataArray:any=[];

Entry_View1: boolean = true;


Job_Posting_Id: number = 0;
Job_Posting_Data: Job_Posting[]
Job_Posting_: Job_Posting = new Job_Posting();


    Specialization_:Specialization=new Specialization;
    Specialization_Temp:Specialization=new Specialization;
    Specialization_Data:Specialization[];

    Experience_Search:Experience=new Experience;
    Experience_:Experience=new Experience;
    Experience_Temp:Experience=new Experience;
    Experience_Data:Experience[];

    Functionl_Area_:Functionl_Area=new Functionl_Area;
    Functionl_Area_Temp:Functionl_Area=new Functionl_Area;
    Functionl_Area_Data:Functionl_Area[];

    Qualification_:Qualification=new Qualification;
    Qualification_Temp:Qualification=new Qualification;
    Qualification_Data:Qualification[];

    Gender_: Gender = new Gender();
    Gender_Temp: Gender = new Gender();
    Gender_Data: Gender[];

    Vacancy_Source_: Vacancy_Source = new Vacancy_Source();
    Vacancy_Source_Temp: Vacancy_Source = new Vacancy_Source();
    Vacancy_Source_Data: Vacancy_Source[];


    Search_Status: Status = new Status;
    Status_Data: Status[];
    Status_:Status=new Status;
    Status_Temp: Status = new Status;

    Save_Call_Status: boolean = false;
    Job_Posting_EditIndex: number = -1;
    Employer_Followup_View:boolean ;
    // profile_View:boolean=true;


    Job_Opening_:Job_Opening=new Job_Opening;
    Job_Opening_Temp:Job_Opening=new Job_Opening;
    Job_Opening_Data:Job_Opening[];


    Job_Opening_Followup_:Job_Opening_Followup=new Job_Opening_Followup;
    Job_Opening_Followup_Temp:Job_Opening_Followup=new Job_Opening_Followup;
    Job_Opening_Followup_Data:Job_Opening_Followup[];

    Login_User_Name:string;

    Followup_Users_: Users = new Users();
    Followup_Users_Temp:Users=new Users;
    Followup_Users_Data: Users[];
    Followup_Users_Data_Filter: Users[];

    Employer_Status_: Employer_Status = new Employer_Status();
    Employer_Status_Temp: Employer_Status = new Employer_Status();
    Employer_Status_Data: Employer_Status[];
    Employer_Status_Data_Filter: Employer_Status[];
    editpermission :number=1;
    Employer_Status_Search: Employer_Status = new Employer_Status();
    followup_calender_view:boolean;

    Company_List_Report_Data:any;
    Company_List_Report_Data_first:any;
    Company_List_Report_Data_first1:any;
    Company_List_Report_Data_first1_Filter:any;
    
    

constructor(public Student_Service_:Student_Service,private _http: HttpClient, 
    public Job_Posting_Service_:Job_Posting_Service, 
    public Employer_Details_Servive_:Employer_Details_Servive, 
    private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{

    debugger
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Login_User_Name = (localStorage.getItem("uname"));
    this.Permissions = Get_Page_Permission(84);
    this.Export_Permission=Get_Page_Permission(50);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Employer_Followup_Edit=this.Permissions.Edit;
    this.Employer_Followup_Save=this.Permissions.Save;
    this.Employer_Followup_Delete=this.Permissions.Delete;
    this.Employer_Followup_View=this.Permissions.View;
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
    this.myTotalHeight=this.myInnerHeight -100
    // this.myTotalHeight=this.myTotalHeight-250;
    this.myInnerHeight = this.myInnerHeight - 270;
    this.Pointer_Start_ = 1;
    this.Pointer_Stop_ = this.Page_Length_;
    this.  Search_Job_Opening();

    
    this.Load_Gender();



}


Create_New()
{
    this.editpermission =1;
    this.Entry_View1 = true;
    this.Entry_View = false;
    this.profile_View = true;
    this.Followup_View = false;
    this.History_View =false;
    // this.Job_Posting_Id = 0
    // this.Clr_Job_Posting();
    this.Clr_Job_Opening();
debugger
    this.Search_Employer_Status_Typeahead('');
    debugger
    this.Employer_Status_Temp.Employer_Status_Id = 1;
    this.Employer_Status_Temp.Employer_Status_Name = "Vacancy Sourced";
    this.Employer_Status_Temp.FollowUp = true;
    this.Employer_Status_ = Object.assign(this.Employer_Status_Temp);

    if ( this.Employer_Status_.FollowUp==true)
    {
        this.followup_calender_view =true;
    }  
    else(this.followup_calender_view =false)



}

Export()
{
    
        this.Student_Service_.exportExcel(this.Job_Opening_Data,'Employer Followup')
       
}
Export_Appliedcount_Data()
{
    
        this.Student_Service_.exportExcel(this.selectedDataArray,'Jobposting Applied Report')
       
}



Export_Rejectedcount_Data()
{
    
        this.Student_Service_.exportExcel(this.Jobposting_Report_RejectedcountdetailsData,'Jobposting Rejected Report')
       
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


Next_Click() {
   
    if (this.Job_Opening_Data.length == this.Page_Length_) {
        this.Pointer_Start_ = this.Pointer_Start_ + this.Page_Length_;
        this.Pointer_Stop_ = this.Pointer_Stop_ + this.Page_Length_;
        this.nextflag = 1;
        if (this.Job_Opening_Data.length > 0) {
            this.Search_Job_Opening();
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
        this.Search_Job_Opening();
    }

    else {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "No Other Details", Type: "3" },
        });
        }
  }
  




Close_ClickJob_post()
{

    // this.Search_Jobposting_Summary();
    this.Entry_View1 = false;
    this.Entry_View = true;
    this.profile_View = false;
    this.Followup_View = false;
    this.History_View =false;
    this.Search_Job_Opening();
    this.Clr_Job_Opening();

}






Load_Gender() {
    this.issLoading = true;
    this.Student_Service_.Load_Gender().subscribe(
    (Rows) => {
    if (Rows != null) {
    this.Gender_Data = Rows[0];
    this.Vacancy_Source_Data = Rows[1];


    this.Gender_Temp.Gender_Id = 3;
    this.Gender_Temp.Gender_Name = "Both";
    this.Gender_Data.unshift(Object.assign({},this.Gender_Temp));

    this.Gender_Temp.Gender_Id = 0;
    this.Gender_Temp.Gender_Name = "Select";
    this.Gender_Data.unshift(Object.assign({},this.Gender_Temp));
    this.Gender_ = this.Gender_Data[0];


    this.Vacancy_Source_Temp.Vacancy_Source_Id = 0;
    this.Vacancy_Source_Temp.Vacancy_Source_Name = "Select";
    this.Vacancy_Source_Data.unshift(Object.assign({},this.Vacancy_Source_Temp));
    this.Vacancy_Source_ = this.Vacancy_Source_Data[0];


    this.issLoading = false;
    }
    },
    (Rows) => {
    this.issLoading = false;
    }
    );
    }

   


    Delete_Job_Opening(Job_Opening_Id_,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
   this.issLoading=true;
   debugger
    this.Employer_Details_Servive_.Delete_Job_Opening(Job_Opening_Id_).subscribe(Delete_status => {

        debugger
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_;
    if(Delete_status==1)
    {
    this.Job_Opening_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
    this.Search_Job_Opening();
    }
    else if(Delete_status==-1)
    {
    this.Job_Opening_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'You Cannot Delete, This Job is Already Posted.',Type: "2"}});
    this.Search_Job_Opening();
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








Clr_Job_Opening()
{


    this.Job_Opening_.Job_Opening_Id =0;
    this.Job_Opening_.Job_Title ="";
    this.Job_Opening_.Comapny_Id =0; 
    this.Job_Opening_.Company_Name ="";
    this.Job_Opening_.No_of_Vacancy =0; 
    this.Job_Opening_.Salary =""; 
    this.Job_Opening_.Location ="";
    this.Job_Opening_.Next_Followup_Date = new Date();
    this.Job_Opening_.Next_Followup_Date = this.New_Date(this.Job_Opening_.Next_Followup_Date);
    this.Job_Opening_.Employee_Status_Id =0; 
    this.Job_Opening_.Employee_Status_Name =""; 
    this.Job_Opening_.To_Staff_Id =0; 
    this.Job_Opening_.To_Staff_Name =""; 
    this.Job_Opening_.Remark ="";
    this.Job_Opening_.Contact_Person =""; 
    this.Job_Opening_.Contact_No ="";
    this.Job_Opening_.Email =""; 
    this.Job_Opening_.Address ="";
    this.Job_Opening_.Website ="";
    this.Job_Opening_.Gender_Id =0; 
    this.Job_Opening_.Gender_Name =""; 
    this.Job_Opening_.Job_Opening_Description ="";

    if(this.Gender_Data!=null && this.Gender_Data != undefined)
    this.Gender_=this.Gender_Data[0];

    if(this.Vacancy_Source_Data!=null && this.Vacancy_Source_Data != undefined)
    this.Vacancy_Source_=this.Vacancy_Source_Data[0];
    
debugger
    this.Employer_Status_ =null;
    this.Followup_Users_=null;
    this.Employeedetails_Data=null;
    this.Employeedetails_Data_Filter=[];
    this.Employeedetails_new_ =null;
    

    this.Job_Opening_Followup_Data =null;

    
}



    Save_Job_Opening()
    {
    debugger

    if(this.Job_Opening_.Company_Name==undefined||this.Job_Opening_.Company_Name==null||this.Job_Opening_.Company_Name==""){

        if(this.Employeedetails_new_.Company_Name==undefined||this.Employeedetails_new_.Company_Name==null)
        {
            this.Job_Opening_.Company_Name=this.Employeedetails_new_;
        }
        else {this.Job_Opening_.Company_Name =this.Employeedetails_new_.Company_Name;

            this.Job_Opening_.Comapny_Id =this.Employeedetails_new_.Employer_Details_Id
        }
        }

        // if(this.Employeedetails_new_==undefined||this.Employeedetails_new_==null||this.Job_Opening_.Company_Name==""||this.Job_Opening_.Company_Name==null||this.Job_Opening_.Company_Name==undefined)
        // {
        //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Company Name', Type: "3" } });
        //     return;
        // }

        if(this.Job_Opening_.Company_Name==undefined||this.Job_Opening_.Company_Name==null||this.Job_Opening_.Company_Name=="")
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Company Name', Type: "3" } });
            return;
        }
        if(this.Job_Opening_.Contact_Person==undefined||this.Job_Opening_.Contact_Person==null||this.Job_Opening_.Contact_Person=="")
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Contact Person', Type: "3" } });
            return;
        }

        if(this.Job_Opening_.Contact_No==undefined||this.Job_Opening_.Contact_No==null||this.Job_Opening_.Contact_No=="")
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Contact Number', Type: "3" } });
            return;
        }

        if (this.Job_Opening_.Contact_No.length > 15) {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Enter valid Contact Number", Type: "3" },
            });
            return;
            }

        if(this.Job_Opening_.Email==undefined||this.Job_Opening_.Email==null||this.Job_Opening_.Email=="")
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Email', Type: "3" } });
            return;
        }

        if (this.Job_Opening_.Email.length > 0) {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (this.Job_Opening_.Email.match(mailformat)) {
              
            } else {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Valid Email', Type: "3" } });
                return;
            }
          }
 
          

        if(this.Job_Opening_.Address==undefined||this.Job_Opening_.Address==null||this.Job_Opening_.Address=="")
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Address', Type: "3" } });
            return;
        }

        if(this.Job_Opening_.Website==undefined||this.Job_Opening_.Website==null||this.Job_Opening_.Website=="")
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Website', Type: "3" } });
            return;
        }

       
          if (this.Job_Opening_.Website.length > 0) {
            var Websiteformat = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
            
            if (this.Job_Opening_.Website.match(Websiteformat)) {
              
            } else {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Valid Website', Type: "3" } });
                return;
            }
          }



        if(this.Job_Opening_.Job_Title==undefined||this.Job_Opening_.Job_Title==null||this.Job_Opening_.Job_Title=="")
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Job Title', Type: "3" } });
            return;
        }
        if(this.Job_Opening_.Location==undefined||this.Job_Opening_.Location==null||this.Job_Opening_.Location=="")
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Job Location', Type: "3" } });
            return;
        }

        if(this.Job_Opening_.No_of_Vacancy==undefined||this.Job_Opening_.No_of_Vacancy==null||this.Job_Opening_.No_of_Vacancy==0)
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter No of Vacancy', Type: "3" } });
            return;
        }

        if(this.Job_Opening_.Salary==undefined||this.Job_Opening_.Salary==null||this.Job_Opening_.Salary=="")
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Salary', Type: "3" } });
            return;
        }

        if (this.Gender_ == undefined || this.Gender_ == null || this.Gender_.Gender_Id == undefined || this.Gender_.Gender_Id==0) 
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Gender', Type: "3" } });
            return;
        } 

        if(this.Job_Opening_.Job_Opening_Description==undefined||this.Job_Opening_.Job_Opening_Description==null||this.Job_Opening_.Job_Opening_Description=="")
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Description', Type: "3" } });
            return;
        }


        if (this.Vacancy_Source_ == undefined || this.Vacancy_Source_ == null || this.Vacancy_Source_.Vacancy_Source_Id == undefined || this.Vacancy_Source_.Vacancy_Source_Id==0) 
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Vacancy Source', Type: "3" } });
            return;
        } 


        if (this.Employer_Status_ == undefined ||
            this.Employer_Status_ == null ||
            this.Employer_Status_.Employer_Status_Id == undefined ||
            this.Employer_Status_.Employer_Status_Id == 0 )
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Status', Type: "3" } });
            return;
        }

        if (this.Followup_Users_ == undefined ||
            this.Followup_Users_ == null ||
            this.Followup_Users_.Users_Id == undefined ||
            this.Followup_Users_.Users_Id == 0 )
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose To Staff', Type: "3" } });
            return;
        }

        if (this.Employer_Status_.FollowUp == true ){
        if(this.Job_Opening_.Next_Followup_Date == null||this.Job_Opening_.Next_Followup_Date==undefined )
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Next Followup Date', Type: "3" } });
            return;
        }
            // ||this.Job_Opening_.Next_Followup_Date=="dd-mm-yyyy"
        }
        if(this.Job_Opening_.Remark==undefined||this.Job_Opening_.Remark==null||this.Job_Opening_.Remark=="")
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Remark', Type: "3" } });
            return;
        }
        
    
    
    

        this.Job_Opening_.Gender_Id =this.Gender_.Gender_Id ;
        this.Job_Opening_.Gender_Name =this.Gender_.Gender_Name ;

        this.Job_Opening_.Vacancy_Source_Id =this.Vacancy_Source_.Vacancy_Source_Id ;
        this.Job_Opening_.Vacancy_Source_Name =this.Vacancy_Source_.Vacancy_Source_Name ;

        this.Job_Opening_.To_Staff_Id =this.Followup_Users_.Users_Id ;
        this.Job_Opening_.To_Staff_Name =this.Followup_Users_.Users_Name ;

        this.Job_Opening_.Employee_Status_Id =this.Employer_Status_.Employer_Status_Id ;
        this.Job_Opening_.Employee_Status_Name =this.Employer_Status_.Employer_Status_Name ;

        this.Job_Opening_.By_User_Id =this.Login_User;
        this.Job_Opening_.By_User_Name =this.Login_User_Name ;


        this.Job_Opening_.Next_Followup_Date = this.New_Date(new Date(moment(this.Job_Opening_.Next_Followup_Date).format("YYYY-MM-DD")) );
        
        

        if (this.Save_Call_Status == true)
            return;
        else
            this.Save_Call_Status = true;
    this.issLoading = true;
    debugger
    
            this.Employer_Details_Servive_.Save_Job_Opening(this.Job_Opening_).subscribe(Save_status => {
            debugger
            if(Number(Save_status[0][0].Job_Opening_Id_)>0)
            { 
                this.issLoading=false;
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
            this.Save_Call_Status = false;
                this.Close_ClickJob_post();
                this.Clr_Job_Opening();
            
            
            }
            else 
            {  
                this.issLoading=false;
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error ',Type:"2"}});
                this.Save_Call_Status = false;
            }
            },
            Rows => { 
            this.issLoading=false;
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                this.Save_Call_Status = false;
        });
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

    Search_Employer_Status_Typeahead(event: any) {

        debugger


        var Value = "";

    if(event!=""){
        if (event.target.value == "") Value = "";
        else Value = event.target.value;
    }

        if (
        this.Employer_Status_Data == undefined ||
        this.Employer_Status_Data.length == 0
        ) {
        this.issLoading = true;
        this.Student_Service_.Search_Employer_Status_Typeahead("").subscribe(
        (Rows) => {
        if (Rows != null) {
        this.Employer_Status_Data = Rows[0];
        this.issLoading = false;
        
        this.Employer_Status_Data_Filter = [];
        
        for (var i = 0; i < this.Employer_Status_Data.length; i++) {
        if (
        this.Employer_Status_Data[i].Employer_Status_Name.toLowerCase().includes(
        Value
        )
        )
        this.Employer_Status_Data_Filter.push(
        this.Employer_Status_Data[i]
        );
        }
        }
        },
        (Rows) => {
        this.issLoading = false;
        }
        );
        } else {
        this.Employer_Status_Data_Filter = [];
        for (var i = 0; i < this.Employer_Status_Data.length; i++) {
        if (
        this.Employer_Status_Data[i].Employer_Status_Name.toLowerCase().includes(Value)
        )
        this.Employer_Status_Data_Filter.push(this.Employer_Status_Data[i]);
        }
        }
        }
        display_Employer_Status(Employer_Status_: Employer_Status) {
        if (Employer_Status_) {
        return Employer_Status_.Employer_Status_Name;
        }
        }
    
        Search_Job_Opening()
        {
            var  search_name_ = undefined,look_In_Date_Value=0,Company_id_ =0,Job_id_=0,Employee_Status_Id_=0;
           this.Total_Entries =0;
            if (this.Is_Date == true)
                look_In_Date_Value = 1;
        
                
                if (this.Job_Title_ != undefined && this.Job_Title_ != null)
                if (this.Job_Title_.Job_Posting_Id != undefined && this.Job_Title_.Job_Posting_Id != null)
                Job_id_ = this.Job_Title_.Job_Posting_Id;
        
                if (this.Employeedetails_ != undefined && this.Employeedetails_ != null)
                if (this.Employeedetails_.Employer_Details_Id != undefined && this.Employeedetails_.Employer_Details_Id != null)
                Company_id_ = this.Employeedetails_.Employer_Details_Id;  
        
        
                if (this.Employer_Status_Search != undefined && this.Employer_Status_Search != null)
                if (this.Employer_Status_Search.Employer_Status_Id != undefined && this.Employer_Status_Search.Employer_Status_Id != null)
                Employee_Status_Id_ = this.Employer_Status_Search.Employer_Status_Id;  
                
            this.issLoading = true;
           
            this.Employer_Details_Servive_.Search_Job_Opening(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),Job_id_,Company_id_,Employee_Status_Id_
            ,this.Pointer_Start_,
            this.Pointer_Stop_,
            this.Page_Length_).subscribe(Rows =>{
               debugger
                this.Job_Opening_Data=Rows[0];
              
                this.Total_Entries =  this.Job_Opening_Data.length;
                
            this.issLoading = false;
            if(this.Job_Opening_Data.length==0)
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


        Edit_Job_Opening(Job_Opening_e:any,index)
        {
        debugger
            this.editpermission =1;
            this.profile_View =true;
             this.Followup_View = false;
            this.Entry_View=false;
            this.Job_Opening_EditIndex = index
            this.Job_Opening_Id = Job_Opening_e.Job_Opening_Id;
            this.profile_View=true;
            this.Job_Opening_=Job_Opening_e;
            this.Job_Opening_=Object.assign({},Job_Opening_e);

            for (var i = 0; i < this.Gender_Data.length; i++)
            {
            if (this.Job_Opening_.Gender_Id == this.Gender_Data[i].Gender_Id)
            this.Gender_=this.Gender_Data[i];
            } 

            for (var i = 0; i < this.Vacancy_Source_Data.length; i++)
            {
            if (this.Job_Opening_.Vacancy_Source_Id == this.Vacancy_Source_Data[i].Vacancy_Source_Id)
            this.Vacancy_Source_=this.Vacancy_Source_Data[i];
            } 

            this.Employer_Status_Temp.Employer_Status_Id = this.Job_Opening_.Employee_Status_Id;
            this.Employer_Status_Temp.Employer_Status_Name = this.Job_Opening_.Employee_Status_Name;
            this.Employer_Status_ = Object.assign(this.Employer_Status_Temp);


            this.Followup_Users_Temp.Users_Id = this.Job_Opening_.To_Staff_Id;
            this.Followup_Users_Temp.Users_Name = this.Job_Opening_.To_Staff_Name;
            this.Followup_Users_ = Object.assign(this.Followup_Users_Temp);


            this.Employeedetails_Temp.Employer_Details_Id = this.Job_Opening_.Comapny_Id;
            this.Employeedetails_Temp.Company_Name = this.Job_Opening_.Company_Name;
            this.Employeedetails_new_ = Object.assign(this.Employeedetails_Temp);


            debugger
            this.Job_Opening_.Next_Followup_Date = this.New_Date(new Date(moment(this.Job_Opening_.Next_Followup_Date1).format("YYYY-MM-DD")) );
    
        }


        Add_Job_Opening(Job_Opening_e:any,index)
        {
        debugger
            this.editpermission =2;
            this.profile_View =true;
             this.Followup_View = false;
            this.Entry_View=false;
            this.Job_Opening_EditIndex = index
            this.Job_Opening_Id = Job_Opening_e.Job_Opening_Id;
            this.profile_View=true;
            this.Job_Opening_=Job_Opening_e;
            this.Job_Opening_=Object.assign({},Job_Opening_e);

            for (var i = 0; i < this.Gender_Data.length; i++)
            {
            if (this.Job_Opening_.Gender_Id == this.Gender_Data[i].Gender_Id)
            this.Gender_=this.Gender_Data[i];
            } 

            this.Employer_Status_Temp.Employer_Status_Id = this.Job_Opening_.Employee_Status_Id;
            this.Employer_Status_Temp.Employer_Status_Name = this.Job_Opening_.Employee_Status_Name;
            this.Employer_Status_ = Object.assign(this.Employer_Status_Temp);


            this.Followup_Users_Temp.Users_Id = this.Job_Opening_.To_Staff_Id;
            this.Followup_Users_Temp.Users_Name = this.Job_Opening_.To_Staff_Name;
            this.Followup_Users_ = Object.assign(this.Followup_Users_Temp);
            debugger
            this.Job_Opening_.Next_Followup_Date = this.New_Date(new Date(moment(this.Job_Opening_.Next_Followup_Date1).format("YYYY-MM-DD")) );


            this.Add_Job_Opening_Clr();

            debugger
            this.Search_Employer_Status_Typeahead('');
            debugger
            this.Employer_Status_Temp.Employer_Status_Id = 1;
            this.Employer_Status_Temp.Employer_Status_Name = "Vacancy Sourced";
            this.Employer_Status_ = Object.assign(this.Employer_Status_Temp);
    
        }

        Add_Job_Opening_Clr()
        {
            this.Job_Opening_.Job_Opening_Id =0;
            this.Job_Opening_.Job_Title ="";
            this.Job_Opening_.No_of_Vacancy =0; 
            this.Job_Opening_.Salary =""; 
            this.Job_Opening_.Location ="";
            this.Job_Opening_.Next_Followup_Date = new Date();
            this.Job_Opening_.Next_Followup_Date = this.New_Date(this.Job_Opening_.Next_Followup_Date);
            this.Job_Opening_.Employee_Status_Id =0; 
            this.Job_Opening_.Employee_Status_Name =""; 
            this.Job_Opening_.To_Staff_Id =0; 
            this.Job_Opening_.To_Staff_Name =""; 
            this.Job_Opening_.Remark ="";
            this.Job_Opening_.Gender_Id =0; 
            this.Job_Opening_.Gender_Name =""; 
            this.Job_Opening_.Job_Opening_Description ="";

            if(this.Gender_Data!=null && this.Gender_Data != undefined)
            this.Gender_=this.Gender_Data[0];

            this.Employer_Status_ =null;
            this.Followup_Users_=null;


            // this.Job_Opening_.Comapny_Id =0; 
            // this.Job_Opening_.Company_Name ="";
            // this.Job_Opening_.Contact_No ="";
           
            // this.Job_Opening_.Contact_Person =""; 
            // this.Job_Opening_.Email =""; 
            // this.Job_Opening_.Address ="";
            // this.Job_Opening_.Website ="";
           

            
        }




        Add_Followup(Job_Opening_e:any,index)
        {
        debugger
            this.Followup_History_View=false;
            this.editpermission =2;
            this.profile_View =false;
             this.Followup_View = true;
            this.Entry_View=false;
            this.Job_Opening_EditIndex = index
            this.Job_Opening_Id = Job_Opening_e.Job_Opening_Id;
            this.profile_View=false;
            this.Job_Opening_=Job_Opening_e;
            this.Job_Opening_=Object.assign({},Job_Opening_e);

            for (var i = 0; i < this.Gender_Data.length; i++)
            {
            if (this.Job_Opening_.Gender_Id == this.Gender_Data[i].Gender_Id)
            this.Gender_=this.Gender_Data[i];
            } 

            this.Employer_Status_Temp.Employer_Status_Id = this.Job_Opening_.Employee_Status_Id;
            this.Employer_Status_Temp.Employer_Status_Name = this.Job_Opening_.Employee_Status_Name;
            this.Employer_Status_ = Object.assign(this.Employer_Status_Temp);


            this.Followup_Users_Temp.Users_Id = this.Job_Opening_.To_Staff_Id;
            this.Followup_Users_Temp.Users_Name = this.Job_Opening_.To_Staff_Name;
            this.Followup_Users_ = Object.assign(this.Followup_Users_Temp);
            debugger
            this.Job_Opening_.Next_Followup_Date = this.New_Date(new Date(moment(this.Job_Opening_.Next_Followup_Date1).format("YYYY-MM-DD")) );


            this.Add_Followup_Clr();
    
        }

        Add_Followup_Clr()
        {
            
            this.Job_Opening_.Next_Followup_Date = new Date();
            this.Job_Opening_.Next_Followup_Date = this.New_Date(this.Job_Opening_.Next_Followup_Date);
            this.Job_Opening_.Remark ="";
            this.Job_Opening_Followup_.Job_Opening_Followup_Id =0;
            // this.Employer_Status_ =null;
            // this.Followup_Users_=null;
 
        }



        Save_Job_Opening_Followup()
{

    if (this.Employer_Status_ == undefined ||
        this.Employer_Status_ == null ||
        this.Employer_Status_.Employer_Status_Id == undefined ||
        this.Employer_Status_.Employer_Status_Id == 0 )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Status', Type: "3" } });
        return;
    }

    if (this.Followup_Users_ == undefined ||
        this.Followup_Users_ == null ||
        this.Followup_Users_.Users_Id == undefined ||
        this.Followup_Users_.Users_Id == 0 )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose To Staff', Type: "3" } });
        return;
    }

    if (this.Employer_Status_.FollowUp == true ){
    if(this.Job_Opening_.Next_Followup_Date == null||this.Job_Opening_.Next_Followup_Date==undefined )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Next Followup Date', Type: "3" } });
        return;
    }
        // ||this.Job_Opening_.Next_Followup_Date=="dd-mm-yyyy"
    }
    if(this.Job_Opening_.Remark==undefined||this.Job_Opening_.Remark==null||this.Job_Opening_.Remark=="")
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Remark', Type: "3" } });
        return;
    }
    
    
    this.Job_Opening_Followup_.Job_Opening_Id =this.Job_Opening_.Job_Opening_Id ;
    // this.Job_Opening_Followup_.Job_Opening_Followup_Id =0;

    this.Job_Opening_Followup_.To_Staff_Id =this.Followup_Users_.Users_Id ;
    this.Job_Opening_Followup_.To_Staff_Name =this.Followup_Users_.Users_Name ;

    this.Job_Opening_Followup_.Employee_Status_Id =this.Employer_Status_.Employer_Status_Id ;
    this.Job_Opening_Followup_.Employee_Status_Name =this.Employer_Status_.Employer_Status_Name ;

    this.Job_Opening_Followup_.By_User_Id =this.Login_User;
    this.Job_Opening_Followup_.By_User_Name =this.Login_User_Name ;
    this.Job_Opening_Followup_.Remark =this.Job_Opening_.Remark ;

    this.Job_Opening_Followup_.Next_Followup_Date = this.New_Date(new Date(moment(this.Job_Opening_.Next_Followup_Date).format("YYYY-MM-DD")) );
    
    

    if (this.Save_Call_Status == true)
        return;
    else
        this.Save_Call_Status = true;
 this.issLoading = true;
 debugger
  
        this.Employer_Details_Servive_.Save_Job_Opening_Followup(this.Job_Opening_Followup_).subscribe(Save_status => {
        debugger
        if(Number(Save_status[0][0].Job_Opening_Followup_Id_)>0)
        { 
            this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
           this.Save_Call_Status = false;
            this.Close_ClickJob_post();
            this.Add_Followup_Clr();
           
           
        }
        else 
        {  
            this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error ',Type:"2"}});
             this.Save_Call_Status = false;
        }
        },
        Rows => { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            this.Save_Call_Status = false;
    });
}


Get_Job_Opening_Followup_History_View(Job_Opening_Id_,i)
{

    this.profile_View =false;
    this.Followup_View=false;
    this.History_View= true;
    this.Followup_History_View = false;
    this.Entry_View=false;

    

    this.Job_Opening_.Job_Opening_Id =Job_Opening_Id_;
    this.Get_Job_Opening_Followup_History()
}



Get_Job_Opening_Followup_History_View1()
{
    this.profile_View =false;
    this.Followup_View=true;
    this.History_View= false;
    this.Followup_History_View = true;
    this.Entry_View=false;

    this.Get_Job_Opening_Followup_History()
}


Get_Job_Opening_Followup_History() {
// if (this.Receipt_History_View == false)
//  {
// // this.Receipt_History_View = true;


this.issLoading = true;
debugger
this.Employer_Details_Servive_.Get_Job_Opening_Followup_History(
    this.Job_Opening_.Job_Opening_Id
).subscribe(
(Rows) => {
debugger
this.issLoading = false;
this.Job_Opening_Followup_Data = Rows[0];

},
(Rows) => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {
panelClass: "Dialogbox-Class",
data: { Message: "Error Occured", Type: false },
});
}
);
// } 
// else this.Receipt_History_View = false;
}


Go_To_JobPosting(Job_Opening_Data_T,i)
{

    this.Job_Post_Exist_Check(Job_Opening_Data_T.Job_Opening_Id);

    localStorage.setItem("Go_to_Createnew", "1");
    localStorage.setItem("Company_Id", Job_Opening_Data_T.Comapny_Id);
    localStorage.setItem("Company_Name", Job_Opening_Data_T.Company_Name);
    localStorage.setItem("Job_Title", Job_Opening_Data_T.Job_Title);
    localStorage.setItem("No_of_Vacancy", Job_Opening_Data_T.No_of_Vacancy);
    localStorage.setItem("Location", Job_Opening_Data_T.Location);
    localStorage.setItem("Salary", Job_Opening_Data_T.Salary);
    localStorage.setItem("Gender_Id", Job_Opening_Data_T.Gender_Id);
    localStorage.setItem("Gender_Name", Job_Opening_Data_T.Gender_Name);
    localStorage.setItem("Job_Opening_Description", Job_Opening_Data_T.Job_Opening_Description);
    localStorage.setItem("Job_Opening_Id", Job_Opening_Data_T.Job_Opening_Id);
    // this.router.navigateByUrl('Job_Posting');
}

Job_Post_Exist_Check(Job_Posting_Id)
{
    
this.issLoading = true;
debugger
this.Employer_Details_Servive_.Job_Post_Exist_Check(
    Job_Posting_Id
).subscribe(
(Rows) => {
debugger
this.issLoading = false;
this.Job_Post_Exist_Data = Rows[0];

if(this.Job_Post_Exist_Data[0].Job_Posting_Id>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Already Job Posted',Type: "2"}});
   return
    }

    else{this.router.navigateByUrl('Job_Posting');}


},
(Rows) => {
this.issLoading = false;
}
);

}

Employer_Status_Change()
{
    debugger
    if ( this.Employer_Status_.FollowUp==true)
    {
        this.followup_calender_view =true;
    }  
    else(this.followup_calender_view =false)
}


Company_Change()
{


    this.Job_Opening_.Contact_Person =""; 
    this.Job_Opening_.Contact_No ="";
    this.Job_Opening_.Email =""; 
    this.Job_Opening_.Address ="";
    this.Job_Opening_.Website ="";
    this.Job_Opening_.Company_Name="";
    
    debugger
    if(this.Job_Opening_.Company_Name==undefined||this.Job_Opening_.Company_Name==null||this.Job_Opening_.Company_Name==""){

        if(this.Employeedetails_new_.Company_Name==undefined||this.Employeedetails_new_.Company_Name==null)
        {
            this.Job_Opening_.Company_Name=this.Employeedetails_new_;
        }
        else {this.Job_Opening_.Company_Name =this.Employeedetails_new_.Company_Name;

            this.Job_Opening_.Comapny_Id =this.Employeedetails_new_.Employer_Details_Id
            this.Job_Opening_.Contact_Person =this.Employeedetails_new_.Contact_Person
            this.Job_Opening_.Contact_No =this.Employeedetails_new_.Contact_Number
            this.Job_Opening_.Email =this.Employeedetails_new_.Email_Id
            this.Job_Opening_.Address =this.Employeedetails_new_.Company_Location
            this.Job_Opening_.Website =this.Employeedetails_new_.Website
        }
        }
}


}

