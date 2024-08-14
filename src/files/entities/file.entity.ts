import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
export class File {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column({ nullable: true })
    table_name: string;

    @Column({ default: 'active' })
    status: 'inactive' | 'active';

    @Column()
    fileName: string;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;
}
