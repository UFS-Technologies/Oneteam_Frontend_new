
import { User_Menu_Selection } from './User_Menu_Selection';
export class Company
{
Company_Id:number;
Company_Name:string;
Phone1:string;
Mobile:string;
Address1:string;
Address2:string;
Address3:string;
Email:string;
Company_Location:string;
Website:string;
Logo: string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

