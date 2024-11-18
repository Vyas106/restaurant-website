// routes/searchRoutes.js
import express from 'express';
import { Food } from '../models/Food.js';

const router = express.Router();

router.get('/foods', async (req, res) => {
    try {
        const { query, category, minPrice, maxPrice } = req.query;
        
        let filter = {};
        
        if (query) {
            filter.$or = [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ];
        }
        
        if (category) {
            filter.category = category;
        }
        
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        
        const foods = await Food.find(filter);
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export const searchRouter = router;
