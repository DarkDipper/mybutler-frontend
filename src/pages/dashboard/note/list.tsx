import { useEffect } from 'react';
// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Button, Container, Stack } from '@mui/material';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
// redux
import { useDispatch, useSelector } from '@yourapp/src/redux/store';
import { getBoard, persistColumn, persistCard } from '@yourapp/src/redux/slices/kanban';
// routes
import { PATH_DASHBOARD } from '@yourapp/src/routes/paths';
// utils
import { hideScrollbarX } from '@yourapp/src/utils/cssStyles';
// layouts
import DashboardLayout from '@yourapp/src/layouts/dashboard';
// components
import CustomBreadcrumbs from '@yourapp/src/components/custom-breadcrumbs';
import { SkeletonKanbanColumn } from '@yourapp/src/components/skeleton';
// sections
import { NoteColumn, NoteColumnAdd } from '@yourapp/src/sections/@dashboard/note';

// ----------------------------------------------------------------------

NotePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function NotePage() {
  const dispatch = useDispatch();

  const { board } = useSelector((state) => state.kanban);

  useEffect(() => {
    dispatch(getBoard());
  }, [dispatch]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      const newColumnOrder = Array.from(board.columnOrder);

      newColumnOrder.splice(source.index, 1);

      newColumnOrder.splice(destination.index, 0, draggableId);

      dispatch(persistColumn(newColumnOrder));
      return;
    }

    const start = board.columns[source.droppableId];
    const finish = board.columns[destination.droppableId];

    if (start.id === finish.id) {
      const updatedCardIds = [...start.cardIds];

      updatedCardIds.splice(source.index, 1);

      updatedCardIds.splice(destination.index, 0, draggableId);

      const updatedColumn = {
        ...start,
        cardIds: updatedCardIds,
      };

      dispatch(
        persistCard({
          ...board.columns,
          [updatedColumn.id]: updatedColumn,
        })
      );
      return;
    }

    const startCardIds = [...start.cardIds];

    startCardIds.splice(source.index, 1);

    const updatedStart = {
      ...start,
      cardIds: startCardIds,
    };

    const finishCardIds = [...finish.cardIds];

    finishCardIds.splice(destination.index, 0, draggableId);

    const updatedFinish = {
      ...finish,
      cardIds: finishCardIds,
    };

    dispatch(
      persistCard({
        ...board.columns,
        [updatedStart.id]: updatedStart,
        [updatedFinish.id]: updatedFinish,
      })
    );
  };

  return (
    <>
      <Head>
        <title> Quick Note | My butler</title>
      </Head>

      <Container maxWidth={false} sx={{ height: 1 }}>
        <CustomBreadcrumbs
          heading="Quick note"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'Note' },
          ]}
          // action={
          //   <Button
          //     component={NextLink}
          //     href={PATH_DASHBOARD.invoice.new}
          //     variant="contained"
          //     startIcon={<Iconify icon="eva:plus-fill" />}
          //   >
          //     New Task
          //   </Button>
          // }
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <Stack
                {...provided.droppableProps}
                ref={provided.innerRef}
                spacing={3}
                direction="row"
                alignItems="flex-start"
                sx={{
                  height: 1,
                  overflowY: 'hidden',
                  ...hideScrollbarX,
                }}
              >
                {!board.columnOrder.length ? (
                  <>
                    <SkeletonKanbanColumn />
                  </>
                ) : (
                  board.columnOrder.map((columnId, index) => (
                    <NoteColumn
                      index={index}
                      key={columnId}
                      column={board.columns[columnId]}
                      cards={board.cards}
                    />
                  ))
                )}
                {provided.placeholder}
                <NoteColumnAdd />
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </>
  );
}
