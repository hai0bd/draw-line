import { _decorator, Component, Node, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DataManager')
export class DataManager extends Component {
    private static _instance: DataManager;

    keyPlayerData: string = "CubePlayerData";
    playerData: PlayerData;

    public static get instance(): DataManager {
        if (!this._instance) {
            this._instance = new DataManager;
        }
        return this._instance;
    }

    onLoad() {
        // this.resetData();
        if (!DataManager._instance) {
            DataManager._instance = this;
        } else {
            this.destroy();
        }

        this.loadPlayerData();
    }

    loadPlayerData() {
        let data = sys.localStorage.getItem(this.keyPlayerData);
        if (data) {
            this.playerData = JSON.parse(data);
        }
        else this.playerData = new PlayerData();
    }

    addLevel() {
        let level = ++this.playerData.currentLevel;
        this.playerData.levelID.push(level);
    }

    addBall() {
        let ball = ++this.playerData.currentBall;
        this.playerData.ballID.push[ball];
    }

    addBox() {
        let box = ++this.playerData.currentBox;
        this.playerData.boxID.push[box];
    }

    addGem() {
        this.playerData.gem++;
    }

    saveData() {
        var jsonData = JSON.stringify(this.playerData);
        sys.localStorage.setItem(this.keyPlayerData, jsonData);
    }

    resetData() {
        sys.localStorage.clear();
    }
}

export class PlayerData {
    levelID: number[] = [];
    currentLevel: number = this.levelID[this.levelID.length - 1];
    ballID: number[] = [];
    currentBall: number = this.ballID[this.ballID.length - 1];
    boxID: number[] = [];
    currentBox: number = this.boxID[this.boxID.length - 1];
    gem: number = 0;
    noAds: boolean;
    skip: number;
    musicToggle: boolean;
    soundToggle: boolean;
    vibrationToggle: boolean;

    constructor() {
        this.levelID = [0];
        this.ballID = [0];
        this.boxID = [0];
        this.currentLevel = 0;
        this.currentBall = 0;
        this.currentBox = 0;
        this.gem = 0;
        this.noAds = false;
        this.skip = 0;
        this.musicToggle = false;
        this.soundToggle = false;
        this.vibrationToggle = false;
    }
}
