import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'follows' })
export class Follows { 
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.followers)
    @JoinColumn({ name: 'follower_id' })
    follower_id: number;
    
    @ManyToOne(() => User, (user) => user.followings)
    @JoinColumn({ name: 'followee_id' })
    followee_id: number;

    @Column({type: "tinyint", nullable: true})
    is_block: number; 

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
      })
      updated_at: Date;
}