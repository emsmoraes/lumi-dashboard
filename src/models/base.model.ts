export interface DateTime {
  created_at: string;
  updated_at: string;
}
export interface BaseUuid extends DateTime {
  id: string;
}

export interface BaseInt extends DateTime {
  id: number;
}
