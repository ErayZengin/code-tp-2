var bibliotheque = [];

function ajouterLivre(livre) {
  bibliotheque.push(livre);
  afficherSortie("Livre ajouté : \"" + livre.titre + "\" par " + livre.auteur + " (" + livre.anneePublication + ")");
}

function ajouterLivreForm() {
  var titre = document.getElementById("titre").value;
  var auteur = document.getElementById("auteur").value;
  var annee = parseInt(document.getElementById("annee").value);
  var livre = {
    titre: titre,
    auteur: auteur,
    anneePublication: annee,
    emprunte: false
  };
  ajouterLivre(livre);
}

function listerDisponibles() {
  var dispo = bibliotheque.filter(function(l) {
    return !l.emprunte;
  });

  if (dispo.length === 0) {
    afficherSortie("Aucun livre disponible.");
  } else {
    var texte = "Livres disponibles :<br>";
    for (var i = 0; i < dispo.length; i++) {
      var l = dispo[i];
      texte += "\"" + l.titre + "\" par " + l.auteur + " (" + l.anneePublication + ")<br>";
    }
    afficherSortie(texte);
  }
}

function chercherParTitre(titre) {
  for (var i = 0; i < bibliotheque.length; i++) {
    if (bibliotheque[i].titre.toLowerCase() == titre.toLowerCase()) {
      return bibliotheque[i];
    }
  }
  return null;
}

function rechercheTitre() {
  var titre = document.getElementById("rechercheTitre").value;
  var livre = chercherParTitre(titre);
  if (livre) {
    var statut = livre.emprunte ? "emprunté" : "disponible";
    afficherSortie("Livre trouvé : \"" + livre.titre + "\" par " + livre.auteur + " (" + livre.anneePublication + ") - " + statut);
  } else {
    afficherSortie("Livre non trouvé.");
  }
}

function emprunter() {
  var titre = document.getElementById("empruntTitre").value;
  var livre = chercherParTitre(titre);
  if (livre) {
    if (!livre.emprunte) {
      livre.emprunte = true;
      afficherSortie("Le livre \"" + livre.titre + "\" a été emprunté.");
    } else {
      afficherSortie("Ce livre est déjà emprunté.");
    }
  } else {
    afficherSortie("Livre non trouvé.");
  }
}

function retourner() {
  var titre = document.getElementById("retourTitre").value;
  var livre = chercherParTitre(titre);
  if (livre) {
    livre.emprunte = false;
    afficherSortie("Le livre \"" + livre.titre + "\" a été retourné.");
  } else {
    afficherSortie("Livre non trouvé.");
  }
}

function rechercheAvancee() {
  var auteur = document.getElementById("rechercheAuteur").value.toLowerCase();
  var annee = document.getElementById("rechercheAnnee").value;

  var resultat = [];
  for (var i = 0; i < bibliotheque.length; i++) {
    var livre = bibliotheque[i];
    var okAuteur = auteur === "" || livre.auteur.toLowerCase().indexOf(auteur) !== -1;
    var okAnnee = annee === "" || livre.anneePublication == annee;

    if (okAuteur && okAnnee) {
      resultat.push(livre);
    }
  }

  if (resultat.length === 0) {
    afficherSortie("Aucun résultat trouvé.");
  } else {
    var texte = "Résultats :<br>";
    for (var j = 0; j < resultat.length; j++) {
      var r = resultat[j];
      var statut = r.emprunte ? "emprunté" : "disponible";
      texte += "\"" + r.titre + "\" par " + r.auteur + " (" + r.anneePublication + ") - " + statut + "<br>";
    }
    afficherSortie(texte);
  }
}

function afficherSortie(texte) {
  document.getElementById("sortie").innerHTML = texte;
}