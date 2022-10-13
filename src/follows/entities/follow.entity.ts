import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'follows' })
export class Follow { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()     // todo : 수정 외래키로 연결해야지?
    follower_id: number;

    @Column()     // todo : 수정 외래키로 연결해야지?
    followee_id: number;

    @Column({type: "tinyint", nullable: true})    // null일 수도 있지?
    is_block: number;      // 1: 차단안함

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;
}

