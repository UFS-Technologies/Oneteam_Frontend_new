export class Mark_List
{
Mark_List_Id:number;
Subject_Id:number;
Subject_Name:string;
Minimum_Mark:string;
Maximum_Mark:string;
Mark_Obtained:string;
Exam_Status_Id:number;
Exam_Status_Name:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

