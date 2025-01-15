import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users_Service } from '../../../services/Users.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Users } from '../../../models/Users';
import {User_Sub} from '../../../models/User_Sub';
import {Employer_Details} from '../../../models/Employer_Details';
import { User_Menu_Selection } from '../../../models/User_Menu_Selection';
import { User_Type } from '../../../models/User_Type';
import { User_Status } from '../../../models/User_Status';
import { Agent } from '../../../models/Agent';
import { User_Role } from '../../../models/User_Role';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Users',
templateUrl: './Users.component.html',
styleUrls: ['./Users.component.css']
})
export class UsersComponent implements OnInit {
Users_Data:Users[]
Search_User_Name_: string;


Search_Agent_: Agent = new Agent();

User_Menu_Selection_Data_Temp: User_Menu_Selection[] = [];
User_Menu_Selection_Data:User_Menu_Selection[]
User_Menu_Selection_:User_Menu_Selection= new User_Menu_Selection();

User_Sub_Data_Temp:User_Sub[]=[];
User_Sub_Data:User_Sub[];
User_Sub_:User_Sub=new User_Sub;

Users_:Users= new Users();
User_Type_:User_Type=new User_Type();
User_Type_Temp:User_Type=new User_Type();
User_Type_Data:User_Type[]

Users_Name_Search:string;

User_Role_Temp:User_Role=new User_Role();
User_Role_Data:User_Role[];
User_Role_:User_Role=new User_Role();


User_Status_Data: User_Status[]
User_Status_Temp:User_Status = new User_Status();
User_Status_: User_Status = new User_Status();


Agent_Data: Agent[]
Agent_: Agent = new Agent();

Entry_View:boolean=true;
myInnerHeight: number; 
myTotalHeight:number; 
EditIndex: number;
Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
User_Id : number;

Registration_Target:number;
FollowUp_Target:number

Users_Edit:boolean;
Select_View:boolean=false;
Select_View_Department:boolean=false;
Select_View_All_Department:boolean=false;
Select_Save:boolean=false;
Select_Edit:boolean=false;
select_User:boolean=false;
Select_Delete:boolean=false;
Users_Save:boolean;
Users_Delete:boolean;
Login_User:string="0";
array:any;


View_Password:string;
Agent_Temp: Agent = new Agent();
constructor(public Users_Service_:Users_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    
    this.Login_User=localStorage.getItem(("Login_User"));
// this.Permissions = Get_Page_Permission(1); 
// if(this.Permissions==undefined || this.Permissions==null)
// {
// localStorage.removeItem('token');
// this.router.navigateByUrl('Home_Page');
// }
// else
{
// this.Users_Edit=this.Permissions.Edit;
// this.Users_Save=this.Permissions.Save;
// this.Users_Delete=this.Permissions.Delete;
this.Page_Load()

}
}
Page_Load()
{
    this.Get_Menu_Status(1,this.Login_User);
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 250;
    this.Search_User_Role();
    this.Load_Dropdowns();
    this.Search_Users();
    this.Entry_View=false;

    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight - 80;
    this.myTotalHeight=this.myTotalHeight-150;
    this.myInnerHeight = this.myInnerHeight - 100;

}

Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.Users_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            
  this.array=Rows[0][0]
    
    if (Rows[0][0]==undefined)
    {
      if(Menu_id==1)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
        }
    }  
    else
    if (Rows[0][0].View >0) 
    {
        
        
        if(Menu_id==1)
        {
            
        

            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
                this.Users_Edit= this.array.Edit;
                this.Users_Save= this.array.Save;
                this.Users_Delete= this.array.Delete;
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
this.Clr_Users();
}
Close_Click()
{
    let top = document.getElementById('Topdiv');
    if (top !== null) {
    top.scrollIntoView();
    top = null;
    }
this.Clr_Users();
this.Entry_View = false;
}
Password_View_Click(){
this.View_Password=this.Users_.Password;


}
trackByFn(index, item) 
{
return index;
}
 Clr_Users()
 {
      
    this.Select_View=false;
    this.Select_View_Department=false;
    this.Select_View_All_Department=false;
    this.Select_Edit=false;
    this.Select_Save=false;
    this.select_User=false;
    this.Select_Delete=false;
    this.View_Password="";
this.Users_.Users_Id=0;
this.Users_.Users_Name="";
this.Users_.Password="";
this.Users_.User_Type=0;
this.Users_.Role_Id=0;
this.Users_.Address1="";
this.Users_.Address2="";
this.Users_.Address3="";
this.Users_.Address4="";
this.Users_.Pincode="";
this.Users_.Mobile="";
this.Users_.Email="";
     this.Users_.Registration_Target=0;
     this.Users_.FollowUp_Target=0;

if(this.User_Type_Data!=null && this.User_Type_Data != undefined)
this.User_Type_=this.User_Type_Data[0];

if(this.User_Status_Data!=null && this.User_Status_Data != undefined)
this.User_Status_=this.User_Status_Data[0];

if(this.User_Role_Data!=null && this.User_Role_Data != undefined)
this.User_Role_=this.User_Role_Data[0];

if(this.Agent_Data!=null && this.Agent_Data != undefined)
this.Agent_=this.Agent_Data[0];

if(this.User_Menu_Selection_Data!=undefined)//&& this.User_Menu_Selection_Data!=null&&this.User_Menu_Selection_Data!=""
{
for(var i=0;i<this.User_Menu_Selection_Data.length;i++)
{
   this.User_Menu_Selection_Data[i].IsDelete=false;
   this.User_Menu_Selection_Data[i].IsEdit=false;
   this.User_Menu_Selection_Data[i].IsSave=false;
   this.User_Menu_Selection_Data[i].IsView=false;
}
}

if(this.User_Sub_Data!=undefined)//&& this.User_Menu_Selection_Data!=null&&this.User_Menu_Selection_Data!=""
{
for(var i=0;i<this.User_Sub_Data.length;i++)
{
   this.User_Sub_Data[i].Check_Box=false;
}
}
}
User_Click()
{
 for(var i=0;i<this.User_Sub_Data.length;i++)
{
    if(this.select_User==false)
        this.User_Sub_Data[i].Check_Box=true;
    else
        this.User_Sub_Data[i].Check_Box=false;
}
}
View_Click()
{
 
 for(var i=0;i<this.User_Menu_Selection_Data.length;i++)
{
    if(this.Select_View==false)
        this.User_Menu_Selection_Data[i].IsView=true;
    else
        this.User_Menu_Selection_Data[i].IsView=false;
}
}
Save_Click()
{
 for(var i=0;i<this.User_Menu_Selection_Data.length;i++)
{
    if(this.Select_Save==false)
        this.User_Menu_Selection_Data[i].IsSave=true;
    else
        this.User_Menu_Selection_Data[i].IsSave=false;
}
}
Edit_Click()
{
 
 for(var i=0;i<this.User_Menu_Selection_Data.length;i++)
{
    if(this.Select_Edit==false)
        this.User_Menu_Selection_Data[i].IsEdit=true;
    else
        this.User_Menu_Selection_Data[i].IsEdit=false;
}
}
Delete_Click()
{
 
 for(var i=0;i<this.User_Menu_Selection_Data.length;i++)
{
    if(this.Select_Delete==false)
        this.User_Menu_Selection_Data[i].IsDelete=true;
    else
        this.User_Menu_Selection_Data[i].IsDelete=false;
}
}
Search_User_Role() 
    {
    this.Users_Service_.Search_User_Role('').subscribe(Rows => {
    this.User_Role_Data = Rows[0];
    this.User_Role_Temp.User_Role_Id=0;
    this.User_Role_Temp.User_Role_Name="Select";
    this.User_Role_Data.unshift(this.User_Role_Temp);
    this.User_Role_ = this.User_Role_Data[0];
    
    },
    Rows => 
    {
    //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    }
Load_Dropdowns() 
    {
         
    this.Users_Service_.Get_Users_Load_Data().subscribe(Rows =>
    {
    this.User_Type_Data = Rows.User_Type;
   this.User_Menu_Selection_Data =  Rows.User_Menu_Selection; 
   this.User_Status_Data = Rows.User_Status; 
   this.Agent_Data = Rows.Agent;
   this.User_Sub_Data = Rows.Users;

   this.User_Type_Temp.User_Type_Id = 0;
   this.User_Type_Temp.User_Type_Name = "Select";
   this.User_Type_Data.unshift(this.User_Type_Temp);
   this.User_Type_ = this.User_Type_Data[0];

   this.Agent_Temp.Agent_Id=0;
   this.Agent_Temp.Agent_Name="Select";
   this.Agent_Data.unshift(this.Agent_Temp);
   this.Agent_ = this.Agent_Data[0];
   this.Search_Agent_= this.Agent_Data[0];

   this.User_Status_Temp.User_Status_Id=0;
   this.User_Status_Temp.User_Status_Name="Select";
   this.User_Status_Data.unshift(this.User_Status_Temp);
   this.User_Status_ = this.User_Status_Data[0];
   
//    this.Users_Save_Temp.Users_Id=0;
//    this.Users_Save_Temp.Users_Name="Select";
//    this.Users_Save_Data.unshift(this.Users_Save_Temp);
//    this.Users_Save = this.Users_Save_Data[0];
    },
  Rows => { 
 const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
}
   
Search_Users()
{
    
  var Search_Agent_Id = 0 ;

this.issLoading=true;
if(this.Search_User_Name_==undefined)
this.Search_User_Name_="";
    if(this.Search_Agent_!=undefined && this.Search_Agent_!=null )
    Search_Agent_Id=this.Search_Agent_.Agent_Id;

this.Users_Service_.Search_Users(this.Search_User_Name_,Search_Agent_Id).subscribe(Rows => {
    
 this.Users_Data=Rows.returnvalue.Leads;
 this.Total_Entries=this.Users_Data.length;
if(this.Users_Data.length==0)
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


Delete_Users(Users_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;

this.Users_Service_.Delete_Users(Users_Id).subscribe(Delete_status => {
    
 Delete_status = Delete_status[0];
    // Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0].Users_Id_>0){
this.Users_Data.splice(index, 1);
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
}
else
{
//this.Users_Data.splice(index, 1);
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
Save_Duplicate_User()
{
    
    this.Users_.Users_Id=0;
    this.Users_.Users_Name=null;
    this.Users_.Password=null;
   this.Save_Users();
}

Save_Users()
{
    var Menu_Status=false;var User_Status=false;
    for (var i = 0; i < this.User_Menu_Selection_Data.length; i++)
    {
    if(this.User_Menu_Selection_Data[i].IsView== true)
    Menu_Status=true
    } 
    for (var i = 0; i < this.User_Sub_Data.length; i++)
    {
    if(this.User_Sub_Data[i].Check_Box== true)
    User_Status=true
    } 
    if (User_Status==false)
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Atleast One User', Type: "3" } });
    return
    }
    else if (Menu_Status==false)
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Atleast One Menu', Type: "3" } });
    return
    }
    else if(this.Users_.Users_Name==undefined||this.Users_.Users_Name==null||this.Users_.Users_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the User Name', Type: "3" } });
    return
    }
    else if(this.Users_.Password==undefined||this.Users_.Password==null||this.Users_.Password=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Password', Type: "3" } });
    return
    }
    else if (this.User_Type_ == undefined || this.User_Type_ == null || this.User_Type_.User_Type_Id == undefined || this.User_Type_.User_Type_Id==0) 
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select User Type', Type: "3" } });
    return
    }
    else if (this.User_Status_.User_Status_Id == 0 ||this.User_Status_.User_Status_Id == undefined || this.User_Status_.User_Status_Id==null) 
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Status', Type: "3" } });
    return
    }
    else if (this.Agent_.Agent_Id == 0 ||this.Agent_.Agent_Id == undefined || this.Agent_.Agent_Id==null) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Branch', Type: "3" } });
    return
    }
    else if (this.User_Role_.User_Role_Id == 0 ||this.User_Role_.User_Role_Id == undefined || this.User_Role_.User_Role_Id==null) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select User Role', Type: "3" } });
        return
        }


        if (this.Users_.Mobile == undefined || this.Users_.Mobile == null || this.Users_.Mobile == "" ) {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Mobile Number', Type: "3" } });
            return;
        }
        
         if(this.Users_.Mobile.toString().length!=10 )
        {
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Enter Valid Mobile Number',Type:"3"}});
            return
        }




    else{
         
        this.Users_.User_Type = this.User_Type_.User_Type_Id;
        this.Users_.Working_Status= this.User_Status_.User_Status_Id;
        this.Users_.User_Type = this.User_Type_.User_Type_Id;
        this.Users_.Agent_Id=this.Agent_.Agent_Id;
        this.Users_.Role_Id=this.User_Role_.User_Role_Id;

        this.User_Menu_Selection_Data_Temp=[]; 
        for (var i = 0; i< this.User_Menu_Selection_Data.length; i++) 
        {
        if (Boolean(this.User_Menu_Selection_Data[i].IsView) == true||Boolean(this.User_Menu_Selection_Data[i].IsSave) == true
        ||Boolean(this.User_Menu_Selection_Data[i].IsEdit) == true||Boolean(this.User_Menu_Selection_Data[i].IsDelete) == true) 
            {
            this.User_Menu_Selection_Data_Temp.push(this.User_Menu_Selection_Data[i]);
            }
        }
        this.Users_.User_Menu_Selection_Data = this.User_Menu_Selection_Data_Temp;

 
        this.User_Sub_Data_Temp=[]; 
        for (var i = 0; i< this.User_Sub_Data.length; i++) 
        {
        if (Boolean(this.User_Sub_Data[i].Check_Box) == true) 
            {
            this.User_Sub_Data_Temp.push(this.User_Sub_Data[i]);
            }
        }
        this.Users_.User_Sub_Data = this.User_Sub_Data_Temp; 

    this.issLoading=true;
    debugger
    this.Users_Service_.Save_Users(this.Users_).subscribe(Save_status => {
        debugger
    if(Number(Save_status[0].Users_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Search_Users();
    this.Close_Click();
    }
    // else if(Number(Save_status[0].Users_Id_)==-1){
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'User Limit Exceeded',Type:"2"}});
    // }
    else{
        
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
        
        this.issLoading=false;
        
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
 this.Clr_Users();
}
}
Get_Users_Edit(Users_Id) 

    {
         
        this.issLoading=true;
    this.Users_Service_.Get_Users_Edit(Users_Id).subscribe(Rows => 
    {
         
    this.User_Menu_Selection_Data=Rows[0].Menu;
    this.User_Sub_Data=Rows[0].User_Sub;


        for(var i=0;i<this.User_Sub_Data.length;i++)
        {
        if (this.User_Sub_Data[i].Check_Box.toString()=='1')
        {
        this.User_Sub_Data[i].Check_Box=true
        }
        else 
        {
        this.User_Sub_Data[i].Check_Box=false
        }
        }

    for(var j=0;j<this.User_Menu_Selection_Data.length;j++)
    {
    if (this.User_Menu_Selection_Data[j].IsView.toString()=='1')
    this.User_Menu_Selection_Data[j].IsView= true;  
    else
    this.User_Menu_Selection_Data[j].IsView= false;
    if (this.User_Menu_Selection_Data[j].IsEdit.toString()=='1')
    this.User_Menu_Selection_Data[j].IsEdit= true;
    else  
    this.User_Menu_Selection_Data[j].IsEdit= false; 
    if (this.User_Menu_Selection_Data[j].IsSave.toString()=='1')  
    this.User_Menu_Selection_Data[j].IsSave= true; 
    else
    this.User_Menu_Selection_Data[j].IsSave= false;
    if (this.User_Menu_Selection_Data[j].IsDelete.toString()=='1')
    this.User_Menu_Selection_Data[j].IsDelete= true;
    else 
    this.User_Menu_Selection_Data[j].IsDelete= false;
    }
    this.issLoading=false;
    },
  Rows => { 
    this.issLoading=false;
    
 const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });

    }
Edit_Users(Users_e:Users,index)
{
      
this.Entry_View=true;
this.Users_=Users_e;
this.User_Id=Users_e.Users_Id;
this.Users_=Object.assign({},Users_e);
 
this.Get_Users_Edit(this.Users_.Users_Id);

for (var i = 0; i < this.User_Type_Data.length; i++) {
    if (this.Users_.User_Type == this.User_Type_Data[i].User_Type_Id)
    this.User_Type_=this.User_Type_Data[i];
}
for (var i = 0; i < this.User_Status_Data.length; i++) {
    if (this.Users_.Working_Status == this.User_Status_Data[i].User_Status_Id)
    this.User_Status_=this.User_Status_Data[i];
}
for (var i = 0; i < this.Agent_Data.length; i++) {
    if (this.Users_.Agent_Id == this.Agent_Data[i].Agent_Id)
    this.Agent_=this.Agent_Data[i];
}
for (var i = 0; i < this.User_Role_Data.length; i++) {
    if (this.Users_.Role_Id == this.User_Role_Data[i].User_Role_Id)
    this.User_Role_=this.User_Role_Data[i];
}
}
}
