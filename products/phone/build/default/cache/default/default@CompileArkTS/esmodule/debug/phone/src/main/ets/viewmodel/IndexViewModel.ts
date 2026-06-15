import { RouterUrlConstants } from "@bundle:com.huawei.music.musichome/phone@constantscommon/index";
import IndexItem from "@bundle:com.huawei.music.musichome/phone/ets/viewmodel/IndexItem";
/**
 * Home page information data processing class.
 */
class IndexViewModel {
    /**
     * Data information on the home page.
     *
     * @returns IndexItem array.
     */
    getIndexItemList(): IndexItem[] {
        let IndexItemList: IndexItem[] = [];
        IndexItemList.push(new IndexItem({ "id": 150994956, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 150994955, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 150994951, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 150994978, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, RouterUrlConstants.MUSIC_LIST));
        IndexItemList.push(new IndexItem({ "id": 150994953, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 150994952, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 150994950, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 150994977, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, RouterUrlConstants.LIVE));
        return IndexItemList;
    }
}
export default new IndexViewModel();
