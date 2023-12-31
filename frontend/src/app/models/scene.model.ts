import { Favorite } from "./favorite.model";
import { TourismCat } from "./tourism-cat.model";

interface CanTravel { travelInfo: string; }
interface CanPicture { pictures: Picture[]; }
interface CanLevel { level: string }
interface CanParking { parkingPosition: Position; }
interface CanTicket { ticketInfo: string; }
interface CanRemarks { remarks: string; }
interface CanKeywords { keywords: string[]; }
interface CanGrade { grade: string; }
interface CanFax { fax: string; }
interface CanSpec { spec: string; }
interface CanService { serviceInfo: string; }
interface CanClasses { classes: string[]; }
//interface CanVisit { openTime: string; }

interface Position {
  lat: number;
  lng: number;
  geoHash: string;
}

interface Picture {
  url: string;
  alt: string;
}

interface Period {
  start: Date;
  end: Date;
}

interface GeneralSpot {
  _type: string;
  id: string;
  name: string;
  description: string;
  phone: string;
  address: string;
  position: Position;
  city: string;
  favorite: boolean;
  updatedAt: Date;
  websiteURL?: string;
  mapURL?: string;
  parkingInfo?: string;
}

interface EventScene extends GeneralSpot {
  particpation: string; //活動參與對象
  location: string; //主要活動地點名稱
  organizer: string; //活動主辦單位
  period: Period; //活動時間
  cycle: string; //週期性活動執行時間
  nonCycle: string; //非週期性活動執行時間
  charge: string; // 費用標示
}

interface Scene extends GeneralSpot {
  zipCode: string;
  openTime: string;
}

const toPicturesArray = (pictures: any): Picture[] => {
  let ps: Picture[] = [];

  if (pictures.PictureUrl1) {
    ps.push({
      url: pictures.PictureUrl1,
      alt: pictures.PictureDescription1,
    })
  }

  if (pictures.PictureUrl2) {
    ps.push({
      url: pictures.PictureUrl2,
      alt: pictures.PictureDescription2,
    })
  }

  if (pictures.PictureUrl3) {
    ps.push({
      url: pictures.PictureUrl3,
      alt: pictures.PictureDescription3,
    })
  }
  return ps;
}

const toPosition = (pos: any): Position|undefined => {
  if (!pos || !pos.PositionLat) return undefined;
  return {
    lat: pos.PositionLat,
    lng: pos.PositionLon,
    geoHash: pos.GeoHash
  } as Position;
}

const toKeywordsArray = (strs: string): string[] => {
  if (!strs) return [];
  return strs.split(',');
}

const toClassesArray = (...classes: any): string[] => {
  return classes.filter((v: any) => {
    if (!v) return;
    return v;
  });
}

const toPeriod = (start: string, end: string): Period => {
  return {
    start: new Date(start),
    end: new Date(end)
  }
}

export type ScenicSpot = Scene & CanTravel & CanPicture & CanLevel & CanParking & CanTicket & CanRemarks & CanKeywords & CanClasses ;

export type Restaurant = Scene & CanPicture & CanClasses;

export type Hotel = Scene & CanPicture & CanGrade & CanFax & CanSpec & CanService & CanClasses;

export type Activity = EventScene & CanPicture & CanRemarks & CanClasses & CanTravel;

export type NormalSpot =  ScenicSpot | Restaurant | Hotel;
export type EventSpot = Activity;
export type Spot = NormalSpot | EventSpot;

export const toSpot = (type:TourismCat, item: any): Spot => {
  switch(type) {
    case TourismCat.ScenicSpot: return toScenicSpot(item);
    case TourismCat.Hotel: return toHotel(item);
    case TourismCat.Restaurant: return toRestaurant(item);
    case TourismCat.Activity: return toActivity(item);
    default: return {} as Spot;
  }
}

export const toScenicSpot = (scenicSpot: any): ScenicSpot => {
  return {
    _type: 'ScenicSpot',
    id: scenicSpot.ScenicSpotID,
    name: scenicSpot.ScenicSpotName,
    description: scenicSpot.Description,
    phone: scenicSpot.Phone,
    address: scenicSpot.Address,
    zipCode: scenicSpot.ZipCode,
    travelInfo: scenicSpot.TravelInfo,
    openTime: scenicSpot.OpenTime,
    pictures: toPicturesArray(scenicSpot.Picture),
    position: toPosition(scenicSpot.Position),
    mapURL: scenicSpot.MapUrl,
    classes: toClassesArray(
      scenicSpot.Class1,scenicSpot.Class2,scenicSpot.Class3
    ),
    level: scenicSpot.Level,
    city: scenicSpot.City,
    websiteURL: scenicSpot.WebsiteUrl,
    parkingInfo: scenicSpot.ParkingInfo,
    parkingPosition: toPosition(scenicSpot.ParkingPosition),
    ticketInfo: scenicSpot.TicketInfo,
    remarks: scenicSpot.Remarks,
    keywords: toKeywordsArray(scenicSpot.Keyword),
    updatedAt: new Date(scenicSpot.SrcUpdateTime),
  } as ScenicSpot;
}

export const toRestaurant = (restaurant: any): Restaurant => {
  return {
    _type: 'Restaurant',
    id: restaurant.RestaurantID,
    name: restaurant.RestaurantName,
    description: restaurant.Description,
    address: restaurant.Address,
    zipCode: restaurant.ZipCode,
    phone: restaurant.Phone,
    openTime: restaurant.OpenTime,
    websiteURL: restaurant.WebsiteUrl,
    pictures: toPicturesArray(restaurant.Picture),
    position: toPosition(restaurant.Position),
    classes: toClassesArray(restaurant.Class),
    mapURL: restaurant.MapUrl,
    parkingInfo: restaurant.ParkingInfo,
    city: restaurant.City,
    updatedAt: new Date(restaurant.SrcUpdateTime)
  } as Restaurant;
}

export const toHotel = (hotel: any): Hotel => {
  return {
    _type:'Hotel',
    id: hotel.HotelID,
    name: hotel.HotelName,
    description: hotel.Description,
    grade: hotel.Grade,
    address: hotel.Address,
    zipCode: hotel.ZipCode,
    phone: hotel.Phote,
    fax: hotel.Fax,
    websiteURL: hotel.WebsiteUrl,
    pictures: toPicturesArray(hotel.Picture),
    position: toPosition(hotel.Position),
    classes: toClassesArray(hotel.Class),
    mapURL: hotel.MapUrl,
    spec: hotel.Spec,
    serviceInfo: hotel.ServiceInfo,
    parkingInfo: hotel.ParkingInfo,
    city: hotel.City,
    updatedAt: new Date(hotel.SrcUpdateTime)
  } as Hotel;
}

export const toActivity = (activity: any): Activity => {
  return {
    _type:'Activity',
    id: activity.ActivityID,
    name: activity.ActivityName,
    description: activity.Description,
    particpation: activity.Particpation,
    location: activity.Location,
    address: activity.Address,
    phone: activity.Phone,
    organizer: activity.Organizer,
    period: toPeriod(activity.StartTime, activity.EndTime),
    cycle: activity.Cycle,
    nonCycle: activity.NonCycle,
    websiteURL: activity.WebsiteUrl,
    pictures: toPicturesArray(activity.Picture),
    position: toPosition(activity.Positiion),
    classes: toClassesArray(activity.Class1, activity.Class2),
    mapURL: activity.MapUrl,
    travelInfo: activity.TravelInfo,
    parkingInfo: activity.ParkingInfo,
    charge: activity.Charge,
    remarks: activity.Remarks,
    city: activity.City,
    updatedAt: new Date(activity.SrcUpdateTime)
  } as Activity;
}
