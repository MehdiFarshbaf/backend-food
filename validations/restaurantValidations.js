import * as Yup from 'yup'

const restaurantName = Yup.string().required("نام رستوران الزامی است").min(4, "نام رستوران نباید کمتر از 4 کاراکتر باشد.")

const restaurantDescription = Yup.string().required("توضیحات برای رستوران الزامی است.")

const restaurantAddress = Yup.string().required("آدرس برای رستوران الزامی است.")

const restaurantScore = Yup.number().typeError("لطفا عدد صحیح وارد کنید.").min(0, "امتیاز نباید کمتر از صفر باشد").max(5, "امتیاز نباید بیشتر از 5 باشد.")

const restaurantUsername = Yup.string().required("کلمه عبور برای رستوران الزامی است.").min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")

const restaurantPassword = Yup.string().required('گذرواژه الزامی است.').matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
    "باید حداقل شامل 8 کاراکتر و حروف کوچک و بزرگ و اعداد باشد"
)

export const createRestaurantSchema = Yup.object({
    name: restaurantName,
    description: restaurantDescription,
    score: restaurantScore,
    address: restaurantAddress,
    adminUsername: restaurantUsername,
    adminPassword: restaurantPassword
})

export const loginRestaurantSchema = Yup.object({
    username: restaurantUsername,
    password: restaurantPassword
})