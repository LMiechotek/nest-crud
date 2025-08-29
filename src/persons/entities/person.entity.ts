import { IsEmail } from "class-validator";
import { Message } from "src/message/entities/message.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    @IsEmail()
    email:string;

    @Column({ length: 255})
    passwordHash: string;

    @Column({ length: 100 })
    name: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    // Uma pessoa pode ter enviado muitos recados (como "from")
    // Esses recado são relacionados ao campo "from" na entidade message
    @OneToMany(() => Message, message => message.from)
    messagesSent: Message[];

    // Uma pessoa pode ter recebido muitos recados (como "to")
    // Esses recado são relacionados ao campo "to" na entidade message
    @OneToMany(() => Message, message => message.to)
    messagesReceived: Message[];
}
