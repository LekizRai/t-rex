import { SpriteClip } from '../../engine/types/general'
import Vector2D from '../../engine/types/Vector2D'

const sprite = {
    CLOUD_SPRITE: {
        clip: { coor: new Vector2D(164, 0), width: 96, height: 32, scale: 0.5 } as SpriteClip,
        adjust: new Vector2D(0, 0),
    },

    BIRD_SPRITE: [
        {
            clip: { coor: new Vector2D(262, 16), width: 88, height: 64, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0),
        },
        {
            clip: { coor: new Vector2D(354, 4), width: 88, height: 56, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, -4),
        },
    ],

    CACTUS_SPRITES: [
        {
            clip: { coor: new Vector2D(446, 2), width: 34, height: 70, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 14),
        },
        {
            clip: { coor: new Vector2D(480, 2), width: 68, height: 70, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 14),
        },
        {
            clip: { coor: new Vector2D(548, 2), width: 102, height: 70, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 14),
        },
        {
            clip: { coor: new Vector2D(652, 2), width: 50, height: 100, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0),
        },
        {
            clip: { coor: new Vector2D(702, 2), width: 48, height: 100, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0), 
        },
        {
            clip: { coor: new Vector2D(752, 2), width: 98, height: 100, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0), 
        },
        {
            clip: { coor: new Vector2D(850, 2), width: 102, height: 100, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0), 
        },
    ],

    TREX_SPRITES: [
        {
            // Running first frame
            clip: { coor: new Vector2D(1516, 4), width: 84, height: 90, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0), 
        },
        {
            // Running second frame
            clip: { coor: new Vector2D(1604, 4), width: 84, height: 90, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0), 
        },
        {
            // Ducking first frame
            clip: { coor: new Vector2D(1868, 38), width: 114, height: 56, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 16), 
        },
        {
            // Ducking second frame
            clip: { coor: new Vector2D(1986, 38), width: 114, height: 56, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 16), 
        },
        {
            // Jumping frame
            clip: { coor: new Vector2D(1340, 4), width: 84, height: 90, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0), 
        },
        {
            // Blinking first frame
            clip: { coor: new Vector2D(1428, 4), width: 84, height: 90, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0), 
        },
        {
            // Blinking second frame
            clip: { coor: new Vector2D(1692, 4), width: 84, height: 90, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0),
        },
        {
            // Start TRex
            clip: { coor: new Vector2D(78, 6), width: 88, height: 92, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0),
        },
    ],

    GROUND_SPRITE: {
        clip: { coor: new Vector2D(0, 102), width: 2404, height: 28, scale: 0.5 } as SpriteClip,
        adjust: new Vector2D(0, 0),
    },

    NUMBER_SPRITES: {
        '0': {
            // 0
            clip: { coor: new Vector2D(952, 0), width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0),
        },
        '1': {
            // 1
            clip: { coor: new Vector2D(974, 0), width: 20, height: 26, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0), 
        },
        '2': {
            // 2
            clip: { coor: new Vector2D(992, 0), width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0), 
        },
        '3': {
            // 3
            clip: { coor: new Vector2D(1012, 0), width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0), 
        },
        '4': {
            // 4
            clip: { coor: new Vector2D(1032, 0), width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0), 
        },
        '5': {
            // 5
            clip: { coor: new Vector2D(1052, 0), width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0), 
        },
        '6': {
            // 6
            clip: { coor: new Vector2D(1072, 0), width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0), 
        },
        '7': {
            // 7
            clip: { coor: new Vector2D(1092, 0), width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0), 
        },
        '8': {
            // 8
            clip: { coor: new Vector2D(1112, 0), width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0), 
        },
        '9': {
            // 9
            clip: { coor: new Vector2D(1132, 0), width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: new Vector2D(0, 0), 
        },
    },

    HI_SPRITE: {
        clip: { coor: new Vector2D(1152, 0), width: 42, height: 26, scale: 0.5 } as SpriteClip,
        adjust: new Vector2D(0, 0), 
    },

    GAMEOVER_SPRITE: {
        clip: { coor: new Vector2D(952, 28), width: 384, height: 24, scale: 0.75 } as SpriteClip,
        adjust: new Vector2D(0, 0), 
    },

    PLAY_BUTTON_SPRITE: {
        clip: { coor: new Vector2D(2, 2), width: 72, height: 64, scale: 0.5 } as SpriteClip,
        adjust: new Vector2D(0, 0), 
    },
} as const

export default sprite
