import { User } from '../../user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('review')
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ name: 'user_id' })
    user_id: string;

    @Column({ name: 'rated' })
    rated: number;

    @Column({ name: 'comment' })
    comment: string;

    @ManyToOne(() => User, user => user.reviews)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
