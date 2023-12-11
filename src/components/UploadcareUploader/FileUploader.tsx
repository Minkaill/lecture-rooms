import { useEffect, useRef, useState } from 'react';
import * as LR from '@uploadcare/blocks';
import { OutputFileEntry } from '@uploadcare/blocks';
import blocksStyles from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';

import st from './FileUploader.module.scss';
import cssOverrides from './FileUploader.overrides.css?inline';
import cs from 'classnames';

LR.registerBlocks(LR);

type FileUploaderProps = {
    uploaderClassName: string;
    files: OutputFileEntry[];
    onChange: (files: OutputFileEntry[]) => void;
    theme: 'light' | 'dark';
}

export default function FileUploader({ files, uploaderClassName, onChange, theme }: FileUploaderProps) {
    const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry[]>([]);
    const ctxProviderRef = useRef<typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider>(null);


    useEffect(() => {
        LR.FileUploaderRegular.shadowStyles = cssOverrides;

        return () => {
            LR.FileUploaderRegular.shadowStyles = '';
        }
    }, []);


    useEffect(() => {
        const handleUploadEvent = (e: CustomEvent<OutputFileEntry[]>) => {
            if (e.detail && e.detail.length > 0) {
                setUploadedFiles([e.detail[0]]);
            }
        };

        ctxProviderRef.current?.addEventListener('data-output', handleUploadEvent);

        return () => {
            ctxProviderRef.current?.removeEventListener('data-output', handleUploadEvent);
        };
    }, [setUploadedFiles]);

    useEffect(() => {
        const resetUploaderState = () => ctxProviderRef.current?.uploadCollection.clearAll();

        const handleDoneFlow = () => {
            resetUploaderState();

            onChange([...files, ...uploadedFiles]);
            setUploadedFiles([]);
        };

        ctxProviderRef.current?.addEventListener('done-flow', handleDoneFlow);

        return () => {
            ctxProviderRef.current?.removeEventListener('done-flow', handleDoneFlow);
        };
    }, [files, onChange, uploadedFiles, setUploadedFiles]);

    return (
        <div className={st.root}>
            <lr-config
                ctx-name="my-uploader"
                pubkey={import.meta.env.VITE_UPLOAD_KEY}
                multiple={false}
                sourceList="local, url, camera"
                confirmUpload={false}
                removeCopyright={true}
                imgOnly={true}
            ></lr-config>

            <lr-file-uploader-regular
                ctx-name="my-uploader"
                css-src={blocksStyles}
                class={cs(uploaderClassName, { [st.darkModeEnabled]: theme === 'dark' })}
            ></lr-file-uploader-regular>

            <lr-upload-ctx-provider
                ctx-name="my-uploader"
                ref={ctxProviderRef}
            />
        </div>
    );
}