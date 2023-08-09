import * as yup from 'yup'

const loginSchema = yup.object().shape({
    email: yup.string().email().required().matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/),
    password: yup.string().required().min(8),
});

const registerSchema = yup.object().shape({
    email: yup.string().email().required().matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/),
    password: yup.string().required().min(8),
});

const profileSchema = yup.object().shape({
    name : yup.string().required().min(3),
    username: yup.string().required().min(3),
    bio: yup.string().required().min(3),
});

export { loginSchema, registerSchema, profileSchema };