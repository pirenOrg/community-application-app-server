import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from './config/configuration';
import { Posts } from './post/entities/post.entity'
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { FollowsModule } from './follows/follows.module';

@Module({
  imports: [
    PostModule,
    ConfigModule.forRoot({
      isGlobal:true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService:ConfigService)=> ({
        type: "mysql",
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities:[Posts]
      }),
    }),
    PostsModule,
    UsersModule,
    FollowsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
