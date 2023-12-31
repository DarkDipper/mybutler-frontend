import NextLink from 'next/link';
// @mui
import { Button, Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
// utils
import { fSlug } from '@yourapp/src/utils/formatSource';
import { sourceToIcon, sourceToColor } from '@yourapp/src/utils/sourceMapping';
// paths
import { PATH_DASHBOARD } from '@yourapp/src/routes/paths';

const lanCodeToFullText: { [key: string]: string } = {
  vi: 'việt',
  en: 'anh',
  ja: 'nhật',
  zh: 'trung',
  ko: 'hàn',
};
import Image from 'next/image';
import { MangadexLogo } from '@yourapp/src/assets/logos';

function ReadButton({ link }: { link: { language: string; source: string; url: string } }) {
  return (
    <Button
      variant="outlined"
      component={NextLink}
      href={link.url}
      color="inherit"
      target="_blank"
      sx={{
        color: sourceToColor[link.source],
        borderColor: sourceToColor[link.source],
        '&:hover': {
          borderColor: sourceToColor[link.source],
          bgcolor: alpha(sourceToColor[link.source], 0.08),
        },
        m: 0.5,
      }}
      size="large"
      startIcon={<Image src={sourceToIcon[link.source]} alt={link.source} width={24} height={24} />}
    >
      {`Đọc bản ${lanCodeToFullText[link.language] || 'raw'}`}
    </Button>
  );
}

export default function ReadButtons({
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

  return readLinks.length > 0 ? (
    <>
      <Typography variant="h6">Follow this link to read</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {readLinks.map((link, idx) => (
          <ReadButton link={link} key={idx} />
        ))}
      </Box>
    </>
  ) : (
    <></>
  );
}
