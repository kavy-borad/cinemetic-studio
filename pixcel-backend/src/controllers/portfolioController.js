const Portfolio = require("../models/Portfolio");
const { Op } = require("sequelize");

// GET /api/portfolio (Public)
exports.getAll = async (req, res) => {
    try {
        const { category, featured } = req.query;
        const where = {};

        if (category) where.category = category;
        if (featured === "true") where.featured = true;

        const portfolios = await Portfolio.findAll({
            where,
            order: [["createdAt", "DESC"]],
        });

        res.json({ success: true, count: portfolios.length, data: portfolios });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/portfolio/:id (Public)
exports.getById = async (req, res) => {
    try {
        const portfolio = await Portfolio.findByPk(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found" });
        }
        res.json({ success: true, data: portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/portfolio/slug/:slug (Public)
exports.getBySlug = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ where: { slug: req.params.slug } });
        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found" });
        }
        res.json({ success: true, data: portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /api/portfolio (Admin)
exports.create = async (req, res) => {
    try {
        const portfolio = await Portfolio.create(req.body);
        res.status(201).json({ success: true, data: portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// PUT /api/portfolio/:id (Admin)
exports.update = async (req, res) => {
    try {
        const portfolio = await Portfolio.findByPk(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found" });
        }
        await portfolio.update(req.body);
        res.json({ success: true, data: portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE /api/portfolio/:id (Admin)
exports.remove = async (req, res) => {
    try {
        const portfolio = await Portfolio.findByPk(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ success: false, message: "Portfolio not found" });
        }
        await portfolio.destroy();
        res.json({ success: true, message: "Portfolio deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
