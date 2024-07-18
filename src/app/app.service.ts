import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  productList: Product[] = [
    {
      id: 1,
      name: 'Amazing Gadget',
      description: 'This gadget will revolutionize your life!',
      category: 'Electronics',
    },
    {
      id: 2,
      name: 'Cozy Blanket',
      description:
        'Snuggle up in ultimate comfort with this luxurious blanket.',
      category: 'Home Goods',
    },
    {
      id: 3,
      name: 'Thrilling Adventure Novel',
      description: 'Embark on a captivating journey with this gripping novel.',
      category: 'Books',
    },
    {
      id: 4,
      name: 'Stylish Watch',
      description: 'Make a statement with this timeless and elegant watch.',
      category: 'Accessories',
    },
    {
      id: 5,
      name: 'Organic Coffee Blend',
      description:
        'Start your day off right with this delicious and invigorating coffee.',
      category: 'Food & Beverages',
    },
    {
      id: 6,
      name: 'Comfy Sneakers',
      description: 'Walk in comfort and style with these supportive sneakers.',
      category: 'Clothing',
    },
    {
      id: 7,
      name: 'Durable Backpack',
      description:
        'Carry your essentials with ease in this spacious and sturdy backpack.',
      category: 'Travel Gear',
    },
    {
      id: 8,
      name: 'Award-Winning Board Game',
      description:
        'Gather your friends and family for hours of fun with this engaging board game.',
      category: 'Games & Toys',
    },
    {
      id: 9,
      name: 'Soothing Bath Salts',
      description:
        'Relax and unwind with these luxurious and aromatic bath salts.',
      category: 'Beauty & Wellness',
    },
    {
      id: 10,
      name: 'Practical Organizer Set',
      description:
        'Declutter your space and stay organized with this versatile set.',
      category: 'Home Organization',
    },
  ];

  async getProductList():Promise<Product[]> {
    // const dataReturn = Promise.resolve(this.productList)
    // return dataReturn
    return this.productList
  }
}
