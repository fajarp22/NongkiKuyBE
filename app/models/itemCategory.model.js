module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      categoryName: {
        type: String,
      },
      id: {
        type: Number,
      },
      parentId: {
        type: Number,
      },
      sequence: {
        type: Number,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  const ItemCategory = mongoose.model('itemCategory', schema);
  return ItemCategory;
};
