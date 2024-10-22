export class Paginator {
  constructor(
    public pageIndex: number = 0,
    public pageSize: number = 5,
    public total: number = 0
  ) {}
}
