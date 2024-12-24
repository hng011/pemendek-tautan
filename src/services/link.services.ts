import Link from '../models/link.model';
import dotenv from 'dotenv';


dotenv.config();


class LinkService {
    /**
     * fetch all URLs stored in DB
     * @returns 
     */
    static async fetcher(): Promise<Link[]> {
        try {
            const data = await Link.findAll();
            if (data.length === 0) throw new Error("No data");
            return data;
        } catch (err) {
            throw new Error(`Failed to fetch the data:  [${(err as Error).message}]`);
        }
    } 

    /**
     * URL Shortener service to create a shortened link
     * @param url 
     * @returns 
     */
    static async shortener(url: string): Promise<string> {
        const baseURL = process.env.BASE_URL || `http://localhost:${process.env.PORT}`;

        try {
            const newLink = await Link.create({ url });
            return `${baseURL}/${newLink.id}`;
        } catch(err) {
            throw new Error(`Failed to shorten URL: [${(err as Error).message}]`);
        }
    }


    /**
     * Redirecting to the original url based on the id
     * @param id 
     * @returns 
     */
    static async redirector(id: string): Promise<string> {
        try {
            const record = await Link.findByPk(id);
            if (!record) throw new Error("URL not found");
            return record.url;
        } catch (err) {
            throw new Error(`Failed to retrieve URL: [${(err as Error).message}]`);
        }
    }

    /**
     * To destroy a record based on the id
     * @param id 
     * @param url 
     * @returns 
     */
    static async updater(id: string, url: string): Promise<Link> {
        try {
            const record = await Link.findByPk(id);
            if (!record) throw new Error("Missing URL");
            record.url = url != null ? url : record?.url;
            return record.save();
        } catch (err) {
            throw new Error(`Failed to update the URL: [${(err as Error).message}]`);
        }
    }

    /**
     * Service to delete record
     * @param id 
     * @returns 
     */
    static async deleter(id: string): Promise<void> {
        try {
            const record = await Link.findByPk(id);
            if (!record) throw new Error("Missing ID");
            return await record.destroy();
        } catch (err) {
            throw new Error(`Failed to delete URL: [${(err as Error).message}]`);
        }
    }
}


export default LinkService;