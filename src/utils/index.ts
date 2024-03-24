import path from "path"
import { fileNames } from "../constants/filenames"

export const getFileNameFromIndex = (index: number) => {
    return fileNames[index] || fileNames[0]
}
export const getFilePath = (key: string) => {
    const fileName = getFileNameFromIndex(parseInt(key))
    return path.resolve(__dirname, `../files/${fileName}.csv`);
}