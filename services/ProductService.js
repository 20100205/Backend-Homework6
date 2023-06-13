const ProductModel = require('../models/product');
const ApiResponse = require('../utils/ApiResponse');

module.exports = {

    getAllProducts: async (req, res) => {
      try {
        const products = await ProductModel.find({});
        ApiResponse.success(res, products);
      } catch (error) {
        ApiResponse.failure(res, error, 'error_on_getAllProducts');
      }
    },

    searchProduct: async (req, res) => {
        try {
          const query = req.query;
          let skip = 0;
          let limit = 5;
          if (query.skip) {
            skip = +query.skip;
          }
          if (query.limit) {
            limit = +query.limit;
          }
          const queryForSearch = {};
          if (req.query.searchText) {
            queryForSearch.$or = [{
              name: new RegExp(`.*${req.query.searchText}.*`, "i")
            }]
          }
          const result = await ProductModel.find(queryForSearch)
            .sort({ createdAt: 1 })
            .skip(skip)
            .limit(limit)
            .lean();
          ApiResponse.success(res, result);
        } catch (error) {
          ApiResponse.failure(res, error, 'error_on_search');
        }
    },
  
    getProduct: async (req, res) => {
      try {
        const product = await ProductModel.findById(req.params.id);
        ApiResponse.success(res, product);
      } catch (error) {
        ApiResponse.failure(res, error, 'error_on_getProducts');
      }
    },
  
    addProduct: async (req, res) => {
      try {
        const body = req.body;
        const requiredFields = ['name', 'category', 'price'];
        for (const field of requiredFields) {
          if (!body[field]) {
            return ApiResponse.failure(res, {}, `${field} is missing`, 400);
          }
        }
        const result = await new ProductModel(body).save();
        ApiResponse.success(res, result);
      } catch (error) {
        ApiResponse.failure(res, error, 'error_on_addProducts');
      }
    },
  
    updateProduct: async (req, res) => {
      try {
        const rec = await ProductModel.findByIdAndUpdate({
          _id: req.params.id
        }, {
          $set: req.body
        }, {
          new: true
        });
        if (!rec) {
          return ApiResponse.failure(res, {}, 'record_not_found', 404);
        }
        ApiResponse.success(res, rec);
      } catch (error) {
        ApiResponse.failure(res, error, 'error_on_updateProducts');
      }
    }
  
};