import * as Yup from 'yup';

// This schema is for validate listTodo data respone
export const listToDoSchema = Yup.array().of(
  Yup.object().shape({
    id: Yup.string().required('Id is required'),
    title: Yup.string().required('Name is required'),
    createDate: Yup.date().required('Create date is required'),
    dueDate: Yup.date().required('Due date is required'),
    status: Yup.string()
      .oneOf(['completed', 'progressing', 'overdue'])
      .required('Status is required'),
    description: Yup.string().required('Description is required'),
  })
);
