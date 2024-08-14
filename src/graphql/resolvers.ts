import NoteArgs from '@/types/NoteArgs';
import prisma from '@/lib/prisma';
import UpdateNoteArgs from '@/types/UpdateNoteArgs';
import { nanoid } from 'nanoid';

export const resolvers = {
  Query: {
    notes: async () => await prisma.note.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    }),
    note: async (_: unknown, args: { id: string }) => await prisma.note.findUnique({ where: { id: args.id } }),
  },

  Mutation: {
    deleteNote: async (_: unknown, args: { id: string }) => {
      try {
        await prisma.note.delete({ where: { id: args.id } });
        return true;
      } catch (error) {
        return false;
      }
    },
    addNote: async (_: unknown, args: NoteArgs) => {
      const id = `note-${nanoid(16)}`
      const data = {
        id,
        ...args.note,
        createdAt: new Date().toISOString(),
      };
      const note = await prisma.note.create({ data });
      return note;
    },
    updateNote: async (_: unknown, args: UpdateNoteArgs) => {
      try {
        const data = await prisma.note.update({
          where: {
            id: args.id,
          },
          data: {
            ...args.note,
          }
        })
        return data;
      } catch (error) {
        console.log(error);
      }
    
    }
  },
};
