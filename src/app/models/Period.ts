
export class Period
{
Period_Id:number;
Period_Name:string;
Period_From:Date;
Period_To:Date;
Duration:string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

