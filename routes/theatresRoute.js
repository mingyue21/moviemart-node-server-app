import { Router } from 'express';
const router = Router();
import Theatre from '../models/theatreModel.js';

// add a theatre
router.post('/add-theatre', async (req, res) => {
    try {
        const newTheatre = new Theatre(req.body);
        await newTheatre.save();
        res.send({
                success: true,
                message: 'Theatre added successfully',
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message,
            })
    }
});

// get all theatres
router.get('/get-all-theatres', async (req, res) => {
    try {
        const theatres = await Theatre.find().sort({createdAt: -1});
        res.send({
            success: true,
            message: 'Theatres fetched successfully',
            data: theatres,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// get theatres by owner
router.get('/get-all-theatres-by-owner', async (req, res) => {
    try {
        const theatres = await Theatre.find({owner: req.body.owner}).sort({createdAt: -1});
        res.send({
            success: true,
            message: 'Theatres fetched successfully',
            data: theatres,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// update a theatre
router.put('/update-theatre', async (req, res) => {
    try {
        await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
        const theatre = await Theatre.findById(req.params.id);
        res.send({
            success: true,
            message: 'Theatre updated successfully',
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// delete a theatre
router.delete('/delete-theatre', async (req, res) => {
    try {
        await Theatre.findByIdAndDelete(req.body.theatreId);
        res.send({
            success: true,
            message: 'Theatre deleted successfully',
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});


export default router;

