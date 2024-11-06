import { Syllabus } from "./Syllabus";

export class Syllabus_Import
{
Course_Id:number;
Course_Name:string;
User_Id:number;

Syllabus_Import_Details:Syllabus[]
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

