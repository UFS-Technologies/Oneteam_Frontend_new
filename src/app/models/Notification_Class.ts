export class Notification_Class {
	Notification_Id: number;
	From_User: number;
	From_User_Name: string;
	To_User: number;
	To_User_Name: string;
	Status_Id: number;
	Status_Name: string;
	View_Status: number;
	Remark: string;
	Entry_Date: Date;
	Student_Id: number;
	Student_Name: String;
	Read_Status: number;
	Entry_Type: number;
	Description: String;
	Data: number;
	Notification_Type_Name: string;
	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
