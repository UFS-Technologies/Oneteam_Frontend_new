export class Student
{
Student_Id:number;
Student_Name:string;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Pincode:string;
Phone:string;
Mobile:string;
Whatsapp:string;
DOB:string;
Gender:number;
State_Id:number;
District_Id:number;
District_Name:string;
Course_Id:number;
Course_Name:string;
Qualification_Id:number;
Email:string;
Alternative_Email:string;
Passport_No:string;
Passport_Expiry:string;
User_Name:string;
Password:string;
Photo:string;
Resume:string;
User_Id:number;
Registration_No:string;
Role_No:string;
Enquiry_Source:number;
Enquiry_Source_Name:string;

Student_Followup_Id:number;
Entry_Date:Date;
Next_FollowUp_Date:Date;
// Next_FollowUp_Date:string;
FollowUp_Difference:number;
Status:number;
Status_Name:string;
By_User_Id:number;
To_User_Id:number;
By_User_Name:string;
To_User_Name:string;
Remark:string;
Remark_Id:number;
FollowUp_Type:number;
FollowUP_Time:string;
Actual_FollowUp_Date:Date;
Qualification_Name:string;
tp:number;
RowNo:number;
Count: number;
User_Status:number;
Registered_By :number;
Registered_On:Date;
Registered:boolean;
Duplicate_Found_:number;
Duplicate_Student_Name_:string;
Duplicate_User_:string;
College_Name:string;

Check_Box_View: boolean;
Delete_Data_Details: Student[];
Student_Selected_Details: Student[];
Branch: number;
Department: number;
Branch_Name: string;
Department_Name: string;
Student_Status:boolean;

Full_Transfer_Value: number;
Image_ResumeFilename:string;

Activate_Status:boolean;
Blacklist_Status:boolean;
Fees_Status:boolean;

Year_Of_Pass_Id : number; 
Year_Of_Passing :string;
Id_Proof_Id : number; 
Id_Proof_Name :string;
Id_Proof_No : string; 
Id_Proof_FileName :string;
Id_Proof_File:string; 

Resume_Status_Id : number;  
Resume_Status_Name :string; 

Actual_Next_FollowUp_Date: Date;
RowNo_sort: number;

Followupcount: number;
Followupcount_Name:string;


Entry_Level :number; 
Personality_and_Professionalism_Entrylevel :number; 
Mid_Level :number; 
Personality_and_Professionalism_Midlevel :number; 
Exit_Level :number; 
Personality_and_Professionalism_Exitlevel :number; 
Project_Score :number; 

Batch_Name:string;
Faculty:string;
Start_Date:string;
End_Date:string;
Final_Score:any;
Grade:any;
Sum_Final_Score:any;
attendance_percentage:any;

Parent_spouse_name:string;
Parent_spouse_contact_no:string;
Parent_spouse_idcard:string;


constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

