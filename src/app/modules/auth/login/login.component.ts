import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../../../helpers/custom-validators';
import { UserData } from '../../../services/user-data';
import { Route, Router } from '@angular/router';
import { MatSpinner } from '@angular/material';
import { ROUTES,Get_Page_Permission,Set_Page_Permission } from '../../../components/sidebar/sidebar.component'
import { DialogBox_Component } from '../../../modules/admin/DialogBox/DialogBox.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import { Menu_Service } from '../../../services/Menu.service';
export var Pointer_Table: number[] = [
]

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  Login_Id:string;
 // menuItems: any[];
 color = 'primary';
 mode = 'indeterminate';
 value = 50;
 issLoading: boolean;
 Notification_count:number;
  Pointer_Table=new Array(200);  
  
  constructor(
    public fb: FormBuilder, public Menu_Service_: Menu_Service, public userService: UserData, public router: Router,public dialogBox: MatDialog
  ) {
    this.initForm();
  }
  initForm() {
    this.loginForm = this.fb.group({
      userName: ['', CustomValidators.compose([CustomValidators.required])],
      password: ['', CustomValidators.compose([Validators.required])]
    })
     
  }
  async login() {
    if (this.loginForm.valid) {
      this.issLoading = true;
      debugger
      const success = await this.userService.login(this.loginForm.value);
      if (success) 
      {
        debugger
        this.issLoading = false;
       // this.router.navigateByUrl('HomePage');
        this.Login_Id=localStorage.getItem('Login_User');
        ROUTES.length = 0;
 
        Pointer_Table=new Array(200);  
        for(var i=0;i<Pointer_Table.length;i++)
        Pointer_Table[i]=-1;
        this.Menu_Service_.Get_Menu_Permission(this.Login_Id).subscribe( Rows => 
          {
            
        //   console.log(Rows)
            if(Rows!=null)
              {
                var Menus;
                Menus=Rows[0];

               
                Rows=[];
    for(var i=0;i<Menus.length;i++)
    {

      debugger
      if(Menus[i].Menu_Id==1)
      this.Push_Menu({ path: '/Users', title: 'Users', icon: 'unarchive', class: '',Menu_Id:Menus[i].Menu_Id,'View':Menus[i].VIew_All, Save:Menus[i].Menu_Save ,Edit:Menus[i].Menu_Edit,Delete:Menus[i].Menu_Delete,Menu_Type:Menus[i].Menu_Type});
      else if (Menus[i].Menu_Id == 2)
        this.Push_Menu({ path: '/Category', title: 'Category', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 3)
        this.Push_Menu({ path: '/Course_Type', title: 'Course Type', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 4)
        this.Push_Menu({ path: '/Fees_Type', title: 'Fees', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 5)
        this.Push_Menu({ path: '/Subject', title: 'Syllabus', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 6)
        this.Push_Menu({ path: '/Part', title: 'Part', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 7)
        this.Push_Menu({ path: '/User_Type', title: 'User Type', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 8)
        this.Push_Menu({ path: '/User_Role', title: 'User Role', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 9)
        this.Push_Menu({ path: '/Status', title: 'Status', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 10)
        this.Push_Menu({ path: '/Qualification', title: 'Qualification', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 11)
        this.Push_Menu({ path: '/Specialization', title: 'Specialization', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 12)
        this.Push_Menu({ path: '/Course', title: 'Course', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 13)
        this.Push_Menu({ path: '/University', title: 'University', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 14)
        this.Push_Menu({ path: '/Student', title: 'Student', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 15)
        this.Push_Menu({ path: '/Functionl_Area', title: 'Functionl Area', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 16)
        this.Push_Menu({ path: '/Experience', title: 'Experience', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 17)
        this.Push_Menu({ path: '/Registration', title: 'Registration', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 18)
        this.Push_Menu({ path: '/Remove_Registration', title: 'Remove Registration', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 19)
        this.Push_Menu({ path: '/Course_Tab', title: 'Course Tab', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 20)
        this.Push_Menu({ path: '/Fees_tab', title: 'Fees Tab', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 21)
        this.Push_Menu({ path: '/Mark_tab', title: 'Mark Tab', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 22)
      this.Push_Menu({ path: '/Question_Import', title: 'Question Import', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 23)
        this.Push_Menu({ path: '/Agent', title: 'Branch', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 24)
        this.Push_Menu({ path: '/Agent_Registration', title: 'Agent Registration', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 25)
        this.Push_Menu({ path: '/Agent_Remove_Registration', title: 'Agent Remove Registration', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 26)
        this.Push_Menu({ path: '/Fees_Receipt_Tab', title: 'Fees Receipt Tab ', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 27)
        this.Push_Menu({ path: '/Candidate', title: 'Candidate', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 28)
        this.Push_Menu({ path: '/Candidate_Registration', title: 'Candidate Registration', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      else if (Menus[i].Menu_Id == 29)
        this.Push_Menu({ path: '/Candidate_Remove_Registration', title: 'Candidate Remove Registration', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 30)
        this.Push_Menu({ path: '/Job_Posting', title: 'Published Jobs', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 31)
        this.Push_Menu({ path: '/Applied_Candidate', title: 'Applied Candidate', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 32)
        this.Push_Menu({ path: '/Batch', title: 'Batch', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 33)
        this.Push_Menu({ path: '/Attendance', title: 'Attendance', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 34)
        this.Push_Menu({ path: '/Attendance_Report', title: 'Attendance Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 35)
        this.Push_Menu({ path: '/Fees_Outstanding_Report', title: 'Fees Outstanding Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 36)
        this.Push_Menu({ path: '/Fees_Collection_Report', title: 'Fees Collection Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 37)
        this.Push_Menu({ path: '/Resume', title: 'Resume Sending', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 38)
        this.Push_Menu({ path: '/Interview', title: 'Interview Scheduling', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 39)
        this.Push_Menu({ path: '/Placed', title: 'Placement', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 40)
        this.Push_Menu({ path: '/Placed_Report', title: 'Placement Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 41)
        this.Push_Menu({ path: '/Dashboard', title: 'Dashboard ', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 42)
        this.Push_Menu({ path: '/Registration_Report', title: 'Registration Report ', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 43)
        this.Push_Menu({ path: '/Resume_Report', title: 'Resume Sending Report ', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 44)
        this.Push_Menu({ path: '/Interview_Report', title: 'Interview Scheduling Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 45)
        this.Push_Menu({ path: '/Admission_Report', title: 'Admission Report ', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 46)
        this.Push_Menu({ path: '/Enquiry_Source', title: 'Enquiry Source ', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 47)
        this.Push_Menu({ path: '/Lead_Report', title: 'Lead Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 48)
        this.Push_Menu({ path: '/Employer_Details', title: 'Employer Details', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type }); 
        else if (Menus[i].Menu_Id == 49)
        this.Push_Menu({ path: '/State', title: 'State', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type }); 
        else if (Menus[i].Menu_Id == 50)
        this.Push_Menu({ path: '/Export  Permission', title: 'Export  Permission', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type }); 
        else if (Menus[i].Menu_Id == 51)
        this.Push_Menu({ path: '/Pending_FollowUp', title: 'Pending FollowUp', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type }); 
        else if (Menus[i].Menu_Id == 53)
        this.Push_Menu({ path: '/Course_Selection', title: 'Course Selection', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type }); 
        else if (Menus[i].Menu_Id == 54)
        this.Push_Menu({ path: '/Fees_Due_Report', title: 'Fees Due Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 55)
        this.Push_Menu({ path: '/Student_Import', title: 'Student Import', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 56)
        this.Push_Menu({ path: '/Company', title: 'Company', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 57)
        this.Push_Menu({ path: '/Batch_Report', title: 'Batch Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 58)
        this.Push_Menu({ path: '/Fees edit permission', title: 'Fees edit permission', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 59)
        this.Push_Menu({ path: '/Edit Student Course Details', title: 'Edit Student Course Details', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 60)
        this.Push_Menu({ path: '/DropOut_Report', title: 'Dropout Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 61)
        this.Push_Menu({ path: '/Student_Data', title: 'Student Data', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 62)
        this.Push_Menu({ path: '/JobPosting_Report', title: 'Application Management', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 63)
        this.Push_Menu({ path: '/Student_Job_Report', title: 'Student Management', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 64)
        this.Push_Menu({ path: '/Enable_Notification', title: 'Enable Notification', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 65)
        this.Push_Menu({ path: '/Disable_Notification', title: 'Disable Notification', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      
        else if (Menus[i].Menu_Id == 66)
        this.Push_Menu({ path: '/Blacklist', title: 'Blacklist', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 67)
        this.Push_Menu({ path: '/Move_From_Blacklist', title: 'Move From Blacklist', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
      
        else if (Menus[i].Menu_Id == 68)
        this.Push_Menu({ path: '/Active', title: 'Active', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 69)
        this.Push_Menu({ path: '/Deactive', title: 'Deactive', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 70)
        this.Push_Menu({ path: '/Jobposting_Detailed_Report', title: 'Job Posting Detailed Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 71)
        this.Push_Menu({ path: '/Start_Date_Edit_Permission', title: 'Start Date Edit Permission', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 72)
        this.Push_Menu({ path: '/End_Date_Edit_Permission', title: 'End Date Edit Permission', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 73)
        this.Push_Menu({ path: '/Job_Rejections', title: 'Job Rejections', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 74)
        this.Push_Menu({ path: '/Conversion_Report', title: 'Conversion Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 75)
        this.Push_Menu({ path: '/Active_Batch_Report', title: 'Active Batch Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 76)
        this.Push_Menu({ path: '/Application_Settings', title: ' Application Settings', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 77)
        this.Push_Menu({ path: '/Company_List_Report', title: ' Company List Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 78)
        this.Push_Menu({ path: '/Attendance_Syllabus_Edit', title: ' Attendance Syllabus Edit', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 79)
        this.Push_Menu({ path: '/Syllabus_Coverage', title: 'Syllabus Coverage', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 80)
        this.Push_Menu({ path: '/Batch_Completion', title: 'Batch Completion', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 81)
        this.Push_Menu({ path: '/Interview_Scheduled_Report', title: 'Interview Scheduled Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 82)
        this.Push_Menu({ path: '/Placement_Report_New', title: 'Placement Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 83)
        this.Push_Menu({ path: '/Complaint_Details', title: 'Support', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 84)
        this.Push_Menu({ path: '/Employer_Followup', title: 'Job Posting', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 85)
        this.Push_Menu({ path: '/Employer_Status', title: 'Employer Status', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 86)
        this.Push_Menu({ path: '/Vacancy_Source', title: 'Vacancy Source', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 87)
        this.Push_Menu({ path: '/Syllabus_Import', title: 'Syllabus Import', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 88)
        this.Push_Menu({ path: '/Job_Opening_Pending_Followups_Report', title: 'Job Opening Pending Followups Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 89)
        this.Push_Menu({ path: '/Period', title: 'Period', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 91)
        this.Push_Menu({ path: '/Agreement_Details', title: 'Agreement Details', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 92)
        this.Push_Menu({ path: '/Recruitment_Drives', title: 'Recruitment Drives', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
     
        else if (Menus[i].Menu_Id == 93)
          this.Push_Menu({ path: '/Followup_Report', title: 'Followup Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        
        else if (Menus[i].Menu_Id == 94)
          this.Push_Menu({ path: '/Final_Exampage', title: 'Final Exampage', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
       
        else if (Menus[i].Menu_Id == 95)
          this.Push_Menu({ path: '/Exam_Creation', title: 'Exam Creation', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 96)
          this.Push_Menu({ path: '/Level_Details_Status', title: 'Level Details Status', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 97)
          this.Push_Menu({ path: '/Score_Card_Report', title: 'Score Card Report', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 98)
          this.Push_Menu({ path: '/Batch_Attendance', title: 'Batch Attendance', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 99)
          this.Push_Menu({ path: '/Level_Score_Details', title: 'Level Score Details', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        else if (Menus[i].Menu_Id == 100)
          this.Push_Menu({ path: '/Score_Card_Report', title: 'Certificate Download Permission', icon: 'unarchive', class: '', Menu_Id: Menus[i].Menu_Id, 'View': Menus[i].VIew_All, Save: Menus[i].Menu_Save, Edit: Menus[i].Menu_Edit, Delete: Menus[i].Menu_Delete, Menu_Type: Menus[i].Menu_Type });
        
     
      }
     
localStorage.setItem("Routes_Temp",JSON.stringify(ROUTES));
localStorage.setItem("Pointer_Temp",JSON.stringify(Pointer_Table));
              this.router.navigateByUrl('Dashboard');
  }
},
Rows => { 
     
});
  }
 else
  {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Inavlid User Name/Password', Type:"3"}});
  }
}
}
  Push_Menu(Menu_Data)
  {
    ROUTES.push(Menu_Data);
    Pointer_Table[Menu_Data.Menu_Id-1] = ROUTES.length-1;
  }
  ngOnInit() {
  }
}
