import { Request, Response } from 'express';
import Link from '../models/link.model';
import dotenv from 'dotenv';


dotenv.config();


export const getLinks = async (req: Request, res: Response) => {
    res.json(await Link.findAll());
}


export const shortenURL = async (req: Request, res: Response) => {
    const { url } = req.body;
    const baseURL = process.env.BASE_URL || `http://localhost:${process.env.PORT}`;
    
    if (!url) {
        res.status(400).send({
            'error': "MISSING URL"
        });
    }

    try {
        const newLink = await Link.create({ url });
        res.status(201).send({
            shortenedURL: `${baseURL}/${newLink.id}`
        });

    } catch (err) {
        res.status(500).send({
            err: `Failed to shorten URL\n{err}`
        })
    }
};


export const redirectURL = async (req: Request, res: Response) => {
    const { id } = req.params;

    try{
        const link = await Link.findByPk(id);
        if (link) {
            res.redirect(link.url   );
        } else {
            res.status(404).send({
                err: "Link not found"
            });
        }
    } catch (err) {
        res.status(500).send({
            err: `Failed to retrieve URL`
        });
    }
};


export const updLink = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { url } = req.body;
    const record = await Link.findByPk(id);

    if (!record) {
        res.status(404).send({
            err: "Link not found"
        });
    } else {
        record.url = url != null ? url : record.url;
        record.save();

        res.status(200).send({
            message: `Link with ID: ${id} was successfully updated`
        });
    }
}


export const delLink = async (req: Request, res: Response) => {
    const { id } = req.params;
    const record = await Link.findByPk(id);
    
    if (!record) {
        res.status(404).send({
            err: "Link not found"
        });
    } else {
        record.destroy();
        res.status(200).send({
            message: `Link with ID: ${id} was successfully deleted`
        });
    }
}