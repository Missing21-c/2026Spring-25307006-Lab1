if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AlbumComponent_Params {
    imgHeight?: Length;
    currentBreakpoint?: string;
    pageIndexInfos?: NavPathStack;
}
import { BreakpointConstants, GridConstants, StyleConstants } from "@bundle:com.huawei.music.musichome/watch@constantscommon/index";
import { BreakpointType } from "@bundle:com.huawei.music.musichome/watch@mediacommon/index";
import { optionList } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/viewmodel/SongListData";
import type { OptionItem } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/viewmodel/SongListData";
import { ContentConstants } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/constants/ContentConstants";
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
            Image.create({ "id": 184549632, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.width(StyleConstants.FULL_WIDTH);
            Image.aspectRatio(ContentConstants.ASPECT_RATIO_ALBUM_COVER);
            Image.borderRadius({ "id": 184549474, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.onAreaChange((oldArea: Area, newArea: Area) => {
                this.imgHeight = newArea.height;
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 184549442, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Text.letterSpacing(ContentConstants.LETTER_SPACING);
            Text.fontColor(Color.White);
            Text.fontSize(new BreakpointType({
                sm: { "id": 184549483, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                md: { "id": 184549482, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                lg: { "id": 184549481, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
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
                this.imgHeight : { "id": 184549527, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Column.alignItems(HorizontalAlign.Start);
            Column.justifyContent(FlexAlign.Center);
            Column.padding({
                left: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? { "id": 184549531, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } : 0
            });
            Column.margin({
                top: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? 0 : { "id": 184549529, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                bottom: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ?
                    0 : { "id": 184549528, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 184549445, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Text.opacity({ "id": 184549476, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Text.fontWeight(ContentConstants.ALBUM_FONT_WEIGHT);
            Text.fontColor({ "id": 184549454, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Text.fontSize(new BreakpointType({
                sm: { "id": 184549550, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                md: { "id": 184549549, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                lg: { "id": 184549548, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
            }).getValue(this.currentBreakpoint));
            Text.margin({ bottom: { "id": 184549475, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 184549449, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Text.opacity({ "id": 184549530, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Text.width(StyleConstants.FULL_WIDTH);
            Text.fontWeight(ContentConstants.INTRODUCTION_FONT_WEIGHT);
            Text.fontColor({ "id": 184549454, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Text.fontSize(new BreakpointType({
                sm: { "id": 184549526, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                md: { "id": 184549525, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                lg: { "id": 184549524, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
            }).getValue(this.currentBreakpoint));
        }, Text);
        Text.pop();
        Column.pop();
    }
    CoverOptions(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height({ "id": 184549573, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Row.width(StyleConstants.FULL_WIDTH);
            Row.padding({
                left: { "id": 184549579, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                right: { "id": 184549579, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
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
                    Image.height({ "id": 184549577, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                    Image.width({ "id": 184549577, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.text);
                    Text.fontColor({ "id": 184549454, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                    Text.fontSize(new BreakpointType({
                        sm: { "id": 184549576, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                        md: { "id": 184549575, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                        lg: { "id": 184549574, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
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
                    sm: { "id": 184549501, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                    md: { "id": 184549499, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                    lg: { "id": 184549498, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                }).getValue(this.currentBreakpoint),
                right: new BreakpointType({
                    sm: { "id": 184549501, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                    md: { "id": 184549499, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                    lg: { "id": 184549498, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
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
                top: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? { "id": 184549506, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } : { "id": 184549505, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                left: new BreakpointType({
                    sm: { "id": 184549479, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                    md: { "id": 184549478, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                    lg: { "id": 184549477, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                }).getValue(this.currentBreakpoint),
                right: new BreakpointType({
                    sm: { "id": 184549479, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                    md: { "id": 184549478, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                    lg: { "id": 184549477, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
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
                top: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? { "id": 184549578, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } : 0,
                bottom: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? { "id": 184549578, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } : 0
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
