import PageModel from './pageModel';
import { Op } from 'sequelize';
const pagesController = {
  create: async (data) => PageModel.create(data),
  findById: async (id) => PageModel.findOne({ where: { id } }),
  findBySlug: async (slug) => PageModel.findOne({ where: { slug, status: 'published' } }),
  find: async (where) => PageModel.findAll({ where }),
  getPages: async () => PageModel.findAll(),
  getFeatured: async () => PageModel.findAll({where: {
    [Op.or]: [
      { slug: 'mentoring' },
      { slug: 'hiring' },
      { slug: 'advertise' },
      ],
    },}
  ),
  update: async (data, id) => PageModel.update(data, { where: { id } }),
  delete: async (id) => PageModel.destroy({ where: { id } }),
};

export default pagesController;
