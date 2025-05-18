import type { Dispatch } from 'react';

export type StoreItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export type ContextType = {
  addToCart: (item: StoreItem) => void;
};

export type NavigationProps = {
  cartCount: number;
};

// export type Location = {
//   id: string;
//   name: string;
//   latitude: number;
//   longitude: number;
//   description?: string;
// };

export type JournalEntry = {
  id: string;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  content: string;
  location: string;
  isFeatured: boolean;
}

//Deinte that I'll send a new entry to MockAPI without an ID so it creates one
export type NewJournalEntry = Omit<JournalEntry, 'id'>;

export type SetJournalToEdit = 
Dispatch<React.SetStateAction<JournalEntry | undefined>>;
