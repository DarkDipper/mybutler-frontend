// @mui
import { InputBase, InputBaseProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = InputBaseProps & {
  name: string;
};

export default function NoteInputName({ sx, name, ...other }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <InputBase
          {...field}
          sx={{
            flexGrow: 1,
            '& .MuiInputBase-input': {
              py: 1,
              borderRadius: 1,
              typography: 'h6',
              border: `solid 1px transparent`,
              transition: (theme) => theme.transitions.create(['padding-left', 'border-color']),
              '&:hover, &:focus': {
                pl: 1,
                border: (theme) => `solid 1px ${theme.palette.text.primary}`,
              },
            },
            ...sx,
          }}
          error={!!error}
          {...other}
        />
      )}
    />
  );
}
