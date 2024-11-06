export class Syllabus
{
Syllabus_Id:number;
Day:string;
Topic:string;
Task:string;
Row_No:number;
Heading :string;
// Syllabus_Name:string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

