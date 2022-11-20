import React from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";

const initialValues = { // initial values is mandatory
  name: 'dogan',
  email: '',
  channel: ''
};
const onSubmit =  values =>{ // onSubmit is an arrow function that receives values-form state- as its argument.
  console.log('Form DATA :' , values);
};
const validate = values => {
  // values.name, values.email, values.channel
  // errors.name, errors.email, errors.channel
  // errors.name = 'This fiels is required!!!'

  let errors = {}

    if(!values.name){// values.name is empty
      errors.name = 'Required';
    }

    if(!values.email){
      errors.email = 'Required';
    } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email= 'Invalid email format.';
    }

    if(!values.channel) {
      errors.channel = 'Required';
    }

  return errors;
}

const validationSchema = Yup.object({
  name: Yup.string().required('name is required!'),
  email: Yup.string().email('Invalid email format').required('email is required'),
  channel: Yup.string().required('channel is required')

})
const OldYoutubeForm = () => {

  const  formik = useFormik({ 
    initialValues,
    onSubmit,
    //validate
    validationSchema
  });

  //console.log('form values : ', formik.values);
  //console.log('form errors : ', formik.errors);
  console.log('visited fields : ', formik.touched);

  return (
    <div>
        <form onSubmit = { formik.handleSubmit}>
            <div className='form-control'>
              <label htmlFor="name">Name</label>
              <input 
                type='text' 
                id='nameId' 
                name='name' 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                value= {formik.values.name} />
              { formik.touched.name && formik.errors.name ? (<div className='error'>{formik.errors.name}</div> ): null }
            </div>
            
            <div className='form-control'>
              <label htmlFor="email">E-mail</label>
              <input type='email' id='emailId' name='email' onChange={formik.handleChange}   onBlur={formik.handleBlur} value= {formik.values.email} />
              { formik.touched.email && formik.errors.email ? (<div className='error'>{formik.errors.email}</div>) : null }
            </div>
          
           
            <div className='form-control'>
              <label htmlFor="channel">Channel</label>
              <input type='text' id='channelId' name='channel' onChange={formik.handleChange} onBlur={formik.handleBlur}   value= {formik.values.channel} />
              { formik.touched.channel && formik.errors.channel ? (<div className='error'>{formik.errors.channel}</div>) : null }
            </div>
           

            <button type='submit'> Submit </button>
        </form>
    </div>
  )
}

export default OldYoutubeForm