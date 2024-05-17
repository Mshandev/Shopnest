const mongoose=require('mongoose');
const {Schema}=mongoose;

const contactSchema = new Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required:true },
      message: { type: String, required:true },
    },
    { timestamps: true }
  );
  
  // To transform _id to id

const virtual = contactSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
contactSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Contact = mongoose.model("Contact", contactSchema);