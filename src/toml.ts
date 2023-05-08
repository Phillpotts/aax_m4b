interface TomlObject {
    [key: string]: TomlSection
}

interface TomlSection {
    [key: string]: string | number
}

/**
 * Converts a string of toml into a javascript object
 * @param toml a string of toml
 * @returns
 */
export const toObject = (toml: string): TomlObject => {
    const lines = toml.split('\n')
    let section = ''
    const obj: TomlObject = {}

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        if (line.length === 0) continue
        if (line[0] === '[' && line[line.length - 1] === ']') {
            section = line.substring(1, line.length - 1)
            obj[section] = {}
        } else {
            const keypair = line.split('=', 2)
            obj[section][keypair[0].trim()] = JSON.parse(keypair[1])
        }
    }

    return obj
}

/**
 * Get a toml string porperty value
 * @param section
 * @param prop
 * @returns
 */
export const getStringProp = (
    section: string,
    prop: string,
    toml: string
): string => {
    const toml_obj = toObject(toml)
    return toml_obj[section][prop].toString()
}

/**
 * Get a toml number porperty value
 * @param section
 * @param prop
 * @returns
 */
export const getNumberProp = (
    section: string,
    prop: string,
    toml: string
): number => {
    const toml_obj = toObject(toml)
    return Number(toml_obj[section][prop])
}
