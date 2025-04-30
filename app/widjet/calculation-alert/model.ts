export type BlockItemProps = {
  value: string | number;
  title: string;
};

export type PriceInfoProps = {
  priceEn: number;
  year: number;
  engine: number;
  fuel: string;
  EUR?: number;
  KRW?: number;
};

export type NameLotProps = {
  lot: string;
  auction: string;
  nameCar: string;
};

export type SliderProps = {
  imgSrc: string[];
};
