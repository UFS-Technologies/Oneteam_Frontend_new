export class University
{
University_Id:number;
University_Name:string;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Pincode:string;
Phone:string;
Mobile:string;
Email:string;
User_Id:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

