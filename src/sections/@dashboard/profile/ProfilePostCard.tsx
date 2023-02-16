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
import Cat from '@yourapp/src/assets/images/Cat look.jpg';

// ----------------------------------------------------------------------

type Props = {
  post?: any;
};

export default function ProfilePostCard({ post }: Props) {
  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<Avatar src={Cat.src} />}
        title={
          <Link href="#" variant="subtitle2" color="text.primary" component={NextLink}>
            Phong Huỳnh
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            10/02/2023
          </Typography>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography textAlign="justify">
          Hi, my name is Phong and I'm the creator of the My Butler website. As someone who loves
          exploring new technologies, I have skills in SCSS, React, Next.js, Material UI, MongoDB,
          Node.js, and I am also familiar with data science libraries in Python. I created this
          website for myself as a personal project, but I hope that it can also be useful for
          others. My goal is to create a platform that can help automate everyday tasks and provide
          a convenient and accessible way for people to manage their to-do lists, schedule, and
          other aspects of their lives. Whether you're a busy professional, a student, or just
          someone looking for a better way to organize your life, I believe My Butler can help make
          your life easier and more efficient. I will try to keep adding new features and improving
          the website as much as I can.
        </Typography>

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
