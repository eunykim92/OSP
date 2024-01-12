const db = require('../models/dbModel');

const addComponents = async (req, res, next) => {
  const { componentsStr } = req.body;
  const components = JSON.parse(componentsStr);
  const designId = res.locals.designId;
  console.log(components);

  const root = components[0];
  const rootProps = {};
  root.props.forEach(({ key, value }) => (rootProps[key] = value));
  const rootStyle = {};
  root.styles.forEach(({ key, value }) => (rootStyle[key] = value));

  try {
    components[0].id = await db
      .query(
        'INSERT INTO components (design_id, name, z_index, props, style) ' +
          'VALUES ($1, $2, $3, $4, $5) ' +
          'RETURNING *;',
        [
          designId,
          root.name,
          root.z_index,
          JSON.stringify(rootProps),
          JSON.stringify(rootStyle),
        ]
      )
      .then((data) => data.rows[0]._id);

    // console.log(components[0]);

    const stack = [0];
    while (stack.length > 0) {
      const parentIndex = stack.pop();
      const parentId = components[parentIndex].id;
      const children = components.filter((item) => item.parent === parentId);
      const rows = children.map((item) => {
        const { name, x_position, y_position, z_index } = item;
        const props = {};
        item.props.forEach(({ key, value }) => (props[key] = value));
        const style = {};
        item.styles.forEach(({ key, value }) => (style[key] = value));
        return [
          designId,
          parentId,
          name,
          x_position,
          y_position,
          z_index,
          JSON.stringify(props),
          JSON.stringify(style),
        ];
      });

      children.forEach(async (child, i) => {
        try {
          child.id = await db
            .query(
              'INSERT INTO components ' +
                '(design_id, parent_id, name, x_position, y_position, z_index, props, style) ' +
                'VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ' +
                'RETURNING *;',
              rows[i]
            )
            .then((data) => data.rows[0]._id);
          stack.push(child.index);
        } catch (err) {
          throw err;
        }
      });
    }
    return next();
  } catch (err) {
    return next({
      log:
        'Express error handler caught componentController.addComponent middleware error' +
        err,
      message: { err: 'addComponent: ' + err },
    });
  }
};

module.exports = { addComponents };
