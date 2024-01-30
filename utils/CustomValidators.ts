import * as Yup from 'yup';
import PasswordValidator from 'password-validator';

type PasswordValidationResult = boolean;

const validatePassword = new PasswordValidator()
  .is()
  .min(12)
  .has()
  .uppercase(1)
  .has()
  .lowercase(1)
  .has()
  .symbols(1)
  .has()
  .not()
  .spaces();

const numberRegExp = /^[0-9]+$/;
const mobileRegExp = /^[0][1-9]+$/;
const nameRegExp = /^[\p{L},Ññ\s-]+$/u;
const webUrlRegExp =
  /^((https?|http|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*/;
const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const REQUIRED_MIN_MAX_NUMBER = Yup.string().min(7, 'The minimum is 7 characters').max(11, 'The maximum is 11 characters').required('Required*');

export const EMAIL_VALIDATOR = Yup.string()
  .required('Required*')
  .email('Invalid Email');

export const REQUIRED_VALIDATOR = Yup.string().nullable().required('Required*');

export const NUMBER_VALIDATOR = Yup.string()
  .required('Required*')
  .matches(numberRegExp, 'Invalid Number');

export const NAME_VALIDATOR = Yup.string()
  .required('Required*')
  .matches(nameRegExp, 'Invalid Name')
  .max(100, 'Name must not exceed 100 characters');

export const PASSWORD_VALIDATOR = Yup.string()
  .required('Required*')
  .test(
    'password',
    'Password must be at least 12 characters with 1 uppercase, 1 lowercase, and 1 special character.',
    (value) => validatePassword.validate(value) as PasswordValidationResult
  );

export const confirmPasswordValidator = (passwordRefID: string) =>
  Yup.string()
    .required('Required*')
    .oneOf([Yup.ref(passwordRefID) ?? undefined], 'Passwords must be matched');
