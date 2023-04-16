import { Router } from 'express';
const router = Router();
import Movie from '../models/movieModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';

// add a movie
router.post('/add-movie', authMiddleware, async (req, res) => {

    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({
                success: true,
                message: 'Movie added successfully',
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message,
            })
    }
});

// get all movies
router.get('/get-all-movies', async (req, res) => {
    try {
        const movies = await Movie.find().sort({createdAt: -1});
        res.send({
            success: true,
            message: 'Movies fetched successfully',
            data: movies,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// update a movie
router.post('/update-movie', authMiddleware, async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.body.movieId, req.body, { new: true });
        res.send({
            success: true,
            message: 'Movie updated successfully',
            data: updatedMovie,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// delete a movie
router.post('/delete-movie', authMiddleware, async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.body.movieId);
        res.send({
            success: true,
            message: 'Movie deleted successfully',
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

export default router;

