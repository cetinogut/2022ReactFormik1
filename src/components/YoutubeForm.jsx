
// let me quickly summarize the steps to refactor the form :

// First import Formic and then wrap your entire form with the Formic component.
// This Formic component accepts initial values validation schema and the onsubmit handler as props.

// Next replace the form html tag with the Form component from formic.
// This will automatically link the onsubmit event to the onsubmit method passed into formic.

// After that replace each of the form fields with the Field component
// This Field component hooks into formic using the name attribute.
// It'll take care of handling the value handling on change and the on blur event.

// Finally for your error message use the ErrorMessage component,
// which conditionally renders the error corresponding to a form field only if,
// the field has been visited and if the error exists


import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import TextError from './TextError';
//import { TextError } from "./TextError";


const initialValues = { // initial values is mandatory
  name: 'dogan',
  email: '',
  channel: '',
  comments:'',
  address:'',
  social:{
    facebook:'',
    twitter:''
  }
};
const onSubmit =  values =>{ // onSubmit is an arrow function that receives values-form state- as its argument.
  console.log('Form DATA :' , values);
};

const validationSchema = Yup.object({
  name: Yup.string().required('name is required!'),
  email: Yup.string().email('Invalid email format').required('email is required'),
  channel: Yup.string().required('channel is required')
})

const YoutubeForm = () => {
  return (
    <Formik // we passed the three props to Formik component
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
        <Form>
            <div className='form-control'>
              <label htmlFor="name">Name</label>
              <Field 
                type='text' 
                id='nameId' 
                name='name' 
                />
              <ErrorMessage name='name' component={TextError}/>  {/* using custom componet for error message */}
            </div>
            
            <div className='form-control'>
              <label htmlFor="email">E-mail</label>
              <Field
                type='email' 
                id='emailId' 
                name='email' 
                />
              <ErrorMessage name='email'>  {/* using Render Props Pattern  for error message */}
                {
                  (errorMsg) => <div className='error'>{errorMsg}</div> 
                }
              </ErrorMessage>
            </div>
          
           
            <div className='form-control'>
              <label htmlFor="channel">Channel</label>
              <Field
                type='text' 
                id='channelId' 
                name='channel' 
                placeholder='Youtube channel name'
                />
              <ErrorMessage name='channel'/>
            </div>

            <div className='form-control'>
              <label htmlFor='comments'>Comments</label>
              <Field as='textarea'  id='commentsId' name='comments' />
            </div>

            <div className='form-control'>
              <label htmlFor="address"> Address</label>
              <Field name='address'>
                {
                  (props) => {
                    const {field, form, meta} = props // destructuring the render pros of formik
                    console.log('render props', props)
                    return (
                        <>
                           <input type='text' id='addressId' {...field} />
                           {/* //to hook the input with Formik we need to spread the field prop.
                          // once we hook to formik, this will take care of onChange, onBlur and value props. */}
                          {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                        </>
                    )
                   
                  }
                }

              </Field>
            </div>

            <div className='form-control'>
              <label htmlFor='facebook'>Facebook Profile</label>
              <Field as='text'  id='facebookId' name='social.facebook' />
            </div>
            <div className='form-control'>
              <label htmlFor='twitter'>Twitter Profile</label>
              <Field as='text'  id='twitterId' name='social.twitter' />
            </div>
           
            <button type='submit'> Submit </button>
        </Form>
    </Formik>
  )
}

export default YoutubeForm