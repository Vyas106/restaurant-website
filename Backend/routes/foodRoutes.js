
// routes/foodRoutes.js
import express from 'express';
// import  Food from '../models/Food.js';
// import f from '../models/Food.js';  // Corrected import
import { Food } from '../models/Food.js'

import { auth } from '../middleware/auth.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) return res.status(404).json({ message: 'Food not found' });
        res.json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', auth, adminAuth, async (req, res) => {
    const food = new Food(req.body);
    try {
        const newFood = await food.save();
        res.status(201).json(newFood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', auth, adminAuth, async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        if (!food) return res.status(404).json({ message: 'Food not found' });
        res.json({ message: 'Food deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export const foodRouter = router;

