
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
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik';
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
  },
  phoneNumbers: ['', ''], // to keep two phone numbers in an array
  dynamicPhoneNumbers: [''] // this iis for FieldArray where we create dynamic phones based on user interaction

};
const onSubmit =  (values, onSubmitProps)  =>{ // onSubmit is an arrow function that receives values-form state- as its argument.
  console.log('Form DATA :' , values);
  console.log('Submit Props : ', onSubmitProps);
  onSubmitProps.setSubmitting(false);
};

const validationSchema = Yup.object({
  name: Yup.string().required('name is required!'),
  email: Yup.string().email('Invalid email format').required('email is required!'),
  channel: Yup.string().required('channel is required!')
})

//custom Field LEvel Validation for "comments" input area
const validateComments = value => {
  let error
  if(!value){
    error='comments are required !!!-custom-'
  }
  return error
}
const YoutubeForm = () => {
  return (
    <Formik // we passed the three props to Formik component
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      //validateOnChange={false} // validation will not run onChanges event in the form fields
      //validateOnBlur={false} // validation will not run onBlur event in the form fields
      //validateOnMount // at page load auto runs the form validation end since all empt makes isValid false, which will disable the submit button in-turn. But it iis useful for small forms with simple validation rules
    >
      {// function as children for the Formik component which gives as access to the props which we call here 'formik'. this will return a JSX and in our case it is the whole form component
        formik  => { 
          console.log('formik props : ', formik)
          return (
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
              <ErrorMessage name='email'> 
                {error => <div className='error'>{error}</div>}
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
              <Field as='textarea'  id='commentsId' name='comments' validate={validateComments} />
            </div>
            <ErrorMessage name='comments' component={TextError} />

            <div className='form-control'>
              <label htmlFor="address"> Address</label>
              {/* <Field name='address'> */}
              <FastField name='address'>
                {
                  (props) => {
                    const {field, form, meta} = props // destructuring the render pros of formik
                    //console.log('render props', props);
                    console.log('Field Render');
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
              {/* </Field> */}
              </FastField>
            </div>

            <div className='form-control'>
              <label htmlFor='facebook'>Facebook Profile</label>
              <Field type='text'  id='facebookId' name='social.facebook' />
            </div>

            <div className='form-control'>
              <label htmlFor='twitter'>Twitter Profile</label>
              <Field type='text'  id='twitterId' name='social.twitter' />
            </div>

            <div className='form-control'>
              <label htmlFor='primaryPhone'>Primary Phone Number Profile</label>
              <Field type='text'  id='primaryPhoneId' name='phoneNumbers[0]' />
            </div>

            <div className='form-control'>
              <label htmlFor='secondaryPhone'>Secondary Phone Number Profile</label>
              <Field type='text'  id='secondaryPhoneId' name='phoneNumbers[1]' />
            </div>

            <div className='form-control test'>
              <label htmlFor="dynamicPhoneNumbers">List of Phone Numbers</label>
              <FieldArray  name='dynamicPhoneNumbers'>
                {
                  (fieldArrayProps) => {
                    //console.log(' fieldArray props: ', fieldArrayProps);
                    const { push, remove, form } = fieldArrayProps; // we are extracting two methods- push & remove - and 1 property fro mthe fieldArray props
                    const { values } = form; // extract values from form object under fieldArrayProps
                    const { dynamicPhoneNumbers } = values; // extract dynamicPhoneNumbers fro mvalues object
                    console.log('Form errors : ', form.errors);
                    return (
                      <div>
                        {dynamicPhoneNumbers.map( (phoneNumber, index) => (
                          <div key={index}>
                            <Field name={`dynamicPhoneNumbers[${index}]`} placeholder='add dynamic phone numbers'/>
                            {
                              index > 0 && (
                                <button type='button' onClick={() => remove(index)}>{' '} - {' '} </button>
                              )
                            }
                            <button type='button' onClick={() => push(index)}>+</button>
                          </div>
                        ))}
                      </div>
                    )
                  }
                }
              </FieldArray>
            </div>
           
           <button type='button' onClick={() => formik.validateField('comments')}>Validate Comments</button>
           <button type='button' onClick={() => formik.validateForm()}>Validate All</button>

           <button type='button' onClick={() => formik.setFieldTouched('comments')}>Visit Comments</button>
           <button type='button' onClick={() => formik.setTouched({
            name: true,
            email: true,
            channel: true,
            comments: true
           })}>Visit name-email-channel-comment</button>

            <button type='submit' disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}> Submit </button>
            </Form>
      )}}
       
    </Formik>
  )
}

export default YoutubeForm