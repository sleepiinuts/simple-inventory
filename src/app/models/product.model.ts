export interface Product {
  sku: string; // [4 digits brand abbreviation]-[color]-[size 2 digits]-[sex code(M,F,U)]-[running no]
  name: string;
  imageUrl: string;
  departmentJson: { department: string[] };
  price: number;
}
