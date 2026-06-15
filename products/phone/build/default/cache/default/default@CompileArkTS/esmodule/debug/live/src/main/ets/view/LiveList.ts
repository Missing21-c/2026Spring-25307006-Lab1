import type { LiveStream } from '../viewmodel/LiveStream';
import { LiveConstants } from "@bundle:com.huawei.music.musichome/phone@live/ets/constants/LiveConstants";
import { LiveStreamViewModel } from "@bundle:com.huawei.music.musichome/phone@live/ets/viewmodel/LiveStreamViewModel";
export function LiveList(currentBreakpoint: string, parent = null) {
    const __currentBreakpoint__ = currentBreakpoint;
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, currentBreakpoint = __currentBreakpoint__) => {
        GridRow.create({
            columns: { sm: LiveConstants.FOUR_COLUMN, md: LiveConstants.EIGHT_COLUMN, lg: LiveConstants.TWELVE_COLUMN },
            breakpoints: { value: [LiveConstants.SMALL_DEVICE_TYPE, LiveConstants.MIDDLE_DEVICE_TYPE,
                    LiveConstants.LARGE_DEVICE_TYPE] },
            gutter: { x: { "id": 150995002, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } }
        });
    }, GridRow);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, currentBreakpoint = __currentBreakpoint__) => {
        GridCol.create({
            span: { sm: LiveConstants.FOUR_COLUMN, md: LiveConstants.SIX_COLUMN, lg: LiveConstants.EIGHT_COLUMN },
            offset: { sm: LiveConstants.ZERO_COLUMN, md: LiveConstants.ONE_COLUMN, lg: LiveConstants.TWO_COLUMN }
        });
        GridCol.margin({ left: { "id": 150995000, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, right: { "id": 150995001, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } });
    }, GridCol);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, currentBreakpoint = __currentBreakpoint__) => {
        Scroll.create(new Scroller());
        Scroll.align(Alignment.Top);
        Scroll.scrollBar(BarState.Off);
        Scroll.margin({
            bottom: { "id": 150995015, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
        });
    }, Scroll);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, currentBreakpoint = __currentBreakpoint__) => {
        Column.create();
        Column.width(LiveConstants.FULL_WIDTH_PERCENT);
    }, Column);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, currentBreakpoint = __currentBreakpoint__) => {
        ForEach.create();
        const forEachItemGenFunction = (_item, index: number) => {
            const item = _item;
            LiveItem.bind(this)(item, index, currentBreakpoint);
        };
        (parent ? parent : this).forEachUpdateFunction(elmtId, new LiveStreamViewModel().getLiveStreamList(), forEachItemGenFunction, (item: LiveStream, index: number) => index + JSON.stringify(item), true, true);
    }, ForEach);
    ForEach.pop();
    Column.pop();
    Scroll.pop();
    GridCol.pop();
    GridRow.pop();
}
function LiveItem(item: LiveStream, index: number, currentBreakpoint: string, parent = null) {
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Stack.create({ alignContent: Alignment.Center });
        Stack.width(LiveConstants.FULL_WIDTH_PERCENT);
        Stack.margin({
            top: index === 0 ? { "id": 150995018, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : 0,
            bottom: { "id": 150995017, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
        });
    }, Stack);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Image.create(item.liveBackground);
        Image.size({ width: LiveConstants.FULL_WIDTH_PERCENT, height: { "id": 150995005, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } });
        Image.borderRadius({ "id": 150995004, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
    }, Image);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Column.create();
        Column.height({ "id": 150995005, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Column.padding({
            left: currentBreakpoint === LiveConstants.CURRENT_BREAKPOINT ? { "id": 150995016, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995014, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
            right: currentBreakpoint === LiveConstants.CURRENT_BREAKPOINT ? { "id": 150995016, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995014, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
        });
    }, Column);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Row.create();
        Row.height({ "id": 150995023, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Row.width(LiveConstants.FULL_WIDTH_PERCENT);
        Row.alignItems(VerticalAlign.Top);
        Row.justifyContent(FlexAlign.End);
    }, Row);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Image.create({ "id": 150995031, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Image.width({ "id": 150995026, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Image.height({ "id": 150995022, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Image.margin({ top: currentBreakpoint === LiveConstants.CURRENT_BREAKPOINT ? { "id": 150995025, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995024, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } });
    }, Image);
    Row.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Column.create();
        Column.height({ "id": 150995009, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Column.alignItems(HorizontalAlign.Start);
        Column.justifyContent(FlexAlign.Start);
    }, Column);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Row.create();
        Row.height({ "id": 150995011, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Row.margin({ top: currentBreakpoint === LiveConstants.CURRENT_BREAKPOINT ? { "id": 150995012, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995013, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } });
        Row.width(LiveConstants.FULL_WIDTH_PERCENT);
    }, Row);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Text.create(item.title);
        Text.fontColor({ "id": 150994996, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Text.fontWeight(LiveConstants.LIVE_TITLE_FONT_WEIGHT);
        Text.fontFamily(LiveConstants.LIVE_ITEM_TITLE_FONT_FAMILY);
        Text.fontSize({ "id": 150995010, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
    }, Text);
    Text.pop();
    Row.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Row.create();
        Row.width(LiveConstants.FULL_WIDTH_PERCENT);
        Row.height({ "id": 150995007, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Row.margin({ top: { "id": 150995008, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } });
    }, Row);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Text.create(item.liveIntroduction);
        Text.fontFamily(LiveConstants.LIVE_ITEM_INTRODUCTION_FONT_FAMILY);
        Text.fontSize({ "id": 150995006, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Text.fontColor({ "id": 150994994, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Text.fontWeight(LiveConstants.LIVE_INTRODUCTION_FONT_WEIGHT);
    }, Text);
    Text.pop();
    Row.pop();
    Column.pop();
    Column.pop();
    Stack.pop();
}
