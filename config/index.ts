import { ConfigService } from "@nestjs/config";

export const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3001,
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    MAIL_HOST: process.env.MAIL_HOST,
});


export const JWTConfig = () => {
    return {
        useFactory: async (config: ConfigService) => ({
            secret: config.get('JWT_SECRET'),
            signOptions: { expiresIn: config.get('JWT_EXPIRES_IN', '1h') },
        }),
        inject: [ConfigService]
    }
}


export const DBConfig = () => {
    return {
        useFactory: async (config: ConfigService) => ({
            type: 'mongodb',
            url: config.get('DB_URL'),
            host: config.get('DB_HOST'),
            port: +config.get('DB_PORT'),
            username: config.get('DB_USER'),
            password: config.get('DB_PASS'),
            database: config.get('DB_NAME'),
            entities: ['dist/**/*.entity.js'],
            synchronize: true,
            logging: false,
        }),
        inject: [ConfigService],
    }
}