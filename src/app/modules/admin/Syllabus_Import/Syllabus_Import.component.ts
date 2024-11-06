import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Syllabus_Import_Service } from '../../../services/Syllabus_Import.Service';
import { Syllabus_Import } from '../../../models/Syllabus_Import';
import { Import_Master } from '../../../models/Import_Master';
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
import { Syllabus } from 'app/models/Syllabus';
import { Student_Service } from 'app/services/Student.service';

@Component({
selector: 'app-Syllabus_Import',
templateUrl: './Syllabus_Import.component.html',
styleUrls: ['./Syllabus_Import.component.css'],
providers: [
{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})
export class Syllabus_ImportComponent implements OnInit {

Syllabus_Import:Syllabus_Import=new Syllabus_Import()
Syllabus_Import_Name_Search="";
Entry_View:boolean=true;
myInnerHeight: number;
myHeight: number;
EditIndex: number;
 Total_Entries: number=0;
Data:string;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Syllabus_Import_Edit:boolean;
Syllabus_Import_Save:boolean;
Syllabus_Import_Delete:boolean;
ImageFile:any
year:any;
month:any;
day:any;
date:any;
isLoading=false; 
Login_Id:string;
Search_FromDate: Date = new Date();
Search_ToDate: Date = new Date();
Is_Expiry_Show:boolean=true;
Look_In_Date:boolean=true;
Error_View:boolean = false;
Error_Length:number =0;
List_View:boolean=false;
Import_View:boolean = false;
Employee_Edit:boolean=false;
Employee_Name:string;
Employee_Id:number;
arrayBuffer:any;
file:File;

Import_Length:number=0;

Display_File_Name_:string
Key_Value_Name:string="";
Store_Id:number;
Store_Name:string;
Store_Edit:boolean=false;
User_Type:number;
Syllabus_Import_Details_Data:Syllabus[];
Error_Data:Syllabus[]
Error_Details:Syllabus =new Syllabus();
Syllabus_Import_Index:number;
Syllabus_Import_: Syllabus_Import=new Syllabus_Import();
Syllabus_Import_Data: any;
Import_Master_: Import_Master;
Search_Syllabus_Import_Details_Data: any;

Course_Data: Course[];
Course_:Course=new Course;
Course_Temp: Course = new Course;
Course_Data_Filter: Course[]
 
constructor(public Syllabus_Import_Service_:Syllabus_Import_Service,public Student_Service_:Student_Service,private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{     

    this.User_Type=Number(localStorage.getItem('User_Type'));

        this.Login_Id=localStorage.getItem('Login_User');
        this.Permissions = Get_Page_Permission(87);
         
        if(this.Permissions==undefined || this.Permissions==null)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
        }
        else
        {
        this.Syllabus_Import_Edit=this.Permissions.Edit;
        this.Syllabus_Import_Save=this.Permissions.Save;
        this.Syllabus_Import_Delete=this.Permissions.Delete;
        this.Page_Load();
        }
}
trackByFn(index, item) 
{
    return index;
}

Create_New()
{
    this.Import_View = true;
    this.Error_View = false;
    this,this.List_View = false;
    this.Clr_Syllabus_Import();
}
Close_Click()
{
    this.Import_View = false;
    this.List_View = true;
    this.Is_Expiry_Show=true;
    this.Search_FromDate=new Date();
    this.Search_FromDate=this.New_Date(this.Search_FromDate);
    this.Search_ToDate=new Date();
    this.Search_ToDate=this.New_Date(this.Search_ToDate);
} 


Clr_Syllabus_Import()
{
    this.Syllabus_Import_Details_Data =[];
    this.Error_Data = [];
    this.Display_File_Name_="";
    this.file = null;
    this.Course_ =null;
    this.Import_Length=0;
}

Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 100;
    this.myHeight = (window.innerHeight);
    this.myHeight = this.myHeight - 400;
    this.Import_View=true;
    if (this.User_Type==2){
    this.Store_Edit=true;
    this.Get_Menu_Status(10,this.Login_Id); 
    
    //this.Syllabus_Import_Details_Data()
    }
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

Search_Syllabus_Import()
{
    
    this.Search_FromDate=new Date();
    this.Search_FromDate=this.New_Date(this.Search_FromDate);
    this.Search_ToDate=new Date();
    this.Search_ToDate=this.New_Date(this.Search_ToDate);
    var look_In_Date_Value=0;
    if (this.Look_In_Date == true )
    look_In_Date_Value = 1;
this.issLoading=true;
debugger
this.Syllabus_Import_Service_.Search_Syllabus_Import(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),look_In_Date_Value).subscribe(Rows => {
    debugger
this.Search_Syllabus_Import_Details_Data=Rows[0];
 
this.Total_Entries=this.Search_Syllabus_Import_Details_Data.length;

 this.issLoading=false;
 
if(this.Search_Syllabus_Import_Details_Data.length==0)
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
Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.Syllabus_Import_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            

    
    if (Rows[0][0]==undefined)
    {
      if(Menu_id==10)
      {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
      }
    }  
    else
    if (Rows[0][0].View >0) 
    {
        
        
        if(Menu_id==10)
        {
            
   

            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
               
                this.Syllabus_Import_Edit=this.Permissions.Edit;
                this.Syllabus_Import_Save=this.Permissions.Save;
                this.Syllabus_Import_Delete=this.Permissions.Delete;
        }

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}



// Delete_Syllabus_Import(User_Id,index)
// {
     
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
// this.Search_Syllabus_Import();
// dialogRef.afterClosed().subscribe(result =>
// {
     
// if(result=='Yes')
// {

// this.Syllabus_Import_Details_Data.splice(index, 1);
 
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});


// }
// });
// }


Delete_Syllabus_Import(Syllabus_Import_Id,index)
{
this.Syllabus_Import_Details_Data.splice(index, 1);
}

incomingfile(event) {
    debugger
     this.file = event.target.files[0];
    // this.ImageFile = file;
     this.Display_File_Name_ = this.file.name;
     this.Upload();
  }

 Upload() {
    debugger
      let fileReader = new FileReader();
        fileReader.onload = (e) => {
            debugger
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            debugger
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            debugger
            this.Syllabus_Import_Details_Data=(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
            this.Import_Length= this.Syllabus_Import_Details_Data.length;
            debugger
            this.Syllabus_Import_Details_Data.sort();
            
        }
        fileReader.readAsArrayBuffer(this.file);
}

Download_Excel(File_Name)
{
    
   var File_Name_Temp;

//    var bs='C:/Teena/Edabroad/Back End/Uploads/'
        var bs='assets/img/Syllabus_Import.xlsx'

   var s=bs+File_Name_Temp;
   
   window.open(s,'_blank');  

}


Save_Syllabus_Import()
 { 
     debugger

     if (this.Course_.Course_Id== undefined || this.Course_.Course_Id == null || this.Course_.Course_Id== 0 ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please Choose Course', Type: "3" } });
       return;
    }

    if (this.Syllabus_Import_Details_Data== undefined || this.Syllabus_Import_Details_Data == null || this.Syllabus_Import_Details_Data== undefined ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please Choose File', Type: "3" } });
       return;
    }


 

delete this.Syllabus_Import_Details_Data['Category']
 
if(this.Syllabus_Import_Details_Data.length==0)
{
     
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Please Add Details',Type: "3" }});    

return
}

var j=0;
var Error_Status;
var Status = "Error";
this.Error_Data = [];

debugger
    for(var i=0; i<this.Syllabus_Import_Details_Data.length;i++)
{ 
    
     j=i+1
    this.Error_Details =Object.assign({},this.Syllabus_Import_Details_Data[i]);
    this.Error_Details.Row_No = i+1;
    Error_Status = false;
    // if (undefined == this.Syllabus_Import_Details_Data[i].Day)
    // {        
    //    this.Error_Details.Day = Status;

    //    Error_Status = true;
    // }
    
  if (undefined  == this.Syllabus_Import_Details_Data[i].Day)
    {
       
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Day is blank at row ' +j ,Type: "3" }});    
      
        return;

    }
    else if ("" == this.Syllabus_Import_Details_Data[i].Topic)
     {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Topic is blank at row ' + j ,Type: "3" }});    
      

        return;

     }

     else if ("" == this.Syllabus_Import_Details_Data[i].Task||undefined == this.Syllabus_Import_Details_Data[i].Task)
     {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Task is blank at row ' + j ,Type: "3" }});    
      
        return;
     }
 
    if(Error_Status == true)
    {
        this.Error_Data.push(Object.assign({},this.Error_Details));
        Error_Status = false;
    }
    

}
if(this.Error_Data.length>0)
    {
        this.Error_Length = this.Error_Data.length;
        this.Import_View = false;
        this.List_View = false;
        this.Error_View = true;
        return;
    }
    
{
     debugger
this.Syllabus_Import_.User_Id=parseInt( this.Login_Id);
this.Syllabus_Import_.Course_Id=this.Course_.Course_Id;
this.Syllabus_Import_.Course_Name=this.Course_.Course_Name;
 
 this.Syllabus_Import_.Syllabus_Import_Details=this.Syllabus_Import_Details_Data;
document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
 
debugger
this.Syllabus_Import_Service_.Save_Syllabus_Import(this.Syllabus_Import_).subscribe(Save_status => {
      debugger
        this.issLoading=false;
            
     Save_status = Save_status[0][0].Subject_Id_;
if(Number(Save_status)>0)
{
    
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Syllabus Imported',Type:"false"}});
        //this.Search_Syllabus_Import();
        this.Clr_Syllabus_Import();
        // this.Close_Click();
document.getElementById('Save_Button').hidden=false;
}
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

Edit_Syllabus_Import(Import_Master_e:Import_Master,index)
{
   
this.Syllabus_Import_Index=index;
this.Syllabus_Import_Service_.Get_Syllabus_Import(Import_Master_e.Import_Master_Id).subscribe(Rows => {
     
if (Rows != null) {
this.Syllabus_Import_Details_Data = Rows[0];

this.issLoading = false;
}

},
Rows => {
 
this.issLoading = false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});
this.Import_View=true;
this.Import_Master_=Import_Master_e;
this.Import_Master_=Object.assign({},Import_Master_e);
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

}

