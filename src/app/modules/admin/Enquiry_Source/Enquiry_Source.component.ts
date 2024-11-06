import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enquiry_Source_Service } from '../../../services/Enquiry_Source.service';
import { GeneralFunctions_Service } from '../../../services/GeneralFunctions.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Enquiry_Source } from '../../../models/Enquiry_Source';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
@Component({
selector: 'app-Enquiry_Source',
templateUrl: './Enquiry_Source.component.html',
styleUrls: ['./Enquiry_Source.component.css']
})
export class Enquiry_SourceComponent implements OnInit {
Enquiry_Source_Data:Enquiry_Source[]
Enquiry_Source_:Enquiry_Source= new Enquiry_Source();
Enquiry_Source_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Enquiry_Source_Edit:boolean;
Enquiry_Source_Save:boolean;
Enquiry_Source_Delete:boolean;
myInnerHeight: number;
myTotalHeight:number;
Login_User: string = "0";
array:any;

constructor(public GeneralFunctions_Service_:GeneralFunctions_Service, public Enquiry_Source_Service_:Enquiry_Source_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Login_User = localStorage.getItem("Login_User");
// this.Permissions = Get_Page_Permission(14);
// if(this.Permissions==undefined || this.Permissions==null)
// {
// localStorage.removeItem('token');
// this.router.navigateByUrl('/auth/login');
// }
// else
{
// this.Enquiry_Source_Edit=this.Permissions.Edit;
// this.Enquiry_Source_Save=this.Permissions.Save;
// this.Enquiry_Source_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Enquiry_Source();
this.Search_Enquiry_Source();
this.Entry_View=false;
this.Get_Menu_Status(46,this.Login_User); 
this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-250;
    this.myInnerHeight = this.myInnerHeight - 250;

}

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
        
        if(Menu_id==46)
        {
             this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
               
                this.Enquiry_Source_Edit=this.Permissions.Edit;
                this.Enquiry_Source_Save=this.Permissions.Save;
                this.Enquiry_Source_Delete=this.Permissions.Delete;
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
this.Clr_Enquiry_Source();
}
Close_Click()
{
this.Entry_View = false;
this.Search_Enquiry_Source();
this.Clr_Enquiry_Source();
}
trackByFn(index, item) 
{
return index;
}

 Clr_Enquiry_Source()
 {
this.Enquiry_Source_.Enquiry_Source_Id=0;
this.Enquiry_Source_.Enquiry_Source_Name="";
this.Enquiry_Source_.User_Id=0;

}
Search_Enquiry_Source()
{
this.issLoading=true;
this.Enquiry_Source_Service_.Search_Enquiry_Source(this.Enquiry_Source_Name_Search).subscribe(Rows => {
    this.issLoading=false;
 this.Enquiry_Source_Data=Rows[0];
 this.Total_Entries=this.Enquiry_Source_Data.length;
if(this.Enquiry_Source_Data.length==0)
{
    this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
}
this.issLoading=false;
 },
 Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}
Delete_Enquiry_Source(Enquiry_Source_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;

this.Enquiry_Source_Service_.Delete_Enquiry_Source(Enquiry_Source_Id).subscribe(Delete_status => {

    Delete_status = Delete_status[0];
    // Delete_status = Delete_status[0].DeleteStatus_.data[0];
 if(Delete_status[0].Enquiry_Source_Id_>0)
// if(Delete_status==1)
{
this.Enquiry_Source_Data.splice(index, 1);
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


Save_Enquiry_Source()
{ 
if(this.Enquiry_Source_.Enquiry_Source_Name===undefined || this.Enquiry_Source_.Enquiry_Source_Name==null || this.Enquiry_Source_.Enquiry_Source_Name=="")
{
const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Enquiry Source ',Type: "3" }});
return  
}
this.issLoading=true;
this.Enquiry_Source_Service_.Save_Enquiry_Source(this.Enquiry_Source_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Enquiry_Source_Id_)>0)
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
Edit_Enquiry_Source(Enquiry_Source_e:Enquiry_Source,index)
{
this.Entry_View=true;
this.Enquiry_Source_=Enquiry_Source_e;
this.Enquiry_Source_=Object.assign({},Enquiry_Source_e);
}
}

