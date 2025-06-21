import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppLoggerService } from './common/logger/logger.service';
import { TraceContextMiddleware } from './common/middleware/trace.middleware';
import { RequestContextService } from './common/middleware/request.service';
import { HttpModule } from '@nestjs/axios';
import { HttpClientModule } from './common/inter-service-communication/http-client.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionGroupModule } from './modules/permissiongroup/permissiongroup.module';
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      minPoolSize: 10,
      maxPoolSize: 100,
      ssl: true,
      tls: true,
      retryWrites: true,
      w: 'majority'
    }),
    HttpModule,
    HttpClientModule,
    UsersModule,
    PermissionModule,
    RoleModule,
    PermissionGroupModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    AppLoggerService, 
    RequestContextService
  ],
  exports: [AppLoggerService, RequestContextService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceContextMiddleware).forRoutes('*');
  }
}
