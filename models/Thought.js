import { Schema } from "mongoose";

const ReactionSchema = new Schema({
  reactionId: new Schema.Types.ObjectId(),
  reactionBody: { type: String, required: true, maxLength: 280 },
  username: { type: String, required: true },
});

const ThoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    username: { type: String, required: true },
    reactions: [ReactionSchema],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
      get: (date) => date.toDateString(),
    },
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

ThoughtSchema.virtual("_createdAt").get(function () {
  return this.timestamps.createdAt.toDateString();
});

export default ThoughtSchema;
