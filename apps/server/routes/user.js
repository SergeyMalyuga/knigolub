import {Router} from 'express';

const router = Router();

router.get('/', async (req, res) => {
    res.send('User сервер работает');
})

export default router;