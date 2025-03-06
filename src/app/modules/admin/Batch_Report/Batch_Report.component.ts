import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Course } from '../../../models/Course';
import { Batch } from '../../../models/Batch';
import { Users } from '../../../models/Users';
import { Agent } from '../../../models/Agent';
import { Attendance_Master } from '../../../models/Attendance_Master';
import { Attendance_Student } from '../../../models/Attendance_Student';
import { Attendance_Subject } from '../../../models/Attendance_Subject';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Student_Data_Service } from 'app/services/Student_Data.Service';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Batch_Report',
templateUrl: './Batch_Report.component.html',
styleUrls: ['./Batch_Report.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Batch_ReportComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Attendance_Edit:boolean;
    Attendance_Save:boolean;
    Attendance_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;
    Export_Permission:any;
    Export_View :boolean =false;

    // Track which student's file is being viewed
currentViewedStudentId: number | null = null;
agreementFileUrl: string | null = null;


    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    profile_View:boolean=true;
    
    Attendance_Id: number = 0;
    Attendance_Data: []
    Job_Code_Search:string;
    Student_Search:string;
    Job_Location_Search:string;

    Course_Data: Course[];
    Course_:Course=new Course;
    Course_Temp: Course = new Course;
    Course_Data_Filter: Course[]  


    Batch_Data: Batch[];
    Batch_:Batch=new Batch;
    Batch_Temp: Batch = new Batch;
    Batch_Data_Filter: Batch[]
    
    Faculty_Data: Users[];
    Faculty_:Users=new Users;
    Faculty_Temp: Users = new Users;
    Faculty_Data_Filter: Users[];

    Save_Call_Status: boolean = false;
    Logo: string;
    Display_Logo_: string;
    ImageFile_Logo: any;

    Login_User: number = 0;
    Attendance_EditIndex: number = -1;

    Edit_Page_Permission:any;
    Edit_Job_Permission:any;

    Attendance_Master_:Attendance_Master=new Attendance_Master;
    Attendance_Master_Temp:Attendance_Master=new Attendance_Master;
    Attendance_Master_Data:Attendance_Master[];

    Total_Amount:number=0;


    selectedFile: string | null = null;
selectedFileName: string | null = null;
fileUrl: string | null = null;


    Search_Name: "";

    Fees_Report_Data:any;
    Batch_Report_Data:any;
    Is_Date:boolean=true;    
    FromDate_: Date = new Date();
    ToDate_: Date = new Date();

    Login_User_Type_Data:any;
    faculty_edit:number;
    login_user_name: string;
    Trainer:number;

    Branch_Data: Agent[];
    Branch_:Agent=new Agent;
    Branch_Temp: Agent = new Agent;

    FollowUp_Branch_: Agent = new Agent();
	Followup_Branch_Data: Agent[];

constructor(public Student_Service_:Student_Service, private route: ActivatedRoute,public Student_Data_Service_:Student_Data_Service,  private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.login_user_name = (localStorage.getItem("uname"));
    this.Permissions = Get_Page_Permission(57);
    this.Export_Permission=Get_Page_Permission(50);

    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Attendance_Edit=this.Permissions.Edit;
    this.Attendance_Save=this.Permissions.Save;
    this.Attendance_Delete=this.Permissions.Delete;
    this.Page_Load()
    if(this.Export_Permission !=undefined && this.Export_Permission !=null)
    this.Export_View=this.Export_Permission.Edit
    }
     
}
Export()
{
    
        this.Student_Service_.exportExcel(this.Batch_Report_Data,'Batch Report')
       
}
Page_Load()
{
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.Entry_View = false;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Is_Date=true;
    this.Trainer =this.Login_User;
    this.Get_Login_User_Type();
    this.Search_Batch_Report();
    this.Search_Batch_Typeahead_Report_New( );
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight -200;
    this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeight = this.myInnerHeight - 265;

    this.Faculty_Temp.Users_Id = this.Login_User;
    this.Faculty_Temp.Users_Name = this.login_user_name;
    this.Faculty_ = Object.assign(this.Faculty_Temp);
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
Close_Click()
{
  this.Entry_View=false;
}



Edit_Batch_Report(Student_Id, i) {
    
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
// Search_Batch_Typeahead(event: any)
// {     
//     var Value = "";
//     if (event.target.value == "")
//         Value = undefined;
//     else
//         Value = event.target.value;
//     if (this.Batch_Data == undefined || this.Batch_Data.length==0)
//     {
//         this.issLoading = true;
//         this.Student_Service_.Search_Batch_Typeahead('').subscribe(Rows => {
//     if (Rows != null) 
//     {
//         this.Batch_Data = Rows[0];
//         this.issLoading = false;
//     }
//     },
//     Rows => {
//      this.issLoading = false;
//     });
//     } 
// }
// display_Batch(Batch_: Batch)
// {     
//     if (Batch_) { return Batch_.Batch_Name; }
// }

Search_Batch_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    if (this.Batch_Data == undefined || this.Batch_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Search_Batch_Typeahead('').subscribe(Rows => {
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
    });
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
// display_Faculty(Users_: Users)
// {     
//     if (Users_) { return Users_.Users_Name; }
// }



Search_Faculty_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;       
     if(this.Faculty_Data==undefined || this.Faculty_Data.length==0)
           {
            this.issLoading = true;
         this.Student_Service_.Search_Typeahead_Loadfaculty('').subscribe(Rows => {
        if (Rows != null) {
            this.Faculty_Data = Rows[0];
            this.issLoading = false;

            this.Faculty_Data_Filter=[];

            for (var i=0;i<this.Faculty_Data.length;i++)
            {
                if(this.Faculty_Data[i].Users_Name.toLowerCase().includes(Value))
                    this.Faculty_Data_Filter.push(this.Faculty_Data[i])
            }
        }
    },
        Rows => {
            this.issLoading = false;
          });
    } 

    else
    {
        
        this.Faculty_Data_Filter=[];
        for (var i=0;i<this.Faculty_Data.length;i++)
        {
            if(this.Faculty_Data[i].Users_Name.toLowerCase().includes(Value))
                this.Faculty_Data_Filter.push(this.Faculty_Data[i])
        }
    }
}

display_Faculty(Users_: Users)
{     
    if (Users_) { return Users_.Users_Name; }
}




Search_Batch_Report()
{
    var  Course_Id = 0, Batch_Id = 0,search_name_ = undefined,look_In_Date_Value=0;var Faculty_Id =0,Branch_Id_=0;
    this.Total_Amount =0,this.Total_Entries =0;
    if (this.Is_Date == true)
        look_In_Date_Value = 1;
    if (this.Course_ != undefined && this.Course_ != null)
        if (this.Course_.Course_Id != undefined && this.Course_.Course_Id != null)
        Course_Id = this.Course_.Course_Id;
    //debugger

    if (this.Batch_ != undefined && this.Batch_ != null)
        if (this.Batch_.Batch_Id != undefined && this.Batch_.Batch_Id != null)
        Batch_Id = this.Batch_.Batch_Id;

        if (this.Faculty_ != undefined && this.Faculty_ != null)
        if (this.Faculty_.Users_Id != undefined && this.Faculty_.Users_Id != null)
        Faculty_Id = this.Faculty_.Users_Id;

     
            
        if (this.FollowUp_Branch_ != undefined && this.FollowUp_Branch_ != null)
            if (this.FollowUp_Branch_.Agent_Id != undefined && this.FollowUp_Branch_.Agent_Id != null)
                Branch_Id_ = this.FollowUp_Branch_.Agent_Id;
        

        if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
        search_name_ = this.Search_Name;
        
    this.issLoading = true;

    //debugger
    this.Student_Service_.Search_Batch_Report(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),Batch_Id,Faculty_Id,this.Login_User,Branch_Id_).subscribe(Rows =>{
        //debugger
        this.Batch_Report_Data=Rows[0];
      
        this.Total_Entries =  this.Batch_Report_Data.length;
        var  Fees_Data = Rows[0];
        for(var i=0;i<Fees_Data.length;i++)
        {
            this.Total_Amount =  this.Total_Amount+ parseFloat(Fees_Data[i].FeePaid)
        }
    this.issLoading = false;
    this.Total_Amount =  parseFloat(this.Total_Amount.toFixed(2))
    if(this.Batch_Report_Data.length==0)
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

Get_Login_User_Type()
{
    
    this.issLoading = true;
    this.Student_Service_.Get_Login_User_Type(this.Login_User).subscribe(Rows => {
        if (Rows != null) {
            debugger
            this.Login_User_Type_Data = Rows[0];
            if( this.Login_User_Type_Data[0].User_Type==1 ||this.Login_User_Type_Data[0].Role_Id==4||this.Login_User_Type_Data[0].Role_Id==12)
            {
                this.faculty_edit =1
            }
            else( this.faculty_edit =0);
           

            
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}

Trainer_Change()
{
    debugger
    if (this.Faculty_ != undefined && this.Faculty_ != null ){
        if (this.Faculty_.Users_Id != undefined && this.Faculty_.Users_Id != null )
        this.Trainer = this.Faculty_.Users_Id; 
        else
        this.Trainer =0;
    }
    else
    this.Trainer =0;
   

    this.Search_Batch_Typeahead_Report_New()

}

Search_Batch_Typeahead_Report_New()
{
    debugger
    this.issLoading = true;
    this.Student_Service_.Search_Batch_Typeahead_Report_New1('',this.Login_User,this.Trainer).subscribe(Rows => {
        if (Rows != null) {
            debugger
            this.Batch_Data = Rows[0];
            
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}

viewStudentAgreement(studentId: number): void {
    // Set the current student being viewed
    this.currentViewedStudentId = studentId;
    
    // Find the student in your data
    const student = this.Batch_Report_Data.find(s => s.Student_Id === studentId);
    
    if (student && student.Agreement_File) {
      // Construct the file URL (modify the base path as needed for your application)
      const baseUrl = 'assets/uploads'; // or your API endpoint
      this.agreementFileUrl = `${baseUrl}/${student.Agreement_File}`;
      console.log('this.agreementFileUrl : ', this.agreementFileUrl );
    } else {
      this.agreementFileUrl = null;
      // Show an error message if needed
    }
  }
  closeViewer(): void {
    this.selectedFile = null;
    this.selectedFileName = null;
    this.fileUrl = null;
  }
Search_Branch_Typeahead(event: any) {
	//debugger
		var Value = "";
		if (this.Followup_Branch_Data == undefined) this.Followup_Branch_Data = [];
		if (this.Followup_Branch_Data.length == 0) {
			if (event.target.value == "") Value = undefined;
			else Value = event.target.value;

			if (
				this.Followup_Branch_Data == undefined ||
				this.Followup_Branch_Data.length == 0
			) {
				this.issLoading = true;
				this.Student_Data_Service_.Search_Branch_Typeahead("").subscribe(
					(Rows) => {
						//debugger
						if (Rows != null) {
							this.Followup_Branch_Data = Rows[0];
							this.issLoading = false;
						}
					},
					(Rows) => {
						this.issLoading = false;
						}
				);
			}
		}
	}
	display_Branch(Branch_: Agent) {
		if (Branch_) {
			return Branch_.Agent_Name;
		}
	}

}

