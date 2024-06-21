import Vector2D from '../../engine/types/Vector2D'

// Time unit is mili-second
// Velocity unit is pixels per second
// Accesslation unit is pixels per second squared

const config = {
    VELOCITY_CHANGING_INTERVAL: 1000,

    TREX_VELOCITY_X: 0,
    TREX_VELOCITY_Y: 0,
    TREX_JUMPING_VELOCITY: 600,
    TREX_JUMPING_ACCESSLATION: -2000,
    TREX_CANVAS_LOCATION: new Vector2D(100, 260),
    TREX_CHANGING_INTERVAL: 100,

    OBSTACLE_GENERATING_INTERVAL: 2000,

    CACTUS_VELOCITY_X: 450,
    CACTUS_VELOCITY_Y: 0,
    CACTUS_CANVAS_LOCATION: new Vector2D(1500, 257),

    BIRD_VELOCITY_X: 450,
    BIRD_VELOCITY_Y: 0,
    BIRD_HIGH_CANVAS_LOCATION: new Vector2D(1500, 242),
    BIRD_LOW_CANVAS_LOCATION: new Vector2D(1500, 267),
    BIRD_CHANGING_INTERVAL: 300,

    GROUND_VELOCITY_X: 450,
    GROUND_VELOCITY_Y: 0,
    GROUND_CANVAS_LOCATION: new Vector2D(0, 292),

    CLOUD_VELOCITY_X: 200,
    CLOUD_VELOCITY_Y: 0,
    CLOUD_CANVAS_LOCATION: new Vector2D(1500, 132),
    CLOUD_GENERATING_INTERVAL: 3000,
    CLOUD_LOW_Y: 162,
    CLOUD_HIGH_Y: 238,

    SCOREBOARD_CANVAS_LOCATION: new Vector2D(1000, 82),
    SCOREBOARD_SCORE_CHANGING_INTERVAL: 100,
} as const

export default config
