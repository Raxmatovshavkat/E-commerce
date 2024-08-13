import { Delivery } from 'src/delivery/entities/delivery.entity';
import { OrderDetail } from 'src/order_details/entities/order_detail.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id' })
    user_id: string;

    @Column({ name: 'payment_id' })
    payment_id: string;

    @Column()
    payment_type: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    paying_amount: number;

    @Column()
    coupon: string;

    @Column()
    quantity: number;

    @Column()
    subtotal: string;

    @Column()
    total: number;

    @Column({ type: 'enum', enum: ['inactive', 'active'] })
    status: 'inactive' | 'active';

    @Column()
    status_code: number;

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
    orderDetails: OrderDetail[];

    @ManyToOne(() => Delivery, delivery => delivery.orders)
    @JoinColumn({ name: 'delivery_id' })
    delivery: Delivery;
}
