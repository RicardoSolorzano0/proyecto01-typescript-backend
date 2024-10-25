export const DBSecrets = {
    host: 'DB_HOST',
    port: 'DB_PORT',
    user: 'DB_USER',
    password: 'DB_PASSWORD',
    database: 'DB_NAME',
    max: 'DB_MAX'
} as const;

export const DBSecretsArray = Object.values(DBSecrets);