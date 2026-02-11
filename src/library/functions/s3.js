import { FilesService } from "../services/files.service";

const filesService = new FilesService()

export const imagePath = async (folder, imageName) => {
    const filepath = folder + '/' + imageName
    const data = await filesService.getFile(filepath)
    console.log("Data at imagePath", data)
    let url = null
    if(data?.image) url = 'data:image/jpeg;base64,' + data.image
    else if (data?.imageUrl) url = data.imageUrl
    return url 
}