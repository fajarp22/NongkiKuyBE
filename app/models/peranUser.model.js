module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      peran: {
        type: String,
        unique: true,
        uppercase: true,
      },
      deskripsi: {
        type: String,
        required: true,
      },
      akses: [
        {
          nama_akses: {
            type: String,
          },
          create: {
            type: Boolean,
          },
          read: {
            type: Boolean,
          },
          update: {
            type: Boolean,
          },
          delete: {
            type: Boolean,
          },
          limited: {
            type: Boolean,
          },
          showMenu: {
            type: Boolean,
          },
        },
      ],
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  const User = mongoose.model('peranUser', schema);
  return User;
};
