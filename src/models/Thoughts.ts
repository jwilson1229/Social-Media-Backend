import { Schema, model, Types, Document } from "mongoose";
import reactionSchema, { IReaction } from "./Reaction"; 

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaction[];
    reactionCount: number;
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);


thoughtSchema.virtual("reactionCount").get(function (this: IThought) {
    return this.reactions.length;
});

const Thought = model<IThought>("Thought", thoughtSchema);

export default Thought;
