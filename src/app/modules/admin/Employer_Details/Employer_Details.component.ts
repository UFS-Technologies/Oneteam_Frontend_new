import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users_Service } from '../../../services/Users.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Users } from '../../../models/Users';
import {Employer_Details} from '../../../models/Employer_Details'
import { User_Menu_Selection } from '../../../models/User_Menu_Selection';
import { Employer_Details_Servive} from '../../../services/Employer_Details.Service'
import { User_Type } from '../../../models/User_Type';
import { User_Status } from '../../../models/User_Status';
import { Agent } from '../../../models/Agent';
import { User_Role } from '../../../models/User_Role';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';import { GeneralFunctions_Service } from 'app/services/GeneralFunctions.service';
import { Status } from 'app/models/Status';
import { Student_Service } from 'app/services/Student.service';
import { Enquiry_Source } from 'app/models/Enquiry_Source';
import { Course } from 'app/models/Course';
import { Job_Posting } from 'app/models/Job_Posting';
import { Job_Posting_Service } from 'app/services/Job_Posting.service';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { environment } from '../../../../environments/environment.js';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
selector: 'app-Employer_Details',
templateUrl: './Employer_Details.component.html',
styleUrls: ['./Employer_Details.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Employer_DetailsComponent implements OnInit {
Employer_Details_Data:Employer_Details[]
Search_User_Name_: string;
Company_Name:string;
Search_Agent_: Agent = new Agent();

// User_Menu_Selection_Data_Temp: User_Menu_Selection[] = [];
// User_Menu_Selection_Data:User_Menu_Selection[]
// User_Menu_Selection_:User_Menu_Selection= new User_Menu_Selection();


Employer_Details_:Employer_Details= new Employer_Details();

Comapany_Employeedetails_:any;
Comapany_Employeedetails_Temp:Employer_Details=new Employer_Details();

// User_Type_:User_Type=new User_Type();
// User_Type_Temp:User_Type=new User_Type();
// User_Type_Data:User_Type[]

Users_Name_Search:string;

Employer_Details_Role_Temp:User_Role=new User_Role();
Employer_Details_Role_Data:User_Role[];
User_Role_:User_Role=new User_Role();


User_Status_Data: User_Status[]
User_Status_Temp:User_Status = new User_Status();
User_Status_: User_Status = new User_Status();

Agent_Data: Agent[]
Agent_: Agent = new Agent();

Entry_View:boolean=true;
myInnerHeight: number;  
EditIndex: number;
Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;

Registration_Target:number;
FollowUp_Target:number

myTotalHeight:number;

Employer_Details_Edit:boolean;
Employer_Details_Save:boolean;
Employer_Details_Delete:boolean;

Login_User:string="0";
Users_Edit:boolean;
Select_View:boolean=false;
Select_View_Department:boolean=false;
Select_View_All_Department:boolean=false;
Select_Save:boolean=false;
Select_Edit:boolean=false;
Select_Delete:boolean=false;
Users_Save:boolean;
Users_Delete:boolean;
View_Password:string;

Company_List_Report_Data:any;
Company_List_Report_Data_first:any;
Company_List_Report_Data_first1:any;
Company_List_Report_Data_first1_Filter:any;

Enquiry_Status_Search: Status=new Status();
    Enquiry_Status_Data: Status[]
    Enquiry_Status_Temp: Status=new Status();

    User_Search: Users = new Users();
    Users_Data: Users[]
    Users_Temp: Users = new Users();

    Enquiry_Source_: Enquiry_Source = new Enquiry_Source;
    Enquiry_Source_Temp: Enquiry_Source = new Enquiry_Source;
    Enquiry_Source_Data: Enquiry_Source[] 

    Course_Data: Course[];
    Course_:Course=new Course;
    Course_Temp: Course = new Course;
    Course_Data_Filter: Course[] ;
    
     Employeedetails_Data: Employer_Details[];
    Employeedetails_:Employer_Details=new Employer_Details();
    Employeedetails_Search:Employer_Details=new Employer_Details();
    Employeedetails_Temp: Employer_Details = new Employer_Details();
    Employeedetails_Data_Filter: Employer_Details[] ;

    year: any;
    month: any;
    day: any;
    date: any;
 Edit_Page_Permission: any;

 Job_Title_Data: Job_Posting[];
    Job_Title_:Job_Posting=new Job_Posting();
    Job_Title_Search:Job_Posting=new Job_Posting();
    Job_Title_Temp: Job_Posting = new Job_Posting();
    Job_Title_Data_Filter: Job_Posting[] ;

    Page_Length_: number = 50;
    Pointer_Start_: number;
    Pointer_Stop_: number;
    nextflag: number;
    Search_Company:string;
    Company_Name_Public:string;

      Is_Date:boolean=false;  
      First_Time_Value :number;

    FromDate_: Date = new Date();
    ToDate_: Date = new Date();

array:any;
Agent_Temp: Agent = new Agent();
constructor( public Job_Posting_Service_:Job_Posting_Service,public Student_Service_:Student_Service,public GeneralFunctions_Service_:GeneralFunctions_Service,public Employer_Details_Servive:Employer_Details_Servive, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    
this.Login_User = localStorage.getItem("Login_User");  
this.Permissions = Get_Page_Permission(48); 
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('Home_Page');
}
else
{

this.Page_Load()

}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_Employer_Details();
    // this.Search_Employer_Details();
    this.Entry_View=false;
    this.Get_Menu_Status(48,this.Login_User); 
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-250;
    this.myInnerHeight = this.myInnerHeight - 250;

    this.Pointer_Start_ = 1;
    this.Pointer_Stop_ = this.Page_Length_;

    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)

    this.Search_Company_List_Report(1);

}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Employer_Details();
}
// Close_Click()
// {
//     this.Search_Employer_Details();
//     this.Clr_Employer_Details();
//     this.Entry_View = false;
// }

Close_Click()
{
this.Clr_Employer_Details();
this.Entry_View = false;
}


// trackByFn(index, item) 
// {
// return index;
// }

Clr_Employer_Details()
 {
    this.Employer_Details_.Employer_Details_Id=0;
    this.Employer_Details_.Company_Name="";
    this.Employer_Details_.Contact_Person="";
    this.Employer_Details_.Contact_Number="";
    this.Employer_Details_.Email_Id="";
    this.Employer_Details_.Company_Location="";
    this.Employer_Details_.Website="";
}
// Search_Employer_Details()
// {
//     this.issLoading=true;
//     this.Employer_Details_Servive.Search_Employer_Details(this.Company_Name).subscribe(Rows => {
//     this.Employer_Details_Data=Rows.returnvalue.Leads;
//     this.Total_Entries=this.Employer_Details_Data.length;
//      if(this.Employer_Details_Data.length==0)
//     {
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
//     this.issLoading=false;
//     }
//     this.issLoading=false;
//     },
//     Rows => { 
//     this.issLoading=false;
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//     });

Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.GeneralFunctions_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            
    this.array=Rows[0][0]
    
    if (Rows[0][0]==undefined)
    {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
    }  
    else
    if (Rows[0][0].View >0) 
    {       
        
        if(Menu_id==48)
        {
             this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
               
                this.Employer_Details_Edit=this.Permissions.Edit;
                this.Employer_Details_Save=this.Permissions.Save;
                this.Employer_Details_Delete=this.Permissions.Delete;
        }

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}


    Search_Employer_Details()
    {
        
      var Search_Agent_Id = 0 ;
    
    this.issLoading=true;
    if(this.Search_Employer_Details==undefined)
    this.Search_User_Name_="";
        if(this.Search_Agent_!=undefined && this.Search_Agent_!=null )
        Search_Agent_Id=this.Search_Agent_.Agent_Id;
    
    this.Employer_Details_Servive.Search_Employer_Details(this.Search_User_Name_).subscribe(Rows => {
        
     this.Employer_Details_Data=Rows.returnvalue.Leads;
    this.Total_Entries=this.Employer_Details_Data.length;
    if(this.Employer_Details_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
    }
    this.issLoading=false;
     },
     Rows => { 
         this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
     });
    
    
    }

Delete_Employer_Details(Employer_Details_Id_,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
  
        {
        this.issLoading=true;
        this.Employer_Details_Servive.Delete_Employer_Details(Employer_Details_Id_).subscribe(Delete_Employer_Details => {
    debugger
       Delete_Employer_Details = Delete_Employer_Details[0];
       Delete_Employer_Details = Delete_Employer_Details[0].Employer_Details_Id_;
        if(Delete_Employer_Details>=1){
        this.Company_List_Report_Data.splice(index, 1);
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
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


 

Save_Employer_Details()
{

debugger

    if(this.Comapany_Employeedetails_==undefined || this.Comapany_Employeedetails_==null|| this.Comapany_Employeedetails_=="" )
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Company ',Type: "3" }});
    return  
    }

    if(this.Employer_Details_.Contact_Person===undefined || this.Employer_Details_.Contact_Person==null || this.Employer_Details_.Contact_Person=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Contact Person ',Type: "3" }});
    return  
    }

    if(this.Employer_Details_.Contact_Number===undefined || this.Employer_Details_.Contact_Number==null || this.Employer_Details_.Contact_Number=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Contact Number ',Type: "3" }});
    return  
    }

    if(this.Employer_Details_.Email_Id===undefined || this.Employer_Details_.Email_Id==null || this.Employer_Details_.Email_Id=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Email Id ',Type: "3" }});
    return  
    }

    // if(this.Comapany_Employeedetails_.Company_Name!=undefined || this.Comapany_Employeedetails_.Company_Name!=null || this.Comapany_Employeedetails_.Company_Name!="")
    // {
    // const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Company already exist ',Type: "3" }});
    // return  
    // }

    this.Employer_Details_.Company_Name =this.Comapany_Employeedetails_;
    
    this.issLoading=true;
    
    this.Employer_Details_Servive.Save_Employer_Details(this.Employer_Details_).subscribe(Save_status => {       
    
        // Save_status=Save_status[0];
    if(Number(Save_status[0].Employer_Details_Id_)>0)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
        this.Close_Click();
        // this.Search_Employer_Details();
        this.Search_Company_List_Report(2);
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

    Edit_Employer_Details(Employer_Details_e:Employer_Details,index)
    {

        debugger
        this.Entry_View=true;
        this.Employer_Details_=Employer_Details_e;
        this.Employer_Details_=Object.assign({},Employer_Details_e);

        
        this.Comapany_Employeedetails_Temp.Employer_Details_Id = this.Employer_Details_.Employer_Details_Id;
        this.Comapany_Employeedetails_Temp.Company_Name = this.Employer_Details_.Company_Name;
        this.Comapany_Employeedetails_ = Object.assign(this.Comapany_Employeedetails_Temp);
    }








    Export()
    {
        
            this.Student_Service_.exportExcel(this.Company_List_Report_Data,'Employer Details')
           
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
    
    Search_Company_List_Report(First_Time_Value)
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

            if(First_Time_Value==1)
            {
                this.Company_List_Report_Data_first = this.Company_List_Report_Data
            }
          
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
                this.Search_Company_List_Report(2);
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
            this.Search_Company_List_Report(2);
        }
    
        else {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "No Other Details", Type: "3" },
            });
            }
      }
      
      
      Search_Company_Typeahead_New(event: any)
      {    
        
        debugger
          var Value = "";
          if (event.target.value == "")
              Value = "";
          else
              Value = event.target.value;
          if (this.Job_Title_Data == undefined || this.Job_Title_Data.length==0)
          {
              this.issLoading = true;
              
         
          {
              this.Company_List_Report_Data_first1 =this.Company_List_Report_Data_first ;
              this.Company_List_Report_Data_first1_Filter=[];
              this.issLoading = false;
      
              for (var i=0;i<this.Company_List_Report_Data_first1.length;i++)
              {
                  if(this.Company_List_Report_Data_first1[i].Company_Name.toLowerCase().includes(Value))
                      this.Company_List_Report_Data_first1_Filter.push(this.Company_List_Report_Data_first1[i])
              }
          }
          
          } 
          else
          {
              
              this.Company_List_Report_Data_first1_Filter=[];
              for (var i=0;i<this.Company_List_Report_Data_first1.length;i++)
              {
                  if(this.Company_List_Report_Data_first1[i].Company_Name.toLowerCase().includes(Value))
                      this.Company_List_Report_Data_first1_Filter.push(this.Company_List_Report_Data_first1[i])
              }
          }
      }
  
      display_Company_Typeahead(Company_Name_Data_e: Employer_Details)
      {     
          if (Company_Name_Data_e) { return Company_Name_Data_e.Company_Name; }
      }
    






}