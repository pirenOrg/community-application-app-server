import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn} from 'typeorm';

//포스트
@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    content: string;

    @Column()
    user_id: number;

    @ManyToMany(() => Emoticons, emoticons => emoticons.posts)
    @JoinTable({
        name:'Post_emoticons',
        joinColumns:[{name:'post_id'}],
        inverseJoinColumns:[{name:'emoticon_id'}]
    })
    emoticons: Emoticons[];

    @OneToMany(()=>Comments, comments=>comments.posts)
    comments: Comments[];
}

//코멘트
@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    user_id: number;

    @Column()
    post_id: number;

    @ManyToOne(()=>Posts, posts=>posts.comments)
    @JoinColumn({name:'post_id'})
    posts: Posts;
}

//이모티콘
@Entity()
export class Emoticons {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @ManyToMany(()=>Posts, posts=>posts.emoticons)
    posts: Posts[];
}

//포스트+이모티콘
@Entity()
export class Post_emoticons {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    post_id: number;

    @Column()
    user_id: number;

    @Column()
    emoticon_id: number;
}






