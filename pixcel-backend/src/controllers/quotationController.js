const Quotation = require("../models/Quotation");

// POST /api/quotations (Public - from frontend form)
exports.create = async (req, res) => {
    try {
        const quotation = await Quotation.create(req.body);
        res.status(201).json({
            success: true,
            message: "Quotation request successfully submitted.",
            data: quotation,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/quotations (Admin)
exports.getAll = async (req, res) => {
    try {
        const { status } = req.query;
        const where = {};
        if (status) where.status = status;

        const quotations = await Quotation.findAll({
            where,
            order: [["createdAt", "DESC"]],
        });

        res.json({ success: true, count: quotations.length, data: quotations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/quotations/:id (Admin)
exports.getById = async (req, res) => {
    try {
        const quotation = await Quotation.findByPk(req.params.id);
        if (!quotation) {
            return res.status(404).json({ success: false, message: "Quotation not found" });
        }
        res.json({ success: true, data: quotation });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// PATCH /api/quotations/:id/status (Admin)
exports.updateStatus = async (req, res) => {
    try {
        const quotation = await Quotation.findByPk(req.params.id);
        if (!quotation) {
            return res.status(404).json({ success: false, message: "Quotation not found" });
        }

        const { status } = req.body;
        if (!["New", "Contacted", "Closed"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }

        await quotation.update({ status });
        res.json({ success: true, data: quotation });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE /api/quotations/:id (Admin)
exports.remove = async (req, res) => {
    try {
        const quotation = await Quotation.findByPk(req.params.id);
        if (!quotation) {
            return res.status(404).json({ success: false, message: "Quotation not found" });
        }
        await quotation.destroy();
        res.json({ success: true, message: "Quotation deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
