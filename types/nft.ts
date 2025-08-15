export interface NftItem {
  id: string;
  name: string;
  image: string;
  description?: string;
  price: number;
  status: 'available' | 'sold';
  owner?: string;
}
