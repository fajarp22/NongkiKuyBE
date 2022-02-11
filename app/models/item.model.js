const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      id: {
        type: Number,
      },
      itemCategoryId: {
        type: Number,
      },
      itemCode: {
        type: String,
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
      kategoriHidangan:{
        type: String
      },
      deskripsiHidangan:{
        type: String
      },
      urlHidangan:{
        type: String
      }
    },
    { timestamps: true }
  );

  schema.plugin(aggregatePaginate);
  const Item = mongoose.model('item', schema);
  return Item;
};
