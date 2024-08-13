import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class EmailVerifyDto {
    @ApiProperty({
        example: 'johndoe@example.com',
        description: 'The email address of the user to be verified',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '123456',
        description: 'The verification code (OTP) sent to the user for email verification',
    })
    @IsString()
    otp: string;
}
