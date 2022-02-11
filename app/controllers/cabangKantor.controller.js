const db = require('../models/index.js');

const CabangKantor = db.cabangKantor;
const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

module.exports.create = (req, res) => {
  const cabangKantor = new CabangKantor({
    kode_cabang: req.body.kode_cabang,
    nama_cabang: req.body.nama_cabang,
    alamat_cabang: req.body.alamat_cabang,
    kontak_cabang: req.body.kontak_cabang,
  });
  cabangKantor
    .save(cabangKantor)
    .then((data) => {
      // TODO: remove send
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Terjadi kesalahan pada saat pembuatan data kantor.',
      });
    });
};

module.exports.findAll = (req, res) => {
  const { limit, offset } = getPagination(
    req.body.pageNumber - 1,
    req.body.pageSize
  );
  CabangKantor.paginate(
    {
      $or: [
        {
          kode_cabang: {
            $regex: req.body.filter.searchText,
            $options: 'i',
          },
        },
        {
          nama_cabang: {
            $regex: req.body.filter.searchText,
            $options: 'i',
          },
        },
        {
          alamat_cabang: {
            $regex: req.body.filter.searchText,
            $options: 'i',
          },
        },
        {
          kontak_cabang: {
            $regex: req.body.filter.searchText,
            $options: 'i',
          },
        },
      ],
    },
    {
      sort: { [req.body.sortField]: req.body.sortOrder },
      lean: true,
      offset,
      limit,
    }
  )
    .then((data) => {
      res.send({
        entities: data.docs,
        totalCount: data.totalDocs,
        errorMessage: '',
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports.findAllAsList = async (req, res) => {
  try {
    const data = await CabangKantor.find({})
      .select('kode_cabang nama_cabang')
      .sort('kode_cabang');
    res.send({
      data,
      status: 'success',
    });
  } catch (error) {
    res.send({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports.findOne = (req, res) => {
  const { id } = req.params;
  CabangKantor.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Data kantor tidak ditemukan.' });
      else res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: 'Terjadi kesalahan pada pencarian data kantor.',
      });
    });
};

module.exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Data kantor tidak boleh kosong!',
    });
  } else {
    const { id } = req.params;
    CabangKantor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: 'Data kantor tidak dapat diperbarui.',
          });
        } else res.send({ message: 'Data kantor sukses diperbarui.' });
      })
      .catch(() => {
        res.status(500).send({
          message: 'Terjadi kesalahan saat memperbarui data kantor.',
        });
      });
  }
};

module.exports.delete = (req, res) => {
  const { id } = req.params;
  CabangKantor.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: 'Data kantor tidak dapat dihapus.',
        });
      } else {
        res.send({
          message: 'Data kantor sukses dihapus.',
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Terjadi kesalahan saat menghapus data kantor.',
      });
    });
};
