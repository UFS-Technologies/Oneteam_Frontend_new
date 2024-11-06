import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job_Posting_Service } from '../../../services/Job_Posting.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Job_Posting } from '../../../models/Job_Posting';
import { Course } from '../../../models/Course';
import { Status } from '../../../models/Status';
import { Users } from '../../../models/Users';
import { Specialization } from '../../../models/Specialization';
import { Qualification } from '../../../models/Qualification';
import { Experience } from '../../../models/Experience';
import { Functionl_Area } from '../../../models/Functionl_Area';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Employer_Details } from 'app/models/Employer_Details';
import { Gender } from "../../../models/Gender";
import { Student_Service } from 'app/services/Student.service';
import { environment } from '../../../../environments/environment.prod';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Job_Posting',
templateUrl: './Job_Posting.component.html',
styleUrls: ['./Job_Posting.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Job_PostingComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Job_Posting_Edit:boolean;
    Job_Posting_Save:boolean;
    Job_Posting_Delete:boolean;
    myInnerHeight: number;

    Employeedetails_Data: Employer_Details[];
    Employeedetails_:Employer_Details=new Employer_Details();
    Employeedetails_Search:Employer_Details=new Employer_Details();
    Employeedetails_Temp: Employer_Details = new Employer_Details();
    Employeedetails_Data_Filter: Employer_Details[] 

    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    profile_View:boolean=true;
    
    Job_Posting_Id: number = 0;
    Job_Posting_Data: Job_Posting[]
    Job_Posting_: Job_Posting = new Job_Posting();
    Job_Code_Search:string;
    // Job_Title_Search:string;
    Job_Location_Search:string;

    Search_Status: Status = new Status;
    Status_Data: Status[];
    Status_:Status=new Status;
    Status_Temp: Status = new Status;

    Course_: Course = new Course();
    Course_Temp: Course = new Course();
    Course_Data: Course[];

    Save_Call_Status: boolean = false;
    Logo: string;
    Display_Logo_: string;
    ImageFile_Logo: any;

    Login_User: number = 0;
    Job_Posting_EditIndex: number = -1;

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

    LastDate: Date = new Date();

    Job_Posting_Id_localStorage:any;


    Gender_: Gender = new Gender();
    Gender_Temp: Gender = new Gender();
    Gender_Data: Gender[];

    Job_Title_Data: Job_Posting[];
    Job_Title_:Job_Posting=new Job_Posting();
    Job_Title_Search:Job_Posting=new Job_Posting();
    Job_Title_Temp: Job_Posting = new Job_Posting();
    Job_Title_Data_Filter: Job_Posting[] 


	Page_Length_: number = 50;
    Pointer_Start_: number;
    Pointer_Stop_: number;
    nextflag: number;
    Go_to_Createnew:string="0";


    Company_Id : number;
    Company_Name:string;
    Job_Title :string;
    No_of_Vacancy : string;
    Location :string;
    Salary :string;
    Gender_Id : number;
    Gender_Name:string;
    Job_Opening_Description :string;
    Job_Opening_Id:number;


constructor(public Job_Posting_Service_:Job_Posting_Service,public Student_Service_: Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));

    this.Go_to_Createnew = localStorage.getItem("Go_to_Createnew");
    this.Company_Id = Number(localStorage.getItem("Company_Id"));
    this.Company_Name = localStorage.getItem("Company_Name");
    this.Job_Title = localStorage.getItem("Job_Title");
    this.No_of_Vacancy = (localStorage.getItem("No_of_Vacancy"));
    this.Location = localStorage.getItem("Location");
    this.Salary = localStorage.getItem("Salary");
    this.Gender_Id = Number(localStorage.getItem("Gender_Id"));
    this.Gender_Name = localStorage.getItem("Gender_Name");
    this.Job_Opening_Description = localStorage.getItem("Job_Opening_Description");
    this.Job_Opening_Id = Number(localStorage.getItem("Job_Opening_Id"));
    
    this.Permissions = Get_Page_Permission(30);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Job_Posting_Edit=this.Permissions.Edit;
    this.Job_Posting_Save=this.Permissions.Save;
    this.Job_Posting_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
     
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 220;

    this.Pointer_Start_ = 1;
	this.Pointer_Stop_ = this.Page_Length_;

    this.Clr_Job_Posting();
    this.Load_Job_Posting_Dropdowns();
    this.Load_Gender();
    this.Load_Job_Posting_Search_Dropdowns();
    this.Load_Dropdowns();
    this.Search_Job_Posting();

    if(this.Go_to_Createnew=="1")
    {
debugger
        this.Entry_View = true;
        this.profile_View = true;
        this.Job_Posting_Id = 0 
        this.Job_Posting_.Company_Id= this.Company_Id;
        this.Job_Posting_.Company_Name= this.Company_Name;
        this.Job_Posting_.Job_Title= this.Job_Title;
        this.Job_Posting_.No_Of_Vaccancy= this.No_of_Vacancy;
        this.Job_Posting_.Job_Location= this.Location;
        this.Job_Posting_.Salary= this.Salary;
        this.Job_Posting_.Gender_Id= this.Gender_Id;
        this.Job_Posting_.Gender_Name= this.Gender_Name;
        this.Job_Posting_.Descritpion= this.Job_Opening_Description;
        this.Job_Posting_.Job_Opening_Id= this.Job_Opening_Id;
        this.Load_Gender();

        this.Employeedetails_Temp.Employer_Details_Id = this.Job_Posting_.Company_Id;
        this.Employeedetails_Temp.Company_Name = this.Job_Posting_.Company_Name;
        this.Employeedetails_ = Object.assign(this.Employeedetails_Temp);

       

    }
else{
    this.Entry_View = false
    this.profile_View = true  
}

localStorage.setItem('Go_to_Createnew', "0");
localStorage.setItem('Company_Id', "0");
localStorage.setItem('Company_Name', "0");
localStorage.setItem('Job_Title', "0");
localStorage.setItem('No_of_Vacancy', "0");
localStorage.setItem('Location', "0");
localStorage.setItem('Salary', "0");
localStorage.setItem('Gender_Id', "0");
localStorage.setItem('Gender_Name', "0");
localStorage.setItem('Job_Opening_Description', "0");
localStorage.setItem('Job_Opening_Id', "0");



    this.Job_Posting_Id_localStorage = localStorage.getItem('Job_Posting_Id');
   
    if (this.Job_Posting_Id_localStorage > "0") {
         
        this.Job_Posting_Id = Number(this.Job_Posting_Id_localStorage) ;
        localStorage.setItem('Job_Posting_Id', "0");
        this.Get_Job_Posting(this.Job_Posting_Id)
    }

    this.LastDate=this.New_Date(this.LastDate)
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

    if(this.Go_to_Createnew='1')
    {
        for (var i = 0; i < this.Gender_Data.length; i++)
        {
        if (this.Job_Posting_.Gender_Id == this.Gender_Data[i].Gender_Id)
        this.Gender_=this.Gender_Data[i];
        } 

    }
    this.issLoading = false;
    }
    },
    (Rows) => {
    this.issLoading = false;
    }
    );
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


Load_Dropdowns() {

    this.Student_Service_.Get_Load_Dropdowns_Data().subscribe(
    (Rows) => {
    //debugger
    this.Course_Data = Rows[8];
    this.Course_Temp.Course_Id = 0;
    this.Course_Temp.Course_Name = "Select";
    this.Course_Data.unshift(this.Course_Temp);
    this.Course_ = this.Course_Data[0];
    
    },
    (Rows) => {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
    panelClass: "Dialogbox-Class",
    data: { Message: "Error Occured", Type: "2" },
    });
    }
    );
    }



File_Change_Photo(event: Event) 
{    
    const file = (event.target as HTMLInputElement).files;
    this.ImageFile_Logo = file;
    this.Logo= this.ImageFile_Logo[0].name;
}
Download_Job_Posting_File(File_Name)
{
    var File_Name_Temp;
    if(File_Name=='Photo')
    File_Name_Temp=this.Job_Posting_.Logo;
    var bs=environment.FilePath
    var s=bs+File_Name_Temp;            
    window.open(s,'_blank');
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
Create_New()
{
    this.Entry_View = true;
    this.profile_View = true;
    this.Job_Posting_Id = 0
    //this.Clr_Job_Posting();
}
Close_Click()
{
    this.Entry_View = false;
    this.profile_View = false;
    this.Job_Posting_EditIndex = -1;
    this.Job_Posting_Id = 0
    this.Clr_Job_Posting();
    this.Search_Job_Posting();
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
    this.Job_Posting_.Job_Opening_Id=0;
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
    this.ImageFile_Logo='';
    this.Display_Logo_='';
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




Search_Job_Posting()
{
    var value = 1, Experience_Id = 0, Status_Id = 0, User_Id = 0,Job_id_=0, search_name_ = undefined,Company_id_=0;

    // if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
    // search_name_ = this.Search_Name;

    if (this.Job_Title_ != undefined && this.Job_Title_ != null)
    if (this.Job_Title_.Job_Posting_Id != undefined && this.Job_Title_.Job_Posting_Id != null)
    Job_id_ = this.Job_Title_.Job_Posting_Id;

    if (this.Employeedetails_ != undefined && this.Employeedetails_ != null)
    if (this.Employeedetails_.Employer_Details_Id != undefined && this.Employeedetails_.Employer_Details_Id != null)
    Company_id_ = this.Employeedetails_.Employer_Details_Id;  

    
    if (this.Experience_Search != undefined && this.Experience_Search != null)
        if (this.Experience_Search.Experience_Id != undefined && this.Experience_Search.Experience_Id != null)
        Experience_Id = this.Experience_Search.Experience_Id;


    this.issLoading = true;
    this.Job_Posting_Service_.Search_Job_Posting(this.Job_Code_Search,Job_id_,this.Job_Location_Search,Company_id_,
        this.Pointer_Start_,
        this.Pointer_Stop_,
        this.Page_Length_).subscribe(Rows =>{

    this.Job_Posting_Data = Rows.returnvalue.Job_Posting;
    this.Total_Entries = this.Job_Posting_Data.length;
    this.issLoading = false;
    if(this.Job_Posting_Data.length==0)
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
Delete_Job_Posting(Job_Posting_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
   this.issLoading=true;
    this.Job_Posting_Service_.Delete_Job_Posting(Job_Posting_Id).subscribe(Delete_status => {
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_;
    if(Delete_status==1)
    {
    this.Job_Posting_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
    this.Search_Job_Posting();
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


Save_Job_Posting()
{
    if (this.Employeedetails_ == undefined ||
        this.Employeedetails_ == null ||
        this.Employeedetails_.Employer_Details_Id == undefined ||
        this.Employeedetails_.Employer_Details_Id == 0 )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Company Name', Type: "3" } });
        return;
    }
    if (this.Course_ == undefined || this.Course_ == null || this.Course_.Course_Id == undefined || this.Course_.Course_Id==0) 
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

    // if (this.Qualification_ == undefined || this.Qualification_ == null || this.Qualification_.Qualification_Id == undefined || this.Qualification_.Qualification_Id==0) 
    //     {
    //         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Qualification', Type: "3" } });
    //         return;
    //     } 
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
    this.Job_Posting_.Course_Id=this.Course_.Course_Id;
    this.Job_Posting_.Course_Name=this.Course_.Course_Name;
    this.Job_Posting_.Gender_Id=this.Gender_.Gender_Id;
    this.Job_Posting_.Gender_Name=this.Gender_.Gender_Name;

    this.Job_Posting_.Company_Id=this.Employeedetails_.Employer_Details_Id;
    this.Job_Posting_.Company_Name=this.Employeedetails_.Company_Name;
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
            this.Close_Click()
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
Edit_Job_Posting(Job_Posting_e:any,index)
{
     this.Clr_Job_Posting();
    this.Job_Posting_EditIndex = index
    this.Job_Posting_Id = Job_Posting_e.Job_Posting_Id;
    this.Entry_View=true;
    this.profile_View=true;
    this.Get_Job_Posting(Job_Posting_e.Job_Posting_Id);
}

Get_Job_Posting(Job_Posting_Id)
{
    this.Job_Posting_Id = Job_Posting_Id;
    this.Entry_View=true;
    this.profile_View=true;
    this.issLoading = true;
    this.Job_Posting_Service_.Get_Job_Posting(Job_Posting_Id).subscribe(Rows =>{
    this.Job_Posting_= Object.assign({},Rows[0][0]);
     this.Display_Logo_=this.Job_Posting_.Logo;

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

        for (var i = 0; i < this.Course_Data.length; i++)
        {
        if (this.Job_Posting_.Course_Id == this.Course_Data[i].Course_Id)
        this.Course_=this.Course_Data[i];
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
        this.Employeedetails_ = Object.assign(this.Employeedetails_Temp);



    this.issLoading = false;
    } ,
    Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}


Next_Click() {
    if (this.Job_Posting_Data.length == this.Page_Length_) {
        this.Pointer_Start_ = this.Pointer_Start_ + this.Page_Length_;
        this.Pointer_Stop_ = this.Pointer_Stop_ + this.Page_Length_;
        this.nextflag = 1;
        if (this.Job_Posting_Data.length > 0) {
            this.Search_Job_Posting();
        }
    }
}

previous_Click() {
    if (this.Pointer_Start_ > 1) {
        this.Pointer_Start_ = this.Pointer_Start_ - this.Page_Length_;
        this.Pointer_Stop_ = this.Pointer_Stop_ - this.Page_Length_;
        this.Search_Job_Posting();
    }
}





}

