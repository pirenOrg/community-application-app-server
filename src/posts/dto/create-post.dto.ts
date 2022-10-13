export class CreatePostDto {
    title:string;
    content:string;
    user_id:number;
    emoticon_id:number;
}

export class CreateCommentDto{
    conetent:string;
    user_id:number;
    post_id:number;
}

export class CreateEmoticonDto{
    post_id:number;
    user_id:number;
    emoticon_id:number;
}