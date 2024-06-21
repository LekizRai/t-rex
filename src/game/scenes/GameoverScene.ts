import Scene from '../../engine/scene/Scene'
import Message from '../../engine/controllers/Message'
import SceneManager from '../../engine/controllers/SceneManager'
import Vector2D from '../../engine/types/Vector2D'
import GameOver from '../objects/gameover/GameOver'
import ReplayButton from '../objects/gameover/ReplayButton'
import sprite from '../utils/sprites'

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
        this.gameOver = new GameOver()
        this.replayButton = new ReplayButton(new Vector2D(680, 300), sprite.PLAY_BUTTON_SPRITE.clip, 2)
        this.inputHandler.attachMouseEvent(this.replayButton)
        this.replayButton.setActive(true)
        this.replayButton.attach(() => {
            this.replayButton.setActive(false)
            this.setActive(false)
            SceneManager.getInstance().setSceneStatus(0, true)
            SceneManager.getInstance().reloadScene(0)
        })
        this.addObject(this.gameOver)
        this.addObject(this.replayButton)
    }
}

export default GameoverScene
