export class Receipt_Voucher
{
Receipt_Voucher_Id:number;
Date:Date;
Voucher_No:number;
Bill_No:string;
From_Account_Id:number;
Amount:number;
To_Account_Id:number;
To_Account_Name:string;
Sales_Master_Id:number;
Payment_Mode:number;
User_Id:number;
Address1:string;
Description:string;
Payment_Status:number;
FromAccount_Name:string;
ToAccount_Name: string;
Student_Fees_Installment_Details_Id:number;
Student_Course_Id:number;
Fees_Type_Id:number;
Center_Code: string;
Tax:number;
Tax_Percentage:number;
Course_Id:number;
Search_Date:Date;
Company_Name: string;
Address2: string;
Address3: string;
PinCode: string;
GSTNo: string;
Receipt_Image_File: string;
Receipt_Image_File_Name: string;
Receipt_Image_view:number=0;


constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}




