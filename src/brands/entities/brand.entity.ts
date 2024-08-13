import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('brands')
export class Brand {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'brand_name' })
    brand_name: string;

    @Column({ name: 'brand_logo' })
    brand_logo: string;

    @OneToMany(() => Product, product => product.brand)
    products: Product[];
}
