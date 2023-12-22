import { useState, useCallback, Dispatch, SetStateAction } from 'react';
// @mui
import { Stack } from '@mui/material';
// components
import { MultiFilePreview, UploadBox } from '../../../../components/upload';
import { UseFormSetValue } from 'react-hook-form';
import { FormValuesProps } from './NoteDetails';

// ----------------------------------------------------------------------

type Props = {
  listFile: File[];
  setListFile: Dispatch<SetStateAction<File[]>>;
  updateFileForm: UseFormSetValue<FormValuesProps>;
};

export default function NoteDetailsAttachments({ listFile, setListFile, updateFileForm }: Props) {
  // const [files, setFiles] = useState<(File | string)[]>(attachments);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file: File) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      updateFileForm('listFile', [...listFile, ...newFiles]);
      setListFile([...listFile, ...newFiles]);
    },
    [listFile]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    console.log(inputFile);
    const filtered = listFile.filter((file) => file !== inputFile);
    setListFile(filtered);
  };

  return (
    <Stack direction="row" flexWrap="wrap">
      <MultiFilePreview
        thumbnail
        files={listFile}
        onRemove={(file) => handleRemoveFile(file)}
        sx={{ width: 64, height: 64 }}
      />

      <UploadBox onDrop={handleDrop} />
    </Stack>
  );
}
