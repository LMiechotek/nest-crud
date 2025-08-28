import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) {}

    throwNotFoundError() {
        throw new NotFoundException('Recado não encontrado.');
    }

    async findAll() {
        const messages = await this.messageRepository.find();
        return messages;
    }

    async findOne(id:number) {
        //const message = this.messages.find(item => item.id === id);

        const message = await this.messageRepository.findOne({
            where: {
                id,
            }
        })

        if (message) return message;

        //throw new HttpException('Esse erro é do servidor.', HttpStatus.NOT_FOUND);
        this.throwNotFoundError();
    }

    async create(createMessageDto: CreateMessageDto) {
        const newMessage = {
            ...createMessageDto,
            read: false,
            date: new Date(),
        };

        const message = await this.messageRepository.create(newMessage);

        return this.messageRepository.save(message);
    }

    async update(id: number, updateMessageDto: UpdateMessageDto) {
        const partialUpdateMessageDto = {
            lido: updateMessageDto?.read,
            text: updateMessageDto?.text,
        };

        const message = await this.messageRepository.preload({
            id,
            ...partialUpdateMessageDto,
        });

        if(!message) return this.throwNotFoundError();;

        await this.messageRepository.save(message);

        return message;
    }

    async remove(id: number) {
        const message = await this.messageRepository.findOneBy({
            id,
        });

        if(!message) return this.throwNotFoundError();;

        return this.messageRepository.remove(message);
    }
}
