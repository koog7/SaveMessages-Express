import express from 'express';
import fs from 'fs';
import {promises as fsp} from 'fs';

const messageRouter = express.Router();
messageRouter.use(express.json())

messageRouter.get('/', async (req, res) => {
    try {
        const files = await fsp.readdir('./messages');
        const messages = await Promise.all(files.slice(-5).map(async file => {
            const content = await fsp.readFile(`./messages/${file}` , 'utf-8');
            const date = file.replace('.txt' , '').replace('Z', '').replace('T' , ' ')
            return {fileName:file , message:content , date:date};
        }));
        res.send(messages);
    } catch (err) {
        console.error('Error reading files:', err);
        return res.status(500).send('There are no messages');
    }
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