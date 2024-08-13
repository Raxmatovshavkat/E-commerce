import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('deliveries')
export class Delivery {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    order_id: string;

    @Column()
    name:string

    @Column()
    phone:string

    @Column()
    email:string

    @Column()
    addres:string

    @Column()
    city:string

    @OneToMany(() => Order, order => order.delivery)
    orders: Order[];
}
