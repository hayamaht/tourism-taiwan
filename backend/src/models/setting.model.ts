import { Schema, model } from 'mongoose';

export interface Setting {
  email: string;
  city: string;
  name: string;
}

export const SettingScheme = new Schema<Setting>({
  email: { type: String, required: true, },
  city: { type: String, required: true, },
  name: { type: String, required: true, },
}, {
  timestamps: true,
  toJSON : { virtuals: true },
  toObject: { virtuals: true },
});

export const SettingModel = model<Setting>('setting', SettingScheme);