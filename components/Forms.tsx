'use client'
import { Button, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import { Form, Formik, useFormikContext } from 'formik';
import { NextPage } from 'next';
import * as yup from 'yup';
import { EMAIL_VALIDATOR, PASSWORD_VALIDATOR, NAME_VALIDATOR, confirmPasswordValidator } from '@/utils/CustomValidators';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
interface IForms {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    showPassword: boolean,
    showConfirmPassword: boolean
}
type Props = {

};
const Forms: NextPage<Props> = ({

}) => {

    const router = useRouter();

    const validationSchema = yup.object({
        firstName: NAME_VALIDATOR,
        lastName: NAME_VALIDATOR,
        email: EMAIL_VALIDATOR,
        password: PASSWORD_VALIDATOR,
        confirmPassword: confirmPasswordValidator('password')

    });
    useEffect(() => {
        // deleting localstorage
        localStorage.removeItem('formData')
    }, [])
    
    const FormBody = () => {
        const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            setFieldValue,
            isSubmitting
        } = useFormikContext<IForms>();

        const togglePasswordVisibility = () => {
            setFieldValue('showPassword', !values.showPassword)
          };
        
          const toggleConfirmPasswordVisibility = () => {
            setFieldValue('showConfirmPassword', !values.showConfirmPassword)
          };
        return (
            <div className='flex flex-col gap-10'>
                <TextField
                    label="First Name"
                    type='text'
                    variant="outlined"
                    fullWidth
                    name={values.firstName}
                    value={values.firstName}
                    onChange={(e) => setFieldValue('firstName', e.target.value)}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName ? errors.firstName : ''}
                />
                <TextField
                    label="Last Name"
                    type='text'
                    variant="outlined"
                    fullWidth
                    name={values.lastName}
                    value={values.lastName}
                    onChange={(e) => setFieldValue('lastName', e.target.value)}
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName ? errors.lastName : ''}
                />
                <TextField
                    label="Email"
                    type='email'
                    variant="outlined"
                    fullWidth
                    name={values.email}
                    value={values.email}
                    onChange={(e) => setFieldValue('email', e.target.value)}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email ? errors.email : ''}
                />
                <TextField
                    label="Password"
                    type={values.showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    name={values.password}
                    value={values.password}
                    onChange={(e) => setFieldValue('password', e.target.value)}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password ? errors.password : ''}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                              {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                />
                <TextField
                    label="Confirm Password"
                    type={values.showConfirmPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    name={values.confirmPassword}
                    value={values.confirmPassword}
                    onChange={(e) => setFieldValue('confirmPassword', e.target.value)}
                    onBlur={handleBlur}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword ? errors.confirmPassword : ''}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                              {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                />

                <div className='mt-[20px]'>
                    <Button type='submit' variant="contained" fullWidth>Submit</Button>
                </div>
            </div>
        )
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <Paper elevation={6} className='w-2/5'>
                <div className='p-12'>

                    <Formik
                        validationSchema={validationSchema}
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            showPassword: false,
                            showConfirmPassword: false
                        }}
                        onSubmit={async (formValues, { setSubmitting }) => {
                            const formData = {
                                firstName: formValues.firstName,
                                lastName: formValues.lastName,
                                email: formValues.email,
                            } 
                            router.push('congratulations')
                            localStorage.setItem('formData', JSON.stringify(formData))
                        }}
                    >
                        <Form>
                            <FormBody />
                        </Form>
                    </Formik>
                </div>
            </Paper>

        </div>
    );
}
export default Forms;