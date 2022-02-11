module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      id: {
        type: String,
      },
      province: {
        type: String,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  const Province = mongoose.model('province', schema);
  return Province;
};
