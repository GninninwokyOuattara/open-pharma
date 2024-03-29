export type PharmacyBaseData = {
  id: string;
  name: string;
  zone: string;
  date_created: string;
};

export interface PharmacyData extends Omit<PharmacyBaseData, "date_created"> {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  active: boolean;
  open: boolean;
}

export type UserPharmacyData = Omit<
  PharmacyData,
  "active" | "date_created" | "zone"
>;

export interface PharmacyDataDetailed extends PharmacyData {
  director: string;
  addresses: string[];
  phones: string[];
  description: string;
}

export type PharmacyDataDetailedForMofication = Omit<
  PharmacyDataDetailed,
  "open"
>;

export interface IPanigation<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type ITablePagination = Omit<IPanigation<any>, "results"> & {
  page: number;
  pageLength: number;
  setPageFn: React.Dispatch<React.SetStateAction<number>>;
};
