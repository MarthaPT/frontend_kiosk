export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity?: number; // Optional, since it might not be there initially
  }