
// cette fonction a est supprimée et remplacée par une version améliorée avec callback

/*// Charge header/footer dynamiquement
function loadComponent(id, url) {
    fetch(url)
        .then(res => res.text())
        .then(data => document.getElementById(id).innerHTML = data);
}
*/     //fonction crée pour ajouter un callback une fois le composant chargé, 
// un callback est une fonction qui est appelée après par une autre fonction
// a quoi sert un callback ? un callback permet d'exécuter du code après qu'une opération asynchrone soit terminée,


function loadComponent(id, url, callback) {
    fetch(url)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        });
}


// fonction pour initialiser le chargement des composants header et footer, ne fonctionne que si le DOM est prêt 
// et que les éléments avec les id "header" et "footer" existent dans le HTML)
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header", "components/header.html");
    loadComponent("footer", "components/footer.html", initAudioToggle);
});

// Slider ici on initialise un slider d'images pour la page d'accueil en utilisant Alpine.js, 
// l'interet d'utiliser Alpine est de simplifier la gestion de l'état et des interactions 
// dans le HTML sans avoir à écrire beaucoup de JavaScript 
document.addEventListener('alpine:init', () => {
    Alpine.data('heroSlider', () => ({
        images: [
            'assets/images_index/N°1.png',
            'assets/images_index/N°2.png',
            'assets/images_index/N°3.png',
            'assets/images_index/N°4.png',
            'assets/images_index/N°5.png',
        ],
        current: 0,
        init() {
            setInterval(() => {
                this.current = (this.current + 1) % this.images.length;
            }, 3000);
        }
    }));
});

// Galerie portfolio avec lightbox, qu'est ce qu'une lightbox ? 
// c'est une fonctionnalité qui permet d'afficher une image en grand format
function portfolioGallery() {
    return {
        photos: [   ],        // tu peux ajouter ici toutes les photos de ton portfolio ]
        lightboxOpen: false,
        currentIndex: 0,
        open(index) {
            this.currentIndex = index;
            this.lightboxOpen = true;
        },
        close() {
            this.lightboxOpen = false;
        }
    }
}

// bouton activation audio

// Assure que le DOM est complètement chargé avant d'initialiser le bouton audio
document.addEventListener("DOMContentLoaded", () => {
    initAudioToggle();
});

//initialisation du bouton audio pour jouer/mettre en pause la musique de fond
//ajoute une classe CSS "theme-invert" au corps du document lorsque l'audio est en cours de lecture
// et la supprime lorsque l'audio est mis en pause
// il utilise les éléments HTML avec les id "siteAudio" trouvable
function initAudioToggle() {
    const audio = document.getElementById("siteAudio");
    const btn = document.getElementById("audioBtn");

    if (!audio || !btn) return;

    let isPlaying = false;
    // "click" est un événement qui se produit lorsqu'un utilisateur clique sur un élément
    btn.addEventListener("click", () => {
        isPlaying = !isPlaying;

        if (isPlaying) {
            // audio.play() renvoie une promesse une promesse est un objet qui représente l'achèvement (ou l'échec)
            // , on utilise .catch() pour gérer les erreurs potentielles
            // => {} est une fonction fléchée qui ne fait rien en cas d'erreur
            audio.play().catch(() => {});
            document.body.classList.add("theme-invert");
        } else {
            // audio.pause() met en pause la lecture de l'audio
            // l'api audio HTML5 contient quoi d'autre ?

            audio.pause();
            document.body.classList.remove("theme-invert");
        }
    });
}
