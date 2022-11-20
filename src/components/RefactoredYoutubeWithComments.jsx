import React from 'react';
//import { useFormik } from 'formik';
import { Formik, Form, Field, ErrorMessage } from 'formik'; // these for fields addded during the refactoring
//Formik
//Form : form component is a small wrapper around the html form element that automatically hooks into formic's handle submit method
//Field : removes the getFieldProps that we use with useFormik hooks
//ErrorMessage: replaces touched, error field and error message
import * as Yup from "yup";

const initialValues = { // initial values is mandatory
  name: 'dogan',
  email: '',
  channel: ''
};
const onSubmit =  values =>{ // onSubmit is an arrow function that receives values-form state- as its argument.
  console.log('Form DATA :' , values);
};

const validationSchema = Yup.object({
  name: Yup.string().required('name is required!'),
  email: Yup.string().email('Invalid email format').required('email is required'),
  channel: Yup.string().required('channel is required')

})
const RefactoredYoutubeWithComments = () => {

  // const  formik = useFormik({  // during the refactoring we passed to Formik instead of useFormik
  //   initialValues,
  //   onSubmit,
  //   //validate
  //   validationSchema
  // });

  //console.log('form values : ', formik.values);
  //console.log('form errors : ', formik.errors);
  //console.log('visited fields : ', formik.touched);

  return (
    <Formik // we passed the three props to Formik component
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
        {/* <form onSubmit = { formik.handleSubmit}> */}
        <Form> {/* Form component automatically use (hooks to the) the handleSubmit method, so remove the formik.handleSubmit as well */}
            <div className='form-control'>
              <label htmlFor="name">Name</label>
              {/* <input  */} {/* replaced with the Field component */}
              <Field 
                type='text' 
                id='nameId' 
                name='name' 
                //onChange={formik.handleChange} 
                // onBlur={formik.handleBlur}
                //value= {formik.values.name} 
                // we began with the three individual props on input field and then combined all three of the mwith the following line. But when we use the Field component we even don't need the next line
                // {...formik.getFieldProps('name')} // do the repated code above in one line
                />
              {/* { formik.touched.name && formik.errors.name ? (<div className='error'>{formik.errors.name}</div> ): null } */}
              {/* use the following ErrorMessafe component provided by Formik instead of above code */}
              <ErrorMessage name='name'/>
            </div>
            
            <div className='form-control'>
              <label htmlFor="email">E-mail</label>
              {/* <input  */}
              <Field
                type='email' 
                id='emailId' 
                name='email' 
                //onChange={formik.handleChange}   onBlur={formik.handleBlur} value= {formik.values.email} 
                // {...formik.getFieldProps('email')}
                />
              {/* { formik.touched.email && formik.errors.email ? (<div className='error'>{formik.errors.email}</div>) : null } */}
              <ErrorMessage name='email'/>

            </div>
          
           
            <div className='form-control'>
              <label htmlFor="channel">Channel</label>
              {/* <input  */}
              <Field
                type='text' 
                id='channelId' 
                name='channel' 
                //onChange={formik.handleChange} onBlur={formik.handleBlur}   value= {formik.values.channel} 
                // {...formik.getFieldProps('channel')}
                />
              {/* { formik.touched.channel && formik.errors.channel ? (<div className='error'>{formik.errors.channel}</div>) : null } */}
              <ErrorMessage name='channel'/>

            </div>
           

            <button type='submit'> Submit </button>
        {/* </form> */}
        </Form>
    </Formik>
  )
}

export default RefactoredYoutubeWithComments