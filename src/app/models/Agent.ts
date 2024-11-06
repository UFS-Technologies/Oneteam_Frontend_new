export class Agent
{
Agent_Id:number;
Agent_Name:string; 
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Pincode:string;
Phone:string;
Mobile:string;
Whatsapp:string;
DOB:Date;
Gender:number;
Email:string;
Alternative_Email:string;
// Passport_No:string;
// Passport_Expiry:string;
User_Name:string;
Password:string;
Photo:string;
Photo_File_Name :string;
GSTIN:string;
Category_Id:number;
Agent_Fees:number;
Commission:number;
User_Id:number;
Comm_Address1:string;
Comm_Address2:string;
Comm_Address3:string;
Comm_Address4:string;
Comm_Pincode:string;
Comm_Mobile:string;
Center_Name:string;
Center_Code:string; 
Is_Registered:boolean;
// Expirty_Date:Date;
// Approval_date:Date;
// Verification_Code:string;
// Reg_No:string;
// Approval_Status:number;
// Comm_Address1:string;
// Comm_Address2:string; 
// Comm_Address3:string; 
// Comm_Address4:string; 
// Comm_Pincode:string; 
// Comm_Mobile:string;
// Center_Name:string;

Client_Accounts_Id:number;
// Amount:number;
// Mode:string;
// Branch:string;
// Description:string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}