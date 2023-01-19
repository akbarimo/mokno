import mongoose, { Schema } from 'mongoose';

const dataSchema = new Schema({
  queryCount: { type: Number, required: true },
  queries: [String],
});
