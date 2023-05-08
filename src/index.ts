import * as utils from './utils'
import * as toml from './toml'
import * as path from 'path'
import * as child_process from 'node:child_process'

const CONFIG_PATH = '../config.toml'

type Config = {
    source: string
    destination: string
    completed: string
    encryption_key: string
}

/**
 * The entry point for the applicaiton.
 */
export const main = async () => {
    const config = await utils.get_file(CONFIG_PATH, true)
    const options: Config = {
        source: toml.getStringProp('general', 'source', config),
        destination: toml.getStringProp('general', 'destination', config),
        completed: toml.getStringProp('general', 'completed', config),
        encryption_key: toml.getStringProp('general', 'encryption_key', config),
    }
    await transcode_files(await utils.get_files(options.source), options)
}

export const transcode_files = async (
    files: string[],
    options: Config
): Promise<void> => {
    console.info(`Processing ${files.length} files`)
    for (let i = 0; i < files.length; i++) {
        const file: string = files[i]
        console.info(`Processing ${i + 1}/${files.length} : ${path.parse(file).name}`)
        await transcode_file(
            file,
            options.source,
            options.destination,
            options.encryption_key
        )
        await cleanup_file(file, options.source, options.completed)
    }
    console.info(`completed processing all files`)
}

export const transcode_file = (
    file: string,
    source: string,
    destination: string,
    encryption_key: string
): Promise<void> => {
    return new Promise(resolver => {
        const command = `ffmpeg -y -activation_bytes ${encryption_key} -i '${path.join(
            source,
            file
        )}' -codec copy '${path.join(destination, path.parse(file).name)}.m4b'`
        child_process.exec(command, error => {
            if (error) {
                console.error(error)
                throw error
            }
            resolver()
        })
    })
}

export const cleanup_file = (
    file: string,
    source: string,
    completed: string
): Promise<void> => {
    return new Promise(resolver => {
        const command = `mv "${path.join(source, file)}" "${path.join(
            completed,
            file
        )}"`
        child_process.exec(command, error => {
            if (error) {
                console.error(error)
                throw error
            }
            resolver()
        })
    })
}

// Start the application
main()
