
import { User_Menu_Selection } from './User_Menu_Selection';
export class Employer_Details
{
Employer_Details_Id:number;
Company_Name:string;
Contact_Person:string;
Contact_Number:string;
Email_Id:string;
Company_Location:string;
Website:string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

