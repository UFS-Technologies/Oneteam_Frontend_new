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

// import * as html2pdf from 'html2pdf.js';


// import * as jspdf from 'jspdf';

// import * as html2pdf from 'html2pd';

// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
    
};
@Component({
selector: 'app-JobPosting_Report',
templateUrl: './JobPosting_Report.component.html',
styleUrls: ['./JobPosting_Report.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class JobPosting_ReportComponent implements OnInit {
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
    profile_View:boolean=false;
    
    Login_User: number = 0;
    Lead_Report_EditIndex: number = -1;

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


    Search_Status: Status = new Status;
    Status_Data: Status[];
    Status_:Status=new Status;
    Status_Temp: Status = new Status;

    Save_Call_Status: boolean = false;
    Job_Posting_EditIndex: number = -1;
    // profile_View:boolean=true;

constructor(public Student_Service_:Student_Service,private _http: HttpClient, 
    public Job_Posting_Service_:Job_Posting_Service, 
    private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(62);
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
    this.Search_Jobposting_Summary();

    this.Load_Dropdowns();
    this.Load_Gender();

    this.Load_Job_Posting_Search_Dropdowns();

    this.Load_Job_Posting_Dropdowns();

}

Export()
{
    
        this.Student_Service_.exportExcel(this.Jobposting_Report_Data,'Jobposting Report')
       
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

Search_Jobposting_Summary()
{
    var  search_name_ = undefined,look_In_Date_Value=0,Company_id_ =0,Job_id_=0,Course_Id_=0;
   this.Total_Entries =0;
    if (this.Is_Date == true)
        look_In_Date_Value = 1;

        // if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
        // search_name_ = this.Search_Name;

        // if (this.Employeedetails_ != undefined && this.Employeedetails_ != null && this.Employeedetails_ != '')
        // Company_Name_ = this.Company_Name;

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
   
    this.Job_Posting_Service_.Search_Jobposting_Summary(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),Job_id_,Company_id_,Course_Id_
    ,this.Pointer_Start_,
    this.Pointer_Stop_,
    this.Page_Length_).subscribe(Rows =>{
       debugger
        this.Jobposting_Report_Data=Rows[0];
      
        this.Total_Entries =  this.Jobposting_Report_Data.length;
        // this.Jobs =  this.Jobposting_Report_Data.length;
        // this.Vacancies =  sum(0,this.Jobposting_Report_Data[i].No_Of_Vaccancy);

        let Vacancies = 0;

        for (let i = 0; i < this.Jobposting_Report_Data.length; i++) {
        //   Vacancies = sum(0,this.Jobposting_Report_Data[i].No_Of_Vaccancy);
          Vacancies = Number(Vacancies) + Number(this.Jobposting_Report_Data[i].No_Of_Vaccancy);
        }
        
        this.Vacancies = Vacancies;
        

    this.issLoading = false;
    if(this.Jobposting_Report_Data.length==0)
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
   
    if (this.Jobposting_Report_Data.length == this.Page_Length_) {
        this.Pointer_Start_ = this.Pointer_Start_ + this.Page_Length_;
        this.Pointer_Stop_ = this.Pointer_Stop_ + this.Page_Length_;
        this.nextflag = 1;
        if (this.Jobposting_Report_Data.length > 0) {
            this.Search_Jobposting_Summary();
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
        this.Search_Jobposting_Summary();
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
    // this.Jobposting_Report_AppliedcountdetailsData=[];
    // for (var i=0;i<this.Jobposting_Report_Appliedcountdetails_Full_Data.length;i++)
    // {
    //     if(this.Jobposting_Report_Appliedcountdetails_Full_Data[i].Interview_Status==status_id)
    //     {
    //         this.Jobposting_Report_AppliedcountdetailsData.push(this.Jobposting_Report_Appliedcountdetails_Full_Data[i])
    //     }
    // }
}

Show_Placement_Scheduled(placement_status)
{
    
    this.Show_Placement_Interview_Scheduled(placement_status,this.Interview_Status_,this.Inteview_Attending_Status_)
    // this.Jobposting_Report_AppliedcountdetailsData=[];
    // for (var i=0;i<this.Jobposting_Report_Appliedcountdetails_Placed_Data.length;i++)
    // {
    //             if(this.Jobposting_Report_Appliedcountdetails_Placed_Data[i].Placement_Status==placement_status || placement_status ==-1
    //     )  
    //         this.Jobposting_Report_AppliedcountdetailsData.push(this.Jobposting_Report_Appliedcountdetails_Placed_Data[i])
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
    this.Jobposting_Report_AppliedcountdetailsData=[];
    for (var i=0;i<this.Jobposting_Report_Appliedcountdetails_Placed_Data.length;i++)
    {
        
        // if(this.Jobposting_Report_Appliedcountdetails_Placed_Data[i].Placement_Status==placement_status)
        if((this.Jobposting_Report_Appliedcountdetails_Placed_Data[i].Placement_Status==placement_status || placement_status ==-1
        ) && (this.Jobposting_Report_Appliedcountdetails_Placed_Data[i].Interview_Status==Interview_Status || Interview_Status ==-1)
        && (this.Jobposting_Report_Appliedcountdetails_Placed_Data[i].Interview_Attending_Rejecting==inteview_attending_status || inteview_attending_status ==0)
            )
        {
            this.Jobposting_Report_AppliedcountdetailsData.push(this.Jobposting_Report_Appliedcountdetails_Placed_Data[i])
        }
    }
}





// Show_Inteview_Attending_Status_Scheduled(inteview_attending_status, Interview_Status,placement_status)
// {
    
//     this.Jobposting_Report_AppliedcountdetailsData=[];
//     for (var i=0;i<this.Jobposting_Report_Appliedcountdetails_Placed_Data.length;i++)
//     {
//         if((this.Jobposting_Report_Appliedcountdetails_Placed_Data[i].Placement_Status==placement_status || placement_status ==-1
//         ) && (this.Jobposting_Report_Appliedcountdetails_Placed_Data[i].Interview_Status==Interview_Status || Interview_Status ==-1)
//         && (this.Jobposting_Report_Appliedcountdetails_Placed_Data[i].Interview_Status==inteview_attending_status || inteview_attending_status ==-1)
//             )
//         {
//             this.Jobposting_Report_AppliedcountdetailsData.push(this.Jobposting_Report_Appliedcountdetails_Placed_Data[i])
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
        this.Jobposting_Report_AppliedcountdetailsData=Rows[0];
        
        for (var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
        {
            if(this.Jobposting_Report_AppliedcountdetailsData[i].Placement_Status==1)
            {
                this.Jobposting_Report_AppliedcountdetailsData[i].Placement_Status_Name="Placed"
            }
            else (this.Jobposting_Report_AppliedcountdetailsData[i].Placement_Status_Name = "Not Placed");
            
        }

        for (var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
        {
            if(this.Jobposting_Report_AppliedcountdetailsData[i].Interview_Status==1)
            {
                this.Jobposting_Report_AppliedcountdetailsData[i].Interview_Status_Name="Inteview Scheduled"
            }
            else (this.Jobposting_Report_AppliedcountdetailsData[i].Interview_Status_Name = "Inteview Not Scheduled");
            
        }


        // for (var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
        // {
        //     if(this.Jobposting_Report_AppliedcountdetailsData[i].Interview_Attending_Rejecting==1)
        //     {
        //         this.Jobposting_Report_AppliedcountdetailsData[i].Interview_Attending_Rejecting_Name="Inteview Apply"
        //     }
        //     if(this.Jobposting_Report_AppliedcountdetailsData[i].Interview_Attending_Rejecting==2)
        //     {
        //         this.Jobposting_Report_AppliedcountdetailsData[i].Interview_Attending_Rejecting_Name="Inteview Reject"
        //     }
        //     if(this.Jobposting_Report_AppliedcountdetailsData[i].Interview_Attending_Rejecting==3)
        //     {
        //         this.Jobposting_Report_AppliedcountdetailsData[i].Interview_Attending_Rejecting_Name="Not Responded"
        //     }
        // }


        for (var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
        {
            if(this.Jobposting_Report_AppliedcountdetailsData[i].Image_ResumeFilename==null||this.Jobposting_Report_AppliedcountdetailsData[i].Image_ResumeFilename==undefined||this.Jobposting_Report_AppliedcountdetailsData[i].Image_ResumeFilename=="")
            {
                this.Jobposting_Report_AppliedcountdetailsData[i].resume_button_view =0
            }
            else ( this.Jobposting_Report_AppliedcountdetailsData[i].resume_button_view =1);
            
        }
       
      debugger  

 this.selectedDataArray = [];
for (var i = 0; i < this.Jobposting_Report_AppliedcountdetailsData.length; i++) {
  var data = this.Jobposting_Report_AppliedcountdetailsData[i];
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




        this.Jobposting_Report_Appliedcountdetails_Full_Data=Rows[0];
        this.Jobposting_Report_Appliedcountdetails_Placed_Data=Rows[0];
        
        this.Search_Job = JobTitle
        this.Search_Company = Company_Name
        this.Total_Entries_Appliedcount =this.Jobposting_Report_AppliedcountdetailsData.length;
       
    this.issLoading = false;
    if(this.Jobposting_Report_AppliedcountdetailsData.length==0)
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
        this.Jobposting_Report_RejectedcountdetailsData=Rows[0];
       
        this.Search_Job = JobTitleRejected
        this.Total_Entries_Rejectedcount =this.Jobposting_Report_RejectedcountdetailsData.length;
       
    this.issLoading = false;
    if(this.Jobposting_Report_RejectedcountdetailsData.length==0)
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


// Download_Resume_File(File_Name,StudentId) {
    
//     this.issLoading = true;
    
//     this.Job_Posting_Service_.Get_Resumefilefor_Report(StudentId).subscribe(
//     (Rows) => {
//         this.Resumefiledata=Rows[0];
//     this.issLoading = false;
//     var File_Name_Temp;
//     if(File_Name=='Image_ResumeFilename')
    
//     for (var i=0;i<this.Resumefiledata.length;i++)
//     {
//         File_Name_Temp=this.Resumefiledata[i].Image_ResumeFilename;  
//     }
    
//      var bs= environment.FilePath;//'C:/Teena/Edabroad/Back End/Uploads/'
//     // var bs= "http://oneteamdemoapi.trackbox.co.in/bina/Uploads/";
//     var s=bs+File_Name_Temp;
//     window.open(s,'_blank');  
//     },
//     (Rows) => {
//     this.issLoading = false;
//     const dialogRef = this.dialogBox.open(DialogBox_Component, {
//     panelClass: "Dialogbox-Class",
//     data: { Message: "Error Occured", Type: "2" },
//     });
//     }
//     );
//     }







    Download_Resume_File(File_Name,StudentId) {
    
        debugger
        
        this.issLoadingapi=true;

        this.Job_Posting_Service_.Get_Resumefilefor_Report(StudentId).subscribe(
            (Rows) => {
                this.Resumefiledata=Rows[0];
            this.issLoading = false;
           
        var ar=[];
        this.zip.forEach(function (relativePath, file){
          ar.push(relativePath)
           
        });
        
        for(var i=0;i<ar.length;i++)
            this.zip.remove(ar[i])
     
            var tempfile_size=0
            this.files=[];
            for(var i=0;i<this.Resumefiledata.length;i++)
            {
            //   if(this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box==true)
            //   {
                debugger
                this.files.push({
                    filename: environment.FilePath + this.Resumefiledata[i].Image_ResumeFilename,
                    Originalfilename: this.Resumefiledata[i].Student_Name+"_"+this.Resumefiledata[i].Course_Name,
                  });
                //  }
            }
     
      tempfile_size=120202;
            var value=((tempfile_size)/(1024))/(1024);
            this.Actualfile_size=Math.round(value);
          
                this.startDownload(0)
            },  );
        
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
    
    // for (var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
    // {
        File_Name_Temp=this.Jobposting_Report_AppliedcountdetailsData.Image_ResumeFilename;  
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
    // this.Search_Jobposting_Summary();
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

for (var i=0;i<this.Jobposting_Report_RejectedcountdetailsData.length;i++)
{
    File_Name_Temp=this.Jobposting_Report_RejectedcountdetailsData[0].Image_ResumeFilename;  
}

var bs= environment.FilePath;//'C:/Teena/Edabroad/Back End/Uploads/'
var s=bs+File_Name_Temp;
window.open(s,'_blank');  

}


Resume_Click()
{
    
    for(var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
    {
        if(this.select_Resume==false)
            this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box=true;
        else
            this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box=false;
    }

}


// downloadZip(index_) {
//     
//     //  this.issLoading =true;
//     // this.Jobposting_Report_AppliedcountdetailsData=this.Job_Posting_Data_List[index_].Jobposting_Report_AppliedcountdetailsData;
//     var selectioncount=0;
//         for(var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
//           if(this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box==true)
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
//         for(var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
//         {
//           if(this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box==true)
//           {
            
//             this.files.push({'filename':environment.FilePath + this.Jobposting_Report_AppliedcountdetailsData[i].Image_ResumeFilename,'Originalfilename':this.Jobposting_Report_AppliedcountdetailsData[i].Image_ResumeFilename})
//             // tempfile_size=tempfile_size+Number(this.Jobposting_Report_AppliedcountdetailsData[i].Album_Id) ;   "http://oneteamdemo.trackbox.co.in/bina/Uploads/"
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
   // this.Jobposting_Report_AppliedcountdetailsData=this.Job_Posting_Data_List[index_].Jobposting_Report_AppliedcountdetailsData;
   var selectioncount=0;
       for(var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
         if(this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box==true)
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
       for(var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
       {
         if(this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box==true)
         {
           debugger
           //this.files.push({'filename':environment.FilePath + this.Jobposting_Report_AppliedcountdetailsData[i].Image_ResumeFilename,'Originalfilename':this.Jobposting_Report_AppliedcountdetailsData[i].Image_ResumeFilename})
           this.files.push({
               filename: environment.FilePath + this.Jobposting_Report_AppliedcountdetailsData[i].Image_ResumeFilename,
               Originalfilename: this.Jobposting_Report_AppliedcountdetailsData[i].Student_Name+"_"+this.Jobposting_Report_AppliedcountdetailsData[i].Course_Name,
             });
            //console.log(this.files)
           // tempfile_size=tempfile_size+Number(this.Jobposting_Report_AppliedcountdetailsData[i].Album_Id) ;   "http://oneteamdemo.trackbox.co.in/bina/Uploads/"
         }
       }





    //    for (var i = 0; i < this.Jobposting_Report_AppliedcountdetailsData.length; i++) {
    //     if (this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box == true) {
    //       const fileWithExtension = this.Jobposting_Report_AppliedcountdetailsData[i].Image_ResumeFilename;
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

    debugger


   
    {
        debugger
        this.issLoading =true;
        this.loadSvgData(this.files[fileId].filename, fileId, this.saveAsZip);
        this.issLoading =false;
    }



    // if (this.files[fileId].filename.endsWith('.pdf') )
    // {
    //     debugger
    //     this.issLoading =true;
    //     this.loadSvgData(this.files[fileId].filename, fileId, this.saveAsZip);
    //     this.issLoading =false;
    // }
    // else if(this.files[fileId].filename.endsWith('.jpg') || this.files[fileId].filename.endsWith('.png'))
    // {
    //     // this.files[fileId].filename = this.files[fileId].filename.replace(/\.(jpg|png)$/, '.pdf');
    
    //     this.issLoading =true;
    //     this.loadSvgData(this.files[fileId].filename, fileId, this.saveAsZip);
    //     this.issLoading =false;
    // }
    // else {

    //     debugger
    //     // this.downloadFile(this.files[fileId].filename)
    //     // this.handleFileUpload(this.files[fileId].filename)
    //     // this.files[fileId].filename = this.files[fileId].filename + '.pdf';
      
    //     // this.issLoading =true;
    //     // this.loadSvgData(this.files[fileId].filename, fileId, this.saveAsZip);
    //     // this.issLoading =false;
    // }
  
        // this.downloadAsPDF(this.files[fileId].filename, 'downloaded-file')
        // this.convertToPDF(this.files[fileId].filename)
    
    ;
   

    // this.issLoading =false;
   
  }
  private loadSvgData(url: string,fileId, callback: Function): void {
    debugger
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
    debugger
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
    debugger
    this.issLoading=false;
    this.zip
      .generateAsync({ type: 'blob' })
      .then(blob => this.save_zipfile(blob));
      //.then(blob => saveAs(blob, 'image.zip'));
  }



Schedule_Interview()
{

    var selectioncount=0,Interviewschedulecount=0;
    for(var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
      if(this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box==true)
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

for(var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
if(this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box==true)
{
    if(this.Jobposting_Report_AppliedcountdetailsData[i].Interview_Status==1)
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
//     for(var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
//         {
//           if(this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box==true)
//           {
//             temp_Applied_jobs=temp_Applied_jobs + this.Jobposting_Report_AppliedcountdetailsData[i].Applied_Jobs_Id + ','
//           }
//         }
//         temp_Applied_jobs=temp_Applied_jobs.substring(0,temp_Applied_jobs.length-1)


//         var temp_Student_d='';
//         for(var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
//             {
//               if(this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box==true)
//               {
//                 temp_Student_d=temp_Student_d + this.Jobposting_Report_AppliedcountdetailsData[i].Student_Id + ','
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
    for(var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
        {
          if(this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box==true)
          {
            temp_Applied_jobs=temp_Applied_jobs + this.Jobposting_Report_AppliedcountdetailsData[i].Applied_Jobs_Id + ','
          }
        }
        temp_Applied_jobs=temp_Applied_jobs.substring(0,temp_Applied_jobs.length-1)


        var temp_Student_d='';
        for(var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
            {
              if(this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box==true)
              {
                temp_Student_d=temp_Student_d + this.Jobposting_Report_AppliedcountdetailsData[i].Student_Id + ','
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
    for(var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
      if(this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box==true)
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

 
// Save_Mark_Placement()
// {
    
//     if (this.Mark_Placement_Date == undefined || this.Mark_Placement_Date == null|| this.Mark_Placement_Date == "" ) 
//     {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Schedule Date', Type: "3" } });
//         return;
//     } 
//     if (this.Mark_Placement_Description == undefined || this.Mark_Placement_Description == null || this.Mark_Placement_Description == "" ) 
//     {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Description', Type: "3" } });
//         return;
//     }
   
// 
//     var temp_Applied_jobs='';
//     for(var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
//         {
//           if(this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box==true)
//           {
//             temp_Applied_jobs=temp_Applied_jobs + this.Jobposting_Report_AppliedcountdetailsData[i].Applied_Jobs_Id + ','
//           }
//         }
//         temp_Applied_jobs=temp_Applied_jobs.substring(0,temp_Applied_jobs.length-1)


//         var temp_Student_d='';
//         for(var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
//             {
//               if(this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box==true)
//               {
//                 temp_Student_d=temp_Student_d + this.Jobposting_Report_AppliedcountdetailsData[i].Student_Id + ','
//               }
//             }
//             temp_Student_d=temp_Student_d.substring(0,temp_Student_d.length-1)

//     
//     this.Mark_Placement_Date = this.New_Date(new Date(moment(this.Mark_Placement_Date).format("YYYY-MM-DD")) );




    
   
//  this.issLoading = true;
//     this.Job_Posting_Service_.Save_Mark_Placement(this.Mark_Placement_Date,temp_Applied_jobs,this.Mark_Placement_Description,this.Login_User,temp_Student_d).subscribe(Save_status => {
//         
//         if(Number(Save_status[0][0].status_)>0)
//         { 
//             this.issLoading=false;
//         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
//         //    this.Save_Call_Status = false;
//             // this.clr_Mark_Placement()
//             this.Search_Appliedcount_Details(this.JobPostingId_Public, this.JobTitle_Public);
//             this.Close_Mark_Placement();
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
    for(var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
        {
          if(this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box==true)
          {
            temp_Applied_jobs=temp_Applied_jobs + this.Jobposting_Report_AppliedcountdetailsData[i].Applied_Jobs_Id + ','
          }
        }
        temp_Applied_jobs=temp_Applied_jobs.substring(0,temp_Applied_jobs.length-1)


        var temp_Student_d='';
        for(var i=0;i<this.Jobposting_Report_AppliedcountdetailsData.length;i++)
            {
              if(this.Jobposting_Report_AppliedcountdetailsData[i].Check_Box==true)
              {
                temp_Student_d=temp_Student_d + this.Jobposting_Report_AppliedcountdetailsData[i].Student_Id + ','
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


Create_New()
{
    this.Entry_View1 = true;
    this.Entry_View = false;
    this.profile_View = true;
    // this.Job_Posting_Id = 0
    this.Clr_Job_Posting();
}

Close_ClickJob_post()
{

    this.Search_Jobposting_Summary();
    this.Entry_View1 = false;
    this.Entry_View = true;
    this.profile_View = false;
}



Save_Job_Posting()
{
    if (this.JobEmployeedetails_ == undefined ||
        this.JobEmployeedetails_ == null ||
        this.JobEmployeedetails_.Employer_Details_Id == undefined ||
        this.JobEmployeedetails_.Employer_Details_Id == 0 )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Company Name', Type: "3" } });
        return;
    }
    if (this.Job_Course_ == undefined || this.Job_Course_ == null || this.Job_Course_.Course_Id == undefined || this.Job_Course_.Course_Id==0) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Course', Type: "3" } });
        return;
    } 
    // if (this.Job_Posting_.Job_Code == undefined || this.Job_Posting_.Job_Code == null || this.Job_Posting_.Job_Code == "" ) 
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Job Code', Type: "3" } });
    //     return;
    // }
    if (this.Job_Posting_.Job_Title == undefined || this.Job_Posting_.Job_Title == null || this.Job_Posting_.Job_Title == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Job Title', Type: "3" } });
        return;
    }

    if (this.Job_Posting_.No_Of_Vaccancy == undefined || this.Job_Posting_.No_Of_Vaccancy == null || this.Job_Posting_.No_Of_Vaccancy == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter No Of Vaccancy', Type: "3" } });
        return;
    }

    if (this.Job_Posting_.Salary == undefined || this.Job_Posting_.Salary == null || this.Job_Posting_.Salary == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Salary', Type: "3" } });
        return;
    }
    if (this.Job_Posting_.Descritpion == undefined || this.Job_Posting_.Descritpion == null || this.Job_Posting_.Descritpion == "" ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Description', Type: "3" } });
        return;
    }
    if (this.Job_Posting_.Last_Date == undefined || this.Job_Posting_.Last_Date == null||this.Job_Posting_.Last_Date == ""  ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Last Date', Type: "3" } });
        return;
    }


    if (this.Job_Posting_.Last_Time == undefined || this.Job_Posting_.Last_Time == null||this.Job_Posting_.Last_Time == ""  ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Last time', Type: "3" } });
        return;
    }


    // if (this.Experience_ == undefined || this.Experience_ == null || this.Experience_.Experience_Id == undefined || this.Experience_.Experience_Id==0) 
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Experience', Type: "3" } });
    //     return;
    // }
       
    // if (this.Status_ == undefined || this.Status_ == null || this.Status_.Status_Id == undefined || this.Status_.Status_Id==0) 
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Status', Type: "3" } });
    //     return;
    // } 
    

     if (this.Gender_ == undefined || this.Gender_ == null || this.Gender_.Gender_Id == undefined || this.Gender_.Gender_Id==0) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Gender', Type: "3" } });
        return;
    } 
    //debugger
    this.Job_Posting_.Last_Date = this.New_Date(new Date(moment(this.Job_Posting_.Last_Date).format("YYYY-MM-DD")) );
    
    this.Job_Posting_.User_Id=this.Login_User;
    this.Job_Posting_.Experience=this.Experience_.Experience_Id;
    this.Job_Posting_.Functional_Area=this.Functionl_Area_.Functionl_Area_Id;
    this.Job_Posting_.Specialization=this.Specialization_.Specialization_Id;
    this.Job_Posting_.Qualification=this.Qualification_.Qualification_Id;
    this.Job_Posting_.Experience_Name=this.Experience_.Experience_Name;
    this.Job_Posting_.Functional_Area_Name=this.Functionl_Area_.Functionl_Area_Name;
    this.Job_Posting_.Specialization_Name=this.Specialization_.Specialization_Name;
    this.Job_Posting_.Qualification_Name=this.Qualification_.Qualification_Name;
    this.Job_Posting_.Status=this.Status_.Status_Id;
    this.Job_Posting_.Course_Id=this.Job_Course_.Course_Id;
    this.Job_Posting_.Course_Name=this.Job_Course_.Course_Name;
    this.Job_Posting_.Gender_Id=this.Gender_.Gender_Id;
    this.Job_Posting_.Gender_Name=this.Gender_.Gender_Name;

    this.Job_Posting_.Company_Id=this.JobEmployeedetails_.Employer_Details_Id;
    this.Job_Posting_.Company_Name=this.JobEmployeedetails_.Company_Name;
//debugger
    if (this.Save_Call_Status == true)
        return;
    else
        this.Save_Call_Status = true;
 this.issLoading = true;
 debugger
    // this.Job_Posting_Service_.Save_Job_Posting(this.Job_Posting_, this.ImageFile_Logo).subscribe(Save_status => {
        this.Job_Posting_Service_.Save_Job_Posting(this.Job_Posting_).subscribe(Save_status => {
        debugger
        // if(Number(Save_status[0][0].Job_Posting_Id_)>0)
        if(Number(Save_status[0].Job_Posting_Id_)>0)
        { 
            this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
           this.Save_Call_Status = false;
            this.Close_ClickJob_post();
           
           
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


Load_Gender() {
    this.issLoading = true;
    this.Student_Service_.Load_Gender().subscribe(
    (Rows) => {
    if (Rows != null) {
    this.Gender_Data = Rows[0];


    this.Gender_Temp.Gender_Id = 3;
    this.Gender_Temp.Gender_Name = "Both";
    this.Gender_Data.unshift(Object.assign({},this.Gender_Temp));


    this.Gender_Temp.Gender_Id = 0;
    this.Gender_Temp.Gender_Name = "Select";
    this.Gender_Data.unshift(Object.assign({},this.Gender_Temp));



    this.Gender_ = this.Gender_Data[0];
    this.issLoading = false;
    }
    },
    (Rows) => {
    this.issLoading = false;
    }
    );
    }

    Load_Dropdowns() {

        this.Student_Service_.Get_Load_Dropdowns_Data().subscribe(
        (Rows) => {
        //debugger
        this.Job_Course_Data = Rows[8];
        this.Job_Course_Temp.Course_Id = 0;
        this.Job_Course_Temp.Course_Name = "Select";
        this.Job_Course_Data.unshift(this.Job_Course_Temp);
        this.Job_Course_ = this.Job_Course_Data[0];
        
        },
        (Rows) => {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Error Occured", Type: "2" },
        });
        }
        );
        }


        Clr_Job_Posting()
{
    this.Job_Posting_.Job_Posting_Id=0;
    this.Job_Posting_.Job_Code='';
    this.Job_Posting_.Job_Title='';
    this.Job_Posting_.Descritpion='';
    this.Job_Posting_.Skills='';
    this.Job_Posting_.No_Of_Vaccancy='';
    this.Job_Posting_.Job_Location='';
    this.Job_Posting_.Salary='';
    this.Job_Posting_.Last_Date = '';
    // this.Job_Posting_.Last_Date = new Date();
    // this.Job_Posting_.Last_Date = this.New_Date(this.Job_Posting_.Last_Date);
    this.Job_Posting_.Company_Name='';
    this.Job_Posting_.Address='';
    this.Job_Posting_.Contact_Name='';
    this.Job_Posting_.Contact_No='';
    this.Job_Posting_.Email='';
    this.Job_Posting_.Address1='';
    this.Job_Posting_.Address2='';
    this.Job_Posting_.Address3='';
    this.Job_Posting_.Address4='';
    this.Job_Posting_.Pincode='';
    this.Job_Posting_.Logo='';
    // this.ImageFile_Logo='';
    // this.Display_Logo_='';
    this.Job_Posting_.User_Id=0; 
    this.Employeedetails_=null;   

    this.Job_Posting_.Experience_Name='';
    this.Job_Posting_.Qualification_Name='';
    this.Job_Posting_.Specialization_Name='';
    this.Job_Posting_.Functional_Area_Name='';

    if(this.Specialization_Data!=null && this.Specialization_Data != undefined)
    this.Specialization_=this.Specialization_Data[0];

    if(this.Course_Data!=null && this.Course_Data != undefined)
    this.Course_=this.Course_Data[0];

    if(this.Experience_Data!=null && this.Experience_Data != undefined)
    this.Experience_=this.Experience_Data[0];
    if(this.Functionl_Area_Data!=null && this.Functionl_Area_Data != undefined)
    this.Functionl_Area_=this.Functionl_Area_Data[0];
    if(this.Qualification_Data!=null && this.Qualification_Data != undefined)
    this.Qualification_=this.Qualification_Data[0];
    if(this.Status_Data!=null && this.Status_Data != undefined)
    this.Status_=this.Status_Data[0];

    if(this.Gender_Data!=null && this.Gender_Data != undefined)
    this.Gender_=this.Gender_Data[0];
}




Edit_Job_Posting(Job_Posting_e:any,index)
{
debugger
    this.profile_View =true;
    this.Entry_View=false;
    this.Clr_Job_Posting();
    this.Job_Posting_EditIndex = index
    this.Job_Posting_Id = Job_Posting_e.Job_Posting_Id;
    this.Entry_View=true;
    this.profile_View=true;
    this.Get_Job_Posting(Job_Posting_e.Job_Posting_Id);
}

Get_Job_Posting(Job_Posting_Id)
{

    debugger
    this.Job_Posting_Id = Job_Posting_Id;
    this.Entry_View=false;
    this.profile_View=true;
    this.issLoading = true;
    this.Job_Posting_Service_.Get_Job_Posting(Job_Posting_Id).subscribe(Rows =>{
    this.Job_Posting_= Object.assign({},Rows[0][0]);
    //  this.Display_Logo_=this.Job_Posting_.Logo;
    debugger
     for (var i = 0; i < this.Status_Data.length; i++)
        {
        if (this.Job_Posting_.Status == this.Status_Data[i].Status_Id)
        this.Status_=this.Status_Data[i];
        } 

        for (var i = 0; i < this.Experience_Data.length; i++)
        {
        if (this.Job_Posting_.Experience == this.Experience_Data[i].Experience_Id)
        this.Experience_=this.Experience_Data[i];
        } 

        for (var i = 0; i < this.Specialization_Data.length; i++)
        {
        if (this.Job_Posting_.Specialization == this.Specialization_Data[i].Specialization_Id)
        this.Specialization_=this.Specialization_Data[i];
        } 

        for (var i = 0; i < this.Job_Course_Data.length; i++)
        {
        if (this.Job_Posting_.Course_Id == this.Job_Course_Data[i].Course_Id)
        this.Job_Course_=this.Job_Course_Data[i];
        }
        
        for (var i = 0; i < this.Qualification_Data.length; i++)
        {
        if (this.Job_Posting_.Qualification == this.Qualification_Data[i].Qualification_Id)
        this.Qualification_=this.Qualification_Data[i];
        }

        for (var i = 0; i < this.Functionl_Area_Data.length; i++)
        {
        if (this.Job_Posting_.Functional_Area == this.Functionl_Area_Data[i].Functionl_Area_Id)
        this.Functionl_Area_=this.Functionl_Area_Data[i];
        } 

        for (var i = 0; i < this.Gender_Data.length; i++)
        {
        if (this.Job_Posting_.Gender_Id == this.Gender_Data[i].Gender_Id)
        this.Gender_=this.Gender_Data[i];
        } 



        this.Employeedetails_Temp.Employer_Details_Id = this.Job_Posting_.Company_Id;
        this.Employeedetails_Temp.Company_Name = this.Job_Posting_.Company_Name;
        this.JobEmployeedetails_ = Object.assign(this.Employeedetails_Temp);



    this.issLoading = false;
    } ,
    Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}

Delete_Job_Posting(Job_Posting_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
   this.issLoading=true;
   debugger
    this.Job_Posting_Service_.Delete_Job_Posting(Job_Posting_Id).subscribe(Delete_status => {

        debugger
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_;
    if(Delete_status==1)
    {
    this.Jobposting_Report_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
    this.Search_Jobposting_Summary();
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


Load_Job_Posting_Search_Dropdowns()
{
    this.issLoading = true;
    this.Job_Posting_Service_.Load_Job_Posting_Search_Dropdowns(3).subscribe(Rows => {
    if (Rows != null) {
        this.Status_Data = Rows[0];
        this.Status_Temp.Status_Id = 0;
        this.Status_Temp.Status_Name = "All";
        this.Status_Data.unshift(this.Status_Temp);
        this.Status_ = this.Status_Data[0];
        this.Search_Status = this.Status_Data[0];
        this.issLoading = false;
    }
},
    Rows => {
        this.issLoading = false;
    });
}


Load_Job_Posting_Dropdowns()
{
    this.issLoading = true;
    this.Job_Posting_Service_.Load_Job_Posting_Dropdowns().subscribe(Rows => {
    if (Rows != null) {
        
        this.Functionl_Area_Data = Rows[0];
        this.Functionl_Area_Temp.Functionl_Area_Id = 0;
        this.Functionl_Area_Temp.Functionl_Area_Name = "All";
        this.Functionl_Area_Data.unshift(this.Functionl_Area_Temp);
        this.Functionl_Area_ = this.Functionl_Area_Data[0];

        this.Specialization_Data = Rows[1];
        this.Specialization_Temp.Specialization_Id = 0;
        this.Specialization_Temp.Specialization_Name = "All";
        this.Specialization_Data.unshift(this.Specialization_Temp);
        this.Specialization_ = this.Specialization_Data[0];

        this.Experience_Data = Rows[2];
        this.Experience_Temp.Experience_Id = 0;
        this.Experience_Temp.Experience_Name = "All";
        this.Experience_Data.unshift(this.Experience_Temp);
        this.Experience_ = this.Experience_Data[0];
        this.Experience_Search = this.Experience_Data[0];

        this.Qualification_Data = Rows[3];
        this.Qualification_Temp.Qualification_Id = 0;
        this.Qualification_Temp.Qualification_Name = "All";
        this.Qualification_Data.unshift(this.Qualification_Temp);
        this.Qualification_ = this.Qualification_Data[0];

        this.issLoading = false;
    }
},
    Rows => {
        this.issLoading = false;
    });
}


Create_New_Company()
{
    this.router.navigateByUrl('Employer_Details');
}





//   downloadAsPDF(fileContent: string[], fileName: string): void {

//     debugger
//     // const pdfContent = this.generatePdfContent(fileContent);
//     const pdfContent = fileContent;
//     pdfMake.createPdf(pdfContent).download(`${fileContent}.pdf`);
//   }

//   private generatePdfContent(fileContent: string[]): any {
//     const content = [];
// debugger
//     fileContent.forEach((contentItem) => {
//       if (contentItem.endsWith('.jpg') || contentItem.endsWith('.png')) {
//         content.push({ image: contentItem, width: 500 });
//       } else if (contentItem.endsWith('.xlsx')) {
//         // Handle xlxs file
//         // You might need additional libraries to parse and convert xlxs to a suitable format
//       }
//     });

//     return { content };
//   }






// export class YourComponent {
//   fileContent: string[] 

 
//   downloadFilesAsPDF(): void {
//     this.pdfGeneratorService.downloadAsPDF(this.fileContent, 'downloaded-file');
//   }




//   convertToPDF(fileContent: string) {

//     debugger
//     const docDefinition = {
//       content: [
//         { text: 'Converted PDF from File', style: 'header' },
//         { text: fileContent, style: 'body' }
//       ],
//       styles: {
//         header: { fontSize: 18, bold: true },
//         body: { fontSize: 12 }
//       }
//     };

//     pdfMake.createPdf(docDefinition).open();
//   }



//   convertToPDF(fileContent: string) {

//     debugger
//     const content = [];
//     if (fileContent.endsWith('.jpg') || fileContent.endsWith('.png')) {
//         // content.push({ image: fileContent, width: 500 });/
//         const fileName = fileContent;
//         const pdfFileName = fileName.replace('.jpg', '.pdf');


//       } 

//     //   pdfMake.createPdf(content).open();
//   }


// convertToPDF(fileContent: string) {
//     debugger
//     let pdfFileName: string;

//     if (fileContent.endsWith('.jpg') || fileContent.endsWith('.png')) {
//       // Remove the extension and add ".pdf"
//       pdfFileName = fileContent.replace(/\.(jpg|png)$/, '.pdf');
//     } else {
//       // If there is no extension, add ".pdf"
//       pdfFileName = fileContent + '.pdf';
//     }

//     pdfMake.createPdf(pdfFileName).open();

//     // console.log('Original File Name:', fileContent);
//     // console.log('Converted File Name:', pdfFileName);
//   }


//   addExtensionIfNeeded(fileContent: string, desiredExtension: string) {
//     // Check if the fileContent already has an extension
//     if (!fileContent.includes('.')) {
//       // If no extension, add the desired extension
//       fileContent += '.' + desiredExtension;
//     }

//     console.log('Original File Name:', fileContent);
//   }



//   handleFileUpload(file: File) {

//     debugger
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       const fileContent = reader.result as string;

//       // Determine the file type based on the content
//       const fileType = this.getFileType(fileContent);

//       // Add the corresponding extension
//       const fileNameWithExtension = this.addExtension(file.name, fileType);

//       console.log('Original File Name:', file.name);
//       console.log('File Type:', fileType);
//       console.log('Converted File Name:', fileNameWithExtension);
//     };

//     // reader.readAsText(file);

//     reader.readAsArrayBuffer(file);
//   }

//   private getFileType(fileContent: string): string {

//     debugger
//     // Here you can implement your logic to determine the file type based on the content
//     // For simplicity, this example checks for the presence of specific keywords in the content
//     if (fileContent.includes('png')) {
//       return 'png';
//     } else if (fileContent.includes('jpg') || fileContent.includes('jpeg')) {
//       return 'jpg';
//     } else {
//       return 'unknown';
//     }
//   }

//   private addExtension(fileName: string, fileType: string): string {

//     debugger
//     if (!fileName.includes('.')) {
//       // If the file name doesn't have an extension, add the corresponding extension
//       return `${fileName}.${fileType}`;
//     }
//     return fileName;
//   }


 
  
    // onFileSelected(event: any) {
    //   const file = event.target.files[0];
  
    //   // Call the handleFileUpload method with the file
    //   this.handleFileUpload(file);
    // }
  
    // handleFileUpload(file: File) {
    //   const reader = new FileReader();
  
    //   reader.onloadend = () => {
    //     const fileContent = reader.result as string;
  
    //     // Your file processing logic goes here
    //     console.log('File Content:', fileContent);
    //   };
  
    //   // Use readAsArrayBuffer or other appropriate method based on your needs
    //   reader.readAsArrayBuffer(file);
    // }
  



//   downloadFile(file: File) {

//     debugger
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       const fileContent = reader.result as ArrayBuffer;

//       // Determine the file type based on the content
//       const fileType = this.getFileType(fileContent);

//       // Add the corresponding extension
//       const fileNameWithExtension = this.addExtension(file.name, fileType);

//       // Create a Blob with the ArrayBuffer content
//       const blob = new Blob([fileContent], { type: fileType });

//       // Create a download link
//       const downloadLink = document.createElement('a');
//       downloadLink.href = URL.createObjectURL(blob);
//       downloadLink.download = fileNameWithExtension;

//       // Trigger the download
//       downloadLink.click();
//     };

//     // Read the file content as ArrayBuffer
//     reader.readAsArrayBuffer(file);
//   }

//   private getFileType(fileContent: ArrayBuffer): string {

//     debugger
//     // Your file type detection logic goes here
//     // You might need to use external libraries or specific logic for different file types
//     return 'application/octet-stream'; // Default to binary data
//   }

//   private addExtension(fileName: string, fileType: string): string {

//     debugger
//     // Your extension addition logic goes here
//     // You might want to check if the file already has an extension
//     // and replace it with the correct one if needed
//     return fileName.endsWith(fileType) ? fileName : `${fileName}.${fileType}`;
//   }


}

