
import axios from 'axios';
import { Topic, NestedTopic, ResultTopic } from './types'
import { DUCK_DUCK_API_URL } from './const';
import Joi from 'joi';
import fs from 'fs';

const { STATUS_CODES } = require('./const');
const { VALIDATION_ERROR } = STATUS_CODES;

export const getDuckDuckResultsApi = async (query :  any) => {
        let apiUrl = `${DUCK_DUCK_API_URL}q=${query}`;
        return await axios.get(apiUrl);
  
}

export const extractTitlesAndUrls  = (topics :  (Topic | NestedTopic)[]) => {
    try{
        let resultTopicsArr: ResultTopic[] = [];
        topics.map((topic: any)=>{
             if (checkIfThereIsNestedTopics(topic)){
                resultTopicsArr.push(...extractTitlesAndUrls(topic?.Topics))
             }else{
                resultTopicsArr.push(getTitleAndUrl(topic))
             }
        }) 
        return resultTopicsArr;
     } catch(error : any){
         throw new Error(error)
    }
}

const checkIfThereIsNestedTopics = (topic : Topic | NestedTopic) =>
    topic.hasOwnProperty('Topics')

const getTitleAndUrl = (topic: Topic) : ResultTopic=> {
    return {
        url: topic['FirstURL'],
        title: topic['Text']
    }
}

export const validateQuery = (query : any) => {
    const schema = Joi.string().required();
    const response = schema.validate(query);
    if (response.error) {
        const error = { response: { status: VALIDATION_ERROR } , message: response.error };
        throw error;
    }
}

export const writeTopicsByQueryToFile = (query: string,arrayOfTopics: ResultTopic[], filename : string) => {
    if (arrayOfTopics.length){
        const existingDataInFile = readTopicsByQueryFromFile(filename);
        const topicsByQuery = { ...existingDataInFile, [query]: arrayOfTopics };
        const jsonData = JSON.stringify(topicsByQuery, null, 4);     
        fs.writeFile(filename, jsonData, (err) => {
          if (err) {
              throw err;
          } else {
            console.log(`Objects written to ${filename} successfully.`);
          }
        })
    };
}

export const readTopicsByQueryFromFile = (filename : string) =>{
    const pathFile = `./${filename}`;
    let existingDataInFile = {};
    if (fs.existsSync(pathFile)) {
        const fileData = fs.readFileSync(filename, 'utf-8');
        existingDataInFile = JSON.parse(fileData);
    }
    return existingDataInFile;
}