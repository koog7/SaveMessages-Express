import express from 'express';
import fs from 'fs';


const messageRouter = express.Router();
messageRouter.use(express.json())

messageRouter.get('/', async (req, res) => {
    res.send('msg get')
})
messageRouter.post('/', (req, res) => {
    const {message} = req.body;
    const date = new Date().toISOString().replace(/:/g, '-');

    fs.mkdir('./messages', { recursive: true }, (err) => {
        if(err){
            return console.error('Error creating folder:', err);
        }
        fs.writeFile(`./messages/${date}.txt`, message, (err) => {
            if (err) {
                return console.error('Error writing file:', err);
            }
            res.send({ message, date });
        });
    });
});

export default messageRouter;