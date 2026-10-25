export type notes = {
  _id: string;
  title: string;
  typeTodo: string;
  content: string;
  createdAt: Date;
};

export type responseNotes = { notes: Array<notes> };
