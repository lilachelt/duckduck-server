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

export type ResultTopic = {
    url: string,
    title:string
}