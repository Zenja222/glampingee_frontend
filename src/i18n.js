import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "home": "Home",
            "explore": "Explore",
            "login": "Log In",
            "register": "Register",
            "welcome": "Welcome",
            "log_out": "Log Out",
            "welcome_to": "Welcome To",
            "est_glampings": "Estonian Glampings",
            "select_sort_field": "Select Sort Field",
            "ascending": "Ascending",
            "descending": "Descending",
            "loading_glampings": "Loading glampings...",
            "no_description": "No description available.",
            "error_fetching": "Error fetching data.",
            "failed_to_load": "Failed to load glamping details.",
            "loading": "Loading...",
            "glamping_not_found": "Glamping not found.",
            "previous": "Previous",
            "next": "Next",
            "county": "County",
            "price_not_available": "Price not available.",
            "rating": "Rating",
            "no_reviews": "No reviews yet.",
            "leave_your_rating": "Leave your rating:",
            "submit_review": "Submit Review",
            "want_to_leave_review": "Want to leave a review?",
            "or": "or",
            "review_submitted": "Your review has been submitted.",
            "review_failed": "Failed to submit your review.",
            "filter": "Filter",
            "add_new_glamping": "Add new glamping",
            "name": "Name",
            "price": "Price",
            "book_now": "Book now",
            "email_address": "Email address",
            "enter_email": "Enter your email",
            "password": "Password",
            "enter_password": "Enter your password",
            "login_with_google": "Log in with Google",
            "sign_up": "Sign up with your email",
            "sign_up_with_google": "Sign up with Google",
            "apply_filters" : "Apply filters",
            "price_range" : "Price range",
            "filters" : "Filters",
            "search" : "Search",
            "close" : "Close"
            // Other keys as necessary...
        }
    },
    et: {
        translation: {
            "home": "Avaleht",
            "explore": "Avasta",
            "login": "Logi sisse",
            "register": "Registreeri",
            "welcome": "Tere tulemast",
            "log_out": "Logi välja",
            "welcome_to": "Tere tulemast",
            "est_glampings": "Eesti Glämpingusse",
            "select_sort_field": "Vali sorteerimise väli",
            "ascending": "Tõusvas järjekorras",
            "descending": "Laskuvas järjekorras",
            "loading_glampings": "Laadimine glämpinguid...",
            "no_description": "Kirjeldus puudub.",
            "error_fetching": "Andmete allalaadimise viga.",
            "failed_to_load": "Glämpingu andmete laadimine ebaõnnestus.",
            "loading": "Laadimine...",
            "glamping_not_found": "Glämpinguid ei leitud.",
            "previous": "Eelmine",
            "next": "Järgmine",
            "county": "Maakond",
            "price_not_available": "Hind ei ole saadaval.",
            "rating": "Hinnang",
            "no_reviews": "Ülevaateid pole veel.",
            "leave_your_rating": "Jätke oma hinnangu:",
            "submit_review": "Esita",
            "want_to_leave_review": "Kas tahad hinnangut jätta?",
            "or": "või",
            "review_submitted": "Teie hinnang on esitatud.",
            "review_failed": "Hinnangu esitamisel on viga.",
            "filter": "Filtreeri",
            "name": "Nimi",
            "price": "Hind",
            "book_now": "Broneeri kohe",
            "email_address": "Meiliaadress",
            "enter_email": "Sisesta oma meiliaadress",
            "password": "Salasõna",
            "enter_password": "Sisesta oma salasõna",
            "login_with_google": "Logi sisse Google'i kontoga",
            "sign_up": "Registreeri oma meiliaadressiga",
            "sign_up_with_google": "Registreeri Google'i kontoga",
            "apply_filters" : "Filtreid rakendama",
            "price_range" : "Hinnavahemik",
            "filters" : "Filtrid",
            "search" : "Otsi",
            "close" : "Sulgeda"

        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
