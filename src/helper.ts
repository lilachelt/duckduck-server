
import axios from 'axios';
import { Topic, NestedTopic, NewTopic } from './types'
import { DUCK_DUCK_API_URL } from './const';

export const getDuckDuckResultsApi = async (query :  any) => {
        let apiUrl = `${DUCK_DUCK_API_URL}q=${query}`;
        return await axios.get(apiUrl);
  
}

export const extractTitlesAndUrls  = (topics :  (Topic | NestedTopic)[]) => {
    try{
        let newTopicArr: NewTopic[] = [];
        topics.map((topic: any)=>{
             if (checkIfThereIsNestedTopics(topic)){
                newTopicArr.push(...extractTitlesAndUrls(topic?.Topics))
             }else{
                newTopicArr.push(getTitleAndUrl(topic))
             }
        }) 
        return newTopicArr;
     } catch(error : any){
         throw new Error(error)
    }
}

const checkIfThereIsNestedTopics = (topic : Topic | NestedTopic) =>
    topic.hasOwnProperty('Topics')

const getTitleAndUrl = (topic: Topic) : NewTopic=> {
    return {
        url: topic['FirstURL'],
        title: topic['Text']
    }
}
