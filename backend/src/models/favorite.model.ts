import { Schema, model } from 'mongoose';

export interface Favorite {
  id?: string;
  email: string;
  tourismCategory: string;
  tourismId: string;
}

export const FavoriteScheme = new Schema<Favorite>({
  email: { type: String, required: true, },
  tourismCategory: { type: String, required: true },
  tourismId: { type: String, required: true },
}, {
  timestamps: true,
  toJSON : { virtuals: true },
  toObject: { virtuals: true },
});

export const FavoriteModel = model<Favorite>('favorite', FavoriteScheme);