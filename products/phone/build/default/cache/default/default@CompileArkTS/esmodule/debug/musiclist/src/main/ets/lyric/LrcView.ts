if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface shiLrcView_Params {
    lyricMilliSecondsTime?: number;
    mLrcEntryList?: Array<LrcEntry>;
    lyricScrollEffect?: LyricScrollEffect;
    isPlay?: boolean;
    mNormalTextColor?;
    viewWidth?: number;
    viewHeight?: number;
    settings?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    mCurrentLine?: number;
    lyricRectangle?: Rectangle;
    TEXT_ADD_SIZE?;
    lyricTopPosition?: LyricTopPosition;
    initFirstLineY?: number;
    animator?: AnimatorResult;
    mNormalTextSize?: number;
    mDividerHeight?;
    mCurrentTextSize?: number;
    fontFamily?;
    mCurrentTextColor?;
    fontWeight?;
    paddingLeft?;
    paddingRight?;
    paddingTop?;
    paddingBottom?;
    lrcWidth?: number;
    lrcHeight?: number;
    lrcX?: number;
    lrcY?: number;
    curCanvasOffsetY?: number;
    starAverageAngle?: number;
    starOutCircleAngle?: number;
    starInCircleAngle?: number;
    starsPath2D?: Path2D;
    starsColor?: string;
    canvasMinOffsetY?: number;
    canvasMaxOffsetY?: number;
}
import type { AnimatorResult } from "@ohos:animator";
import { Logger } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import type { LrcEntry } from './LrcEntry';
import { angleToRadian } from "@bundle:com.huawei.music.musichome/phone@musiclist/ets/lyric/LrcUtils";
import { Rectangle } from "@bundle:com.huawei.music.musichome/phone@musiclist/ets/lyric/LyricConst";
import type { LyricTopPosition, LyricScrollEffect } from "@bundle:com.huawei.music.musichome/phone@musiclist/ets/lyric/LyricConst";
/**
 * Default number of rows.
 */
const NONE_LINE: number = -1;
/**
 * Stars a few corners
 */
const STAR_ANGLE_NUMBER: number = 5;
/**
 * No lyrics.
 */
const EMPTY_LYRIC: LrcEntry = { lineStartTime: 0, lineDuration: 0, lineWords: '此歌曲为纯音乐，请您欣赏', words: [] };
/**
 * Lyrics gradient color spacing.
 */
const GRADIENT_PROGRESS_SPACE = 0.0000001;
/**
 * Lyrics gradient color spacing.
 */
const GRADIENT_PROGRESS_MAX = 1 - GRADIENT_PROGRESS_SPACE;
export default class shiLrcView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__lyricMilliSecondsTime = new SynchedPropertySimpleOneWayPU(params.lyricMilliSecondsTime, this, "lyricMilliSecondsTime");
        this.__mLrcEntryList = new SynchedPropertyObjectOneWayPU(params.mLrcEntryList, this, "mLrcEntryList");
        this.__lyricScrollEffect = new SynchedPropertySimpleOneWayPU(params.lyricScrollEffect, this, "lyricScrollEffect");
        this.__isPlay = new SynchedPropertySimpleOneWayPU(params.isPlay, this, "isPlay");
        this.mNormalTextColor = '#99ffffff';
        this.viewWidth = 360;
        this.viewHeight = 500;
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.mCurrentLine = NONE_LINE;
        this.lyricRectangle = new Rectangle(0, 0, 0, 0);
        this.TEXT_ADD_SIZE = 2;
        this.lyricTopPosition = 0;
        this.initFirstLineY = 0;
        this.animator = this.getUIContext().createAnimator({
            duration: 400,
            easing: 'linear',
            delay: 0,
            fill: 'forwards',
            direction: 'normal',
            iterations: 1,
            begin: 0,
            end: 1
        });
        this.mNormalTextSize = 20;
        this.mDividerHeight = 24;
        this.mCurrentTextSize = 24;
        this.fontFamily = 'HarmonyHeiTi';
        this.mCurrentTextColor = '#FFFFFF';
        this.fontWeight = 'bold';
        this.paddingLeft = 0;
        this.paddingRight = 0;
        this.paddingTop = 0;
        this.paddingBottom = 0;
        this.lrcWidth = 0;
        this.lrcHeight = 0;
        this.lrcX = 0;
        this.lrcY = 0;
        this.curCanvasOffsetY = 0;
        this.starAverageAngle = 0;
        this.starOutCircleAngle = 0;
        this.starInCircleAngle = 0;
        this.starsPath2D = new Path2D();
        this.starsColor = '#18BBFC';
        this.canvasMinOffsetY = 0;
        this.canvasMaxOffsetY = 0;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("lyricMilliSecondsTime", this.onTimeUpdated);
        this.declareWatch("mLrcEntryList", this.onLyricUpdated);
        this.declareWatch("lyricScrollEffect", this.onTimeUpdated);
        this.declareWatch("isPlay", this.playLyrics);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: shiLrcView_Params) {
        if (params.mLrcEntryList === undefined) {
            this.__mLrcEntryList.set([]);
        }
        if (params.lyricScrollEffect === undefined) {
            this.__lyricScrollEffect.set(0);
        }
        if (params.isPlay === undefined) {
            this.__isPlay.set(false);
        }
        if (params.mNormalTextColor !== undefined) {
            this.mNormalTextColor = params.mNormalTextColor;
        }
        if (params.viewWidth !== undefined) {
            this.viewWidth = params.viewWidth;
        }
        if (params.viewHeight !== undefined) {
            this.viewHeight = params.viewHeight;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.mCurrentLine !== undefined) {
            this.mCurrentLine = params.mCurrentLine;
        }
        if (params.lyricRectangle !== undefined) {
            this.lyricRectangle = params.lyricRectangle;
        }
        if (params.TEXT_ADD_SIZE !== undefined) {
            this.TEXT_ADD_SIZE = params.TEXT_ADD_SIZE;
        }
        if (params.lyricTopPosition !== undefined) {
            this.lyricTopPosition = params.lyricTopPosition;
        }
        if (params.initFirstLineY !== undefined) {
            this.initFirstLineY = params.initFirstLineY;
        }
        if (params.animator !== undefined) {
            this.animator = params.animator;
        }
        if (params.mNormalTextSize !== undefined) {
            this.mNormalTextSize = params.mNormalTextSize;
        }
        if (params.mDividerHeight !== undefined) {
            this.mDividerHeight = params.mDividerHeight;
        }
        if (params.mCurrentTextSize !== undefined) {
            this.mCurrentTextSize = params.mCurrentTextSize;
        }
        if (params.fontFamily !== undefined) {
            this.fontFamily = params.fontFamily;
        }
        if (params.mCurrentTextColor !== undefined) {
            this.mCurrentTextColor = params.mCurrentTextColor;
        }
        if (params.fontWeight !== undefined) {
            this.fontWeight = params.fontWeight;
        }
        if (params.paddingLeft !== undefined) {
            this.paddingLeft = params.paddingLeft;
        }
        if (params.paddingRight !== undefined) {
            this.paddingRight = params.paddingRight;
        }
        if (params.paddingTop !== undefined) {
            this.paddingTop = params.paddingTop;
        }
        if (params.paddingBottom !== undefined) {
            this.paddingBottom = params.paddingBottom;
        }
        if (params.lrcWidth !== undefined) {
            this.lrcWidth = params.lrcWidth;
        }
        if (params.lrcHeight !== undefined) {
            this.lrcHeight = params.lrcHeight;
        }
        if (params.lrcX !== undefined) {
            this.lrcX = params.lrcX;
        }
        if (params.lrcY !== undefined) {
            this.lrcY = params.lrcY;
        }
        if (params.curCanvasOffsetY !== undefined) {
            this.curCanvasOffsetY = params.curCanvasOffsetY;
        }
        if (params.starAverageAngle !== undefined) {
            this.starAverageAngle = params.starAverageAngle;
        }
        if (params.starOutCircleAngle !== undefined) {
            this.starOutCircleAngle = params.starOutCircleAngle;
        }
        if (params.starInCircleAngle !== undefined) {
            this.starInCircleAngle = params.starInCircleAngle;
        }
        if (params.starsPath2D !== undefined) {
            this.starsPath2D = params.starsPath2D;
        }
        if (params.starsColor !== undefined) {
            this.starsColor = params.starsColor;
        }
        if (params.canvasMinOffsetY !== undefined) {
            this.canvasMinOffsetY = params.canvasMinOffsetY;
        }
        if (params.canvasMaxOffsetY !== undefined) {
            this.canvasMaxOffsetY = params.canvasMaxOffsetY;
        }
    }
    updateStateVars(params: shiLrcView_Params) {
        this.__lyricMilliSecondsTime.reset(params.lyricMilliSecondsTime);
        this.__mLrcEntryList.reset(params.mLrcEntryList);
        this.__lyricScrollEffect.reset(params.lyricScrollEffect);
        this.__isPlay.reset(params.isPlay);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__lyricMilliSecondsTime.purgeDependencyOnElmtId(rmElmtId);
        this.__mLrcEntryList.purgeDependencyOnElmtId(rmElmtId);
        this.__lyricScrollEffect.purgeDependencyOnElmtId(rmElmtId);
        this.__isPlay.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__lyricMilliSecondsTime.aboutToBeDeleted();
        this.__mLrcEntryList.aboutToBeDeleted();
        this.__lyricScrollEffect.aboutToBeDeleted();
        this.__isPlay.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /**
     * Current lyric time [ms].
     */
    private __lyricMilliSecondsTime: SynchedPropertySimpleOneWayPU<number>;
    get lyricMilliSecondsTime() {
        return this.__lyricMilliSecondsTime.get();
    }
    set lyricMilliSecondsTime(newValue: number) {
        this.__lyricMilliSecondsTime.set(newValue);
    }
    /**
     * Lyrics content.
     */
    private __mLrcEntryList: SynchedPropertySimpleOneWayPU<Array<LrcEntry>>;
    get mLrcEntryList() {
        return this.__mLrcEntryList.get();
    }
    set mLrcEntryList(newValue: Array<LrcEntry>) {
        this.__mLrcEntryList.set(newValue);
    }
    /**
     * Lyrics scrolling effect.
     */
    private __lyricScrollEffect: SynchedPropertySimpleOneWayPU<LyricScrollEffect>;
    get lyricScrollEffect() {
        return this.__lyricScrollEffect.get();
    }
    set lyricScrollEffect(newValue: LyricScrollEffect) {
        this.__lyricScrollEffect.set(newValue);
    }
    private __isPlay: SynchedPropertySimpleOneWayPU<boolean>;
    get isPlay() {
        return this.__isPlay.get();
    }
    set isPlay(newValue: boolean) {
        this.__isPlay.set(newValue);
    }
    private readonly mNormalTextColor;
    private viewWidth: number;
    private viewHeight: number;
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    private mCurrentLine: number;
    private lyricRectangle: Rectangle;
    private readonly TEXT_ADD_SIZE;
    /**
     * Location of the lyrics.
     */
    public readonly lyricTopPosition: LyricTopPosition;
    /**
     * Initial position of the first line of the lyrics.
     */
    private initFirstLineY: number;
    private animator: AnimatorResult;
    /**
     * Text size of the lyrics, in vp.
     */
    private mNormalTextSize: number;
    /**
     * Spacing of each line of lyrics, in vp. This spacing plays the star animation or white dot disappearing effect.
     */
    private mDividerHeight;
    /**
     * Size of the current lyrics, in vp.
     */
    private mCurrentTextSize: number;
    /**
     * Lyrics font.
     */
    private fontFamily;
    /**
     * The text color of the currently displayed lyrics
     */
    private mCurrentTextColor;
    /**
     * Lyrics font weight.
     */
    private fontWeight;
    /**
     * Distance between the lyrics and the left border.
     */
    private paddingLeft;
    /**
     * Distance between the lyrics and the right border.
     */
    private paddingRight;
    /**
     * Distance between the lyrics and the top border.
     */
    private paddingTop;
    /**
     * Distance between lyrics and bottom border.
     */
    private paddingBottom;
    /**
     * The width of the lyrics.
     */
    private lrcWidth: number;
    /**
     * Height lyrics.
     */
    private lrcHeight: number;
    /**
     * X-axis position of each line of text.
     */
    private lrcX: number;
    /**
     * Y-axis position of each line of text.
     */
    private lrcY: number;
    /**
     * Records the current canvas offset.
     */
    private curCanvasOffsetY: number;
    /**
     * How many degrees is each angle of a star.
     */
    private starAverageAngle: number;
    /**
     * The outer angle of the stars.
     */
    private starOutCircleAngle: number;
    /**
     * The interior angles of the stars.
     */
    private starInCircleAngle: number;
    /**
     * The path of the stars.
     */
    private starsPath2D: Path2D;
    /**
     * Star Color
     */
    private starsColor: string;
    /**
     * Canvas min offset y.
     */
    private canvasMinOffsetY: number;
    /**
     * Canvas max offset y.
     */
    private canvasMaxOffsetY: number;
    startAnimator(desOffsetY: number) {
        if (this.animator) {
            this.animator.finish();
        }
        this.animator = this.getUIContext().createAnimator({
            duration: 400,
            easing: 'linear',
            delay: 0,
            fill: 'forwards',
            direction: 'normal',
            iterations: 1,
            begin: this.curCanvasOffsetY,
            end: -desOffsetY
        });
        let that = this;
        Logger.info('[startAnimator] curOffset:' + this.curCanvasOffsetY + ',desOffset:' + (-desOffsetY));
        this.animator.onFrame = (value) => {
            that.drawContent(value);
        };
        this.animator.onCancel = () => {
        };
        this.animator.onFinish = () => {
        };
        this.animator.play();
    }
    playLyrics() {
        if (this.isPlay) {
            this.animator.play();
        }
        else {
            this.animator.pause();
        }
    }
    /**
     * Draw a star.
     *
     * @param x
     * @param y
     * @param outRadius
     * @param inRadius
     * @param rotateAngle
     */
    private drawStars(x: number, y: number, outRadius: number, inRadius: number, rotateAngle: number) {
        this.starsPath2D = new Path2D();
        this.context.fillStyle = this.starsColor;
        for (let i = 0; i < STAR_ANGLE_NUMBER; i++) {
            let outX = (Math.cos(angleToRadian(rotateAngle + this.starOutCircleAngle + i * this.starAverageAngle)) * outRadius) + x;
            let outY = -(Math.sin(angleToRadian(rotateAngle + this.starOutCircleAngle + i * this.starAverageAngle)) * outRadius) + y;
            let inX = (Math.cos(angleToRadian(rotateAngle + this.starInCircleAngle + i * this.starAverageAngle)) * inRadius) + x;
            let inY = -(Math.sin(angleToRadian(rotateAngle + this.starInCircleAngle + i * this.starAverageAngle)) * inRadius) + y;
            if (i === 0) {
                this.starsPath2D.moveTo(outX, outY);
            }
            this.starsPath2D.lineTo(outX, outY);
            this.starsPath2D.lineTo(inX, inY);
        }
        this.starsPath2D.closePath();
        this.context.fill(this.starsPath2D);
    }
    private calculate() {
        this.lrcWidth = this.viewWidth - this.paddingLeft - this.paddingRight;
        this.lrcHeight = this.viewHeight - this.paddingTop - this.paddingBottom;
        if (this.initFirstLineY === 0) {
            switch (this.lyricTopPosition) {
                case 1:
                    this.initFirstLineY = this.paddingTop + this.lrcHeight / 2.8;
                    break;
                case 0:
                    this.initFirstLineY = this.paddingTop;
                    break;
                default:
                    break;
            }
        }
        this.lrcX = 0;
        this.lrcY = this.initFirstLineY;
        this.starAverageAngle = 360 / STAR_ANGLE_NUMBER;
        this.starOutCircleAngle = 90 - this.starAverageAngle;
        let halfAverageAngle = this.starAverageAngle / 2;
        this.starInCircleAngle = halfAverageAngle + this.starOutCircleAngle;
    }
    private reset() {
        this.lrcY = this.initFirstLineY;
    }
    drawMiddle() {
        this.context.translate(0, -this.curCanvasOffsetY);
        this.context.beginPath();
        this.context.strokeStyle = Color.Red;
        this.context.moveTo(0, this.viewHeight / 2);
        this.context.lineTo(this.viewWidth, this.viewHeight / 2);
        this.context.stroke();
        this.context.closePath();
        this.context.translate(0, this.curCanvasOffsetY);
    }
    private getLineHeight(text: string, isCurrent?: boolean): number {
        let lineHeight = 0;
        if (isCurrent) {
            this.context.font = this.fontWeight + ' ' + this.mCurrentTextSize + 'vp ' + this.fontFamily;
        }
        else {
            this.context.font = this.fontWeight + ' ' + this.mNormalTextSize + 'vp ' + this.fontFamily;
        }
        let textMetrics: TextMetrics = this.context.measureText(text);
        if (textMetrics.width > this.lrcWidth) {
            let start = 0;
            let end = text.length - 1;
            let textTemp = text;
            while (this.context.measureText(text.substring(start, end)).width > this.lrcWidth) {
                if (textTemp.lastIndexOf(' ') !== -1) {
                    end = textTemp.lastIndexOf(' ');
                    textTemp = textTemp.substring(0, end);
                }
                else {
                    end--;
                }
            }
            if (this.context.measureText(text.substring(start, end)).width <= this.lrcWidth) {
                lineHeight += textMetrics.height;
                start = end;
            }
            if (start < text.length - 1) {
                lineHeight += textMetrics.height;
            }
        }
        else {
            lineHeight = textMetrics.height;
        }
        return lineHeight;
    }
    /**
     * Back to Gradient.
     * @param startX
     * @param startY
     * @param endX
     * @param endY
     * @param progress
     * @returns
     */
    private progressGrad(startX: number, startY: number, endX: number, endY: number, progress: number) {
        let grad = this.context.createLinearGradient(startX, startY, endX, endY);
        grad.addColorStop(progress, this.mCurrentTextColor);
        grad.addColorStop(progress + GRADIENT_PROGRESS_SPACE, this.mNormalTextColor);
        return grad;
    }
    private drawMultipleLine(lyric: LrcEntry, textMetrics: TextMetrics, isCurrent: boolean): number {
        let lineHeight = 0;
        let start = 0;
        let end = 1;
        this.context.textAlign = 'start';
        let text = lyric.lineWords;
        let textTemp = lyric.lineWords;
        end = text.length - 1;
        while (this.context.measureText(text.substring(start, end)).width > this.lrcWidth) {
            if (textTemp.lastIndexOf(' ') !== -1) {
                end = textTemp.lastIndexOf(' ');
                textTemp = textTemp.substring(0, end);
            }
            else {
                end--;
            }
        }
        if (this.context.measureText(text.substring(start, end)).width <= this.lrcWidth) {
            if (start === 0) {
                this.lrcY = this.lrcY + textMetrics.height + this.mDividerHeight;
            }
            else {
                this.lrcY = this.lrcY + textMetrics.height;
            }
            lineHeight += textMetrics.height;
            if (isCurrent) {
                this.context.fillText(text.substring(start, end), this.lrcX, this.lrcY, this.lrcWidth);
            }
            else {
                this.context.fillText(text.substring(start, end), this.lrcX, this.lrcY, this.lrcWidth);
            }
            start = end;
        }
        if (start !== 0 && text.charAt(start) === ' ') {
            start += 1;
        }
        if (start < text.length - 1) {
            this.lrcY = this.lrcY + textMetrics.height;
            lineHeight += textMetrics.height;
            if (isCurrent) {
                this.context.fillText(text.substring(start), this.lrcX, this.lrcY, this.lrcWidth);
            }
            else {
                this.context.fillText(text.substring(start), this.lrcX, this.lrcY, this.lrcWidth);
            }
        }
        return lineHeight;
    }
    private drawSingleLine(lyric: LrcEntry, textMetrics: TextMetrics, isCurrent: boolean): number {
        this.lrcY = this.lrcY + this.mDividerHeight + textMetrics.height;
        let text = lyric.lineWords;
        if (isCurrent) {
            switch (this.lyricScrollEffect) {
                case 2:
                    if (lyric.words && lyric.words.length > 0) {
                        let startX = this.lrcX - textMetrics.width / 2;
                        let endX = startX + textMetrics.width;
                        let gradY = this.lrcY - textMetrics.height / 2;
                        let wordX = startX;
                        this.context.textAlign = 'start';
                        for (let i = 0; i < lyric.words.length; i++) {
                            let wordStartTime = lyric.lineStartTime + lyric.words[i].wordStartTime;
                            let wordEndTime = lyric.lineStartTime + lyric.words[i].wordStartTime + lyric.words[i].duration;
                            if (wordStartTime <= this.lyricMilliSecondsTime && wordEndTime >= this.lyricMilliSecondsTime) {
                                let wordProgress = (this.lyricMilliSecondsTime - wordStartTime) / lyric.words[i].duration / lyric.words.length;
                                let wordPassedProgress = i / lyric.words.length;
                                let progress = wordPassedProgress + wordProgress;
                                this.context.fillStyle = this.progressGrad(startX, gradY, endX, gradY, progress);
                                this.context.font =
                                    this.fontWeight + ' ' + (this.mCurrentTextSize + this.TEXT_ADD_SIZE) + 'vp ' + this.fontFamily;
                                this.context.fillText(lyric.words[i].text, wordX, this.lrcY + this.TEXT_ADD_SIZE / 2, this.lrcWidth);
                            }
                            else {
                                this.context.font = this.fontWeight + ' ' + this.mCurrentTextSize + 'vp ' + this.fontFamily;
                                this.context.fillText(lyric.words[i].text, wordX, this.lrcY, this.lrcWidth);
                            }
                            wordX += this.context.measureText(lyric.words[i].text).width;
                        }
                    }
                    else {
                        this.context.textAlign = 'center';
                        this.context.fillText(text, this.lrcX, this.lrcY, this.lrcWidth);
                    }
                    break;
                case 1:
                    if (lyric.words && lyric.words.length > 0) {
                        this.context.textAlign = 'center';
                        let startX_g = this.lrcX - textMetrics.width / 2;
                        let endX_g = startX_g + textMetrics.width;
                        let gradY_g = this.lrcY - textMetrics.height / 2;
                        let progress = 0;
                        let findPlayingWord = false;
                        if (lyric.words && lyric.words.length > 0) {
                            for (let i = 0; i < lyric.words.length; i++) {
                                let wordStartTime = lyric.lineStartTime + lyric.words[i].wordStartTime;
                                let wordEndTime = lyric.lineStartTime + lyric.words[i].wordStartTime + lyric.words[i].duration;
                                if (wordStartTime <= this.lyricMilliSecondsTime && wordEndTime >= this.lyricMilliSecondsTime) {
                                    let wordProgress = (this.lyricMilliSecondsTime - wordStartTime) / lyric.words[i].duration / lyric.words.length;
                                    let wordPassedProgress = i / lyric.words.length;
                                    progress = wordPassedProgress + wordProgress;
                                    findPlayingWord = true;
                                    break;
                                }
                            }
                        }
                        if (!findPlayingWord) {
                            if (this.lyricMilliSecondsTime < lyric.lineStartTime) {
                                progress = 0;
                            }
                            else if (this.lyricMilliSecondsTime >= lyric.lineStartTime + lyric.lineDuration) {
                                progress = GRADIENT_PROGRESS_MAX;
                            }
                            else {
                                Logger.error('This should not be happening.');
                            }
                        }
                        this.context.fillStyle = this.progressGrad(startX_g, gradY_g, endX_g, gradY_g, progress);
                        this.context.fillText(text, this.lrcX, this.lrcY, this.lrcWidth);
                    }
                    else {
                        this.context.textAlign = 'center';
                        this.context.fillText(text, this.lrcX, this.lrcY, this.lrcWidth);
                    }
                    break;
                case 3:
                    if (lyric.words && lyric.words.length > 0) {
                        let textStartX = this.lrcX - textMetrics.width / 2;
                        let textEndX = textStartX + textMetrics.width;
                        let gradY_Star = this.lrcY - textMetrics.height / 2;
                        let wordXX = textStartX;
                        let starX = textStartX;
                        let starRotate = 0;
                        this.context.textAlign = 'start';
                        let findPlayingWordStar = false;
                        if (lyric.words && lyric.words.length > 0) {
                            for (let i = 0; i < lyric.words.length; i++) {
                                let wordStartTime = lyric.lineStartTime + lyric.words[i].wordStartTime;
                                let wordEndTime = lyric.lineStartTime + lyric.words[i].wordStartTime + lyric.words[i].duration;
                                if (wordStartTime <= this.lyricMilliSecondsTime && wordEndTime >= this.lyricMilliSecondsTime) {
                                    let wordProgress = (this.lyricMilliSecondsTime - wordStartTime) / lyric.words[i].duration / lyric.words.length;
                                    let wordPassedProgress = i / lyric.words.length;
                                    let progress = wordPassedProgress + wordProgress;
                                    this.context.fillStyle = this.progressGrad(textStartX, gradY_Star, textEndX, gradY_Star, progress);
                                    this.context.font = this.fontWeight + ' ' + this.mCurrentTextSize + 'vp ' + this.fontFamily;
                                    this.context.fillText(lyric.words[i].text, wordXX, this.lrcY, this.lrcWidth);
                                    findPlayingWordStar = true;
                                    starX = wordXX + this.context.measureText(lyric.words[i].text).width / 2;
                                }
                                else {
                                    this.context.font = this.fontWeight + ' ' + this.mCurrentTextSize + 'vp ' + this.fontFamily;
                                    this.context.fillText(lyric.words[i].text, wordXX, this.lrcY, this.lrcWidth);
                                }
                                wordXX += this.context.measureText(lyric.words[i].text).width;
                            }
                        }
                        if (!findPlayingWordStar) {
                            if (this.lyricMilliSecondsTime < lyric.lineStartTime) {
                                starX = textStartX;
                            }
                            else if (this.lyricMilliSecondsTime > lyric.lineStartTime + lyric.lineDuration) {
                                starX = this.lrcX + textMetrics.width / 2 -
                                    this.context.measureText(lyric.words[lyric.words.length - 1].text).width / 2;
                            }
                            else {
                                Logger.error('This should not be happening.');
                            }
                            let starY = this.lrcY - textMetrics.height;
                            this.drawStars(starX, starY, this.mDividerHeight / 2, this.mDividerHeight / 4, 0);
                        }
                        else {
                            let starY = this.lrcY - textMetrics.height;
                            this.drawStars(starX, starY, this.mDividerHeight / 2, this.mDividerHeight / 4, starRotate);
                        }
                    }
                    else {
                        this.context.textAlign = 'center';
                        this.context.fillText(text, this.lrcX, this.lrcY, this.lrcWidth);
                    }
                    break;
                default:
                    this.context.textAlign = 'start';
                    this.context.fillText(text, this.lrcX, this.lrcY, this.lrcWidth);
                    break;
            }
        }
        else {
            this.context.textAlign = 'start';
            this.context.fillText(text, this.lrcX, this.lrcY, this.lrcWidth);
        }
        return textMetrics.height;
    }
    /**
     * Draws each line of lyrics and returns the height of each line.
     * @param lyric
     * @param isCurrent
     * @returns
     */
    private drawLyricLine(lyric: LrcEntry, isCurrent: boolean): number {
        let lineHeight = 0;
        if (isCurrent) {
            this.context.font = this.fontWeight + ' ' + this.mCurrentTextSize + 'vp ' + this.fontFamily;
            this.context.fillStyle = this.mCurrentTextColor;
        }
        else {
            this.context.font = this.fontWeight + ' ' + this.mNormalTextSize + 'vp ' + this.fontFamily;
            this.context.fillStyle = this.mNormalTextColor;
        }
        this.context.textBaseline = 'bottom';
        let textMetrics: TextMetrics = this.context.measureText(lyric.lineWords);
        if (textMetrics.width > this.lrcWidth) {
            lineHeight = this.drawMultipleLine(lyric, textMetrics, isCurrent);
        }
        else {
            lineHeight = this.drawSingleLine(lyric, textMetrics, isCurrent);
        }
        return lineHeight;
    }
    /**
     * Calculate the maximum and minimum offsets of the lyrics.
     * PS: You need to draw all the lyrics before calculating,
     * because the offset depends on the total height of the lyrics.
     */
    private calculateOffset() {
        this.canvasMinOffsetY = 0;
        switch (this.lyricTopPosition) {
            case 1:
                this.canvasMaxOffsetY = this.lrcY - this.paddingTop - this.lrcHeight / 2;
                break;
            case 0:
                this.canvasMaxOffsetY = this.lrcY - this.paddingTop;
                break;
            default:
                break;
        }
    }
    /**
     * Offset position of the target object.
     *
     * @param desOffsetY
     */
    private drawContent(desOffsetY: number, change?: boolean) {
        this.context.clearRect(0, 0, this.viewWidth, this.lrcY + this.viewHeight);
        this.reset();
        this.context.globalCompositeOperation = 'source-over';
        this.lrcY = this.initFirstLineY + desOffsetY;
        this.curCanvasOffsetY = desOffsetY;
        if (this.mLrcEntryList && this.mLrcEntryList.length > 0) {
            let index = 0;
            for (let mLrcEntryListElement of this.mLrcEntryList) {
                let isCurrentLine = this.mCurrentLine === index ? true : false;
                this.drawLyricLine(mLrcEntryListElement, isCurrentLine);
                index++;
            }
        }
        else {
            this.drawLyricLine(EMPTY_LYRIC, true);
        }
        this.updateLyricArea(this.paddingLeft, this.paddingTop, this.viewWidth - this.paddingRight, this.viewHeight - this.paddingBottom);
        if (this.mLrcEntryList && this.mLrcEntryList.length > 0) {
            this.context.globalCompositeOperation = 'source-in';
            let grad = this.context.createLinearGradient(0, 0, 0, this.viewHeight);
            grad.addColorStop(0.0, '#00ffffff');
            grad.addColorStop(0.15, '#ffffffff');
            grad.addColorStop(0.3, '#ffffffff');
            grad.addColorStop(0.7, '#4dffffff');
            grad.addColorStop(1.0, '#00ffffff');
            this.context.fillStyle = grad;
            this.context.fillRect(0, 0, this.viewWidth, this.viewHeight);
        }
    }
    /**
     * Area where the lyrics are updated.
     * @param left
     * @param top
     * @param right
     * @param bottom
     */
    private updateLyricArea(left: number, top: number, right: number, bottom: number) {
        this.lyricRectangle = new Rectangle(left, top, right, bottom);
    }
    /**
     * Whether the location is in the song area.
     * @param x
     * @param y
     * @returns
     */
    private isTouchLyricArea(x: number, y: number): boolean {
        return this.lyricRectangle && this.lyricRectangle.isIn(x, y);
    }
    hasLrc(): boolean {
        return this.mLrcEntryList && this.mLrcEntryList.length > 0;
    }
    /**
     * How far to offset to a particular line.
     * @param line
     * @returns
     */
    getOffset(line: number): number {
        let offsetY = 0;
        switch (this.lyricTopPosition) {
            case 0:
                for (let i = 0; i <= line && i < this.mLrcEntryList.length; i++) {
                    if (i === line) {
                        offsetY += this.getLineHeight(this.mLrcEntryList[i].lineWords, true) / 2
                            - this.getLineHeight(this.mLrcEntryList[i].lineWords, false) / 2;
                    }
                    else {
                        offsetY += this.getLineHeight(this.mLrcEntryList[i].lineWords, false) + this.mDividerHeight;
                    }
                }
                break;
            case 1:
                for (let i = 0; i <= line && i < this.mLrcEntryList.length; i++) {
                    if (i === line) {
                        offsetY += this.getLineHeight(this.mLrcEntryList[i].lineWords, true) / 2 + this.mDividerHeight;
                    }
                    else {
                        offsetY += this.getLineHeight(this.mLrcEntryList[i].lineWords, false) + this.mDividerHeight;
                    }
                }
                break;
            default:
                break;
        }
        return offsetY;
    }
    /**
     * Animated scroll to specified position.
     * @param line
     */
    smoothScrollTo(line: number) {
        let offset = this.getOffset(line);
        Logger.info('[smoothScrollTo] line:' + line + ',offset:' + offset);
        this.startAnimator(offset);
    }
    /**
     * The lyrics have changed.
     */
    onLyricUpdated() {
        this.mCurrentLine = NONE_LINE;
        this.onTimeUpdated();
    }
    /**
     * The lyric time is updated. The lyrics need to be scrolled to the specified position.
     */
    onTimeUpdated() {
        if (!this.hasLrc()) {
            this.drawContent(0);
            return;
        }
        let line = this.findShowLine(this.lyricMilliSecondsTime);
        if (line !== this.mCurrentLine) {
            this.mCurrentLine = line;
            this.smoothScrollTo(line);
        }
        else {
            this.drawContent(this.curCanvasOffsetY);
        }
    }
    /**
     * Return the row corresponding to the current time.
     * @param milliSeconds
     * @returns
     */
    findShowLine(milliSeconds: number): number {
        if (this.mLrcEntryList && this.mLrcEntryList.length > 0) {
            for (let index = 0; index < this.mLrcEntryList.length; index++) {
                if (this.mLrcEntryList[index].lineStartTime <= milliSeconds
                    && this.mLrcEntryList[index].lineStartTime + this.mLrcEntryList[index].lineDuration >= milliSeconds) {
                    return index;
                }
            }
        }
        return this.mCurrentLine;
    }
    aboutToAppear(): void {
        this.calculate();
        this.onTimeUpdated();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Canvas.create(this.context);
            Canvas.onAreaChange((oldArea: Area, newArea: Area) => {
                this.viewWidth = Number.parseFloat(newArea.width.toString());
                this.viewHeight = Number.parseFloat(newArea.height.toString());
                if (oldArea.width.toString() !== newArea.width.toString()) {
                    this.calculate();
                    let line = this.findShowLine(this.lyricMilliSecondsTime);
                    let offset = this.getOffset(line);
                    this.drawContent(offset);
                }
                if (oldArea.height.toString() !== newArea.height.toString()) {
                    this.calculate();
                    let line = this.findShowLine(this.lyricMilliSecondsTime);
                    let offset = this.getOffset(line);
                    this.drawContent(-offset, true);
                }
            });
        }, Canvas);
        Canvas.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
