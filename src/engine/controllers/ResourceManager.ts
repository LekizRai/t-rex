import { TexInfo } from '../types/general'
import Drawer from '../utils/webgl-utils/Drawer'

class ResourceManger {
    private texList: TexInfo[]
    private static instance: ResourceManger

    private constructor() {
        this.texList = []
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new ResourceManger()
        }
        return this.instance
    }

    public loadImage(filename: string) {
        let tex = Drawer.getInstance().loadImageAndCreateTextureInfo("assets/images/" + filename)
        this.texList.push(tex)
    }

    public getTex(index: number) {
        if (index >= 0 && index < this.texList.length) {
            return this.texList[index]
        }
        return this.texList[0]
    }
}

export default ResourceManger
