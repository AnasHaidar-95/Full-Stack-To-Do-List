import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  content: {
    type: String,
    require: true
  },
  finished: {
    type: Boolean,
    require:true
  }
});

export default mongoose.model("Lists", listSchema);
