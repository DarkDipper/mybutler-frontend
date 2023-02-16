// @mui
import { InputAdornment, ClickAwayListener } from '@mui/material';
// components
import Iconify from '@yourapp/src/components/iconify';
import { CustomTextField } from '@yourapp/src/components/custom-input';

// ----------------------------------------------------------------------

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickAway: VoidFunction;
};

export default function ChatNavSearch({ value, onChange, onClickAway }: Props) {
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <CustomTextField
        fullWidth
        size="small"
        value={value}
        onChange={onChange}
        placeholder="Search contacts..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
        sx={{ mt: 2.5 }}
      />
    </ClickAwayListener>
  );
}
