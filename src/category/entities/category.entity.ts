import { Product } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ name: 'name' })
    category_name: string;

    @Column({ name: 'subcategory' })
    subcategory: number;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'icon' })
    icon: string;

    @Column({ type: 'enum', enum: ['inactive', 'active'] })
    status: 'inactive' | 'active';

    @OneToMany(() => Product, product => product.category)
    products: Product[];
}
