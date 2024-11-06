import {Placed_Student} from './Placed_Student'
export class Placed_Master
{
Placed_Master_Id :number;
Course_Id :number; 
Batch_Id :number; 
User_Id :number;
Employer_Details_Id :number;
Date:Date;
Course_Name :string; 
Batch_Name :string; 
Faculty_Name :string; 
Description:string; 
Company_Name:string;
Placed_Date:Date;
Placed_Student:Placed_Student[]
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

