import {Transaction_Student} from './Transaction_Student'
export class Transaction_Master
{
Transaction_Master_Id :number;
Course_Id :number; 
Batch_Id :number; 
User_Id :number;
Employer_Details_Id :number;
Portion_Covered:number;
Date:Date;
Course_Name :string; 
Batch_Name :string; 
Faculty_Name :string; 
Description:string; 
Company_Name:string;
Transaction_Student:Transaction_Student[]
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

