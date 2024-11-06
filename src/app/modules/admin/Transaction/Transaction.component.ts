import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Course } from '../../../models/Course';
import { Batch } from '../../../models/Batch';
import { Users } from '../../../models/Users';
import { Transaction_Master } from '../../../models/Transaction_Master';
import { Transaction_Student } from '../../../models/Transaction_Student';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {Employer_Details} from '../../../models/Employer_Details'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Transaction',
templateUrl: './Transaction.component.html',
styleUrls: ['./Transaction.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class TransactionComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Transaction_Edit:boolean;
    Transaction_Save:boolean;
    Transaction_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;

    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    profile_View:boolean=true;
    
    Transaction_Id: number = 0;
    Transaction_Data: []
    Job_Code_Search:string;
    Student_Search:string;
    Job_Location_Search:string;

    
    Course_Data: Course[];
    Course_:Course=new Course;
    Course_Search:Course=new Course;
    Course_Temp: Course = new Course;
    Course_Data_Filter: Course[]   


    
   Employeedetails_Data: Employer_Details[];
   Employeedetails_:Employer_Details=new Employer_Details();
   Employeedetails_Search:Employer_Details=new Employer_Details();
   Employeedetails_Temp: Employer_Details = new Employer_Details();
   Employeedetails_Data_Filter: Employer_Details[]   


    Batch_Data: Batch[];
    Batch_:Batch=new Batch;
    Batch_Search:Batch=new Batch;
    Batch_Temp: Batch = new Batch;
    Batch_Data_Filter: Batch[]   

    Employer_Details_: Employer_Details = new Employer_Details();
    Search_Employer_Details_: Employer_Details = new Employer_Details();
    Employer_Details_Temp: Employer_Details = new Employer_Details();
    Employer_Details_Data: Employer_Details[]
    
    Faculty_Data: Users[];
    Faculty_:Users=new Users;
    Faculty_Temp: Users = new Users;

    Save_Call_Status: boolean = false;
    Logo: string;
    Display_Logo_: string;
    ImageFile_Logo: any;

    Login_User: number = 0;
    Transaction_EditIndex: number = -1;
    Portion_Covered: number = 0;

    Edit_Page_Permission:any;
    Edit_Job_Permission:any;

    Transaction_Master_:Transaction_Master=new Transaction_Master;
    Transaction_Master_Temp:Transaction_Master=new Transaction_Master;
    Transaction_Master_Data:Transaction_Master[];

    Transaction_Student_:Transaction_Student=new Transaction_Student;
    Transaction_Student_Temp:Transaction_Student=new Transaction_Student;
    Transaction_Student_Data:Transaction_Student[];
    Transaction_Student_Data_Temp:Transaction_Student[];
    
    Is_Date:boolean=true;    
    FromDate_: Date = new Date();
    ToDate_: Date = new Date();
    Schedule:boolean = false;
constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(37);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Transaction_Edit=this.Permissions.Edit;
    this.Transaction_Save=this.Permissions.Save;
    this.Transaction_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
     
}
Page_Load()
{
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.Entry_View = false;
    this.Transaction_Master_.Description='';
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Is_Date=true;
    // this.Load_Employer_Details();
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-300;
    this.myInnerHeight = this.myInnerHeight - 250;

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
Course_change()
{
    
    // this.Batch_.Batch_Id=0;
    // this.Batch_.Batch_Name="";
    this.Batch_Data=[];
    this.Batch_Data_Filter=[];
    this.Batch_Search=null;
}
Search_Course_change()
{
    
    // this.Batch_Search.Batch_Id=0;
    // this.Batch_Search.Batch_Name="";
    this.Batch_Data=[];
    this.Batch_Data_Filter=[];
    this.Batch_=null;
}
Close_Click()
{
  this.Entry_View=false;
  this.Clr_Transaction();
  this.Search_Transaction_Student();
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
        this.Course_Data_Filter=[];
        this.issLoading = false;

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
Batch_Typeahead_Service(Value,Course_Id)
{
    
    if (this.Batch_Data == undefined || this.Batch_Data.length==0)
    {
        this.issLoading = true;
        
        // this.Student_Service_.Search_Batch_Typeahead_1('',this.Course_Search.Course_Id).subscribe(Rows =>
        this.Student_Service_.Search_Batch_Typeahead_1('',Course_Id).subscribe(Rows => {
    if (Rows != null) 
    {
        this.Batch_Data = Rows[0];
        this.issLoading = false;
        this.Batch_Data_Filter=[];

        for (var i=0;i<this.Batch_Data.length;i++)
        {
            if(this.Batch_Data[i].Batch_Name.toLowerCase().includes(Value))
                this.Batch_Data_Filter.push(this.Batch_Data[i])
        }

    }
    },
    Rows => {
     this.issLoading = false;
    })
    // );
    } 
    else
    {
        
        this.Batch_Data_Filter=[];
        for (var i=0;i<this.Batch_Data.length;i++)
        {
            if(this.Batch_Data[i].Batch_Name.toLowerCase().includes(Value))
                this.Batch_Data_Filter.push(this.Batch_Data[i])
        }
    }
}
Search_Batch_Typeahead_new(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
   
        if (this.Course_.Course_Id == undefined ||this.Course_.Course_Id == null || this.Course_.Course_Id==0)
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Course', Type: "3" } });
            return
        }
       
        this.Batch_Typeahead_Service(Value,this.Course_.Course_Id);
}
Search_Batch_Typeahead_Search(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
        if (this.Course_Search.Course_Id == undefined ||this.Course_Search.Course_Id == null || this.Course_Search.Course_Id==0)
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Course', Type: "3" } });
            return
        }
       
        this.Batch_Typeahead_Service(Value,this.Course_Search.Course_Id);

}
display_Batch(Batch_: Batch)
{     
    if (Batch_) { return Batch_.Batch_Name; }
}
Search_User_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;       
     if(this.Faculty_Data==undefined || this.Faculty_Data.length==0)
           {
            this.issLoading = true;
         this.Student_Service_.Search_Users_Typeahead('').subscribe(Rows => {
        if (Rows != null) {
            this.Faculty_Data = Rows[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
          });
    } 
}
display_Faculty(Users_: Users)
{     
    if (Users_) { return Users_.Users_Name; }
}



// Search_Company_Typeahead(event: any) {

//     var Value = "";
//     if (event.target.value == "")
//         Value = undefined;
//     else
//         Value = event.target.value;
//     this.issLoading = true;


//     this.Student_Service_.Search_Company_Typeahead(Value).subscribe(Rows => {
//         if (Rows != null) {
            
//             this.Employeedetails_Data = Rows[0];

//         }
//         this.issLoading = false;
//     },
//         Rows => {
//             this.issLoading = false;
//         });
// }
// display_Company(Employeedetails_e: Employer_Details) {
   
//     if (Employeedetails_e) { return Employeedetails_e.Company_Name; }
// }


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
        this.Student_Service_.Search_Company_Typeahead('').subscribe(Rows => {
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


Clr_Transaction()
{
    this.Transaction_Master_.Transaction_Master_Id=0;
    this.Transaction_Master_.Portion_Covered=0;
    this.Transaction_Master_.Description='';
    this.Course_=null;
    this.Employeedetails_=null;
    this.Batch_=null;
    this.Transaction_Student_Data=[];
    if(this.Employer_Details_Data!=null && this.Employer_Details_Data != undefined)
    this.Employer_Details_=this.Employer_Details_Data[0];
}
Load_Employer_Details()
{
    
    this.issLoading = true;
    this.Student_Service_.Load_Employer_Details().subscribe(Rows => {
        
        if (Rows != null) {
            this.Employer_Details_Data = Rows[0];
            this.Employer_Details_Temp.Employer_Details_Id = 0;
            this.Employer_Details_Temp.Company_Name = "Select";
            this.Employer_Details_Data.unshift(this.Employer_Details_Temp);
            this.Employer_Details_ = this.Employer_Details_Data[0];
            this.Search_Employer_Details_ = this.Employer_Details_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
    }
Search_Transaction()
{
    var  Course_Id = 0, Batch_Id = 0;

    if (this.Course_ == undefined || this.Course_ == null ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Course', Type: "3" } });
        return
    }
    if (this.Course_.Course_Id == undefined ||this.Course_.Course_Id == null || this.Course_.Course_Id==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Course', Type: "3" } });
        return
    }
    // if (this.Batch_ == undefined || this.Batch_ == null ) 
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Batch', Type: "3" } });
    //     return
    // }
    // if (this.Batch_.Batch_Id == undefined ||this.Batch_.Batch_Id == null || this.Batch_.Batch_Id==0)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Batch', Type: "3" } });
    //     return
    // }
    if (this.Transaction_Master_.Portion_Covered == undefined ||this.Transaction_Master_.Portion_Covered == null || this.Transaction_Master_.Portion_Covered==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Portion Covered', Type: "3" } });
        return
    }  
      
    if (this.Course_ != undefined && this.Course_ != null)
        if (this.Course_.Course_Id != undefined && this.Course_.Course_Id != null)
        Course_Id = this.Course_.Course_Id;
    
    if (this.Batch_ != undefined && this.Batch_ != null)
        if (this.Batch_.Batch_Id != undefined && this.Batch_.Batch_Id != null)
        Batch_Id = this.Batch_.Batch_Id;
        
    this.issLoading = true;
    this.Student_Service_.Search_Transaction(Course_Id,this.Transaction_Master_.Portion_Covered).subscribe(Rows =>{
        
        this.Transaction_Student_Data=Rows[0];
    this.issLoading = false;
    if(this.Transaction_Student_Data.length==0 )
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
Save_Transaction()
{
    
    var Menu_Student=false;     
    if (this.Course_ == undefined || this.Course_ == null ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Course', Type: "3" } });
        return
    }
    if (this.Course_.Course_Id == undefined ||this.Course_.Course_Id == null || this.Course_.Course_Id==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Course', Type: "3" } });
        return
    }
    // if (this.Batch_ == undefined || this.Batch_ == null ) 
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Batch', Type: "3" } });
    //     return
    // }
    // if (this.Batch_.Batch_Id == undefined ||this.Batch_.Batch_Id == null || this.Batch_.Batch_Id==0)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Batch', Type: "3" } });
    //     return
    // }    
    if (this.Transaction_Master_.Portion_Covered == undefined ||this.Transaction_Master_.Portion_Covered == null || this.Transaction_Master_.Portion_Covered==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Portion Covered', Type: "3" } });
        return
    }     
    if (this.Employeedetails_ == undefined || this.Employeedetails_ == null ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Employer', Type: "3" } });
        return
    }
    if (this.Employeedetails_.Employer_Details_Id == undefined ||this.Employeedetails_.Employer_Details_Id == null || this.Employeedetails_.Employer_Details_Id==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Employer', Type: "3" } });
        return
    }
    if (this.Transaction_Student_Data==undefined||this.Transaction_Student_Data.length==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No Data in Student', Type: "3" } });
        return
    }
    for (var i = 0; i < this.Transaction_Student_Data.length; i++)
    {
        if(this.Transaction_Student_Data[i].Check_Box== true)
        Menu_Student=true
    } 
    if (Menu_Student==false)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Atleast One Student', Type: "3" } });
        return
    }
    this.Transaction_Master_.Course_Id=this.Course_.Course_Id;
    this.Transaction_Master_.Batch_Id=0;
    this.Transaction_Master_.User_Id=this.Login_User;
    this.Transaction_Master_.Employer_Details_Id=this.Employeedetails_.Employer_Details_Id;
    
    this.Transaction_Student_Data_Temp=[]; 
    for (var i = 0; i< this.Transaction_Student_Data.length; i++) 
    {
        if (Boolean(this.Transaction_Student_Data[i].Check_Box) == true) 
        {
        this.Transaction_Student_Data_Temp.push(this.Transaction_Student_Data[i]);
        }
    }
    this.Transaction_Master_.Transaction_Student = this.Transaction_Student_Data_Temp;
    
   this.issLoading=true;

    this.Student_Service_.Save_Transaction(this.Transaction_Master_).subscribe(Save_status => {

    if(Number(Save_status[0].Transaction_Master_Id_)>0)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Close_Click();
    }
    else
    {        
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
        this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;  
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
Search_Transaction_Student()
{
    var look_In_Date_Value=0, Course_Id = 0, Employer_Details_Id = 0;

    if (this.Is_Date == true)
        look_In_Date_Value = 1;
   
    if (this.Course_Search!= undefined && this.Course_Search != null)
        if (this.Course_Search.Course_Id != undefined && this.Course_Search.Course_Id != null)
        Course_Id = this.Course_Search.Course_Id;
    
    if (this.Search_Employer_Details_ != undefined && this.Search_Employer_Details_ != null)
        if (this.Search_Employer_Details_.Employer_Details_Id != undefined && this.Search_Employer_Details_.Employer_Details_Id != null)
        Employer_Details_Id = this.Search_Employer_Details_.Employer_Details_Id;
        
    this.issLoading = true;
    this.Student_Service_.Search_Transaction_Student(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),Course_Id,this.Login_User,Employer_Details_Id).subscribe(Rows =>{
        
        this.Transaction_Master_Data=Rows[0];
    this.issLoading = false;
    if(this.Transaction_Master_Data.length==0 )
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
Create_New()
{
    this.Entry_View = true;
    this.Schedule = true;
    this.Clr_Transaction()
    this.Transaction_Master_.Portion_Covered = null;
}
Edit_Transaction(Transaction_Master_e:Transaction_Master,index)
{
    this.Schedule = false;
    // this.Transaction_Save=false;
    this.Entry_View=true;
    this.Transaction_Master_=Transaction_Master_e;
    this.Transaction_Master_=Object.assign({},Transaction_Master_e);
 
    this.Course_Temp.Course_Id = this.Transaction_Master_.Course_Id;
    this.Course_Temp.Course_Name = this.Transaction_Master_.Course_Name;
    this.Course_ = Object.assign({}, this.Course_Temp);

    this.Employeedetails_Temp.Employer_Details_Id = this.Transaction_Master_.Employer_Details_Id;
    this.Employeedetails_Temp.Company_Name = this.Transaction_Master_.Company_Name;
    this.Employeedetails_ = Object.assign({}, this.Employeedetails_Temp);
    

    // this.Batch_Temp.Batch_Id = this.Transaction_Master_.Batch_Id;
    // this.Batch_Temp.Batch_Name = this.Transaction_Master_.Batch_Name;
    // this.Batch_ = Object.assign({}, this.Batch_Temp);

    // this.Employer_Details_Temp.Employer_Details_Id = this.Transaction_Master_.Employer_Details_Id;
    // this.Employer_Details_Temp.Company_Name = this.Transaction_Master_.Company_Name;
    // this.Employer_Details_ = Object.assign({}, this.Employer_Details_Temp);
    // for (var i = 0; i < this.Employeedetails_Data.length; i++) {
    //     if (this.Transaction_Master_.Employer_Details_Id== this.Employeedetails_Data[i].Employer_Details_Id)
    //         this.Employeedetails_ = this.Employeedetails_Data[i];
    // }


    this.issLoading = true;
    this.Student_Service_.Get_Transaction(this.Transaction_Master_.Transaction_Master_Id,this.Transaction_Master_.Course_Id).subscribe(Rows => {
        
         this.Transaction_Student_Data = Rows[0];
        this.issLoading = false;

    },

        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}
Get_Interview(Transaction_Master_Id)
{
    
    localStorage.setItem('Transaction_Master_Id', Transaction_Master_Id);
    //console.log(Transaction_Master_Id)
    this.Edit_Page_Permission = Get_Page_Permission(38);
    if (this.Edit_Page_Permission == undefined) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
    }
    else if (this.Edit_Page_Permission.View == true)
      
      this.goToLink();
    else {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
    }
}

goToLink() {
    
    return;
}
}

