import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
    constructor(private readonly MessageService: MessageService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    findAll(@Query() pagination: any) {
        const {limit = 10, offset = 0} = pagination;
        //return `Retorna todos os recados. Limit=${limit}, Offset=${offset}.`;
        return this.MessageService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.MessageService.findOne(id);
    }

    @Post()
    create(@Body() createdMessageDto: CreateMessageDto) {
        return this.MessageService.create(createdMessageDto);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateMessage: UpdateMessageDto) {
        return this.MessageService.update(id, updateMessage);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.MessageService.remove(id);
    }
}