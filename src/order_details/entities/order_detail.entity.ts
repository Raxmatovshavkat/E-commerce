import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_details')
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    size: string;

    @Column()
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    singleprice: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalprice: number;

    @ManyToOne(() => Order, order => order.orderDetails)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(() => Product, product => product.orderDetails)
    @JoinColumn({ name: 'product_id' })
    product: Product;
}
