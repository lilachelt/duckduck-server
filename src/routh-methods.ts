
import { Request, Response } from 'express';
import { getDuckDuckResultsApi, extractTitlesAndUrls, validateQuery, writeTopicsByQueryToFile } from './helper';
const { STATUS_CODES } = require('./const');
const { OK,INTERNAL_SERVER_ERROR } = STATUS_CODES;


export const getDuckDuckFullResponse = async (req:Request, res:Response) => {
    try {
        const { q } = req.query;
        const response = await getDuckDuckResultsApi(q)
        return res.status(OK).json(response.data);
    }
    catch(error : any){
        res.status(INTERNAL_SERVER_ERROR).json({error:error.message});
    }
}

export const getUrlsAndTitlesRelatedTopics = async (req: Request,res: Response) => {
    try {
        const { q } = req.query;
        validateQuery(q)
        const response = await getDuckDuckResultsApi(q);
        const { RelatedTopics }  = response.data;
        const relatedTopicsResults = extractTitlesAndUrls(RelatedTopics)
        writeTopicsByQueryToFile(`${q}`,relatedTopicsResults,'topicsByQuery.json')
        return res.status(OK).json(relatedTopicsResults);
    }catch(error : any) { 
        res.status(error.response.status).json({error:error.message});  
    }
}

export const getRelatedTopicFromFile = async (req: Request,res: Response) =>{

}


