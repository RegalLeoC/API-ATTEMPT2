import express from 'express';
import StatisticsController from '../controllers/StatisticsController';


const router =  express.Router();

router.get('/statistics', StatisticsController.getStatistics);

router.get('/statistics/:id', StatisticsController.getStatisticsById)

router.post('/statistics', StatisticsController.createStatistics)


export default router