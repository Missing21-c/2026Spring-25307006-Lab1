import { LiveStream } from "@bundle:com.huawei.music.musichome/phone@live/ets/viewmodel/LiveStream";
export class LiveStreamViewModel {
    getLiveStreamList(): LiveStream[] {
        let LiveStreamList: Array<LiveStream> = [];
        LiveStreamList.push(new LiveStream({ "id": 150994986, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 150994987, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 150995030, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }));
        LiveStreamList.push(new LiveStream({ "id": 150994992, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 150994993, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 150995029, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }));
        LiveStreamList.push(new LiveStream({ "id": 150994989, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 150994990, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 150995028, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }));
        return LiveStreamList;
    }
}
