import Image from 'next/image';
// @mui
import {
  Box,
  Card,
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  Link,
} from '@mui/material';
// components
import Iconify from '@yourapp/src/components/iconify';
import Scrollbar from '@yourapp/src/components/scrollbar';
import { fSlug } from '@yourapp/src/utils/formatSource';
import { TableHeadCustom } from '@yourapp/src/components/table';

const lanCodeToIcon: { [key: string]: string } = {
  vi: 'vietnam',
  en: 'united-kingdom',
  ja: 'japan',
  zh: 'china',
  ko: 'south-korea',
};
const TABLE_HEAD = [
  { id: 'source', label: 'Source' },
  { id: 'language', label: 'Language', align: 'center' },
];

// ----------------------------------------------------------------------

export default function BookTable({
  urls = { raw: [], vi: [], en: [] },
}: {
  urls: { [key: string]: string[] | undefined } | undefined;
}) {
  const readLinks = [];
  for (const [key, value] of Object.entries(urls)) {
    if (!value) continue;
    for (const url of value) {
      const [_, source, slug] = fSlug(url).split('/');
      readLinks.push({
        language: key,
        source: source,
        url: url,
      });
    }
  }
  console.log(readLinks);
  return (
    <Card>
      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar sx={{ maxHeight: 280 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Site</TableCell>
                <TableCell align="center">Language</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {readLinks.map((row) => (
                <Row row={row} key={`${row.url}-${row.language}`} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}

function LinkIcon({ site }: { site: string }) {
  if (site === 'BLOGTRUYEN.VN')
    return <Image src="/assets/icons/ic_blogtruyen.png" alt={site} width={24} height={24} />;
  else if (site === 'mangadex')
    return <Image src="/assets/icons/ic_mangadex.svg" alt={site} width={24} height={24} />;
  else if (site === 'HAKO.RE' || site === 'DOCLN.NET')
    return <Image src="/assets/icons/ic_hako.png" alt={site} width={24} height={24} />;
  else if (site === 'FACEBOOK.COM') return <Iconify icon="logos:facebook" />;
  else if (site === 'GOOGLE-SENSEI') return <Iconify icon={'flat-color-icons:google'} />;
  else if (site === 'TWITTER.COM') return <Iconify icon={'logos:twitter'} />;
  else if (site === 'googledrive') return <Iconify icon={'logos:google-drive'} />;
  else return <Iconify icon="fa-solid:link" />;
}

function Row({ row }: { row: { url: string; source: string; language: string } }) {
  return (
    <TableRow key={row.url}>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar color="primary">
            <LinkIcon site={row.source} />
          </Avatar>
          <Box sx={{ ml: 2, maxWidth: { xs: 100, md: 200, xl: 400 } }}>
            <Typography variant="subtitle2"> {row.source}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              <Link href={row.url} target="_blank">
                {row.url}
              </Link>
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center" sx={{ minWidth: 50 }}>
        <Iconify
          icon={`emojione-v1:flag-for-${lanCodeToIcon[row.language] || 'japan'}`}
          sx={{ width: 32, height: 32 }}
        />
      </TableCell>
    </TableRow>
  );
}
