import * as Yup from 'yup'

const foodName = Yup.string().required("نام غذا الزامی است").min(4, "نام غذا نباید کمتر از 4 کاراکتر باشد.")

const foodDescription = Yup.string().required("توضیحات برای غذا الزامی است.")

const foodScore = Yup.number().typeError("لطفا عدد صحیح وارد کنید.").min(0, "امتیاز نباید کمتر از صفر باشد").max(5, "امتیاز نباید بیشتر از 5 باشد.")

const foodPrice = Yup.number().typeError("لطفا عدد صحیح وارد کنید.").required("قیمت الزامی است.")

export const createFoodSchema = Yup.object({
    name: foodName,
    description: foodDescription,
    price: foodPrice,
})
