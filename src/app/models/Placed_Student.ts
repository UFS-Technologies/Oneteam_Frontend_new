export class Placed_Student
{
    Placed_Student_Id :number;
    Placed_Master_Id :number;
    Student_Id :number;
    Student_Name :String;
    Check_Box:boolean;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

