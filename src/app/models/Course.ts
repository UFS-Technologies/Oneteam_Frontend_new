

import { Course_Fees } from '../models/Course_Fees';
import { Course_Subject } from '../models/Course_Subject';
import { Study_Materials } from '../models/Study_Materials';
export class Course
{
Course_Id:number;
Course_Name:string;
Course_Type_Id:number;
Course_Type_Name:string;
Duration:string;
Agent_Amount:number;
User_Id:number;
Total_Fees:number;
Noof_Installment:number;
Fees_Type_Id:number;
Course_Fees:Course_Fees[];
Course_Subject:Course_Subject[];
Study_Materials:Study_Materials[];
Is_Check:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

