import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import * as yup from 'yup';
import { useFormik, Form, Formik } from 'formik';
import MenuIcon from '@mui/icons-material/Menu';
import { DataGrid } from '@mui/x-data-grid';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
export default function PatDialog() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [dialog, setDialog] = React.useState(false);
  const [did, setDid] = React.useState(0);
  const [update, setUpdata] = React.useState(false);

  

  const handleDelete = () => {
    let localData = JSON.parse(localStorage.getItem("customer"));

    let fData = localData.filter((l) => l.id !== did);
    localStorage.setItem("customer",JSON.stringify(fData));

    loadData();
    console.log(fData);
    handleClosing();
  }

  const handleEdit = (params) => {
    console.log(params.row);
    handleClickOpen();
    formikObj.setValues(params.row);
    setUpdata(true);
  }

  
  const columns = [
    { field: 'name', headerName: 'Name', width: 170 },
    { field: 'email', headerName: 'Email', width: 170 },
    { field: 'number', headerName: 'Number', width: 170 },
    {
      field: '',
      headerName: 'Action',
      width: 170,
      renderCell: (params) => (
        <>
        <IconButton aria-label="delete" onClick={() => {handleOpening(); setDid(params.id) }}>    
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="edit" onClick={() => {handleEdit(params) }}>    
          <EditIcon />
        </IconButton>
        </>
      )
    }
  ];

  const loadData = () => {
    let localData = JSON.parse(localStorage.getItem("customer"));

    if (localData != null) {
      setData(localData);
    }

  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let schema = yup.object().shape({
    name: yup.string().required("Please enter name").matches(/^[a-z ,.'-]+$/i, "Please enter valid name"),
    email: yup.string().required("Please enter price").email("Please enter valid email"),
    number: yup.number().required("Please enter vaild number").positive("Please enter positive number").integer("Please enter vaild number")

  });

  const handleInsert = (values) => {
    let localData = JSON.parse(localStorage.getItem("customer"));

    let id = Math.floor(Math.random() * 1000);

    let data = {
      id: id,
      ...values
   }

    console.log(data);

    if (localData === null) {
      localStorage.setItem("customer", JSON.stringify([data]));
    } else {
      localData.push(data);
      localStorage.setItem("customer", JSON.stringify(localData))
    }

    handleClose();
    formikObj.resetForm();
    loadData();
  }

  const handleUpData = (values) => {
    let localData = JSON.parse(localStorage.getItem("customer"));

    let uData = localData.map((l) => {
      if (l.id === values.id){
        return values;
      } else {
        return l;
      }
    })
    localStorage.setItem("customer",JSON.stringify(uData));
    handleClose();
    formikObj.resetForm();
    setUpdata(false);
    loadData();
  }

  const formikObj = useFormik({
    initialValues: {
      name: '',
      email: '',
      number: ''
      
    },
    validationSchema: schema,
    onSubmit: values => {
      if (update){
        handleUpData(values);
      } else {
      handleInsert(values)
      }
    },
  });

  const handleOpening = () => {
    setDialog(true);
  }
  const handleClosing = () => {
    setDialog(false);
  }

  const { handleBlur, handleChange, handleSubmit, touched, errors, values } = formikObj

  React.useEffect(
    () => {
      loadData();
    },
    [])



  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open
      </Button>
      <div style={{ height: 400, width: '100%' }}>

        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection

        />

      </div>
      <Dialog open={dialog} onClose={handleClose}>
        <DialogTitle>Are you sure to delete</DialogTitle>
        <DialogActions>
          <Button onClick={handleClosing}>No</Button>
          <Button onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Patients Details</DialogTitle>
        <DialogContent>
          <Formik values={formikObj}>
            <Form onSubmit={handleSubmit}>
              <TextField
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
                id="name"
                name='name'
                label="Name"
                type="text"
                fullWidth
                variant="standard"
              />
              {touched.name && errors.name && <p>{errors.name}</p>}
              <TextField
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
                id="email"
                name='email'
                label="Email"
                type="text"
                fullWidth
                variant="standard"
              />
              {touched.email && errors.email && <p>{errors.email}</p>}
              <TextField
                value={values.number}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
                id="number"
                name='number'
                label="Number"
                type="number"
                fullWidth
                variant="standard"
              />

              {touched.number && errors.number && <p>{errors.number}</p>}
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                {
                  update ?
                <Button type='submit'>Update</Button>
                :
                <Button type='submit'>Submit</Button>
                }
              </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
