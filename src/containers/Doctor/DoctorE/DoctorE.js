import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { useFormik, Form, Formik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function DoctorE() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [dialog, setDialog] = React.useState(false);
    const [did, setDid] = React.useState(0);
    const [update, setUpdate] = React.useState(false);

    const handleDelete = () => {
        let localData = JSON.parse(localStorage.getItem("doctor"));

        let lData = localData.filter((f) => f.id != did);
        localStorage.setItem("doctor", JSON.stringify(lData));
        loadData();
        console.log(lData);
        handleClosing();
    }

    const handleEdit = (params) => {
        console.log(params.row);
        handleClickOpen();
        formikObj.setValues(params.row);
        setUpdate(true);
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 170 },
        { field: 'fees', headerName: 'Price', width: 170 },
        { field: 'email', headerName: 'Quantity', width: 170 },
        {
            field: '',
            headerName: 'Action',
            width: 170,
            renderCell: (params) => (
                <>
                <IconButton aria-label="delete" onClick={() => { handleOpening(); setDid(params.id)  }}>
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit" onClick={() => { handleEdit(params) }}>
                <EditIcon />
            </IconButton>
            </>
            )

        }


    ];

    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem("doctor"));

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
        name: yup.string().required("Please enter your name").matches(/^[a-z ,.'-]+$/i, "Please enter valid name"),
        fees: yup.number().required("Please enter your fees"),
        email: yup.string().required("Please enter your email").email("Please valid email")

    });

    const handleInsert = (values) => {
        let localData = JSON.parse(localStorage.getItem("doctor"));

        let id = Math.floor(Math.random() * 1000)

        let data = {
            id: id,
            ...values
        }

        if (localData === null) {
            localStorage.setItem("doctor", JSON.stringify([data]));
        } else {
            localData.push(data)
            localStorage.setItem("doctor", JSON.stringify(localData));
        }
        handleClose();
        formikObj.resetForm();
        loadData();
    }

    const handleUpDate = (values) => {
        let localData = JSON.parse(localStorage.getItem("doctor"));

        let uData = localData.map((l) =>{
            if (l.id === values.id){
                return values
            } else {
                return l;
            }

        })
        localStorage.setItem("doctor",JSON.stringify(uData));
        handleClose();
         formikObj.resetForm();
         setUpdate(false);
         loadData();
    }

    const formikObj = useFormik({
        initialValues: {
            name: '',
            fees: '',
            email: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            if (update){
                handleUpDate(values);
            } else {
            handleInsert(values);
            }
        },
    });
    const { handleChange, handleBlur, touched, errors, handleSubmit,values } = formikObj

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
                <DialogTitle>Doctor</DialogTitle>
                <Formik values={formikObj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                margin="dense"
                                id="name"
                                name='name'
                                label="Doctor name"
                                type="type"
                                fullWidth
                                variant="standard"
                            />
                            {touched.name && errors.name && <p>{errors.name}</p>}
                            <TextField
                                value={values.fees}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                margin="dense"
                                id="fees"
                                name='fees'
                                label="Fees"
                                type="number"
                                fullWidth
                                variant="standard"
                            />
                            {touched.fees && errors.fees && <p>{errors.fees}</p>}
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
                            <DialogActions>
                                <Button onClick={handleClose}>Cancle</Button>
                                {
                                  update ?  
                                <Button type='submit'>Update</Button>
                                :
                                <Button type='submit'>Submit</Button>
                                }
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>
            </Dialog>
        </div>
    );
}
