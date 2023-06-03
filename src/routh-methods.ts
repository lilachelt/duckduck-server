
import { Request, Response } from 'express';
import { getDuckDuckResultsApi, extractTitlesAndUrls } from './helper'
import Joi from 'joi';
const { STATUS_CODES } = require('./const');
const { OK,INTERNAL_SERVER_ERROR, VALIDATION_ERROR } = STATUS_CODES;


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
        const result = extractTitlesAndUrls(RelatedTopics)
        return res.status(OK).json(result);
    }catch(error : any) { 
        res.status(error.response.status).json({error:error.message});  
    }
}

const validateQuery = (query : any) => {
    const schema = Joi.string().required();
    const response = schema.validate(query);
    if (response.error) {
        const error = { response: { status: VALIDATION_ERROR } , message: response.error };
        throw error;
    }
}

