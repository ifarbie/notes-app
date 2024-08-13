import NoteArgs from "./NoteArgs";

type UpdateNoteArgs = {
    id: number,
} & NoteArgs;

export default UpdateNoteArgs;