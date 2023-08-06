import * as yup from 'yup'

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const registerSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

export { loginSchema, registerSchema };