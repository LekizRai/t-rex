import { SpriteClip, Coor2D, TexInfo } from '../types/general'
import sprite from '../utils/sprites'
import GameObject from './GameObject'

abstract class Text extends GameObject {}
//     private spriteList: SpriteClip[]
//     private content: string

//     constructor(velocityX: number, velocityY: number) {
//         super()
//         this.velocityX = velocityX
//         this.velocityY = velocityY
//         this.changingTimeLeft = 0
//         this.spriteList = []
//         this.content = ''
//     }

//     // This for number only
//     private stringToSprite(): void {
//         this.spriteList.length = 0
//         for (let i: number = this.content.length - 1; i > -1; i--) {
//             this.spriteList.push(sprite.NUMBER_SPRITES[Number(this.content[i])].clip)
//         }
//     }
// }

// export default Text
