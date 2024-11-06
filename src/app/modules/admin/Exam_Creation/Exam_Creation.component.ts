import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Course } from 'app/models/Course';
import { Agent } from 'app/models/Agent';
import { Users } from 'app/models/Users';
import { Duration_Type } from 'app/models/Duration_Type';
import { Exam_Creation } from 'app/models/Exam_Creation';
import { Batch_Service } from 'app/services/Batch.service';
import { Student_Service } from 'app/services/Student.service';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
    selector: 'app-Exam_Creation',
    templateUrl: './Exam_Creation.component.html',
    styleUrls: ['./Exam_Creation.component.css'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
 
})
export class Exam_CreationComponent implements OnInit {
    Exam_Creation_Data:Exam_Creation[]
    Exam_Creation_:Exam_Creation= new Exam_Creation();
    Exam_Creation_Name_Search:string;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Exam_Creation_Edit:boolean;
    Exam_Creation_Save:boolean;
    Exam_Creation_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;

    Login_User_Id:number=0;

    year: any;
    month: any;
    Start_Date:Date;
    End_Date:Date;
    day: any;
    date: any;
    Login_User:string="0";



   Course_:Course=new Course;
   Course_Temp:Course=new Course;
   Course_Data:Course[];

   Branch_:Agent=new Agent;
   Branch_Temp:Agent=new Agent;
   Branch_Data:Agent[];

    Trainers_:Users=new Users;
    Trainers_Temp:Users=new Users;
    Trainers_Data:Users[];

    Duration_Type_:Duration_Type=new Duration_Type;
    Duration_Type_Temp:Duration_Type=new Duration_Type;
    Duration_Type_Data:Duration_Type[];

    Duration_Type_Search_ :Duration_Type=new Duration_Type;

    // Exam_Creation_:Exam_Creation=new Exam_Creation;
    // Exam_Creation_Temp:Exam_Creation=new Exam_Creation;
    // Exam_Creation_Data:Exam_Creation[];




array:any;
constructor(public Exam_Creation_Service_:Student_Service,public Batch_Service_:Batch_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User=localStorage.getItem(("Login_User"));
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    // this.Permissions = Get_Page_Permission(32);
    // if(this.Permissions==undefined || this.Permissions==null)
    // {
    // localStorage.removeItem('token');
    // this.router.navigateByUrl('/auth/login');
    // }
    // else
    {
    // this.Exam_Creation_Edit=this.Permissions.Edit;
    // this.Exam_Creation_Save=this.Permissions.Save;
    // this.Exam_Creation_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.Get_Menu_Status(95,this.Login_User);
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.Load_Exam_CreationPage_Dropdowns()
    this.Clr_Exam_Creation();
  

    
    this.Entry_View=false;
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-300;
    this.myInnerHeight = this.myInnerHeight - 250;
}
Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.Exam_Creation_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            
  this.array=Rows[0][0]
    
    if (Rows[0][0]==undefined)
    {
      if(Menu_id==95)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
        }
    }  
    else
    if (Rows[0][0].View >0) 
    {
        
        
        if(Menu_id==95)
        {
            
        

            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
                this.Exam_Creation_Edit= this.array.Edit;
                this.Exam_Creation_Save= this.array.Save;
                this.Exam_Creation_Delete= this.array.Delete;
        }

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Exam_Creation();  
}
Close_Click()
{
    this.Search_Exam_Creation();
    this.Clr_Exam_Creation();
    this.Entry_View = false;
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
trackByFn(index, item) 
{
return index;
}

Clr_Exam_Creation()
{
    this.Exam_Creation_.Exam_Creation_Id =0;
    this.Exam_Creation_.Duration_Type_Id  =0;
    this.Exam_Creation_.No_Of_Days  =0;
    this.Exam_Creation_.Percentage  =0;
    if(this.Duration_Type_Data!=null && this.Duration_Type_Data != undefined)
    this.Duration_Type_=this.Duration_Type_Data[0];
   
}
Search_Exam_Creation()
{
var Duration_Type_Search_Id_ =0;
if(this.Duration_Type_Search_!=undefined && this.Duration_Type_Search_!=null && this.Duration_Type_Search_.Duration_Type_Id!=0)
    {
        Duration_Type_Search_Id_ = this.Duration_Type_Search_.Duration_Type_Id
    }

    this.issLoading=true;
    this.Exam_Creation_Service_.Search_Exam_Creation(Duration_Type_Search_Id_).subscribe(Rows => {
    this.Exam_Creation_Data=Rows[0];
    this.Total_Entries=this.Exam_Creation_Data.length;
    if(this.Exam_Creation_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    this.issLoading=false;
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}



Delete_Exam_Creation(Exam_Creation_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        //this.issLoading=true;
        this.Exam_Creation_Service_.Delete_Exam_Creation(Exam_Creation_Id).subscribe(Delete_Exam_Creation => {
        
        Delete_Exam_Creation = Delete_Exam_Creation[0];
        Delete_Exam_Creation = Delete_Exam_Creation[0].DeleteStatus_.data[0];
        if(Delete_Exam_Creation==1){
        this.Exam_Creation_Data.splice(index, 1);
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
Save_Exam_Creation()
{
    if(this.Duration_Type_===undefined || this.Duration_Type_==null || this.Duration_Type_.Duration_Type_Id==0||this.Duration_Type_.Duration_Type_Id==undefined||this.Duration_Type_.Duration_Type_Id==null)
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Duration Type ',Type: "3" }});
    return  
    }

  
    this.issLoading=true;
    debugger
    this.Exam_Creation_.User_Id = this.Login_User_Id;
    this.Exam_Creation_.Duration_Type_Id=this.Duration_Type_.Duration_Type_Id;
    
    this.Exam_Creation_Service_.Save_Exam_Creation(this.Exam_Creation_).subscribe(Save_Exam_Creation => {
        
        debugger
    Save_Exam_Creation=Save_Exam_Creation[0];
    if(Number(Save_Exam_Creation[0].Exam_Creation_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Close_Click();
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
Edit_Exam_Creation(Exam_Creation_e:Exam_Creation,index)
{
    
    this.Entry_View=true;
    this.Exam_Creation_=Exam_Creation_e;
    

    for (var i = 0; i < this.Duration_Type_Data.length; i++)
    {
    if (this.Exam_Creation_.Duration_Type_Id == this.Duration_Type_Data[i].Duration_Type_Id)
    this.Duration_Type_=this.Duration_Type_Data[i];
    } 

   



}


Load_Exam_CreationPage_Dropdowns()
{
    
    this.issLoading = true;
    this.Batch_Service_.Load_BatchPage_Dropdowns().subscribe(Rows => {
    if (Rows != null) {
        debugger
        

        this.Duration_Type_Data = Rows[3];
        this.Duration_Type_Temp.Duration_Type_Id = 0;
        this.Duration_Type_Temp.Duration_Type_Name = "Select";
        this.Duration_Type_Data.unshift(this.Duration_Type_Temp);
        this.Duration_Type_ = this.Duration_Type_Data[0];
        this.Duration_Type_Search_ = this.Duration_Type_Data[0];

      

        this.issLoading = false;
        this.Search_Exam_Creation();
    }
},
    Rows => {
        this.issLoading = false;
    });
}
}

