
export class Level_Details_Status_Master
{


    Entry_Level  : number; 
    Personality_and_Professionalism_Entrylevel  : number; 
    Mid_Level  : number; 
    Personality_and_Professionalism_Midlevel  : number; 
    Exit_Level  : number; 
    Personality_and_Professionalism_Exitlevel  : number; 
    Project_Score  : number; 
    Project_Url :string; 
    Student_Course_Id:number;
    Student_Id:number;
  
    Entry_Level_Add_UserId :number; 
    Mid_Level_Add_UserId :number; 
    Exit_Level_Add_UserId :number; 
    Project_Add_UserId :number;


constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

