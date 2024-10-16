export class Product {
  constructor(
    public sku: string, // [4 digits brand abbreviation]-[color]-[size 2 digits]-[sex code(M,F,U)]-[running no]
    public name: string,
    public imageUrl: string,
    public department: string[],
    public price: number
  ) {}
}
