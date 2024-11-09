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
            // Other keys as necessary...
        }
    },
    et: {
        translation: {
            // Existing translations...
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
            "name": "Nimi",
            "price": "Hind",
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
