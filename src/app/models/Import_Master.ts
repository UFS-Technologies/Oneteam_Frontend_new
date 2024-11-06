
import { Syllabus_Import } from '../models/Syllabus_Import';
export class Import_Master
{

 Import_Master_Id:number;
 Entry_Date:Date;


// Description1:string;
// User_Id:string;
// Store_Id:number;

Course_Import:Syllabus_Import[]
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

