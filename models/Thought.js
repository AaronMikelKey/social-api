import { Schema } from "mongoose";

const ReactionSchema = new Schema(
  {
    reactionId: new Schema.Types.ObjectId(),
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: true,
      get: (date) => date.toDateString(),
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    username: { type: String, required: true },
    reactions: [ReactionSchema],
    createdAt: {
      type: Date,
      get: (date) => date.toDateString(),
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

ReactionSchema.set("toJSON", { getters: true, virtuals: true });
ThoughtSchema.set("toJSON", { getters: true, virtuals: true });

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

export default ThoughtSchema;
