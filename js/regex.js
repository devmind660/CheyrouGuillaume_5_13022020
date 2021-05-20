Nom : .{3,36}
Prénom : .{3,36}
E-mail : [a-z0-9]{3,36}(\@[a-z]{3,12}\.[a-z]{2,3})$
Adresse : ^\d{1,3}(\s[a-zA-Z]{3,36}){3,6} // Incorrect
/^\d{1,4}(\s+[\w'-]{2,36}){3,8}$/gimu // Corrigée
/^\d+(\s+[\w'-]+)+$/gimu // Sans limitation de caractères
/^\d+(\s+[\p{Letter}'-]+)+$/gium // JS

Ville : .{3,36}
function isValid(input, regex, errormessage) {
    input.value = regex;
    input.parentnode.appendchild(errormessage);
}