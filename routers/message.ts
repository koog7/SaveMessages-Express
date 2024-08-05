import express from 'express';

const messageRouter = express.Router();
messageRouter.use(express.json())

messageRouter.get('/', async (req, res) => {
    res.send('msg get')
})
messageRouter.post('/', (req, res) => {
    res.send('msg post')
});

export default messageRouter;