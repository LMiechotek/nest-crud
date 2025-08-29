import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { MessageService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AddHeaderInterceptor } from 'src/interceptors/add-header.interceptor';
import { TimingConnectionInterceptor } from 'src/interceptors/timing-connection.interceptor';
import { ErrorHandlingInterceptor } from 'src/interceptors/error-handling.interceptor';

@Controller('messages')
export class MessageController {
    constructor(private readonly MessageService: MessageService) {}

    @UseInterceptors(TimingConnectionInterceptor, ErrorHandlingInterceptor)
    @HttpCode(HttpStatus.OK)
    @Get()
    async findAll(@Query() paginationDto: PaginationDto) {
        //return `Retorna todos os recados. Limit=${limit}, Offset=${offset}.`;
        const messages = await this.MessageService.findAll(paginationDto);
        return messages;
    }

    @UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor)
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