import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Brand } from 'src/brands/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { OrderDetail } from 'src/order_details/entities/order_detail.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    category_id: string;

    @Column()
    brand_id: string;

    @Column()
    product_name: string;

    @Column()
    product_code: string;

    @Column()
    product_quantity: number;

    @Column()
    product_details: string;

    @Column()
    product_color: string;

    @Column()
    product_size: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    selling_price: number;

    @Column({ type: 'number', precision: 10, scale: 2 })
    discount_price: number;

    @Column()
    best_rated: number;

    @Column()
    trend: string;

    @Column()
    images: string;

    @Column({ type: 'enum', enum: ['inactive', 'active'] })
    status: 'inactive' | 'active';

    @ManyToOne(() => Brand, (brand) => brand.products)
    @JoinColumn({ name: 'brand_id' })
    brand: Brand;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(() => Wishlist, (wishlist) => wishlist.product)
    wishlists: Wishlist[];

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
    orderDetails: OrderDetail[];
}
