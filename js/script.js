// Validation des IDs vidéo - whitelist sécurisée
const VALID_VIDEO_IDS = {
    '69aade6abce5a': 'Épisode 1',
    '69aadfe997f5b': 'Épisode 2',
    '69aae0dd3deee': 'Épisode 3',
    '69aae186d31f8': 'Épisode 4',
    '69aae214433d9': 'Épisode 5',
    '69aae2ae3db2f': 'Épisode 6',
    '69aae468a942c': 'Le Dock - Émission Spéciale'
};

// Validation sécurisée des videoId
function isValidVideoId(videoId) {
    return VALID_VIDEO_IDS.hasOwnProperty(videoId);
}

function openVideo(videoId, title) {
    // Validation du videoId pour éviter les injections
    if (!isValidVideoId(videoId)) {
        console.error('Invalid video ID:', videoId);
        return;
    }
    
    // Validation supplémentaire du titre (au cas où)
    if (typeof title !== 'string' || title.length > 100) {
        console.error('Invalid title');
        return;
    }

    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const videoTitle = document.getElementById('videoTitle');
    
    // Utiliser textContent au lieu de innerHTML pour éviter XSS
    videoTitle.textContent = title;
    
    // Construire l'URL de manière sécurisée
    videoFrame.src = `https://ladigitale.dev/digiview/#/v/${encodeURIComponent(videoId)}`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('videoFrame').src = '';
}

// Fermer la modale en cliquant en dehors
window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        closeVideo();
    }
}

// Fermer la modale avec la touche Échap
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeVideo();
    }
});

// Gestionnaire de clics pour les vidéos - sélecteurs explicites
document.querySelectorAll('.video-thumbnail, .watch-button, .large-button').forEach(function(element) {
    element.addEventListener('click', function(e) {
        e.preventDefault();
        const videoId = this.dataset.videoId;
        const videoTitle = this.dataset.videoTitle;
        
        if (videoId && videoTitle) {
            openVideo(videoId, videoTitle);
        }
    });
});

// Gestionnaire pour le bouton de fermeture
document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', closeVideo);
    }
});
