import { defineSecret }                             from 'firebase-functions/params';
import { Kysely, PostgresDialect }                  from 'kysely';
import type { DB }                                  from 'kysely-codegen';
import { Pool }                                     from 'pg';
import { DBSecrets }                                from '@/constants/secret';

const getSecretValue = (secret: string) => defineSecret(secret).value();

export const constructDB = () => new Kysely<DB>({
    dialect: new PostgresDialect({
        pool: new Pool({
            database: getSecretValue(DBSecrets.database),
            host: getSecretValue(DBSecrets.host),
            user: getSecretValue(DBSecrets.user),
            port: Number(getSecretValue(DBSecrets.port)),
            password: getSecretValue(DBSecrets.password),
            max: Number(getSecretValue(DBSecrets.max))
        })
    })
});

//    ^ { created_at: Date; email: string; id: number; ... }[]