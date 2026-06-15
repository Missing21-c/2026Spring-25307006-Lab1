/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// 原有导出
export { AirDropPanel } from './src/main/ets/view/AirDropPanel';
export { AirDropButton } from './src/main/ets/view/AirDropButton';
export { AirDropViewModel } from './src/main/ets/viewmodel/AirDropViewModel';
export { DeviceInfo, MusicInfo, TransferProgress } from './src/main/ets/viewmodel/AirDropModels';

// 新增导出 - 数据模型
export {
  ExtendedDeviceInfo,
  PendingTransferFile,
  TransferTask,
  TransferHistoryRecord,
  ReceiveRequest,
  ValidationResult,
  HistoryFilter
} from './src/main/ets/viewmodel/TransferModels';

// 新增导出 - 服务
export { TransferHistoryService } from './src/main/ets/viewmodel/TransferHistoryService';
export { FileSelectionService } from './src/main/ets/viewmodel/FileSelectionService';
export { DeviceTransferViewModel } from './src/main/ets/viewmodel/DeviceTransferViewModel';
export { NotificationService } from './src/main/ets/viewmodel/NotificationService';

// 新增导出 - UI组件
export { DeviceListView } from './src/main/ets/view/DeviceListView';
export { FilePickerPanel } from './src/main/ets/view/FilePickerPanel';
export { TransferProgressView } from './src/main/ets/view/TransferProgressView';
export { ReceiveConfirmDialog } from './src/main/ets/view/ReceiveConfirmDialog';
export { TransferHistoryPage } from './src/main/ets/view/TransferHistoryPage';
export { DeviceTransferPage } from './src/main/ets/view/DeviceTransferPage';
