export interface Spot {
  ScenicSpotID: string;
  ScenicSpotName: string;
  DescriptionDetail: string;
  Description: string;
  Phone: string;
  Address: string;
  ZipCode: string
  TravelInfo: string;
  OpenTime: string;
  Picture: {
    PictureUrl1: string,
    PictureDescription1: string,
    PictureUrl2: string,
    PictureDescription2: string,
    PictureUrl3: string
    PictureDescription3: string,
  };
  MapUrl: string;
  Position: {
    PositionLon: number,
    PositionLat: number,
    GeoHash: string,
  };
  Class1: string;
  Class2: string;
  Class3: string;
  Level: string;
  WebsiteUrl: string;
  ParkingInfo: string;
  ParkingPosition: {
    PositionLon: number,
    PositionLat: number,
    GeoHash: string,
  };
  TicketInfo: string;
  Remarks: string;
  Keyword: string;
  City: string;
  SrcUpdateTime: Date;
  UpdateTime: Date;
}
