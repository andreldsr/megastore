module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true
}