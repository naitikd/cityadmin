
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
import { DataGrid, selectedIdsLookupSelector } from '@mui/x-data-grid';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function MuiDialog() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [dialog, setDialog] = React.useState(false);
  const [did, setDid] = React.useState(0);
  const [update, setUpdate] = React.useState(false);
  // did

  const handleDelete = () => {
    let localData = JSON.parse(localStorage.getItem("medicines"));

    let fData = localData.filter((l) => l.id !== did);
    localStorage.setItem("medicines", JSON.stringify(fData));

    handleClosing();
    loadData();
    console.log(fData);
  }

  const handleEdit = (params) => {
    console.log(params.row);
    handleClickOpen();
    formikObj.setValues(params.row);
    setUpdate(true)
  }



  // setDid, openDialog
  const columns = [
    { field: 'name', headerName: 'Name', width: 170 },
    { field: 'pname', headerName: 'Price', width: 170 },
    { field: 'qname', headerName: 'Quantity', width: 170 },
    { field: 'ename', headerName: 'Expiry', width: 170 },
    {
      field: '',
      headerName: 'Action',
      width: 170,
      renderCell: (params) => (
        <>
          <IconButton aria-label="delete" onClick={() => { handleOpening(); setDid(params.id) }}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
            <EditIcon />
          </IconButton>
        </>
      )
    }
  ];


  const loadData = () => {
    let localData = JSON.parse(localStorage.getItem("medicines"));

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
    name: yup.string().required("Please enter medicines name").matches(/^[a-z ,.'-]+$/i, "Please enter valid name"),
    pname: yup.number().required("Please enter price").positive("Please enter valid price"),
    qname: yup.number().required("Please enter number of quantity").positive("Please enter positive number of quantity").integer("Please enter vaild quantity"),
    ename: yup.string().required("Please enter expiry date")

  });

  const handleInsert = (values) => {
    let localData = JSON.parse(localStorage.getItem("medicines"));

    let id = Math.floor(Math.random() * 1000);

    let data = {
      id: id,
      ...values
    }

    console.log(data);

    if (localData === null) {
      localStorage.setItem("medicines", JSON.stringify([data]));
    } else {
      localData.push(data);
      localStorage.setItem("medicines", JSON.stringify(localData))
    }

    handleClose();
    formikObj.resetForm();
    loadData();
  }

  const handleUpdateData = (values) => {
    let localData = JSON.parse(localStorage.getItem("medicines"));

    let uData = localData.map((l) => {
      if (l.id === values.id) {
        return values
      } else {
        return l;
      }
    })

    localStorage.setItem("medicines", JSON.stringify(uData));

    handleClose();

    formikObj.resetForm();

    setUpdate(false);

    loadData();

    console.log(uData);
  }

  const formikObj = useFormik({
    initialValues: {
      name: '',
      pname: '',
      qname: '',
      ename: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      if (update) {
        handleUpdateData(values)
      } else {
        handleInsert(values)
      }
    },
  });

  const { handleBlur, handleChange, handleSubmit, touched, errors, values } = formikObj

  React.useEffect(
    () => {
      loadData();
    },
    [])

  const handleOpening = () => {
    setDialog(true);
  };

  const handleClosing = () => {
    setDialog(false);
  };


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
      <Dialog open={dialog} onClose={handleClosing}>
        <DialogTitle>Are you sure to delete</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosing}>No</Button>
          <Button onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Medicines Details</DialogTitle>
        <Formik values={formikObj}>
          <Form onSubmit={handleSubmit}>
            <DialogContent>

              <TextField
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
                id="name"
                name="name"
                label="Medicine name"
                type="text"
                fullWidth
                variant="standard"
              />
              {touched.name && errors.name && <p>{errors.name}</p>}
              <TextField
                value={values.pname}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
                id="pname"
                name="pname"
                label="medicine price"
                type="number"
                fullWidth
                variant="standard"
              />
              {touched.pname && errors.pname && <p>{errors.pname}</p>}
              <TextField
                value={values.qname}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
                id="qname"
                name="qname"
                label="quantity"
                type="number"
                fullWidth
                variant="standard"
              />
              {touched.qname && errors.qname && <p>{errors.qname}</p>}
              <TextField
                value={values.ename}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
                id="ename"
                name="ename"
                label="expiry"
                type="text"
                fullWidth
                variant="standard"
              />
              {touched.ename && errors.ename && <p>{errors.ename}</p>}
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                {
                  update ?
                    <Button type="submit">Update</Button>
                    :
                    <Button type="submit">Submit</Button>

                }


              </DialogActions>

            </DialogContent>

          </Form>
        </Formik>


      </Dialog>
    </div>
  );
}
