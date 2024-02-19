export const cleanEmail = (email, setter) => {
    // something speech recognition uses "at" instead of "@"
    // for email, clean the email text by changing "at" to @
    if (!email.includes("@")) {
        const domainIndex = email.lastIndexOf(" ");
        if (domainIndex !== -1) {
            const domain = email.slice(domainIndex + 1);
            email = email.slice(0, domainIndex) + "@" + domain;
        }
    }
    setter(email);
};
