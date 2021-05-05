export interface dayStruct
{
  dayIndex:number;
  data:{
    reminder: reminderData[]
  };
  isInsideMonth: boolean;
}

interface reminderData
{
  reminderText: string,
  city: any,
  color: any,
  createdOn: Date
  // ,
  // dayWeather: any
}
