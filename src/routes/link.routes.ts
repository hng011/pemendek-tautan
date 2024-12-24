import express, {Response, Request} from 'express';
import { 
    shortenURL, 
    redirectURL, 
    getLinks,
    delLink, 
    updLink,
} from '../controllers/link.controller';


const router = express.Router();


router.get("/", (req:Request, res:Response) => {
    res.status(200).send({message: "woe"});
});


router.get("/getLinks", getLinks);
router.get("/:id", redirectURL);
router.post("/shorten", shortenURL);
router.put("/updLink/:id", updLink)
router.delete("/delLink/:id", delLink)


export default router;  