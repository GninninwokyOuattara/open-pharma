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
