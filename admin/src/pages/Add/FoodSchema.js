import * as Yup from 'yup'

export const foodSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().positive('Price is must be positive').required('Price is required'),
    category: Yup.string().required('Category is required'),
    image: Yup.mixed().required('An image is required'),
});