
/*// Charge header/footer dynamiquement
function loadComponent(id, url) {
    fetch(url)
        .then(res => res.text())
        .then(data => document.getElementById(id).innerHTML = data);
}
*/     



function loadComponent(id, url, callback) {
    fetch(url)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        });
}


// Au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header", "components/header.html");
    loadComponent("footer", "components/footer.html", initAudioToggle);
});

// Slider du index
document.addEventListener('alpine:init', () => {
    Alpine.data('heroSlider', () => ({
        images: [
            'assets/images_index/N°1.png',
            'assets/images_index/N°2.png',
            'assets/images_index/N°3.png',
            'assets/images_index/N°4.jpg',
            'assets/images_index/N°5.png',
        ],
        current: 0,
        init() {
            setInterval(() => {
                this.current = (this.current + 1) % this.images.length;
            }, 5000);
        }
    }));
});


// Galerie portfolio avec lightbox

// Galerie portfolio avec lightbox
function portfolioGallery() {
    return {
        photos: [
            'assets/images/1.png',
            'assets/images/2.jpeg',
            'assets/images/3.png',
            'assets/images/4.jpeg',
            'assets/images/5.png',
            'assets/images/6.JPG',
            'assets/images/7.png',
            'assets/images/8.jpeg',
            'assets/images/9.jpeg',
            'assets/images/10.JPG',
            'assets/images/11.JPG',
            'assets/images/12.JPG',
            'assets/images/13.jpeg',
            'assets/images/14.JPG',
            'assets/images/15.JPG',
            'assets/images/16.jpeg',
            'assets/images/17.JPG',
            'assets/images/18.png',
            'assets/images/19.jpeg',
            'assets/images/20.jpeg',
            'assets/images/21.JPG',
            'assets/images/22.png',
            'assets/images/23.jpeg',
            'assets/images/24.png',
            'assets/images/25.JPG',
            'assets/images/26.JPG',
            'assets/images/27.JPG',
            'assets/images/28.JPG',
            'assets/images/29.png',
            'assets/images/30.png',
            'assets/images/31.png',
            'assets/images/33.jpeg',
            'assets/images/34.JPG',
            'assets/images/35.JPG',
            'assets/images/36.png',
            'assets/images/37.png',
            'assets/images/38.jpeg',
            'assets/images/39.jpeg',
            'assets/images/40.png',
            'assets/images/41.JPG',
            'assets/images/42.JPG',
            'assets/images/43.jpeg',
            
            // tu peux ajouter ici toutes les photos de ton portfolio
        ],
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

function initMasonryGrid() {
    const grid = document.querySelector(".portfolio");
    if (!grid) return;

    const resizeGridItem = (item) => {
        const styles = window.getComputedStyle(grid);
        const rowHeight = parseInt(styles.gridAutoRows);
        const rowGap = parseInt(styles.gap);

        const img = item.querySelector("img");

        if (!img.complete) {
            img.onload = () => resizeGridItem(item);
            return;
        }

        const height = img.getBoundingClientRect().height;
        const rowSpan = Math.ceil((height + rowGap) / (rowHeight + rowGap));


        item.style.gridRowEnd = `span ${rowSpan}`;
    };

    const resizeAll = () => {
        document
            .querySelectorAll(".portfolio-item")
            .forEach(resizeGridItem);
    };

    window.addEventListener("resize", resizeAll);
    resizeAll();
}



/* Bouton audio*/
function initAudioToggle() {
    const audio = document.getElementById("siteAudio");
    const btn = document.getElementById("audioBtn");

    if (!audio || !btn) return;

    let isPlaying = false;

    btn.addEventListener("click", () => {
        isPlaying = !isPlaying;

        if (isPlaying) {
            audio.play().catch(() => {});
            document.body.classList.add("theme-invert");
        } else {
            audio.pause();
            document.body.classList.remove("theme-invert");
        }
    });
}



/* AFFICHE BIO*/

document.addEventListener("DOMContentLoaded", () => {
    initAudioToggle();
});

function adaptBioText() {
    const container = document.querySelector('.Bio-containerv2');
    const text = document.querySelector('.Bio-textv2 p');

    if (!container || !text) return;

    const height = container.offsetHeight;

    // Taille du texte proportionnelle à l’image
    const fontSize = height * 0.045; // ajustable
    text.style.fontSize = `${fontSize}px`;
}

// recalcul au chargement et au resize
window.addEventListener('load', adaptBioText);
window.addEventListener('resize', adaptBioText);