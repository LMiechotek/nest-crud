import { Module } from '@nestjs/common';
import { MessageController } from './messages.controller';
import { MessageService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { PersonsModule } from 'src/persons/persons.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), PersonsModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
