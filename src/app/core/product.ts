export const categories = ['Квартира', 'Будинок', 'Будівля'] as const;

export interface Product {
    id: string;
    name: string;
    category: string;
    city: string;
    price: number;
    area: number;
    rooms: number;
    description: string;
    image: string;
}

export type ProductInput = Omit<Product, 'id'>;
