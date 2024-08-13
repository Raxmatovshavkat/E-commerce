import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('wishlists')
export class Wishlist {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id' })
    user_id: string;

    @Column({ name: 'product_id' })
    product_id: string;

    @ManyToOne(() => User, (user) => user.wishlists)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Product, (product) => product.wishlists)
    @JoinColumn({ name: 'product_id' })
    product: Product;
}
