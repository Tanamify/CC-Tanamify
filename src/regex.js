const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$/;

const password = "Iqbal1234.";
console.log(passwordRegex.test(password)); // Periksa apakah password sesuai dengan pola regex=