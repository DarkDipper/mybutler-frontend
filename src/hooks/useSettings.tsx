import { useContext } from 'react';
import { SettingsContext } from '@yourapp/src/components/settings/SettingsContext';

// ----------------------------------------------------------------------

const useSettings = () => useContext(SettingsContext);

export default useSettings;
