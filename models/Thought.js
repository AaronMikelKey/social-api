import { Schema } from "mongoose";

const ReactionSchema = new Schema({
  reactionId: new Schema.Types.ObjectId(),
  reactionBody: { type: String, required: true, maxLength: 280 },
  username: { type: String, required: true },
  timestamps: {
    createdAt: true,
    updatedAt: false,
    get: (date) => date.toDateString(),
  },
});

const ThoughtSchema = new Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
  timestamps: {
    createdAt: true,
    updatedAt: false,
    get: (date) => date.toDateString(),
  },
  username: { type: String, required: true },
  reactions: [ReactionSchema],
  reactionCount: { type: Number },
});

ThoughtSchema.virtual("reactionCount").get(() => {
  return this.reactions.length;
});

export default ThoughtSchema;
