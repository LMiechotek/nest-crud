import { Person } from "src/persons/entities/person.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    text: string;

    // Muitos recados podem ser enviados por uma única pessoa (emissor)
    @ManyToOne(() => Person, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    // Especifica a coluna "from" que armazena o ID da pessoa que enviou o recado
    @JoinColumn({ name: 'from' })
    from: Person;

    // Muitos recados podem ser enviados pora uma única pessoa (destinatario)
    @ManyToOne(() => Person, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    // Especifica a coluna "to" que armazena o ID da pessoa que recebe o recado
    @JoinColumn({ name: 'to' })
    to: Person;

    @Column({ default: false })
    read: boolean;

    @Column()
    date: Date; // createdAt

    @CreateDateColumn()
    createdAt?: Date; // createdAt

    @UpdateDateColumn()
    updatedAt?: Date; //updatedAt
}