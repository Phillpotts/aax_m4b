import * as fs from 'fs'
import * as path from 'path'

/**
 * load file content to string
 * @param file the file to load
 * @returns string of the files content
 */
export const get_file = (file: string, relative = false): Promise<string> => {
    return new Promise(resolver => {
        const file_path = relative ? path.join(__dirname, file) : file
        fs.readFile(file_path, (err, data) => {
            if (err) {
                console.error(err)
                throw err
            }
            resolver(data.toString())
        })
    })
}

/**
 * get all files from a directory
 * @param dir the dir to get files form
 * @param relative is the dir passed relative to the current working directory
 * @returns a string list of all files in the directory
 */
export const get_files = (dir: string, relative = false): Promise<string[]> => {
    return new Promise(resolver => {
        const dir_path = relative ? path.join(__dirname, dir) : dir
        fs.readdir(dir_path, (err, files) => {
            if (err) {
                console.error(err)
                throw err
            }
            resolver(files)
        })
    })
}
