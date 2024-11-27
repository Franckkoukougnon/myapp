class personModel {
  constructor(nom, prenom, email, telephone) {
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.telephone = telephone;
  }

  isValide() {
    return this.nom && this.prenom && this.email && this.telephone;
  }
}
