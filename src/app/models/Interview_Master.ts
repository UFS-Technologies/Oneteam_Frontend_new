import {Interview_Student} from './Interview_Student'
export class Interview_Master
{
Interview_Master_Id :number;
Course_Id :number; 
Batch_Id :number; 
User_Id :number;
Employer_Details_Id :number;
Date:Date;
Course_Name :string; 
Batch_Name :string; 
Faculty_Name :string; 
Company_Name:string;
Description:string; 
Interview_Date:Date;
Interview_Student:Interview_Student[]
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

