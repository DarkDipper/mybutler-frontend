import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// routes
import { PATH_DASHBOARD } from '@yourapp/src/routes/paths';

// ----------------------------------------------------------------------

export default function LibPage() {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === PATH_DASHBOARD.library.root) {
      push(PATH_DASHBOARD.library.list);
    }
  }, [pathname]);
}
