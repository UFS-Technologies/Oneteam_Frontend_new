export class Course_Whatsapp
{
    // Mode_Id:number;
    // Mode_Name:string;


     whatsAppBusinessId:string;
    phoneNumberId:string;
    from:string;
    to:string;
    type:string;
    templateName:string;
    templateId:string;
    language:string;
    header:[];
    body:any;
    button:string;
    student:string;
    tostaff:string;
    trainer_name:string;
    batch_start_date:Date;


constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

