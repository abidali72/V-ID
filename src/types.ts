export type DrawerType = 'SHOP' | 'COLLECTIONS' | 'JOURNAL' | 'CART' | null;

export interface ShopItem {
  id: string;
  title: string;
  price: number;
  priceFormatted: string;
  tag: string;
}

export interface CollectionItem {
  id: string;
  series: string;
  title: string;
  description: string;
}

export interface JournalItem {
  id: string;
  date: string;
  title: string;
  readTime: string;
}

export interface CartItem {
  item: ShopItem;
  quantity: number;
}

export interface ToastMessage {
  id: string;
  message: string;
}
