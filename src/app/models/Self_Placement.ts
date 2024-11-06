export class Self_Placement
{
Self_Placement_Id :number;
Company_Name :string; 
Designation :string;
Placed_Date :Date; 
Placed_Date_s :Date; 
Student_Course_Id :number;
Student_Id:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

