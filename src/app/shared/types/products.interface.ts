// export interface IProduct {
//   id: number;
//   title: "string";
//   price: number;
//   description: string;
//   category: string;
//   image: string;
//   rating: IProductRating;
// }
// interface IProductRating {
//   rate: number;
//   count: number;
// }

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: IProductCategory;
}

export interface IProductCategory {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface IProd {
  audio: null | string;
  description: string;
  gameplayTags: string[];
  id: string;
  images: IProdImage;
  name: string;
  rarity: IProdRarity;
  series: IProdSeries;
  set: null;
  type: IProdType;
  video: null;
}
interface IProdImage {
  background: string;
  featured: string;
  full_background: string;
  icon: string;
  icon_background: string;
}
interface IProdRarity {
  id: string;
  name: string;
}
interface IProdSeries {
  id: string;
  name: string;
}
interface IProdType {
  id: string;
  name: string;
}

//
export interface IData {
  result: boolean;
  fullShop: boolean;
  lastUpdate: {
    data: string;
    uid: string;
  };
  currentRotation?: {};
  nextRotation: null;
  carousel: null;
  specialOfferVideo: null;
  customBackground: null;
  shop: IShop[];
}
interface IShop {
  mainId: string;
  displayName: string;
  displayDescription: string;
  displayType: string;
  mainType: string;
  offerId: string;
  displayAssets: [
    {
      displayAsset: string;
      materialInstance: string;
      url: string;
      flipbook: null;
      background_texture: string;
      background: string;
      full_background: string;
    }
  ];
  firstReleaseDate: string;
  previousReleaseDate: null;
  giftAllowed: boolean;
  buyAllowed: boolean;
  price: {
    regularPrice: number;
    finalPrice: number;
    floorPrice: number;
  };
  rarity: {
    id: string;
    name: string;
  };
  series: {
    id: string;
    name: string;
  };
  banner: {
    id: string;
    name: string;
    intensity: string;
  };
  offerTag: null;
  granted: IProd[];
  priority: number;
  section: {
    id: string;
    name: string;
    landingPriority: number;
  };
  groupIndex: 0;
  storeName: string;
  tileSize: string;
  categories: string[];
}
