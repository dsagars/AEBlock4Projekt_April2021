import { Item } from './item.model';
import { Message } from './message.model';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  photoUrl: string;
  phone?: string;
  addressId?: string;
  itemOffers?: string[];
  itemSearches?: Item[];
  messages?: Message[];
}
