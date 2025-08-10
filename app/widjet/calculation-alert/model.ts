export type BlockItemProps = {
  value: string | number;
  title: string;
};

export type PriceInfoProps = {
  priceEn: number;
  year: string;
  engine: number;
  fuel: string;
  fraht: number;
  broker: number;
  k_krw: number;
  EUR: number;
  KRW: number;
  copyLink: string;
  make: string;
  model: string;
};

export type NameLotProps = {
  lot: string;
  auction: string;
  nameCar: string;
};

export type SliderProps = {
  imgSrc: string[];
};
