export class Question
{
Question_Id:number;
Question_Name:string;
Option_1:string;
Option_2:string;
Option_3:string;
Option_4:string;
Correct_Answer:string;
Subject_Id:number;
Subject_Name:string;
Course_Id:number;
Course_Name:string;
Semester_Id:number;
Semester_Name:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

