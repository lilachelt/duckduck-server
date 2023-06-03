import Joi from 'joi';
const schema = Joi.string().required();
type Icon = {
    Height: number;
    URL: string;
    Width: number;
}

export type Topic = {
    FirstURL: string;
    Icon: Icon;
    Result: string;
    Text: string;
}

export type NestedTopic = {
    Name:string;
    Topics:Topic[];
}

export type NewTopic = {
    url: string,
    title:string
}