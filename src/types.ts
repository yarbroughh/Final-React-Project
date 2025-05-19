//Created separate file to keep types organized

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

export type Preserve = {
  id: string;
  name: string;
  url: string;
  image: string;
};

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

//Define that I'll send a new entry to MockAPI without an ID so it creates one
export type NewJournalEntry = Omit<JournalEntry, 'id'>;

export type SetJournalToEdit = 
Dispatch<React.SetStateAction<JournalEntry | undefined>>;
