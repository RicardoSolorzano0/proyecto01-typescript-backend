import {
	DummyDriver,
	PostgresAdapter,
	PostgresIntrospector,
	PostgresQueryCompiler,
} from 'kysely'
import { defineConfig } from 'kysely-ctl'
import {Pool} from 'pg'
import dayjs from 'dayjs'



export default defineConfig({
	// replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
	dialect: "pg",
	dialectConfig:{
		pool: new Pool({
			database: 'base_pruebas',
			host: 'localhost',
			user: 'ricardosolorzano',
			port: 5432,
			max: 10,
		})
	},
	migrations: {
		getMigrationPrefix: () => `${ dayjs().format('YYYY_MM_DD') }_${ dayjs().unix() - dayjs().startOf('day').unix() }_`,
	}
})
