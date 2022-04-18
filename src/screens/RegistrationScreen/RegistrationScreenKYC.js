// import React, { useEffect, useRef } from 'react';
// import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
// import { COLORS } from '../../constants/colors';
// import TextBold from '../../components/TextWrappers/TextBold';
// import TextRegular from '../../components/TextWrappers/TextRegular';
// import FKInput from '../../components/FKInput/FKInput';
// import { useFormik } from 'formik';
// import ButtonShared from '../../components/ButtonShared';
// import * as Yup from 'yup';
// import FKInputPassword from '../../components/FKInputPassword/FKInputPassword';
//
// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Required'),
//   password: Yup.string()
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
//       'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
//     )
//     .min(8, 'Too Short!')
//     .max(8, 'Too Long!')
//     .required('Required'),
//   confirmation: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//     .required('Required'),
// });
//
// const RegistrationScreeKYC = () => {
//   const { handleSubmit, handleBlur, values, errors, touched, setFieldValue } =
//     useFormik({
//       validationSchema: LoginSchema,
//       // validateOnChange: false,
//       // validateOnBlur: false,
//       initialValues: { email: '', password: '', confirmation: '' },
//       onSubmit: values => {
//         console.log('inner submit');
//         alert(`Email: ${values.email}, Password: ${values.password}`);
//         console.log(`Email: ${values.email}, Password: ${values.password}`);
//       },
//     });
//   const submitValues = () => {
//     console.log('submit', values);
//     handleSubmit();
//   };
//
//   const topAnim = useRef(
//     new Animated.Value(Dimensions.get('window').height),
//   ).current;
//
//   useEffect(() => {
//     console.log('effect');
//     Animated.timing(topAnim, {
//       toValue: 0,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, [topAnim]);
//
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text>Register</Text>
//       </View>
//       <Animated.ScrollView
//         style={[
//           styles.formContainer,
//           { transform: [{ translateY: topAnim }] },
//         ]}>
//         <TextBold style={styles.heading}>Let's start</TextBold>
//         <TextRegular style={styles.headingText}>
//           Please enter your credentials to proceed
//         </TextRegular>
//         <TextRegular style={styles.label}>Email</TextRegular>
//         <FKInput
//           value={values.email}
//           label={'email'}
//           keyboardType={'email-address'}
//           handleChange={setFieldValue}
//           error={errors.email}
//         />
//         <TextRegular style={styles.label}>Password</TextRegular>
//         <FKInputPassword
//           value={values.password}
//           label={'password'}
//           keyboardType={'default'}
//           handleChange={setFieldValue}
//           error={errors.password}
//         />
//         <TextRegular style={styles.label}>Confirm password</TextRegular>
//         <FKInput
//           value={values.confirmation}
//           label={'confirmation'}
//           keyboardType={'default'}
//           handleChange={setFieldValue}
//           error={errors.confirmation}
//         />
//         <ButtonShared onPress={submitValues}>
//           <TextBold
//             style={{
//               fontSize: 16,
//               color: COLORS.white,
//               textAlign: 'center',
//             }}>
//             NEXT
//           </TextBold>
//         </ButtonShared>
//       </Animated.ScrollView>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.activeColor,
//   },
//   header: {
//     backgroundColor: COLORS.activeColor,
//     height: 50,
//   },
//   heading: {
//     color: COLORS.white,
//     fontSize: 25,
//   },
//   headingText: {
//     color: COLORS.white,
//     fontSize: 16,
//   },
//   formContainer: {
//     width: '100%',
//     flex: 1,
//     backgroundColor: COLORS.mainBackground,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     paddingHorizontal: 16,
//   },
//   label: {
//     color: COLORS.white,
//     fontSize: 12,
//   },
// });
//
// export default RegistrationScreenKYC;
