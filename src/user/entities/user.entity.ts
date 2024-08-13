import { Notification } from '../../notifacation/entities/notifacation.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Review } from 'src/review/entities/review.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'enum', enum: ['client', 'owner', 'supervisor', 'admin'], default: 'client' })
    role: 'client' | 'owner' | 'supervisor' | 'admin';

    @Column({ type: 'enum', enum: ['inactive', 'active'] })
    status: 'inactive' | 'active';

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];

    @OneToMany(() => Notification, notification => notification.user)
    notifications: Notification[];

    @OneToMany(() => Wishlist, wishlist => wishlist.user)
    wishlists: Wishlist[];

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}
