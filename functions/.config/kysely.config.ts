import { defineConfig } from 'kysely-ctl'
import {Pool} from 'pg'
import dayjs from 'dayjs'

export default defineConfig({
	// replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
	dialect: "pg",
	dialectConfig:{
		pool: new Pool({
			connectionString: process.env.DATABASE_URL
		})
	},
	migrations: {
		getMigrationPrefix: () => `${ dayjs().format('YYYY_MM_DD') }_${ dayjs().unix() - dayjs().startOf('day').unix() }_`,
	}
})
