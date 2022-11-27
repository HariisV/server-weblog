const { StatusCodes } = require('http-status-codes');
const db = require('../../database/models');
const Post = db.Post;
const { NotFoundError } = require('../../errors/');

const index = async (req, res, next) => {
  try {
    const { limit, offset } = req.params;
    const result = await Post.findAndCountAll({
      limit: limit ? parseInt(limit) : 1,
      offset: offset ? parseInt(offset) : 0,
    });
    if (!result.rows.length) throw new NotFoundError(`Article Not Found`);

    res.status(StatusCodes.OK).json({
      data: result,
      limit: limit,
      page: offset,
    });
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const { title, content, category, status } = req.body;
    const result = await Post.create({
      title,
      content,
      category,
      status,
    });
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const find = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Post.findByPk(id);

    if (!result) throw new NotFoundError(`Article with id ${id} not found`);

    res.status(StatusCodes.OK).json({});
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, category, status } = req.body;
    const result = await Post.update(
      {
        title,
        content,
        category,
        status,
      },
      { where: { id: id } }
    );
    if (!result[0]) throw new NotFoundError(`Article with id ${id} not found`);

    res.status(StatusCodes.OK).json({});
  } catch (error) {
    next(error);
  }
};
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Post.destroy({ where: { id: id } });
    if (!result) throw new NotFoundError(`Article with id ${id} not found`);

    res.status(StatusCodes.OK).json({});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  index,
  find,
  update,
  destroy,
};
