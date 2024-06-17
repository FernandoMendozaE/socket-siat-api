import { config } from 'dotenv'

config()

// * Declaración de variables de entorno
export const PORT = process.env.PORT || 8000
export const MONGODB_URI = process.env.MONGODB_URI || 'localhost:27020'
