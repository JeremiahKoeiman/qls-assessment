export interface ApiResult<T> {
  meta: ApiMeta;
  data: T[];
  errors?: string;
  pagination: ApiPagination;
}

export interface ApiMeta {
  code: number;
}

export interface ApiPagination {
  page: number;
  limit: number;
  count: number;
  pageCount: number;
  nextPage: boolean;
  prevPage: boolean;
}
