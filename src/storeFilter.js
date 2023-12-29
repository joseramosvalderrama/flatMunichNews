import mongoose from "mongoose";
import "dotenv/config";

const DB_USER = process.env.FLATS_DB_USER;
const DB_PASSWORD = process.env.FLATS_DB_PASSWORD;

const url = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017/flatsDB`;

await mongoose.connect(url);

const flatsSchema = new mongoose.Schema({
  title: String,
  link: String,
  price: String,
});

const Flat = mongoose.model("Flat", flatsSchema);

export const filterAlreadySent = async (flats) => {
  const flatsNew = [];
  for (const flat of flats) {
    const flatFound = await Flat.findOne({ link: flat.link });
    if (flatFound == null) {
      flatsNew.push(flat);
    }
  }
  await Flat.insertMany(flatsNew);
  return flatsNew;
};
