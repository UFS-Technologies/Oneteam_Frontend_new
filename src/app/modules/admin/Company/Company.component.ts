import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users_Service } from '../../../services/Users.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Users } from '../../../models/Users';
import {Company} from '../../../models/Company'
import { User_Menu_Selection } from '../../../models/User_Menu_Selection';
import { Company_Service} from '../../../services/Company.Service'
import { User_Type } from '../../../models/User_Type';
import { User_Status } from '../../../models/User_Status';
import { Agent } from '../../../models/Agent';
import { User_Role } from '../../../models/User_Role';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';import { GeneralFunctions_Service } from 'app/services/GeneralFunctions.service';
@Component({
selector: 'app-Company',
templateUrl: './Company.component.html',
styleUrls: ['./Company.component.css']
})
export class CompanyComponent implements OnInit {
    Company_Data:Company[]
Search_User_Name_: string;
Company_Name:string;
Search_Agent_: Agent = new Agent();
// User_Menu_Selection_Data_Temp: User_Menu_Selection[] = [];
// User_Menu_Selection_Data:User_Menu_Selection[]
// User_Menu_Selection_:User_Menu_Selection= new User_Menu_Selection();
Company_:Company= new Company();
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
ImageFile: any;
    File: string;
    file:File;
    companyfile:string;
array:any;
Agent_Temp: Agent = new Agent();
constructor(public GeneralFunctions_Service_:GeneralFunctions_Service,public Company_Service_:Company_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{    
this.Login_User = localStorage.getItem("Login_User");  
this.Permissions = Get_Page_Permission(56); 
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
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    //this.Clr_Employer_Details();
   // this.Search_Employer_Details();   
    this.Get_Menu_Status(56,this.Login_User); 
    // this.myInnerHeight = (window.innerHeight);
    // this.myTotalHeight=this.myInnerHeight
    // this.myTotalHeight=this.myTotalHeight-40;
    // this.myInnerHeight = this.myInnerHeight - 250;   
    this.Entry_View = true;
    this.Get_Companydetails();
}
Create_New()
{
    this.Entry_View = true;
    //this.Clr_Employer_Details();
}
// Close_Click()
// {
//     this.Search_Employer_Details();
//     this.Clr_Employer_Details();
//     this.Entry_View = false;
// }
Get_Companydetails()
{   
    this.issLoading = true;
    this.Company_Service_.Get_Companydetails().subscribe(Rows => {
        //debugger;
        this.issLoading = false;
        this.Company_ = Rows[0][0];
        // this.Company_.Company_Name=Rows[0].Company_Name;
        // this.print_Company_Address1=Company_.Address1;
        // this.print_Company_Address2=Company_.Address2;
        // this.print_Company_Address3=Company_.Address3;
        // this.print_Company_Address4=Company_.Address4;
        // this.print_Company_pincode=Rows[0][0].Pincode;
        // this.print_Company_Phone=Rows[0][0].Phone1;
        // this.print_Company_Mobile=Rows[0][0].Mobile;
        // this.print_Company_Email=Rows[0][0].Email;
        // this.print_Company_Website=Rows[0][0].Website;
    },
    Rows => {
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: false } });
    });
}
// Close_Click()
// {
// //this.Clr_Employer_Details();
// this.Entry_View = false;
// }
trackByFn(index, item) 
{
return index;
}
Clr_Employer_Details()
 {
    // this.Company_.Company_Id=0;
    // this.Company_.Company_Name="";
    // this.Company_.Phone="";
    // this.Company_.Address1="";
    // this.Company_.Address2="";
    // this.Company_.Address3="";
    // this.Company_.Email_Id="";
    //this.Company_.Company_Location="";
   // this.Company_.Website="";
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
        if(Menu_id==56)
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
    // Search_Employer_Details()
    // {
        
    //   var Search_Agent_Id = 0 ;
    
    // this.issLoading=true;
    // if(this.Search_Employer_Details==undefined)
    // this.Search_User_Name_="";
    //     if(this.Search_Agent_!=undefined && this.Search_Agent_!=null )
    //     Search_Agent_Id=this.Search_Agent_.Agent_Id;
    
    // this.Company_Service_.Search_Employer_Details(this.Search_User_Name_).subscribe(Rows => {
        
    //  this.Company_Data=Rows.returnvalue.Leads;
    // this.Total_Entries=this.Company_Data.length;
    // if(this.Company_Data.length==0)
    // {
    // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
    // }
    // this.issLoading=false;
    //  },
    //  Rows => { 
    //      this.issLoading=false;
    // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    //  });
    
    
    // }

// Delete_Employer_Details(Employer_Details_Id_,index)
// {
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
//     dialogRef.afterClosed().subscribe(result =>
//     {
//     if(result=='Yes')
  
//         {
//         this.issLoading=true;
//         this.Company_Service_.Delete_Employer_Details(Employer_Details_Id_).subscribe(Delete_Employer_Details => {
    
//        Delete_Employer_Details = Delete_Employer_Details[0];
//        Delete_Employer_Details = Delete_Employer_Details[0].Employer_Details_Id_;
//         if(Delete_Employer_Details>=1){
//         this.Company_Data.splice(index, 1);
//         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
//         }
//         else
//         {
//         this.issLoading=false;
//         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//         }
//         this.issLoading=false;
//         },
//         Rows => { 
//         this.issLoading=false;
//         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//         });
//     }
//     });

//  }
 File_Change(event)
{
    this.file = event.target.files[0]; 
    this.ImageFile = this.file;
    this.companyfile=this.file.name;
    this.Company_.Logo =this.ImageFile.Name;    
}
 Save_Company()
{
    var sav=0;
    if(this.Company_.Company_Name===undefined || this.Company_.Company_Name==null || this.Company_.Company_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Company ',Type: "3" }});
    return  
    }
    if(this.Company_.Logo == null || this.Company_.Logo == undefined){
        this.Company_.Logo = "";
        this.ImageFile = [];
    }
    this.issLoading=true;    
    this.Company_Service_.Save_Company(this.Company_,this.ImageFile).subscribe(Save_status => {  
        //debugger ;    
        sav=Save_status[0][0];
        // Save_status=Save_status[0][0];
    if(Number(Save_status[0][0])==0)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        //this.Search_Employer_Details();
        }
        else{
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
            //this.Close_Click();
            this.Get_Companydetails();       
        }
        this.issLoading=false;
        },
        Rows => { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
        });
    }
    // Edit_Employer_Details(Employer_Details_e:Company,index)
    // {
    //     this.Entry_View=true;
    //     this.Company_=Employer_Details_e;
    //     this.Company_=Object.assign({},Employer_Details_e);
    // }
}