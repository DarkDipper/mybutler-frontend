// ----------------------------------------------------------------------

export type INoteCard = {
  id: string;
  name: string;
  description?: string;
  due: [Date | null, Date | null];
  attachments: string[];
  completed: boolean;
};

export type INoteColumn = {
  id: string;
  name: string;
  cardIds: string[];
};

export type INoteBoard = {
  cards: INoteCard[];
  columns: INoteColumn[];
  columnOrder: string[];
};

// ----------------------------------------------------------------------

export type INoteState = {
  isLoading: boolean;
  error: Error | string | null;
  board: {
    cards: Record<string, INoteCard>;
    columns: Record<string, INoteColumn>;
    columnOrder: string[];
  };
};
