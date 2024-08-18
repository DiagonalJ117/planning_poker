import express from 'express';
import roomController from '../controllers/room.controller';

const router = express.Router();

router.get('/list', roomController.getRooms);
router.get('/:id', roomController.getRoom);
router.post('/create', roomController.createRoom);
router.delete('/:id', roomController.deleteRoom);
router.put('/:id', roomController.updateRoom);

export default router;