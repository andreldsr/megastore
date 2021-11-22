import { Category } from './../../category/entities/category.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column({
        type: 'float'
    })
    price: number
    @ManyToOne(type => Category)
    @JoinColumn()
    category: Category
}
