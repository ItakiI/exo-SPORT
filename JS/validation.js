// Création de constante avec "querySelector" qui selectionne les éléments.
const nomInput = document.querySelector("#formNom");
const prenomInput = document.querySelector("#formPrenom");
const telInput = document.querySelector("#formTelephone");
const mailInput = document.querySelector("#formEmail");
const subjectInput = document.querySelector("#formSujet");
const messageInput = document.querySelector("#formMessage");
const submitInput = document.querySelector("#formId");

// Création de variable de validation pour garder une trace de la validation, initialement elles sont toutes "false".
let nomValid = false;
let prenomValid = false;
let telValid = false;
let mailValid = false;
let subjectValid = false;
let messageValid = false;

// Création de const "constante" regex qui imposera des conditions
// Impose trois caractère à vingt-trois maximum, majuscule et minuscule accepter pour valider le formulaire "NOM" et "PRENOM"
const userRegex = /^[a-zA-Z-]{3,23}$/;
// Les caractère misnuscule et majuscule ainsi que les chiffres et certains caractère "spéciaux" son accepter pour le "MAIL" et impose minimum deux caractère pour le nom de domaine (.com / .fr) et le valider
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Ajout de "?" après le "+" pour dire peut être différent et, supprimer "1" par "0" pour accepter le 06 et limite un total de 10 chiffre pour valider le formulaire du téléphone.
const phoneNumberRegex = /^\+(?:\d{0,3})?\d{10}$/;
// Accepte des caractères "spéciaux" et imposis caractère minimum et 200 maximum pour valider le formulaire sujet.
const subjectRegex = /^[^<>{}$]{3,200}$/;
// Accepte des caractères "spéciaux" et limite le formulaire à vingt-quatre caractère minimum pour validation
const messageRegex = /^[^<>{}$]{24,}$/;

// Création d'une fonction addClass qui prend dans les paramètres "input" & "regex"
function addClass(input, inputValue, regex) {
    // Création d'une condition qui va vérifié si c'est "true" ou "false"
    // Si c'est "true" (vrai) elle passe dans la condition "if"
    if (regex.test(inputValue)) {
        input.classList.remove("is-invalid"); // remove pour ajouter rouge
        input.classList.add("is-valid"); // add pour ajouter vert
    } else {
        input.classList.remove("is-valid"); // remove pour ajouter vert
        input.classList.add("is-invalid"); // add pour rajouter le rouge
    }
}

// Création d'écoute d'évenement pour vérifier si le formulaire est "false" ou "true".
// Formulaire "NOM"
nomInput.addEventListener("input", (e) => {
    addClass(nomInput, e.target.value, userRegex);
    if (nomInput.classList.contains("is-valid")) {
        nomValid = true;
    } else {
        nomValid = false;
    }
});
// Formulaire "PRENOM"
prenomInput.addEventListener("input", () => {
    addClass(prenomInput, prenomInput.value, userRegex);
    if (prenomInput.classList.contains("is-valid")) {
        prenomValid = true;
    } else {
        prenomValid = false;
    }
});
// Formulaire "TELEPHONE"
telInput.addEventListener("input", () => {
    //remplace le 0 de début par +33, et supprime les éspace et stocker la nouvelle valeur dans une variable.
    let telValue = telInput.value.replace(/^0+/, "+33").replace(/\s/g, "");
    // assigne la nouvelle valeur stoquée dans la variable à notre valeur de l'input.
    telInput.value = telValue;
    //appele la addClass en utilisant nouvelle valeur.
    addClass(telInput, telValue, phoneNumberRegex);
    telInput.classList.contains("is-valid")
        ? (telValid = true)
        : (telValid = false);
});

// Formulaire "MAIL"
mailInput.addEventListener("input", (e) => {
    addClass(mailInput, e.target.value, emailRegex);
    mailInput.classList.contains("is-valid")
        ? (mailValid = true)
        : (mailValid = false);
});

// Formulaire "SUJET"
subjectInput.addEventListener("input", (e) => {
    addClass(subjectInput, e.target.value, subjectRegex);
    subjectInput.classList.contains("is-valid")
        ? (subjectValid = true)
        : (subjectValid = false);
});

// Formulaire "MESSAGE"
messageInput.addEventListener("input", (e) => {
    addClass(mailInput, e.target.value, messageRegex);
    mailInput.classList.contains("is-valid")
        ? (messageValid = true)
        : (messageValid = false);
});


// Formulaire "SUBMIT"
submitInput.addEventListener("submit",function (e){
    e.preventDefault();
    if (nomValid && prenomValid && telValid && mailValid && subjectValid && messageValid) {
// API mail
        Email.send({
            SecureToken : "de2ae524-5e5e-4fae-9f63-34037862a6de",
            To : 'scellier.yoann@gmail.com',
            From : "scellier.yoann@gmail.com",
            Subject : "This is the subject",
            Body : "And this is the body"
        }).then(
          message => alert(message)
        );        
    } else {
        alert("Pas du tout okay!")
    }
});
