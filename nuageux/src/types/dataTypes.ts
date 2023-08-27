export type PharmacyBaseData = {
  id: string;
  name: string;
  zone: string;
  date_created: string;
};

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
