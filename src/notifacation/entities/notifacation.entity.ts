import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notifications')
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id' })
    user_id: string;

    @ManyToOne(() => User, user => user.notifications)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    title: string;

    @Column()
    content: string;
}
