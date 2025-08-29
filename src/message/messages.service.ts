import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonsService } from 'src/persons/persons.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        private readonly personRepository: PersonsService,
    ) { }

    throwNotFoundError() {
        throw new NotFoundException('Recado não encontrado.');
    }

    async findAll(paginationDto?:PaginationDto) {
        const limit = paginationDto?.limit || 10;
        const offset = paginationDto?.offset || 0;

        const messages = await this.messageRepository.find({
            take: limit,
            skip: offset,
            relations: ['from', 'to'],
            order: {
                id: 'desc',
            },
            select: {
                from: {
                    id: true,
                    name: true,
                },

                to: {
                    id: true,
                    name: true,
                },
            },
        });
        return messages;
    }

    async findOne(id: number) {
        //const message = this.messages.find(item => item.id === id);

        const message = await this.messageRepository.findOne({
            where: {
                id,
            },
            order: {
                id: 'desc',
            },
            select: {
                from: {
                    id: true,
                    name: true,
                },

                to: {
                    id: true,
                    name: true,
                },
            },
        })

        if (message) return message;

        //throw new HttpException('Esse erro é do servidor.', HttpStatus.NOT_FOUND);
        this.throwNotFoundError();
    }

    async create(createMessageDto: CreateMessageDto) {
        const { fromId, toId } = createMessageDto;

        // Encontrar a pessoa que está criando o recado
        const from = await this.personRepository.findOne(fromId);

        // Encontrar a pessoa para quem o recado está sendo enviado
        const to = await this.personRepository.findOne(toId);

        const newMessage = {
            text: createMessageDto.text,
            from,
            to,
            read: false,
            date: new Date(),
        };

        const message = await this.messageRepository.create(newMessage);
        await this.messageRepository.save(message);

        return {
            ...message,
            from: {
                id: message.from.id,
            },
            to: {
                id: message.to.id,
            },
        }
    }

    async update(id: number, updateMessageDto: UpdateMessageDto) {

        const message = await this.findOne(id);

        if (!message) return this.throwNotFoundError();;

        message.text = updateMessageDto?.text ?? message.text;
        message.read = updateMessageDto?.read ?? message.read;

        await this.messageRepository.save(message);
        return message;
    }

    async remove(id: number) {
        const message = await this.messageRepository.findOneBy({
            id,
        });

        if (!message) return this.throwNotFoundError();;

        return this.messageRepository.remove(message);
    }
}
