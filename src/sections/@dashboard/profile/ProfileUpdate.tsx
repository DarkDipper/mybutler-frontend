// @mui
import { Alert, AlertTitle, Stack, Typography, Chip } from '@mui/material';

export default function ProfileUpdate() {
  return (
    <Stack spacing={2}>
      <Alert severity="info">
        I think i need to add a new feature to this web. I will add a new page to show the progress
        of the project.
      </Alert>
      <Typography variant="h6">
        Phân loại theo <Chip label="hoàn thành" color="success" />{' '}
        <Chip label="đang code" color="info" /> <Chip label="đang có vấn đề" color="warning" />{' '}
        <Chip label="dự kiến" color="error" />
      </Typography>
      <Typography component="span" color="success.main">
        hoàn thành
      </Typography>
      <Alert severity="warning">
        <AlertTitle>Thông tin chi tiết từng bộ</AlertTitle>
        Để web giàu thông tin thì cần một lượng data đủ phong phú cho từng bộ.
      </Alert>
      <Alert severity="success">
        <AlertTitle>Đăng nhập</AlertTitle>
        Cá nhân hoá một số chức năng.
      </Alert>
      <Alert severity="info">
        <AlertTitle>Tìm kiếm, Lọc, Sắp xếp</AlertTitle>
        Tìm kiếm và lọc theo thể loại, danh mục, trạng thái, bản quyền...
      </Alert>
      <Alert severity="warning">
        <AlertTitle>Bình luận</AlertTitle>
        Giúp mình bổ sung thông tin của một bộ nào đó.
      </Alert>
      <Alert severity="warning">
        <AlertTitle>Tạo, xếp hạng và chia sẻ bộ sưu tập</AlertTitle>
        Giúp giải đáp các câu hỏi tìm hàng để đọc/xem nhanh hơn. Lưu trữ lại bộ sưu tập riêng của
        bạn.
      </Alert>
      <Alert severity="info">
        <AlertTitle>Thống kê</AlertTitle>
        Thống kê dữ liệu dựa trên các thuộc tính.
      </Alert>
    </Stack>
  );
}
