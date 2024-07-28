export {};

declare global {
  interface ApiListResponse<T> {
    data: T[];
    meta: {
      page: number;
      per_page: number;
      total_pages: number;
    };
  }
}
