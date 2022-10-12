import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()

export class Posts {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    content: string;
}
