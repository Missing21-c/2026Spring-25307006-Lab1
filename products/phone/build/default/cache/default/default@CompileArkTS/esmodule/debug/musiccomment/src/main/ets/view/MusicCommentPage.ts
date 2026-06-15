if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MusicCommentPage_Params {
    currentBp?: string;
    wonderfulComment?: Comment[];
    newComment?: Comment[];
    topRectHeight?: number;
    bottomRectHeight?: number;
}
import { StyleConstants, BreakpointConstants } from "@bundle:com.huawei.music.musichome/phone@constantscommon/index";
import type { Comment } from '../viewmodel/Comment';
import CommentViewModel from "@bundle:com.huawei.music.musichome/phone@musiccomment/ets/viewmodel/CommentViewModel";
import { ListItemComponent } from "@bundle:com.huawei.music.musichome/phone@musiccomment/ets/view/ListItemComponent";
import { HeadComponent } from "@bundle:com.huawei.music.musichome/phone@musiccomment/ets/view/HeadComponent";
import { MusicInfoComponent } from "@bundle:com.huawei.music.musichome/phone@musiccomment/ets/view/MusicInfoComponent";
import { CommonConstants } from "@bundle:com.huawei.music.musichome/phone@musiccomment/ets/constants/CommonConstants";
export class MusicCommentPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBp = this.createStorageProp('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBp");
        this.__wonderfulComment = new ObservedPropertyObjectPU(CommentViewModel.getWonderfulReview(), this, "wonderfulComment");
        this.__newComment = new ObservedPropertyObjectPU(CommentViewModel.getNewComment(), this, "newComment");
        this.__topRectHeight = this.createStorageLink('topRectHeight', 0, "topRectHeight");
        this.__bottomRectHeight = this.createStorageLink('bottomRectHeight', 0, "bottomRectHeight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MusicCommentPage_Params) {
        if (params.wonderfulComment !== undefined) {
            this.wonderfulComment = params.wonderfulComment;
        }
        if (params.newComment !== undefined) {
            this.newComment = params.newComment;
        }
    }
    updateStateVars(params: MusicCommentPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBp.purgeDependencyOnElmtId(rmElmtId);
        this.__wonderfulComment.purgeDependencyOnElmtId(rmElmtId);
        this.__newComment.purgeDependencyOnElmtId(rmElmtId);
        this.__topRectHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__bottomRectHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBp.aboutToBeDeleted();
        this.__wonderfulComment.aboutToBeDeleted();
        this.__newComment.aboutToBeDeleted();
        this.__topRectHeight.aboutToBeDeleted();
        this.__bottomRectHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentBp: ObservedPropertyAbstractPU<string>;
    get currentBp() {
        return this.__currentBp.get();
    }
    set currentBp(newValue: string) {
        this.__currentBp.set(newValue);
    }
    private __wonderfulComment: ObservedPropertyObjectPU<Comment[]>;
    get wonderfulComment() {
        return this.__wonderfulComment.get();
    }
    set wonderfulComment(newValue: Comment[]) {
        this.__wonderfulComment.set(newValue);
    }
    private __newComment: ObservedPropertyObjectPU<Comment[]>;
    get newComment() {
        return this.__newComment.get();
    }
    set newComment(newValue: Comment[]) {
        this.__newComment.set(newValue);
    }
    private __topRectHeight: ObservedPropertyAbstractPU<number>;
    get topRectHeight() {
        return this.__topRectHeight.get();
    }
    set topRectHeight(newValue: number) {
        this.__topRectHeight.set(newValue);
    }
    private __bottomRectHeight: ObservedPropertyAbstractPU<number>;
    get bottomRectHeight() {
        return this.__bottomRectHeight.get();
    }
    set bottomRectHeight(newValue: number) {
        this.__bottomRectHeight.set(newValue);
    }
    ShowTitle(title: ResourceStr, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.Start);
            Row.width(StyleConstants.FULL_WIDTH);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize({ "id": 150995054, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.fontColor({ "id": 150995042, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.lineHeight({ "id": 150995099, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.fontWeight(FontWeight.Medium);
            Text.margin({
                top: { "id": 150995101, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                bottom: { "id": 150995100, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                left: this.currentBp === BreakpointConstants.BREAKPOINT_SM ? { "id": 150995085, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995083, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                right: this.currentBp === BreakpointConstants.BREAKPOINT_SM ? { "id": 150995088, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995086, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            });
        }, Text);
        Text.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridRow.create({
                breakpoints: {
                    value: BreakpointConstants.BREAKPOINT_VALUE,
                    reference: BreakpointsReference.WindowSize
                },
                columns: {
                    sm: BreakpointConstants.COLUMN_SM,
                    md: BreakpointConstants.COLUMN_MD,
                    lg: BreakpointConstants.COLUMN_LG
                },
                gutter: { x: BreakpointConstants.GUTTER_X }
            });
            GridRow.backgroundColor(Color.White);
            GridRow.padding({ top: this.getUIContext().px2vp(this.topRectHeight) });
            GridRow.expandSafeArea([SafeAreaType.SYSTEM]);
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridCol.create({
                span: {
                    sm: BreakpointConstants.COLUMN_SM,
                    md: BreakpointConstants.COLUMN_MD,
                    lg: BreakpointConstants.COLUMN_LG
                }
            });
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(StyleConstants.FULL_HEIGHT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.margin({
                left: this.currentBp === BreakpointConstants.BREAKPOINT_SM ? { "id": 150995085, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995083, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                right: this.currentBp === BreakpointConstants.BREAKPOINT_SM ? { "id": 150995088, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995086, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HeadComponent(this, {}, undefined, elmtId, () => { }, { page: "features/musiccomment/src/main/ets/view/MusicCommentPage.ets", line: 74, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "HeadComponent" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.margin({
                left: this.currentBp === BreakpointConstants.BREAKPOINT_SM ? { "id": 150995085, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995083, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                right: this.currentBp === BreakpointConstants.BREAKPOINT_SM ? { "id": 150995088, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995086, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new MusicInfoComponent(this, {}, undefined, elmtId, () => { }, { page: "features/musiccomment/src/main/ets/view/MusicCommentPage.ets", line: 82, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "MusicInfoComponent" });
        }
        __Common__.pop();
        this.ShowTitle.bind(this)({ "id": 150995041, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.lanes(this.currentBp === BreakpointConstants.BREAKPOINT_LG ? 2 : 1);
            List.scrollBar(BarState.Off);
            List.divider({
                color: { "id": 150995047, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                strokeWidth: { "id": 150995096, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                startMargin: this.currentBp === BreakpointConstants.BREAKPOINT_SM ? { "id": 150995094, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995095, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                endMargin: this.currentBp === BreakpointConstants.BREAKPOINT_SM ?
                    0 : { "id": 150995057, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            });
            List.margin({
                left: this.currentBp === BreakpointConstants.BREAKPOINT_SM ? { "id": 150995085, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995084, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                right: this.currentBp === BreakpointConstants.BREAKPOINT_SM ? { "id": 150995088, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995087, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index?: number) => {
                const comment = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.currentBp === BreakpointConstants.BREAKPOINT_SM ||
                        this.currentBp === BreakpointConstants.BREAKPOINT_MD) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                if (index && index < CommonConstants.LIST_COUNT) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        {
                                            const itemCreation = (elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                ListItem.create(deepRenderFunction, true);
                                                if (!isInitialRender) {
                                                    ListItem.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            };
                                            const itemCreation2 = (elmtId, isInitialRender) => {
                                                ListItem.create(deepRenderFunction, true);
                                                ListItem.width(StyleConstants.FULL_WIDTH);
                                                ListItem.padding({
                                                    bottom: { "id": 150995090, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
                                                });
                                            };
                                            const deepRenderFunction = (elmtId, isInitialRender) => {
                                                itemCreation(elmtId, isInitialRender);
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Row.create();
                                                    Row.margin({
                                                        left: this.currentBp === BreakpointConstants.BREAKPOINT_SM ?
                                                            0 : { "id": 150995084, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                                                        right: this.currentBp === BreakpointConstants.BREAKPOINT_SM ?
                                                            0 : { "id": 150995087, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
                                                    });
                                                }, Row);
                                                ListItemComponent.bind(this)(comment);
                                                Row.pop();
                                                ListItem.pop();
                                            };
                                            this.observeComponentCreation2(itemCreation2, ListItem);
                                            ListItem.pop();
                                        }
                                    });
                                }
                                else {
                                    this.ifElseBranchUpdateFunction(1, () => {
                                    });
                                }
                            }, If);
                            If.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            {
                                const itemCreation = (elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    ListItem.create(deepRenderFunction, true);
                                    if (!isInitialRender) {
                                        ListItem.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                };
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(deepRenderFunction, true);
                                    ListItem.width(StyleConstants.FULL_WIDTH);
                                    ListItem.padding({
                                        bottom: { "id": 150995090, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
                                    });
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.margin({
                                            left: this.currentBp === BreakpointConstants.BREAKPOINT_SM ?
                                                0 : { "id": 150995084, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                                            right: this.currentBp === BreakpointConstants.BREAKPOINT_SM ?
                                                0 : { "id": 150995087, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
                                        });
                                    }, Row);
                                    ListItemComponent.bind(this)(comment);
                                    Row.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        });
                    }
                }, If);
                If.pop();
            };
            this.forEachUpdateFunction(elmtId, this.wonderfulComment, forEachItemGenFunction, (item: Comment, index?: number) => index + JSON.stringify(item), true, true);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.ShowTitle.bind(this)({ "id": 150995040, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.layoutWeight(1);
            List.lanes(this.currentBp === BreakpointConstants.BREAKPOINT_LG ? 2 : 1);
            List.scrollBar(BarState.Off);
            List.margin({
                left: this.currentBp === BreakpointConstants.BREAKPOINT_SM ? { "id": 150995085, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995084, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                right: this.currentBp === BreakpointConstants.BREAKPOINT_SM ? { "id": 150995088, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995087, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            });
            List.divider({
                color: { "id": 150995047, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                strokeWidth: { "id": 150995096, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                startMargin: this.currentBp === BreakpointConstants.BREAKPOINT_SM ? { "id": 150995094, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995095, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                endMargin: this.currentBp === BreakpointConstants.BREAKPOINT_SM ?
                    0 : { "id": 150995057, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const comment = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.width(StyleConstants.FULL_WIDTH);
                        ListItem.padding({
                            bottom: index === this.newComment.length - 1 ? this.getUIContext().px2vp(this.bottomRectHeight) : { "id": 150995090, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
                        });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.margin({
                                left: this.currentBp === BreakpointConstants.BREAKPOINT_SM ?
                                    0 : { "id": 150995084, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                                right: this.currentBp === BreakpointConstants.BREAKPOINT_SM ?
                                    0 : { "id": 150995087, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
                            });
                        }, Row);
                        ListItemComponent.bind(this)(comment);
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.newComment, forEachItemGenFunction, (item: Comment, index?: number) => index + JSON.stringify(item), true, true);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
        GridCol.pop();
        GridRow.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
