export interface TableRow {
  data: Record<string, string>;
  kids: Record<string, { records: TableRow[] }>;
}

export interface Path {
  index: number;
  property: string;
}
