const db = require('../models/index.js');

const PeranUser = db.peranUser;

module.exports.create = (req, res) => {
  const peranUser = new PeranUser(req.body);
  peranUser
    .save(peranUser)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Terjadi kesalahan pada saat pembuatan peran user.',
      });
    });
};

module.exports.findAll = (req, res) => {
  PeranUser.find({})
    .populate('kode_cabang')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Terjadi kesalahan pada saat menampilkan peran user.',
      });
    });
};

module.exports.findOne = (req, res) => {
  const { id } = req.params;
  PeranUser.findById(id)
    .populate('kode_cabang')
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Data peran user tidak ditemukan.' });
      else res.send(data);
    })
    .catch(() => {
      res
        .status(500)
        .send({ message: 'Terjadi kesalahan pada pencarian data peran user.' });
    });
};

module.exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Data peran user tidak boleh kosong!',
    });
  } else {
    const { id } = req.params;
    PeranUser.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: 'Data peran user tidak dapat diperbarui.',
          });
        } else res.send({ message: 'Data peran user sukses diperbarui.' });
      })
      .catch(() => {
        res.status(500).send({
          message: 'Terjadi kesalahan saat memperbarui data peran user.',
        });
      });
  }
};

module.exports.delete = (req, res) => {
  const { id } = req.params;
  PeranUser.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: 'Data peran user tidak dapat dihapus.',
        });
      } else {
        res.send({
          message: 'Data peran user sukses dihapus.',
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Terjadi kesalahan saat menghapus data peran user.',
      });
    });
};
