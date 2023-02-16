import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { useState, useRef } from 'react';
// @mui
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Checkbox,
  Typography,
  CardHeader,
  IconButton,
  FormControlLabel,
} from '@mui/material';
// components
import Image from '@yourapp/src/components/image';
import Iconify from '@yourapp/src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  post?: any;
};

export default function ProfilePostCard({ post }: Props) {
  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<Avatar src={'https://i.imgur.com/jgzXOi3.jpg'} />}
        title={
          <Link href="#" variant="subtitle2" color="text.primary" component={NextLink}>
            Zennomi
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            31/01/2022
          </Typography>
        }
        action={
          <IconButton>
            <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
          </IconButton>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography>Mình không phiền nếu được nhận lì xì đâu ạ.</Typography>
        <Typography color="info.main">Vietinbank: 105870480290 - Nguyen Dang Tuan Anh</Typography>
        <Typography color="error.light">Momo: 0969142728 - Nguyen Dang Tuan Anh</Typography>

        <Image
          alt="post media"
          src={`https://i.imgur.com/jElDUiO.jpg`}
          ratio="16/9"
          sx={{ borderRadius: 1 }}
        />

        <Stack direction="row" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
                checked={true}
                icon={<Iconify icon={'eva:heart-fill'} />}
                checkedIcon={<Iconify icon={'eva:heart-fill'} />}
              />
            }
            label={696969}
            sx={{ minWidth: 72, mr: 0 }}
          />
          {/* <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
            {post.personLikes.map((person) => (
              <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
            ))}
          </AvatarGroup> */}
          <Box sx={{ flexGrow: 1 }} />
          <IconButton>
            <Iconify icon={'eva:message-square-fill'} width={20} height={20} />
          </IconButton>
          <IconButton>
            <Iconify icon={'eva:share-fill'} width={20} height={20} />
          </IconButton>
        </Stack>

        {/* {hasComments && (
          <Stack spacing={1.5}>
            {post.comments.map((comment) => (
              <Stack key={comment.id} direction="row" spacing={2}>
                <Avatar alt={comment.author.name} src={comment.author.avatarUrl} />
                <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: 'background.neutral' }}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ sm: 'center' }}
                    justifyContent="space-between"
                    sx={{ mb: 0.5 }}
                  >
                    <Typography variant="subtitle2">{comment.author.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      {fDate(comment.createdAt)}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {comment.message}
                  </Typography>
                </Paper>
              </Stack>
            ))}
          </Stack>
        )} */}
      </Stack>
    </Card>
  );
}
