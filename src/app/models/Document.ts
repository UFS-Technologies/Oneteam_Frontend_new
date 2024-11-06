export class Document
{
Document_Id:number;
Student_Id:number;
Document_Name:string;
Files:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

