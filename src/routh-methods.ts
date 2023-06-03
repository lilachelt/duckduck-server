
import { Request, Response } from 'express';
import { getDuckDuckResultsApi, extractTitlesAndUrls, validateQuery, writeTopicsByQueryToFile, readTopicsByQueryFromFile } from './helper';
const { STATUS_CODES, FILE_NAME } = require('./const');
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
        writeTopicsByQueryToFile(`${q}`,relatedTopicsResults,FILE_NAME)
        return res.status(OK).json(relatedTopicsResults);
    }catch(error : any) { 
        res.status(error.response.status).json({error:error.message});  
    }
}

export const getLastSearchesTopicsFromFile = async (req: Request,res: Response) => {
    const lastSearchesTopic = readTopicsByQueryFromFile(FILE_NAME);
    return res.status(OK).json(lastSearchesTopic);
}


