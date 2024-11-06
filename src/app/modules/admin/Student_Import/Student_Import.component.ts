import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Import } from '../../../models/Student_Import';
import { Student_Import_Details } from '../../../models/Student_Import_Details';
import { Course } from '../../../models/Course';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import * as XLSX from 'ts-xlsx';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
parse: {
     dateInput: 'DD/MM/YYYY',
    },
  display: {dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY',  dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',},
};
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Status } from '../../../models/Status';
import { Users } from '../../../models/Users';
import { Student_Service } from '../../../services/Student.service';
import { Enquiry_Source } from '../../../models/Enquiry_Source';
import { Enquiry_Source_Service } from '../../../services/Enquiry_Source.service';
import { Student_Import_Service } from '../../../services/Student_Import.Service';
import { Student } from '../../../models/Student';
import { Student_Followup } from '../../../models/Student_Followup';

@Component({
selector: 'app-Student_Import',
templateUrl: './Student_Import.component.html',
styleUrls: ['./Student_Import.component.css'],
providers: [
{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})
export class Student_ImportComponent implements OnInit {
    Enquiry_Source_Name_Search:string;

    Student_Import:Student_Import=new Student_Import()
Course_Import_Name_Search="";
Entry_View:boolean=true;
Duplicate_View:boolean=true;
Search_view:boolean=true;
myInnerHeight: number;
myHeight: number;

Total_Import_Entries:number
Total_Duplicate_Data:number
Total_Imports:number

EditIndex: number;
 Total_Entries: number=0;
Data:string;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Course_Import_Edit:boolean;
Course_Import_Save:boolean;
Course_Import_Delete:boolean;
year:any;
month:any;
day:any;
date:any;
isLoading=false; 
Login_Id:string;
Search_FromDate: Date = new Date();
Search_ToDate: Date = new Date();
Is_Expiry_Show:boolean=true;
Look_In_Date:Boolean=true;
Employee_Edit:boolean=false;
Employee_Name:string;
Employee_Id:number;
arrayBuffer:any;
file:File;
Key_Value_Name:string="";
Store_Id:number;
Store_Name:string;
Store_Edit:boolean=false;
User_Type:number;
Course_Import_Details_Data:Course[]
Student_Import_Details_Data:Student_Import_Details[]
ImageFile:any
Display_File_Name_:string
Next_FollowUp_Date_Visible:boolean=true;
Followup_Users_Data_Filter: Users[] 

Status_: Status
//Followup_Status_:Status=new Status;


Excel_File:[]

Course_Import_Index:number;
Student_Import_: Student_Import=new Student_Import();
    Course_Import_Data: any;
    // Import_Master_: Import_Master;
    Search_Student_Import_Details_Data: any;

    // FollowUp_Branch_:Branch=new Branch();
    // Search_Branch: Branch = new Branch();
    // Followup_Branch_Data:Branch[]

    

    // FollowUp_Department_:Department=new Department()
    // Followup_Department_Data:Department[]
    // Followup_Department_Data_Check:Department[]

    FollowUp_Status_:Status=new Status()
    Status_Temp:Status= new Status();
    Followup_Status_Data:Status[]

    Followup_Users_Data:Users[]
    Followup_Users_:Users=new Users()
    Users_Temp:Users= new Users();

    Enquiry_Source_Data:Enquiry_Source[]
    Enquiry_Source_Search_:Enquiry_Source=new Enquiry_Source();
    Enquiry_Source_:Enquiry_Source=new Enquiry_Source();
    Enquiry_Source_Search_Data:Enquiry_Source[];
    Enquiry_Source_Temp:Enquiry_Source=new Enquiry_Source();
    Enquiry_Source_Search_Temp:Enquiry_Source=new Enquiry_Source();

    Student_Followup_:Student_Followup= new Student_Followup;
    Student_Duplicate_Array:Student[];
    Login_User:string="0";
    Login_User_Name:string;
    myTotalHeight:number;

   
constructor(public Enquiry_Source_Service_:Enquiry_Source_Service,public Student_Service_:Student_Service,public Student_Import_Service_:Student_Import_Service,private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{     

    this.User_Type=Number(localStorage.getItem('User_Type'));

        this.Login_Id=localStorage.getItem('Login_User');
        this.Login_User_Name=localStorage.getItem('uname');
        // this.Permissions = Get_Page_Permission(27);
         
        // if(this.Permissions==undefined || this.Permissions==null)
        // {
        // localStorage.removeItem('token');
        // this.router.navigateByUrl('Home_Page');
        // }
        // else
        {
        // this.Course_Import_Edit=this.Permissions.Edit;
        // this.Course_Import_Save=this.Permissions.Save;
        // this.Course_Import_Delete=this.Permissions.Delete;
        this.Page_Load();
        }
}
trackByFn(index, item) 
{

    return index;
}
// Download_Excel()
// {
//         this.Student_Service_.exportExcel(,'Excel_File')

// }

Create_New()
{
    this.Entry_View = true;
    this.Search_view = false;
    this.Duplicate_View=false;
    this.Clr_Student_Import();
    
}
Close_Click()
{
    this.Search_view=true;
    this.Entry_View=false;
    this.Duplicate_View=false;
    this.Is_Expiry_Show=true;
    this.FollowUp_Status_=null;
    this.Followup_Users_=null;
    this.Enquiry_Source_ = null;
    this.Student_Followup_.Next_FollowUp_Date = new Date();
    this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
    this.Search_FromDate=new Date();
    this.Search_FromDate=this.New_Date(this.Search_FromDate);
    this.Search_ToDate=new Date();
    this.Search_ToDate=this.New_Date(this.Search_ToDate);
} 


Clr_Student_Import()
{
    this.Student_Import_Details_Data =[];
    this.Display_File_Name_=null;
    this.Student_Followup_.Next_FollowUp_Date = new Date();
    this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);

}

Page_Load()
{
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    // this.myHeight = (window.innerHeight);
    // this.myHeight = this.myHeight - 150;
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-300;
    this.myInnerHeight = this.myInnerHeight - 120;
    this.Search_view=false;
    this.Entry_View=true;
    this.Duplicate_View=false;
    this.Load_Enquiry_Source()
    if (this.User_Type==2){
    this.Store_Edit=true;
    //this.Course_Import_Details_Data()
        this.Student_Followup_.Next_FollowUp_Date = new Date();
        this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);

        this.Clr_Student_Import();
        this.Get_Menu_Status(55,this.Login_Id)
       // this.Load_Enquiry_Source()


    //this.Student_Followup_.Next_FollowUp_Date=this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
    }
}

Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.Student_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            

    
    if (Rows[0][0]==undefined)
    {
        if(Menu_id==55)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
        }
    }  
    else
    if (Rows[0][0].View >0) 
    {
        
        
        if(Menu_id==55)
        {
            
          

            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
                this.Course_Import_Edit=this.Permissions.Edit;
                this.Course_Import_Save=this.Permissions.Save;
                this.Course_Import_Delete=this.Permissions.Delete;

        }

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}

Search_Student_Import()
{
    var look_In_Date_Value=0;
    if (this.Look_In_Date == true )
    look_In_Date_Value = 1;
this.issLoading=true;

this.Student_Import_Service_.Search_Student_Import(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),look_In_Date_Value).subscribe(Rows => {
     
this.Search_Student_Import_Details_Data=Rows[0];
 
//this.Total_Entries=this.Search_Student_Import_Details_Data.length;

 this.issLoading=false;
 
if(this.Search_Student_Import_Details_Data.length==0)
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



// Delete_Course_Import(User_Id,index)
// {
     
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
// this.Search_Student_Import();
// dialogRef.afterClosed().subscribe(result =>
// {
     
// if(result=='Yes')
// {

// this.Course_Import_Details_Data.splice(index, 1);
 
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});


// }
// });
// }

Delete_Student_Import(Student_Import_Id,index)
{
     

this.Student_Import_Details_Data.splice(index, 1);
 

}
Focus_It()
{  
    setTimeout("$('[name=Followup_Status]').focus();", 0)
}

incomingfile(event) {

    this.file=event.target.files[0];
   // this.ImageFile = this.file;
     this.Display_File_Name_ = this.file.name;
     //const file = (event.target as HTMLInputElement).files
     this.Upload();
  }
  

  Branch_Change()
  { 
      
      this.Followup_Users_=null;
      this.FollowUp_Status_=null;
      this.Followup_Users_Data=[];
      this.Followup_Status_Data=[];
  }
  Department_Change()
{    
    //  document.getElementById("Followup_Status").focus(); 
        $('[name=Followup_Status]').focus();
    this.Focus_It();
    this.Followup_Users_=null;
    this.FollowUp_Status_=null;
    this.Followup_Users_Data=[];
    this.Followup_Status_Data=[];
    // this.Followup_Department_Data=[];
    // if(this.FollowUp_Department_.Department_FollowUp==true)
    // this.Next_FollowUp_Date_Visible=false;
    // else
    // this.Next_FollowUp_Date_Visible=true;
    this.Student_Followup_.Next_FollowUp_Date=new Date();
    this.Student_Followup_.Next_FollowUp_Date=this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
    
}
New_Date(Date_)
    {
        this.date=Date_
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
        return this.date;
    } 
 Upload() {
    
     
      let fileReader = new FileReader();
        fileReader.onload = (e) => {
            
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
         
            this.Student_Import_Details_Data=(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
            
            this.Student_Import_Details_Data.sort();
            
        }
     
        fileReader.readAsArrayBuffer(this.file);
}
// Search_Enquiry_Source()
// {
// this.issLoading=true;
// this.Enquiry_Source_Service_.Search_Enquiry_Source(this.Enquiry_Source_Name_Search).subscribe(Rows => {
//  this.Enquiry_Source_Data=Rows[0];
// this.Total_Entries=this.Enquiry_Source_Data.length;
// if(this.Enquiry_Source_Data.length==0)
// {
// this.issLoading=false;
// const dialogRef = this.dialogBox.open
// ( DialogBox_Component, {panelClass:'Dialogbox-Class'
// ,data:{Message:'No Details Found',Type:"3"}});
// }
// this.issLoading=false;
//  },
//  Rows => { 
// this.issLoading=false;
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//  });
// }

// Search_Enquiry_Source_Typeahead(event: any)
// {   
//     var Value = "";
//    if(this.Enquiry_Source_Data==undefined)
//    this.Enquiry_Source_Data=[];
//     if(this.Enquiry_Source_Data.length==0 )
//     {
//     if (event.target.value == "")
//         Value = undefined;
//     else
//         Value = event.target.value;
         
//             if(this.Enquiry_Source_Data==undefined || this.Enquiry_Source_Data.length==0)
//             {
//         this.issLoading = true;
//     this.Enquiry_Source_Service_.Search_Enquiry_Source_Typeahead('').subscribe(Rows => {
 
//         if (Rows != null) {
//             this.Enquiry_Source_Data = Rows[0];
//             this.issLoading = false;
//         }
//     },
//         Rows => {
//             this.issLoading = false;
           
//         });
//     }

// } 
// }
// display_Enquiry_Source(Enquiry_Source_: Enquiry_Source) 
// {
//     if (Enquiry_Source_) { return Enquiry_Source_.Enquiry_Source_Name; }
// }


Load_Enquiry_Source()
{

    this.issLoading = true;
    this.Student_Service_.Load_Enquiry_Source().subscribe(Rows => {
        
        if (Rows != null) {
            this.Enquiry_Source_Data = Rows[0];
            this.Enquiry_Source_Temp.Enquiry_Source_Id = 0;
            this.Enquiry_Source_Temp.Enquiry_Source_Name = "Select";
            this.Enquiry_Source_Data.unshift(this.Enquiry_Source_Temp);
            this.Enquiry_Source_ = this.Enquiry_Source_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}
Search_Status_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
    if (this.Followup_Status_Data == undefined || this.Followup_Status_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Search_Status_Typeahead('',3).subscribe(Rows => {
    if (Rows != null) 
    {
        this.Followup_Status_Data = Rows[0];
        this.issLoading = false;
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 
}
display_Followup_Status(Status_: Status)
{     
    if (Status_) { return Status_.Status_Name; }
}

Search_User_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;       
     if(this.Followup_Users_Data==undefined || this.Followup_Users_Data.length==0)
           {
            this.issLoading = true;
         this.Student_Service_.Search_Users_Typeahead('').subscribe(Rows => {
        if (Rows != null) {
            this.Followup_Users_Data = Rows[0];
            this.issLoading = false;

            
        this.Followup_Users_Data_Filter=[];

        for (var i=0;i<this.Followup_Users_Data.length;i++)
        {
            if(this.Followup_Users_Data[i].Users_Name.toLowerCase().includes(Value))
                this.Followup_Users_Data_Filter.push(this.Followup_Users_Data[i])
        }
    }
    },
        Rows => {
            this.issLoading = false;
          });
    } 
    else
    {
       
        this.Followup_Users_Data_Filter=[];
        for (var i=0;i<this.Followup_Users_Data.length;i++)
        {
            if(this.Followup_Users_Data[i].Users_Name.toLowerCase().includes(Value))
                this.Followup_Users_Data_Filter.push(this.Followup_Users_Data[i])
        }
    }

}
display_Followup_Users(Users_: Users)
{     
    if (Users_) { return Users_.Users_Name; }
}
Status_Change(Status)
{
    
   this.FollowUp_Status_= Status;
    if(this.FollowUp_Status_.FollowUp==true)
    this.Next_FollowUp_Date_Visible=false;
    else
    this.Next_FollowUp_Date_Visible=true;
    //this.Student_Followup_.Next_FollowUp_Date=new Date();
    //this.Student_Followup_.Next_FollowUp_Date=this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
}

Save_Student_Import()
 { 
    if(this.FollowUp_Status_.FollowUp!=false)
    this.Student_Followup_.Next_FollowUp_Date = this.New_Date(new Date(moment(this.Student_Followup_.Next_FollowUp_Date).format('YYYY-MM-DD')));
else
{
    this.Student_Followup_.Next_FollowUp_Date = new Date();
    this.Student_Followup_.Next_FollowUp_Date=this.New_Date(new Date(moment(this.Student_Followup_.Next_FollowUp_Date).format('YYYY-MM-DD')));
}
    if (this.Student_Import_Details_Data== undefined || this.Student_Import_Details_Data == null || this.Student_Import_Details_Data== undefined ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please Choose File', Type: "3" } });
       return;
    }
  
    if(this.FollowUp_Status_==null||this.FollowUp_Status_.Status_Id==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Status', Type: "3" } });
        return;
    }
    if(this.Followup_Users_==null||this.Followup_Users_.Users_Id==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter User', Type: "3" } });
        return;
    }
    if(this.Enquiry_Source_==null||this.Enquiry_Source_.Enquiry_Source_Id==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Enquiry Source', Type: "3" } });
        return;
    }
    if(this.Student_Followup_.Next_FollowUp_Date==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Date', Type: "3" } });
        return;
    }
//delete this.Course_Import_Details_Data['Category']
 
if(this.Student_Import_Details_Data.length==0)
{
     
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Please Add Details',Type: "3" }});    

return 
}
var j=0;
for(var i=0; i<this.Student_Import_Details_Data.length;i++)
{  j=i+1
    
    if (undefined == this.Student_Import_Details_Data[i].Name)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Student name is blank at row ' +j ,Type: "3" }});    
        i= this.Student_Import_Details_Data.length
        return;
    }
    if ("" == this.Student_Import_Details_Data[i].Name.trim())
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Student name is blank at row ' + j ,Type: "3" }});    
        i= this.Student_Import_Details_Data.length
        return;
    }
    else if (undefined == this.Student_Import_Details_Data[i].Mobile)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Mobile is blank at row ' + j ,Type: "3" }});    
        i= this.Student_Import_Details_Data.length
        return;
    }
    else if (""== this.Student_Import_Details_Data[i].Mobile.toString().trim())
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Mobile number is blank at row ' +j ,Type: "3" }});    
        i= this.Student_Import_Details_Data.length
        return;
    }
 
    // else if (this.Student_Import_Details_Data[i].Visa_Submission_Date=='MM-DD-YYYY')
    // {
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Incorrect Date format' +j ,Type: "3" }});    
    //     i= this.Student_Import_Details_Data.length
    //     return;
    // }
}
{
     
// this.Student_Import_.Branch= this.FollowUp_Branch_.Branch_Id;
// this.Student_Import_.Department= this.FollowUp_Department_.Department_Id;

this.Student_Import_.Status=this.FollowUp_Status_.Status_Id;
this.Student_Import_.Status_Name=this.FollowUp_Status_.Status_Name;
this.Student_Import_.Status_FollowUp=this.FollowUp_Status_.FollowUp;
this.Student_Import_.Remark=this.Student_Followup_.Remark;
this.Student_Import_.Enquiry_Source= this.Enquiry_Source_.Enquiry_Source_Id;
this.Student_Import_.Enquiry_Source_Name=this.Enquiry_Source_.Enquiry_Source_Name;
this.Student_Import_.Next_FollowUp_Date= this.New_Date(new Date(moment(this.Student_Followup_.Next_FollowUp_Date).format('YYYY-MM-DD')));
this.Student_Import_.To_User= this.Followup_Users_.Users_Id;
this.Student_Import_.To_User_Name=this.Followup_Users_.Users_Name;

this.Student_Import_.By_User_Id=parseInt( this.Login_Id);
this.Student_Import_.By_User_Name=this.Login_User_Name;
 
 this.Student_Import_.Student_Import_Details =this.Student_Import_Details_Data;

document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
 

this.Student_Import_Service_.Save_Student_Import(this.Student_Import_).subscribe(Save_status => {

    //debugger;
        this.issLoading=false;
                
   // log(Save_status[0][0])
   if(Number(Save_status[0]==undefined)){
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  
    document.getElementById('Save_Button').hidden=false;
    //this.Clr_Student_Import();
   }
if(Number(Save_status[0][0].import_master_id)>0)
{
    this.Student_Duplicate_Array = Save_status[1];
    this.Total_Duplicate_Data=this.Student_Duplicate_Array.length;
    this.Total_Import_Entries=this.Student_Import_Details_Data.length;
    this.Total_Imports=(this.Student_Import_Details_Data.length)-(this.Student_Duplicate_Array.length);

//const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:' Imported',Type:"false"}});
        this.Duplicate_View=true;
        this.Entry_View=false;
        this.Search_view=false;
        this.Search_Student_Import();
        this.Clr_Student_Import();
        //this.Close_Click();
document.getElementById('Save_Button').hidden=true;
}
// else if(Number(Save_status[0][0].Student_Id_)==-1)
//         {  
//             this.Duplicate_View=true;
//             //const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'The Phone Number Already Exist for '+Save_status[0][0].Duplicate_Student_Name+' and is handled by '+Save_status[0][0].Duplicate_User_Name,Type:"2"}});
//         }
else{
    this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
document.getElementById('Save_Button').hidden=true;
}

},
Rows => { 
        this.issLoading=false;
document.getElementById('Save_Button').hidden=true;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});
}
} 

// Edit_Course_Import(Import_Master_e:Import_Master,index)
// {
   
// this.Course_Import_Index=index;
// this.Student_Import_Service_.Get_Student_Import(Import_Master_e.Import_Master_Id).subscribe(Rows => {
     
// if (Rows != null) {
// this.Course_Import_Details_Data = Rows[0];

// this.issLoading = false;
// }

// },
// Rows => {
 
// this.issLoading = false;
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
// });
// this.Entry_View=true;
// this.Import_Master_=Import_Master_e;
// this.Import_Master_=Object.assign({},Import_Master_e);
// }

}

