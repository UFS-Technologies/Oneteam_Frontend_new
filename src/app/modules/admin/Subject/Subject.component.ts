import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject_Service } from '../../../services/Subject.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Subject } from '../../../models/Subject';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
@Component({
    selector: 'app-Subject',
    templateUrl: './Subject.component.html',
    styleUrls: ['./Subject.component.css']
})
export class SubjectComponent implements OnInit {
    Subject_Data:Subject[]
    Subject_:Subject= new Subject();
    Subject_Name_Search:string;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Subject_Edit:boolean;
    Subject_Save:boolean;
    Subject_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;

    Login_User_Id:number=0;

    Login_User:string="0";
array:any;

constructor(public Subject_Service_:Subject_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User=localStorage.getItem(("Login_User"));
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    // this.Permissions = Get_Page_Permission(5);
    // if(this.Permissions==undefined || this.Permissions==null)
    // {
    // localStorage.removeItem('token');
    // this.router.navigateByUrl('/auth/login');
    // }
    // else
    {
    // this.Subject_Edit=this.Permissions.Edit;
    // this.Subject_Save=this.Permissions.Save;
    // this.Subject_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.Get_Menu_Status(5,this.Login_User);
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_Subject();
    this.Search_Subject();
    this.Entry_View=false;

    
 this.myInnerHeight = (window.innerHeight);
 this.myTotalHeight=this.myInnerHeight
 this.myTotalHeight=this.myTotalHeight-300;
 this.myInnerHeight = this.myInnerHeight - 250;
}
Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.Subject_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            
  this.array=Rows[0][0]
    
    if (Rows[0][0]==undefined)
    {
      if(Menu_id==5)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
        }
    }  
    else
    if (Rows[0][0].View >0) 
    {
        
        
        if(Menu_id==5)
        {
            
        

            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
                this.Subject_Edit= this.array.Edit;
                this.Subject_Save= this.array.Save;
                this.Subject_Delete= this.array.Delete;
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
    this.Clr_Subject();
}
Close_Click()
{
    this.Search_Subject();
    this.Clr_Subject();
    this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

Clr_Subject()
{
    this.Subject_.Subject_Id=0;
    this.Subject_.Subject_Name="";
    this.Subject_.Exam_status=0
    this.Subject_.User_Id=0;
}
Search_Subject()
{
    this.issLoading=true;
    this.Subject_Service_.Search_Subject(this.Subject_Name_Search).subscribe(Rows => {
    this.Subject_Data=Rows[0];
    this.Total_Entries=this.Subject_Data.length;
    if(this.Subject_Data.length==0)
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
Delete_Subject(Subject_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.Subject_Service_.Delete_Subject(Subject_Id).subscribe(Delete_status => {
        
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_.data[0];
        if(Delete_status==1){
        this.Subject_Data.splice(index, 1);
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
Save_Subject()
{
    if(this.Subject_.Subject_Name===undefined || this.Subject_.Subject_Name==null || this.Subject_.Subject_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Syllabus ',Type: "3" }});
    return  
    }
    this.issLoading=true;
    this.Subject_.User_Id = this.Login_User_Id;
    this.Subject_Service_.Save_Subject(this.Subject_).subscribe(Save_status => {
    Save_status=Save_status[0];
    if(Number(Save_status[0].Subject_Id_)>0)
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
Edit_Subject(Subject_e:Subject,index)
{
    this.Entry_View=true;
    this.Subject_=Subject_e;
    this.Subject_=Object.assign({},Subject_e);
}
}

