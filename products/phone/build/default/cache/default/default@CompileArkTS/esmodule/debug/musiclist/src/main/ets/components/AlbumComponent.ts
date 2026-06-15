if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AlbumComponent_Params {
    imgHeight?: Length;
    currentBreakpoint?: string;
    pageIndexInfos?: NavPathStack;
}
import { BreakpointConstants, GridConstants, StyleConstants } from "@bundle:com.huawei.music.musichome/phone@constantscommon/index";
import { BreakpointType } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import { optionList } from "@bundle:com.huawei.music.musichome/phone@musiclist/ets/viewmodel/SongListData";
import type { OptionItem } from "@bundle:com.huawei.music.musichome/phone@musiclist/ets/viewmodel/SongListData";
import { ContentConstants } from "@bundle:com.huawei.music.musichome/phone@musiclist/ets/constants/ContentConstants";
export class AlbumComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__imgHeight = new ObservedPropertyObjectPU(0, this, "imgHeight");
        this.__currentBreakpoint = new SynchedPropertySimpleTwoWayPU(params.currentBreakpoint, this, "currentBreakpoint");
        this.__pageIndexInfos = this.createStorageLink('pageIndexInfos', new NavPathStack(), "pageIndexInfos");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AlbumComponent_Params) {
        if (params.imgHeight !== undefined) {
            this.imgHeight = params.imgHeight;
        }
    }
    updateStateVars(params: AlbumComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__imgHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__pageIndexInfos.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__imgHeight.aboutToBeDeleted();
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__pageIndexInfos.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __imgHeight: ObservedPropertyObjectPU<Length>;
    get imgHeight() {
        return this.__imgHeight.get();
    }
    set imgHeight(newValue: Length) {
        this.__imgHeight.set(newValue);
    }
    private __currentBreakpoint: SynchedPropertySimpleTwoWayPU<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __pageIndexInfos: ObservedPropertyAbstractPU<NavPathStack>;
    get pageIndexInfos() {
        return this.__pageIndexInfos.get();
    }
    set pageIndexInfos(newValue: NavPathStack) {
        this.__pageIndexInfos.set(newValue);
    }
    CoverImage(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.BottomStart });
            Stack.width(StyleConstants.FULL_WIDTH);
            Stack.height(StyleConstants.FULL_HEIGHT);
            Stack.aspectRatio(ContentConstants.ASPECT_RATIO_ALBUM_COVER);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995310, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width(StyleConstants.FULL_WIDTH);
            Image.aspectRatio(ContentConstants.ASPECT_RATIO_ALBUM_COVER);
            Image.borderRadius({ "id": 150995152, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.onAreaChange((oldArea: Area, newArea: Area) => {
                this.imgHeight = newArea.height;
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 150995120, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.letterSpacing(ContentConstants.LETTER_SPACING);
            Text.fontColor(Color.White);
            Text.fontSize(new BreakpointType({
                sm: { "id": 150995161, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                md: { "id": 150995160, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                lg: { "id": 150995159, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            }).getValue(this.currentBreakpoint));
            Text.translate({
                x: StyleConstants.TRANSLATE_X,
                y: StyleConstants.TRANSLATE_Y
            });
        }, Text);
        Text.pop();
        Stack.pop();
    }
    CoverIntroduction(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(StyleConstants.FULL_WIDTH);
            Column.height(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ?
                this.imgHeight : { "id": 150995205, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Column.alignItems(HorizontalAlign.Start);
            Column.justifyContent(FlexAlign.Center);
            Column.padding({
                left: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? { "id": 150995209, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : 0
            });
            Column.margin({
                top: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? 0 : { "id": 150995207, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                bottom: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ?
                    0 : { "id": 150995206, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 150995123, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.opacity({ "id": 150995154, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.fontWeight(ContentConstants.ALBUM_FONT_WEIGHT);
            Text.fontColor({ "id": 150995132, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.fontSize(new BreakpointType({
                sm: { "id": 150995228, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                md: { "id": 150995227, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                lg: { "id": 150995226, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            }).getValue(this.currentBreakpoint));
            Text.margin({ bottom: { "id": 150995153, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 150995127, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.opacity({ "id": 150995208, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.width(StyleConstants.FULL_WIDTH);
            Text.fontWeight(ContentConstants.INTRODUCTION_FONT_WEIGHT);
            Text.fontColor({ "id": 150995132, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.fontSize(new BreakpointType({
                sm: { "id": 150995204, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                md: { "id": 150995203, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                lg: { "id": 150995202, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            }).getValue(this.currentBreakpoint));
        }, Text);
        Text.pop();
        Column.pop();
    }
    CoverOptions(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height({ "id": 150995251, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Row.width(StyleConstants.FULL_WIDTH);
            Row.padding({
                left: { "id": 150995257, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                right: { "id": 150995257, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            });
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: ContentConstants.COVER_OPTION_SPACE });
                    Column.onClick(() => {
                        if (item.action) {
                            item.action(ObservedObject.GetRawObject(this.pageIndexInfos));
                        }
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(item.image);
                    Image.height({ "id": 150995255, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Image.width({ "id": 150995255, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.text);
                    Text.fontColor({ "id": 150995132, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Text.fontSize(new BreakpointType({
                        sm: { "id": 150995254, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                        md: { "id": 150995253, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                        lg: { "id": 150995252, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
                    }).getValue(this.currentBreakpoint));
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, optionList, forEachItemGenFunction, (item: OptionItem, index?: number) => index + JSON.stringify(item), false, true);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({
                left: new BreakpointType({
                    sm: { "id": 150995179, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                    md: { "id": 150995177, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                    lg: { "id": 150995176, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
                }).getValue(this.currentBreakpoint),
                right: new BreakpointType({
                    sm: { "id": 150995179, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                    md: { "id": 150995177, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                    lg: { "id": 150995176, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
                }).getValue(this.currentBreakpoint)
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridRow.create({
                breakpoints: {
                    value: BreakpointConstants.BREAKPOINT_VALUE,
                    reference: BreakpointsReference.WindowSize
                },
                columns: {
                    sm: BreakpointConstants.COLUMN_LG,
                    md: BreakpointConstants.COLUMN_LG,
                    lg: BreakpointConstants.COLUMN_LG
                }
            });
            GridRow.padding({
                top: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? { "id": 150995184, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995183, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                left: new BreakpointType({
                    sm: { "id": 150995157, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                    md: { "id": 150995156, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                    lg: { "id": 150995155, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
                }).getValue(this.currentBreakpoint),
                right: new BreakpointType({
                    sm: { "id": 150995157, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                    md: { "id": 150995156, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                    lg: { "id": 150995155, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
                }).getValue(this.currentBreakpoint)
            });
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridCol.create({
                span: { sm: GridConstants.SPAN_FOUR, md: GridConstants.SPAN_TWELVE, lg: GridConstants.SPAN_TWELVE }
            });
        }, GridCol);
        this.CoverImage.bind(this)();
        GridCol.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridCol.create({
                span: { sm: GridConstants.SPAN_EIGHT, md: GridConstants.SPAN_TWELVE, lg: GridConstants.SPAN_TWELVE }
            });
        }, GridCol);
        this.CoverIntroduction.bind(this)();
        GridCol.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridCol.create({
                span: { sm: GridConstants.SPAN_TWELVE, md: GridConstants.SPAN_TWELVE, lg: GridConstants.SPAN_TWELVE }
            });
            GridCol.padding({
                top: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? { "id": 150995256, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : 0,
                bottom: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? { "id": 150995256, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : 0
            });
        }, GridCol);
        this.CoverOptions.bind(this)();
        GridCol.pop();
        GridRow.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
