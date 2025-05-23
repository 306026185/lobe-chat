import { LocalFileItem } from '@lobechat/electron-client-ipc';
import { memo } from 'react';

import { LocalFilesApiName } from '@/tools/local-files';
import { BuiltinRenderProps } from '@/types/tool';

import ListFiles from './ListFiles';
import ReadLocalFile from './ReadLocalFile';
import RenameLocalFile from './RenameLocalFile';
import SearchFiles from './SearchFiles';
import WriteFile from './WriteFile';

const RenderMap = {
  [LocalFilesApiName.searchLocalFiles]: SearchFiles,
  [LocalFilesApiName.listLocalFiles]: ListFiles,
  [LocalFilesApiName.readLocalFile]: ReadLocalFile,
  [LocalFilesApiName.renameLocalFile]: RenameLocalFile,
  [LocalFilesApiName.writeLocalFile]: WriteFile,
};

const LocalFilesRender = memo<BuiltinRenderProps<LocalFileItem[]>>(
  ({ pluginState, apiName, messageId, pluginError, args }) => {
    const Render = RenderMap[apiName as any];

    if (!Render) return;

    return (
      <Render
        args={args}
        messageId={messageId}
        pluginError={pluginError}
        pluginState={pluginState}
      />
    );
  },
);

LocalFilesRender.displayName = 'LocalFilesRender';

export default LocalFilesRender;
