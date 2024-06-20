import Vector2D from "./Vector2D"

// Time unit is mili-second
// Velocity unit is pixels per second
// Accesslation unit is pixels per second squared

const config = {
    TREX_VELOCITY_X: 0,
    TREX_VELOCITY_Y: 0,
    TREX_JUMPING_VELOCITY: 600,
    TREX_JUMPING_ACCESSLATION: -2000,
    TREX_CANVAS_LOCATION: new Vector2D(200, 368), // { x: 200, y: 368 } as Coor2D,
    TREX_CHANGING_INTERVAL: 100,

    CACTUS_VELOCITY_X: 450,
    CACTUS_VELOCITY_Y: 0,
    CACTUS_CANVAS_LOCATION: new Vector2D(1500, 365), // { x: 1500, y: 365 } as Coor2D,
    CACTUS_GENERATING_INTERVAL: 2000,

    GROUND_VELOCITY_X: 450,
    GROUND_VELOCITY_Y: 0,
    GROUND_CANVAS_LOCATION: new Vector2D(0, 400), // { x: 0, y: 400 } as Coor2D,

    CLOUD_VELOCITY_X: 200,
    CLOUD_VELOCITY_Y: 0,
    CLOUD_CANVAS_LOCATION: new Vector2D(1500, 340), // { x: 1500, y: 340 } as Coor2D,
    CLOUD_GENERATING_INTERVAL: 2000,
    CLOUD_LOW_Y: 270,
    CLOUD_HIGH_Y: 340,

    BIRD_VELOCITY_X: 0,
    BIRD_VELOCITY_Y: 0,
    BIRD_CANVAS_LOCATION: new Vector2D(0, 0), // { x: 0, y: 0 } as Coor2D,
    BIRD_CHANGING_INTERVAL: 300,

    SCOREBOARD_CANVAS_LOCATION: new Vector2D(1000, 250), // { x: 1000, y: 250 } as Coor2D,
    SCOREBOARD_SCORE_CHANGING_INTERVAL: 100,
} as const

export default config
