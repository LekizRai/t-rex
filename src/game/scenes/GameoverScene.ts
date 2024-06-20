import Scene from '../../engine/base-classes/Scene'
import Message from '../../engine/controllers/Message'
import PhysicsManager from '../../engine/controllers/PhysicsManager'
import SceneManager from '../../engine/controllers/SceneManager'
import Vector2D from '../../engine/utils/Vector2D'
import config from '../../engine/utils/configs'
import TRexScene from './TRexScene'
import Bird from '../objects/bird/Bird'
import Cactus from '../objects/cactus/Cactus'
import CactusManager from '../objects/cactus/CactusManager'
import Cloud from '../objects/cloud/Cloud'
import CloudManager from '../objects/cloud/CloudManager'
import GameOver from '../objects/gameover/GameOver'
import ReplayButton from '../objects/gameover/ReplayButton'
import Ground from '../objects/ground/Ground'
import ScoreBoard from '../objects/scoreboard/ScoreBoard'
import TRex from '../objects/trex/TRex'

// => clear full => resize canvas => viewport

const state = {
    PLAY: 'play',
    GAMEOVER: 'gameover',
    PAUSED: 'paused',
}

class GameoverScene extends Scene {
    private gameOver: GameOver
    private replayButton: ReplayButton

    constructor() {
        super()
    }

    public handleInput(message: Message) {}

    public update(timeInterval: number): void {}

    public reload(): void {
        this.replayButton.setActive(true)
    }

    public setup(): void {
        console.log(12)
        this.gameOver = new GameOver()
        this.replayButton = new ReplayButton(new Vector2D(680, 300))
        this.inputHandler.attachMouseEvent(this.replayButton)
        this.replayButton.setActive(true)
        this.replayButton.attach(() => {
            this.replayButton.setActive(false)
            this.isActive = false
            SceneManager.getInstance().setSceneStatus(0, true)
            SceneManager.getInstance().reloadScene(0)
        })
        this.addObject(this.gameOver)
        this.addObject(this.replayButton)
    }
}

export default GameoverScene
