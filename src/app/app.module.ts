import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from '../message/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsModule } from 'src/persons/persons.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    autoLoadEntities: true, // Carrega entidades sem precisar especifica-las
    synchronize: true // Sincroniza com o BD. Não deve ser usado em produção
  }),MessageModule, PersonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
