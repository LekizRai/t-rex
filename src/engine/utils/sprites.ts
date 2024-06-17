import { Coor2D, SpriteClip } from '../types/general'

const sprite = {
    CLOUD_SPRITE: {
        clip: { coor: { x: 164, y: 0 }, width: 96, height: 32, scale: 0.5 } as SpriteClip,
        adjust: { x: 0, y: 0 } as Coor2D,
    },

    BIRD_SPRITE: [
        {
            clip: { coor: { x: 262, y: 16 }, width: 88, height: 64, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
        {
            clip: { coor: { x: 354, y: 4 }, width: 88, height: 56, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
    ],

    CACTUS_SPRITES: [
        {
            clip: { coor: { x: 446, y: 2 }, width: 34, height: 70, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 14 } as Coor2D as Coor2D,
        },
        {
            clip: { coor: { x: 480, y: 2 }, width: 68, height: 70, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 14 } as Coor2D as Coor2D,
        },
        {
            clip: { coor: { x: 548, y: 2 }, width: 102, height: 70, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 14 } as Coor2D as Coor2D,
        },
        {
            clip: { coor: { x: 652, y: 2 }, width: 50, height: 100, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D as Coor2D,
        },
        {
            clip: { coor: { x: 702, y: 2 }, width: 48, height: 100, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D as Coor2D,
        },
        {
            clip: { coor: { x: 752, y: 2 }, width: 98, height: 100, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D as Coor2D,
        },
        {
            clip: { coor: { x: 850, y: 2 }, width: 102, height: 100, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
    ],

    TREX_SPRITES: [
        {
            // Running first frame
            clip: { coor: { x: 1516, y: 4 }, width: 84, height: 90, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
        {
            // Running second frame
            clip: { coor: { x: 1604, y: 4 }, width: 84, height: 90, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
        {
            // Ducking first frame
            clip: { coor: { x: 1868, y: 38 }, width: 114, height: 56, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 16 } as Coor2D,
        },
        {
            // Ducking second frame
            clip: { coor: { x: 1986, y: 38 }, width: 114, height: 56, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 16 } as Coor2D,
        },
        {
            // Jumping frame
            clip: { coor: { x: 1340, y: 4 }, width: 84, height: 90, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
        {
            // Blinking first frame
            clip: { coor: { x: 1428, y: 4 }, width: 84, height: 90, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
        {
            // Blinking second frame
            clip: { coor: { x: 1692, y: 4 }, width: 84, height: 90, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
        {
            // start TRex
            clip: { coor: { x: 78, y: 6 }, width: 88, height: 92, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
    ],

    GROUND_SPRITE: {
        clip: { coor: { x: 0, y: 102 }, width: 2404, height: 28, scale: 0.5 } as SpriteClip,
        adjust: { x: 0, y: 0 } as Coor2D,
    },

    NUMBER_SPRITES: [
        {
            // 0
            clip: { coor: { x: 952, y: 0 }, width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
        {
            // 1
            clip: { coor: { x: 974, y: 0 }, width: 20, height: 26, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
        {
            // 2
            clip: { coor: { x: 992, y: 0 }, width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
        {
            // 3
            clip: { coor: { x: 1012, y: 0 }, width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
        {
            // 4
            clip: { coor: { x: 1032, y: 0 }, width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
        {
            // 5
            clip: { coor: { x: 1052, y: 0 }, width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
        {
            // 6
            clip: { coor: { x: 1072, y: 0 }, width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
        {
            // 7
            clip: { coor: { x: 1092, y: 0 }, width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
        {
            // 8
            clip: { coor: { x: 1112, y: 0 }, width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
        {
            // 9
            clip: { coor: { x: 1132, y: 0 }, width: 22, height: 26, scale: 0.5 } as SpriteClip,
            adjust: { x: 0, y: 0 } as Coor2D,
        },
    ],

    HI_SPRITE: {
        clip: { coor: { x: 1152, y: 0 }, width: 42, height: 26, scale: 0.5 } as SpriteClip,
        adjust: { x: 0, y: 0 } as Coor2D,
    },

    GAMEOVER_SPRITE: {
        clip: { coor: { x: 952, y: 28 }, width: 386, height: 24, scale: 0.5 } as SpriteClip,
        adjust: { x: 0, y: 0 } as Coor2D,
    },

    PLAY_BUTTON_SPRITE: {
        clip: { coor: { x: 2, y: 2 }, width: 72, height: 64, scale: 0.5 } as SpriteClip,
        adjust: { x: 0, y: 0 } as Coor2D,
    },
} as const

export default sprite
