import { Module } from '@nestjs/common';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { NotifacationModule } from './notifacation/notifacation.module';
import { CategoryModule } from './category/category.module';
import { BrandsModule } from './brands/brands.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { ProductsModule } from './products/products.module';
import { OrderDetailsModule } from './order_details/order_details.module';
import { OrdersModule } from './orders/orders.module';
import { DeliveryModule } from './delivery/delivery.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/db';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    ReviewModule, 
    UserModule, 
    AuthModule, 
    NotifacationModule, 
    CategoryModule, 
    BrandsModule, 
    WishlistsModule, 
    ProductsModule, 
    OrderDetailsModule, 
    OrdersModule, 
    DeliveryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
