export const laptopData = [
    {
      id: 1,
      name: "Laptop Model 1",
      specs: "Intel Core i7, 16GB RAM, 512GB SSD",
      rating: 4.5,
      reviews: 120,
      salePrice: 699,
      originalPrice: "949",
      saveAmount: "250",
      onSale: true,
      greatDeal: true
    },
    {
      id: 2,
      name: "Laptop Model 2",
      specs: "Intel Core i7, 16GB RAM, 512GB SSD",
      rating: 4.5,
      reviews: 120,
      salePrice: 799,
      originalPrice: "1219",
      saveAmount: "420",
      onSale: true,
      greatDeal: true
    },
    {
      id: 3,
      name: "Laptop Model 3",
      specs: "Intel Core i7, 16GB RAM, 512GB SSD",
      rating: 4.5,
      reviews: 120,
      salePrice: 799,
      originalPrice: "1099",
      saveAmount: "300",
      onSale: true,
      greatDeal: true
    },
    {
      id: 4,
      name: "Laptop Model 4",
      specs: "Intel Core i7, 16GB RAM, 512GB SSD",
      rating: 4.5,
      reviews: 120,
      salePrice: 1299,
      originalPrice: "1500",
      saveAmount: "201",
      onSale: false,
      greatDeal: true
    },
    {
      id: 5,
      name: "Laptop Model 5",
      specs: "Intel Core i7, 16GB RAM, 512GB SSD",
      rating: 4.5,
      reviews: 120,
      salePrice: 999,
      originalPrice: "1399",
      saveAmount: "400",
      onSale: true,
      greatDeal: false
    },
    {
      id: 6,
      name: "Laptop Model 6",
      specs: "Intel Core i7, 16GB RAM, 512GB SSD",
      rating: 4.5,
      reviews: 120,
      salePrice: 1499,
      originalPrice: "1799",
      saveAmount: "300",
      onSale: true,
      greatDeal: true
    }
  ];
  
  
  export type Laptop = {
    id: number | string;
    name: string;
    specs: string;
    rating: number;
    reviews: number;
    salePrice: number;
    originalPrice: string | null;
    saveAmount: string | null;
    onSale: boolean;
    greatDeal: boolean;
  };