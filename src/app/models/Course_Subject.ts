export class Course_Subject
{
Course_Subject_Id:number;
Course_Id:number;
Part_Id:number;
Part_Name:string;
Subject_Id:number;
Subject_Name:string;
Minimum_Mark:string;
Maximum_Mark:string;
Online_Exam_Status:number;
Online_Exam_Status_Name:string
No_of_Question:string;
Exam_Duration:string;

Task :string; 
Day :string;
Heading :string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

