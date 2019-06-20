export class Category {
  private _allCategories = [
    {
      id: 1,
      mainCategory: 'Apparel, Shoes & Accessories',
      subCategories: [
        'Bags & Wallets',
        'Clothing',
        'Eyewear & Optics',
        'Footwear',
        'Watches & Accessories'
      ]
    },
    {
      id: 2,
      mainCategory: 'Beauty',
      subCategories: [
        'Beauty Gifts Sets',
        'Beauty Tools & Accessories',
        'Hair Care Center',
        'Hair Tools & Accessories',
        'Hair Styling Electronics',
        'Makeup',
        'Mirrors',
        'Wigs'
      ]
    },
    {
      id: 3,
      mainCategory: 'Cameras',
      subCategories: [
        'Analogue Camera',
        'Batteries',
        'Cables',
        'Camcorders',
        'Camera Bags',
        'Camera & Camcorder Accessories',
        'Digital Cameras',
        'Digital Photo Frames',
        'Electronic Flashes',
        'Interchangeable Lenses',
        'Memory Cards',
        'Still Films',
        'Screen Protectors',
        'Skins & Decals'
      ]
    },
    {
      id: 3,
      mainCategory: 'Electronics',
      subCategories: []
    },
    {
      id: 4,
      mainCategory: 'Gaming',
      subCategories: []
    },
    {
      id: 5,
      mainCategory: 'Mobile Phones, Tablets & Accessories',
      subCategories: []
    },
    {
      id: 6,
      mainCategory: 'Perfumes & Fragrances',
      subCategories: []
    },
    {
      id: 7,
      mainCategory: 'Tools & Home Improvements',
      subCategories: []
    },
    {
      id: 8,
      mainCategory: 'Health & Personal Care',
      subCategories: []
    },
    {
      id: 9,
      mainCategory: 'Jewelry & Accessories',
      subCategories: []
    },
    {
      id: 10,
      mainCategory: 'Art, Crafts & Collectibles',
      subCategories: []
    },
    {
      id: 11,
      mainCategory: 'Bed & Bath',
      subCategories: []
    },
    {
      id: 12,
      mainCategory: 'Coins, Stamps & Paper money',
      subCategories: []
    },
    {
      id: 13,
      mainCategory: 'Eyewear & Optics',
      subCategories: []
    },
    {
      id: 14,
      mainCategory: 'Grocery, Food & Beverages',
      subCategories: []
    },
    {
      id: 15,
      mainCategory: 'Kitchen Appliances',
      subCategories: []
    },
    {
      id: 16,
      mainCategory: 'Home Appliances',
      subCategories: []
    },
    {
      id: 17,
      mainCategory: 'Music & Movies',
      subCategories: []
    },
    {
      id: 18,
      mainCategory: 'Pet Food & Supplies',
      subCategories: []
    },
    {
      id: 19,
      mainCategory: 'Toys',
      subCategories: []
    }
  ];
  public get allCategories() {
    return this._allCategories;
  }
  public set allCategories(value) {
    this._allCategories = value;
  }
}
