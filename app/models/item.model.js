const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      id: {
        type: Number,
        default: 1,
      },
      itemCategoryId: {
        type: Number,
        default: 6,
      },
      itemCode: {
        type: String,
        default: '1',
      },
      itemName: {
        type: String,
      },
      itemPrice: {
        type: Number,
      },
      modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      modifiedAt: {
        type: Date,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      kategoriHidangan: {
        type: String,
      },
      deskripsiHidangan: {
        type: String,
      },
      urlHidangan: {
        type: String,
      },
      restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'nasabah',
      },
    },
    { timestamps: true }
  );

  schema.plugin(aggregatePaginate);
  const Item = mongoose.model('item', schema);
  return Item;
};
