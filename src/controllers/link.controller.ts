import { Request, Response } from 'express';
import LinkService from '../services/link.services';
import dotenv from 'dotenv';


dotenv.config();


export const getLinks = async (req: Request, res: Response) => {
    try {
        const links = await LinkService.fetcher();
        res.status(200).send({
            success: true,
            data: links,
        });
    } catch (err) {
        res.status(400).send({
            sucess: false,
            message: (err as Error).message,
        });
    }
}


export const shortenURL = async (req: Request, res: Response) => {
    const { url } = req.body;
    
    if (!url) {
        res.status(400).send({
            success: false,
            message: "Missing URL",
        });
    } else {
        try {
            const shortenedURL = await LinkService.shortener(url);
            res.status(201).send({
                success: true,
                message: shortenedURL,
            });
        } catch (err) {
            res.status(400).send({
                sucess: false,
                message: (err as Error).message,
            });
        }
    }
};


export const redirectURL = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
        res.status(400).send({
            success: false,
            message: "Missing URL",
        });
    } else {
        try {
            return res.redirect(await LinkService.redirector(id))
        } catch (err) {
            res.send({
                success: false,
                message: (err as Error).message,
            });
        }
    }
};


export const updLink = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { url } = req.body;

    if (!id || !url) {
        res.status(400).send({
            success: false,
            message: "Missing ID or URL"
        });
    } else {
        try {
            const updated = await LinkService.updater(id, url);
            res.status(200).json(updated);
        } catch (err) {
            res.send({
                success: false,
                message: (err as Error).message, 
            });
        }
    }
}


export const delLink = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
        res.status(400).send({
            success: false,
            message: "Missing ID or URL"
        });
    } else {
        try {
            await LinkService.deleter(id);
            res.status(200).send({
                success: true,
                message: `Successfully deleted link with id: ${id}`
            });
        } catch (err) {
            res.send({
                success: false,
                message: (err as Error).message 
            });
        }
    }
}