import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserData } from '../../services/user-data';
import { Router } from '@angular/router';
// import { ROUTES } from '../sidebar/sidebar.component';
import { MatButtonModule, MatDialog, MatMenuModule } from '@angular/material';
import { Student_Service } from 'app/services/Student.service';
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DialogBox_Component } from "../../modules/admin/DialogBox/DialogBox.component";
import { Get_Page_Permission } from "../../components/sidebar/sidebar.component";
import * as io from "socket.io-client";
import { Observable } from "rxjs";
import {
DateAdapter,
MAT_DATE_FORMATS,
MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";
import { default as _rollupMoment } from "moment";
import { Notification_Class } from 'app/models/Notification_Class';
import { environment } from 'environments/environment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
parse: { dateInput: "DD/MM/YYYY" },
display: {
dateInput: "DD/MM/YYYY",
monthYearLabel: "MMM YYYY",
dateA11yLabel: "DD/MM/YYYY",
monthYearA11yLabel: "MMMM YYYY",
},
};
declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  Menu_Id:string;
  Save:string;
  Delete:string;
  View:string;
  Edit:string;
  Menu_Type:boolean;
}

declare interface PointerInfo {
 Root_Index:number;
 
 
}
export var ROUTES: RouteInfo[] = [];
export var Pointer_Table: number[] = []
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    providers: [
    {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class NavbarComponent implements OnInit {
    url = environment.NotificationPath;
	private socket;
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    uname:string;
    user_Type:string
    Login_user_Id_:number
    menuItems: any[];
    menuArray: any[];
    To_Date_:Date = new Date();
    c_count:string;
    conversion_color:string;

    // uname: string;
	Notification_Count: number = 0;
	u_id: number;
	// menuItems: any[];
	// menuArray: any[];
	issLoading: boolean = true;
	year: any;
	month: any;
	day: any;
	date: any;
	Hours: any;
	Minutes: any;
	Seconds: any;
	Search_ToDate: Date = new Date();
	Notification_Data: any;
	Notification_Temp: Notification_Class = new Notification_Class();
	Total_Counts: number = 0;
	Student_Task_Count = 0;
	Aheight: number = 50;
	Count_Notification: boolean = false;
	Notification_List: boolean = false;
	Edit_Page_Permission: any;
	studentid_n: number;
	Updated_Serial_No_: number;
	Fetched_Serial_No: number;

    submenus22: boolean = false;
    submenus23: boolean = false;
    submenus24: boolean = false;
    submenus25: boolean = false;
    batch_completion_data: any;


    constructor(location: Location, public userData: UserData, private element: ElementRef, private router: Router,public Student_Service_: Student_Service,public dialogBox: MatDialog,) {
        this.location = location;
        this.sidebarVisible = false;
        var retrievedObject=localStorage.getItem('Routes_Temp');
        ROUTES=JSON.parse(retrievedObject);
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        var retrievedPointer=localStorage.getItem('Pointer_Temp');
        Pointer_Table=JSON.parse(retrievedPointer);
       // this.menuArray = Pointer_Table.filter(menuItem => menuItem);
        this.menuArray = Pointer_Table
        debugger
        this.socket = io(this.url, {
			transports: ["websocket"],
			auth: {
				token: localStorage.getItem("token"),
			},
		});
		this.socket = io(this.url);
       ;
    }

    getMessages = () => {
		return Observable.create((observer) => {
			this.socket.on("new-message", (message) => {
				// console.log(message);
				// alert(message);
				observer.next(message);
			});
		});
	};
	sendmsg() {
		this.socket.emit("new-message", "jid");
	}
	public sendMessage(message) {
		console.log(message);
		this.socket.emit("new-message", message);
	}
  
    ngOnInit() {

debugger
        this.uname = localStorage.getItem("uname");
		this.u_id = Number(localStorage.getItem("Login_User"));
		this.Updated_Serial_No_ = Number(localStorage.getItem("Updated_Serial_Id"));
		this.Notification_Data = [];

        this.uname=localStorage.getItem('uname');
        this.Login_user_Id_=Number(localStorage.getItem('Login_User'));
        this.user_Type=localStorage.getItem('User_Type');
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.listTitles = ROUTES.filter(listTitle => listTitle);
    

const navbar: HTMLElement = this.element.nativeElement;

        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
        debugger
        if(this.user_Type!="1"){
        this.Get_Conversion_Percentage()}

        this.Update_Batch_Completion_Status();



        this.getMessages().subscribe((message: any) => {
	debugger

			if (Number(this.u_id) == message.To_User) {
					
					this.Notification_Count = Number(this.Notification_Count) + 1;
					this.Notification_Temp.Student_Name = message.Student_Name;
					this.Notification_Temp.From_User_Name = message.From_User_Name;
					this.Notification_Temp.Notification_Type_Name =
						message.Notification_Type_Name;
					this.Notification_Temp.Entry_Type = message.Entry_Type;
					this.Notification_Temp.Notification_Id = message.Notification_Id;
					this.Notification_Temp.Student_Id = message.Student_Id;

					this.Notification_Data.unshift(
						Object.assign(
							{},
							{
								Notification_Type_Name: message.Notification_Type_Name,
								From_User_Name: message.From_User_Name,
								Student_Name: message.Student_Name,
								Entry_Type: message.Entry_Type,
								Notification_Id: message.Notification_Id,
								Student_Id: message.Student_Id,
							}
						)
					);
					this.Count_Notification = false;
					if (this.Notification_Count < 4)
						this.Aheight = 52 * (this.Notification_Count + 1);
					else this.Aheight = 52 * 10;
				
			}

		});
		this.Get_All_Notification();
        
    }



    

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            // toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        // this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };
    isMobileMenu() {
        if ($(window).width() > 991) {
          return false;
        }
        return true;
      };
      isDesktopMenu() {
       
        if ($(window).width() < 991) {
          return false;
        }
        return true;
      };
    logout() {
        this.userData.logout();
    
        // localStorage.removeItem("Routes_Temp");
        ROUTES=[];
        Pointer_Table=[];
        localStorage.setItem("Routes_Temp",JSON.stringify(ROUTES));
        localStorage.setItem("Pointer_Temp",JSON.stringify(Pointer_Table));
         localStorage.removeItem("Login_User");        
        this.router.navigateByUrl('/auth/login');
      }
    getView() {

        return ("hai");
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
    getTitle() {
       // return ("hai");
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
Get_Conversion_Percentage(){
debugger
var Is_Date_ =1
    this.Student_Service_.Search_Conversion_Report_loginuser(Is_Date_,moment(this.To_Date_).format("YYYY-MM-DD"),this.Login_user_Id_).subscribe(
        (Row) =>{
            debugger
            var arr = Row[0]

            for(var i=0;arr.length>0;i++)
            {
                // var c_count = arr[i].conversion_count;
                this.c_count ="Conversion Rate : "+ arr[i].conversion_count+ "%";
                // this.c_count=arr[i].conversion_count

                

            for (var i=0;i<arr.length;i++)
            {
                if(arr[0].conversion_count<=25.99)
                {
                    this.conversion_color="Red"
                }
                
            }
        
            for (var i=0;i<arr.length;i++)
            {
                if(arr[0].conversion_count>=26 && arr[i].conversion_count<=45.99)
                {
                    this.conversion_color="Blue"
                }
                
            }
        
            for (var i=0;i<arr.length;i++)
            {
                if(arr[0].conversion_count>=46)
                {
                    this.conversion_color="Green"
                }
                
            }
              

            }

           
        }
    )

}






Reset_Notification_Count() {
    debugger
    this.issLoading = true;
    this.Student_Service_.Reset_Notification_Count(this.u_id).subscribe(
        (Rows) => {
            debugger
            this.Notification_Count = Rows[0][0].Notification_Count_;

            this.issLoading = false;
        },
        (Rows) => {
            this.issLoading = false;
        }
    );
}
Get_Notification1() {
    this.router.navigateByUrl("Notification");
}

Get_Notification() {

    // var resume_status_i,is_date_i;
    // this.Notification_Data=[]
    // this.Reset_Notification_Count();
    // debugger 
    // resume_status_i = 1 ;
    // localStorage.setItem('resume_status_i',resume_status_i);
    // is_date_i = 0 ;
    // localStorage.setItem('is_date_i',is_date_i);



    this.router.navigateByUrl("Student_Job_Report");
}

Get_All_Notification() {
    debugger
    
    var User_Id = 0;
    this.Student_Service_.Get_All_Notification(
        moment(this.Search_ToDate).format("YYYY-MM-DD"),
        User_Id,
        this.u_id
    ).subscribe((Rows) => {
        debugger
         this.Notification_Data = Rows[0];
        this.Total_Counts = Rows[1][0].Counts;
        this.Notification_Count = this.Total_Counts;
        this.Count_Notification = false;
        if (this.Total_Counts < 4) this.Aheight = 52 * (this.Total_Counts + 1);
        else this.Aheight = 52 * 10;
        
    });
}
update_Read_Status(Notification_Id) {
    this.Student_Service_.update_Read_Status(
        this.u_id,
        Notification_Id
    ).subscribe((Rows) => {
        this.Notification_Data = Rows[0];
    });
}


Get_Individual_Notification(Student_Id,Notification_Id) {
    debugger
    
    var User_Id = 0;
    this.Student_Service_.Get_Individual_Notification(       
        Student_Id,
        Notification_Id,
        this.Login_user_Id_
    ).subscribe((Rows) => {
        debugger
        this.Notification_Count = Rows[0][0].Notification_Count_;
        this.issLoading = false;
        this.Get_All_Notification();
    });
}



Notification_Item_Click(Notification_Item) {
    debugger
    if (Notification_Item.Entry_Type == 1 )
     {
        localStorage.setItem("Student_Id", Notification_Item.Student_Id);
        this.Edit_Page_Permission = Get_Page_Permission(63);
        if (this.Edit_Page_Permission == undefined) {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "No permission to view", Type: "2" },
            });
        } else if (this.Edit_Page_Permission.View == true) {
            let currentUrl = this.router.url;
            this.router
                .navigateByUrl("/", { skipLocationChange: true })
                .then(() => {
                    this.router.navigate(["/Student_Job_Report"]);
                });
this.Get_Individual_Notification(Notification_Item.Student_Id,Notification_Item.Notification_Id)

        } else {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "No permission to view", Type: "2" },
            });
        }
    } 


    if (Notification_Item.Entry_Type == 2 )
    {
       localStorage.setItem("Student_Id", Notification_Item.Student_Id);
       this.Edit_Page_Permission = Get_Page_Permission(83);
       if (this.Edit_Page_Permission == undefined) {
           const dialogRef = this.dialogBox.open(DialogBox_Component, {
               panelClass: "Dialogbox-Class",
               data: { Message: "No permission to view", Type: "2" },
           });
       } else if (this.Edit_Page_Permission.View == true) {
           let currentUrl = this.router.url;
           this.router
               .navigateByUrl("/", { skipLocationChange: true })
               .then(() => {
                   this.router.navigate(["/Complaint_Details"]);
               });
this.Get_Individual_Notification(Notification_Item.Student_Id,Notification_Item.Notification_Id)

       } else {
           const dialogRef = this.dialogBox.open(DialogBox_Component, {
               panelClass: "Dialogbox-Class",
               data: { Message: "No permission to view", Type: "2" },
           });
       }
   } 

    // else 
    // if (Notification_Item.Entry_Type == 4)
    //  {
    //     let currentUrl = this.router.url;
    //     this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
    //         this.router.navigate(["/Student_Job_Report"]);
    //     });
    // }
    
    
}
Edit_Lead(Lead_Id, i) {
    localStorage.setItem("Student_Id", Lead_Id);
    this.Edit_Page_Permission = Get_Page_Permission(63);
    if (this.Edit_Page_Permission == undefined) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "No permission to view", Type: "2" },
        });
    } else if (this.Edit_Page_Permission.View == true) {
        let currentUrl = this.router.url;
        this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
            this.router.navigate(["/Student_Job_Report"]);
        });
    }
    // this.router.navigateByUrl("/Student");
    else {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "No permission to view", Type: "2" },
        });
    }
}


submenu_click() {
    this.submenus22 = true;
    this.submenus23 = false;
    this.submenus24 = false;
    this.submenus25 = false;
}
submenu_click1() {
    this.submenus22 = false;
    this.submenus23 = true;
    this.submenus24 = false;
    this.submenus25 = false;
}

submenu_click2() {
    this.submenus22 = false;
    this.submenus23 = false;
    this.submenus24 = true;
    this.submenus25 = false;
}

submenu_click3() {
    this.submenus22 = false;
    this.submenus23 = false;
    this.submenus24 = false;
    this.submenus25 = true;
}



submenuz6() {

    this.submenus22 = false;
    this.submenus22 = false;
    this.submenus23 = false;
    this.submenus24 = false;
    this.submenus25 = false;

}

Update_Batch_Completion_Status()
{
    this.Student_Service_.Update_Batch_Completion_Status(
        this.Login_user_Id_
    ).subscribe((Rows) => {
        this.batch_completion_data = Rows[0];
    });
}


}