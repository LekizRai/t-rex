import { Coor2D } from '../types/general'

// Time unit is mili-second
// Velocity unit is pixels per second
// Accesslation unit is pixels per second squared

const config = {
    TREX_VELOCITY_X: 0,
    TREX_VELOCITY_Y: 0,
    TREX_JUMPING_VELOCITY: 900,
    TREX_JUMPING_ACCESSLATION: -5000,
    TREX_CANVAS_LOCATION: { x: 200, y: 368 } as Coor2D,
    TREX_CHANGING_INTERVAL: 100,

    CACTUS_VELOCITY_X: 500,
    CACTUS_VELOCITY_Y: 0,
    CACTUS_CANVAS_LOCATION: { x: 1500, y: 365 } as Coor2D,
    CACTUS_GENERATING_INTERVAL: 2000,

    GROUND_VELOCITY_X: 500,
    GROUND_VELOCITY_Y: 0,
    GROUND_CANVAS_LOCATION: { x: 0, y: 400 } as Coor2D,

    CLOUD_VELOCITY_X: 200,
    CLOUD_VELOCITY_Y: 0,
    CLOUD_CANVAS_LOCATION: { x: 1500, y: 340 } as Coor2D,
    CLOUD_GENERATING_INTERVAL: 2000,
    CLOUD_LOW_Y: 270,
    CLOUD_HIGH_Y: 340,

    BIRD_VELOCITY_X: 0,
    BIRD_VELOCITY_Y: 0,
    BIRD_CANVAS_LOCATION: { x: 0, y: 0 } as Coor2D,
    BIRD_CHANGING_INTERVAL: 1000,

    SCOREBOARD_CANVAS_LOCATION: { x: 1000, y: 250 } as Coor2D,
    SCOREBOARD_SCORE_CHANGING_INTERVAL: 100,
} as const

export default config
