import NoteInputArgs from '@/types/NoteInputArgs';
import prisma from '@/lib/prisma';

export const resolvers = {
  Query: {
    notes: async () => await prisma.note.findMany(),
    note: async (_: unknown, args: { id: number }) => await prisma.note.findUnique({ where: { id: args.id } }),
  },

  Mutation: {
    deleteNote: async (_: unknown, args: { id: number }) => {
      const note = await prisma.note.delete({ where: { id: args.id } });
      return note;
    },
    addNote: async (_: unknown, args: NoteInputArgs) => {
      const data = {
        ...args.note,
        createdAt: new Date().toISOString(),
      }
      const note = await prisma.note.create({ data });
      return note;
    },
  },
};
