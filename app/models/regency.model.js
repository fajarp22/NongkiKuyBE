module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      id: {
        type: String,
      },
      id_province: {
        type: String,
      },
      regency: {
        type: String,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  const Regency = mongoose.model('regency', schema);
  return Regency;
};
