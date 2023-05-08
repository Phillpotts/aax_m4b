import { describe, expect, test } from '@jest/globals'
import * as toml from '../src/toml'

describe('toml string to javascript object', () => {
    test('creates object that only has a single section and single keypair', () => {

        const toml_str =
            `
            
            [section]
            name = "William"
            `

        const toml_obj = {
            section: {
                name: "William"
            }
        }

        expect(toml.toObject(toml_str)).toStrictEqual(toml_obj)
    })
})
