import mongoose from 'mongoose';

const houseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  photo: { type: String, required: true },
  availableUnits: { type: Number, required: true },
  wifi: { type: Boolean, required: true },
  laundry: { type: Boolean, required: true },
});

export const House = mongoose.model('House', houseSchema);
