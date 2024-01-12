const db = require('../models/dbModel');

const addDesign = (req, res, next) => {
  const { userId, onlineImageUrl } = res.locals;
  return db
    .query(
      'INSERT INTO designs (user_id, image_url) ' +
        'VALUES( $1, $2) ' +
        'RETURNING *;',
      [userId, onlineImageUrl]
    )
    .then((data) => (res.locals.designId = data.rows[0]._id))
    .then(() => next())
    .catch((err) =>
      next({
        log:
          'Express error handler caught designController.addDesign middleware error' +
          err,
        message: { err: 'addDesign: ' + err },
      })
    );
};

module.exports = { addDesign };
