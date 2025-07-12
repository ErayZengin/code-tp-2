const bibliotheque = [];

function ajouterLivre(livre) {
  bibliotheque.push(livre);
  afficherSortie(`Livre ajouté : "${livre.titre}" par ${livre.auteur} (${livre.anneePublication})`);
}

function ajouterLivreDepuisFormulaire() {
  const titre = document.getElementById("titre").value;
  const auteur = document.getElementById("auteur").value;
  const annee = parseInt(document.getElementById("annee").value);
  const livre = {
    titre: titre,
    auteur: auteur,
    anneePublication: annee,
    emprunte: false
  };
  ajouterLivre(livre);
}

function listerLivresDisponibles() {
  const disponibles = bibliotheque.filter(livre => !livre.emprunte);
  if (disponibles.length === 0) {
    afficherSortie("Aucun livre disponible.");
  } else {
    let message = "Livres disponibles :<br><ul>";
    disponibles.forEach(livre => {
      message += `<li>"${livre.titre}" par ${livre.auteur} (${livre.anneePublication})</li>`;
    });
    message += "</ul>";
    afficherSortie(message);
  }
}

function rechercherLivreParTitre(titreRecherche) {
  return bibliotheque.find(
    livre => livre.titre.toLowerCase() === titreRecherche.toLowerCase()
  );
}

function afficherRechercheParTitre() {
  const titreRecherche = document.getElementById("rechercheTitre").value;
  const livre = rechercherLivreParTitre(titreRecherche);
  if (livre) {
    const statut = livre.emprunte ? "emprunté" : "disponible";
    afficherSortie(`Livre trouvé : "${livre.titre}" par ${livre.auteur} (${livre.anneePublication}) - ${statut}`);
  } else {
    afficherSortie("Livre non trouvé.");
  }
}

function emprunterLivre() {
  const titre = document.getElementById("empruntTitre").value;
  const livre = rechercherLivreParTitre(titre);
  if (livre) {
    if (!livre.emprunte) {
      livre.emprunte = true;
      afficherSortie(`Le livre "${livre.titre}" a été emprunté.`);
    } else {
      afficherSortie("Ce livre est déjà emprunté.");
    }
  } else {
    afficherSortie("Livre non trouvé.");
  }
}

function retournerLivre() {
  const titre = document.getElementById("retourTitre").value;
  const livre = rechercherLivreParTitre(titre);
  if (livre) {
    livre.emprunte = false;
    afficherSortie(`Le livre "${livre.titre}" a été retourné.`);
  } else {
    afficherSortie("Livre non trouvé.");
  }
}

function rechercheAvancee() {
  const auteur = document.getElementById("rechercheAuteur").value.toLowerCase();
  const annee = document.getElementById("rechercheAnnee").value;

  const resultats = bibliotheque.filter(livre => {
    const matchAuteur = auteur ? livre.auteur.toLowerCase().includes(auteur) : true;
    const matchAnnee = annee ? livre.anneePublication == annee : true;
    return matchAuteur && matchAnnee;
  });

  if (resultats.length === 0) {
    afficherSortie("Aucun résultat trouvé.");
  } else {
    let message = "Résultats de la recherche :<br><ul>";
    resultats.forEach(livre => {
      const statut = livre.emprunte ? "emprunté" : "disponible";
      message += `<li>"${livre.titre}" par ${livre.auteur} (${livre.anneePublication}) - ${statut}</li>`;
    });
    message += "</ul>";
    afficherSortie(message);
  }
}

function afficherSortie(contenu) {
  const sortie = document.getElementById("sortie");
  sortie.innerHTML = contenu;
}