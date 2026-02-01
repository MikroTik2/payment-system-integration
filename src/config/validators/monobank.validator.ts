import { IsString } from 'class-validator'

export class MonobankValidator {
     @IsString()
     MONOBANK_PUBLIC_KEY_TEST: string
}