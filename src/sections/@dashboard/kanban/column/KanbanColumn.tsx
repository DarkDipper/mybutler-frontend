import { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
// @mui
import { Paper, Stack, Button } from '@mui/material';
// redux
import { useDispatch } from '@yourapp/src/redux/store';
import { deleteColumn, updateColumn, addTask, deleteTask } from '@yourapp/src/redux/slices/kanban';
// @types
import { IKanbanColumn, IKanbanCard } from '@yourapp/src/@types/kanban';
// components
import Iconify from '@yourapp/src/components/iconify';
import { useSnackbar } from '@yourapp/src/components/snackbar';
//
import KanbanTaskAdd from '../KanbanTaskAdd';
import KanbanTaskCard from '../KanbanTaskCard';
import KanbanColumnToolBar from './KanbanColumnToolBar';

// ----------------------------------------------------------------------

type Props = {
  column: IKanbanColumn;
  cards: Record<string, IKanbanCard>;
  index: number;
};

export default function KanbanColumn({ column, index, cards }: Props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [openAddTask, setOpenAddTask] = useState(false);

  const handleToggleAddTask = () => {
    setOpenAddTask(!openAddTask);
  };

  const handleCloseAddTask = () => {
    setOpenAddTask(false);
  };

  const handleDeleteTask = (cardId: string) => {
    dispatch(
      deleteTask({
        cardId,
        columnId: column.id,
      })
    );
    enqueueSnackbar('Delete success!');
  };

  const handleUpdateColumn = async (newName: string) => {
    try {
      if (newName !== column.name) {
        dispatch(
          updateColumn(column.id, {
            ...column,
            name: newName,
          })
        );
        enqueueSnackbar('Update success!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteColumn = async () => {
    try {
      dispatch(deleteColumn(column.id));
      enqueueSnackbar('Delete success!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = (task: IKanbanCard) => {
    handleCloseAddTask();
    dispatch(
      addTask({
        card: task,
        columnId: column.id,
      })
    );
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
          sx={{
            px: 2,
            borderRadius: 1,
            borderStyle: 'dashed',
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? 'grey.100' : 'background.default',
          }}
        >
          <Stack spacing={3} {...provided.dragHandleProps}>
            <KanbanColumnToolBar
              columnName={column.name}
              onDelete={handleDeleteColumn}
              onUpdate={handleUpdateColumn}
            />

            <Droppable droppableId={column.id} type="task">
              {(columnProvided) => (
                <Stack
                  ref={columnProvided.innerRef}
                  {...columnProvided.droppableProps}
                  spacing={2}
                  sx={{ width: 280 }}
                >
                  {column.cardIds.map((cardId, cardIndex) => (
                    <KanbanTaskCard
                      key={cardId}
                      index={cardIndex}
                      onDeleteTask={handleDeleteTask}
                      card={cards[cardId]}
                    />
                  ))}
                  {columnProvided.placeholder}
                </Stack>
              )}
            </Droppable>

            <Stack spacing={2} sx={{ pb: 3 }}>
              {openAddTask && (
                <KanbanTaskAdd onAddTask={handleAddTask} onCloseAddTask={handleCloseAddTask} />
              )}

              <Button
                fullWidth
                size="large"
                color="inherit"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={handleToggleAddTask}
                sx={{ fontSize: 14 }}
              >
                Add Task
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}
