export interface News {
  NewsID: string; // NewsID
  Language: string;
  NewsCategory: string;
  Title: string;
  Description: string;
  PublishTime: string;
  StartTime: string;
  EndTime: string;
  SrcUpdateTime: string;
  UpdateTime: string;
}

export enum NewsCategory {
  Massage = '訊息',
  Event = '活動',
  Discount = '優惠',
  Change = '異動'
}
