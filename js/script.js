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

function getSafeYouTubeEmbedUrl(videoUrl) {
    try {
        const parsedUrl = new URL(videoUrl);
        const hostname = parsedUrl.hostname.toLowerCase();
        const allowedHosts = [
            'youtube.com',
            'www.youtube.com',
            'm.youtube.com',
            'youtu.be',
            'www.youtu.be',
            'youtube-nocookie.com',
            'www.youtube-nocookie.com'
        ];

        if (!allowedHosts.includes(hostname)) {
            return null;
        }

        let videoId = '';
        if (hostname.includes('youtu.be')) {
            videoId = parsedUrl.pathname.slice(1);
        } else if (parsedUrl.pathname === '/watch') {
            videoId = parsedUrl.searchParams.get('v') || '';
        } else if (parsedUrl.pathname.startsWith('/embed/')) {
            videoId = parsedUrl.pathname.split('/embed/')[1] || '';
        }

        if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
            return null;
        }

        return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`;
    } catch (error) {
        return null;
    }
}

function openModalWithSource(videoSrc, title) {
    if (typeof title !== 'string' || title.length > 100) {
        console.error('Invalid title');
        return;
    }

    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const videoTitle = document.getElementById('videoTitle');

    videoTitle.textContent = title;
    videoFrame.src = videoSrc;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openVideo(videoId, title) {
    // Validation du videoId pour éviter les injections
    if (!isValidVideoId(videoId)) {
        console.error('Invalid video ID:', videoId);
        return;
    }

    const safeVideoSrc = `https://ladigitale.dev/digiview/#/v/${encodeURIComponent(videoId)}`;
    openModalWithSource(safeVideoSrc, title);
}

function openVideoUrl(videoUrl, title) {
    const safeEmbedUrl = getSafeYouTubeEmbedUrl(videoUrl);
    if (!safeEmbedUrl) {
        console.error('Invalid or unsupported video URL:', videoUrl);
        return;
    }

    openModalWithSource(safeEmbedUrl, title);
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
document.querySelectorAll('.media-item__thumb, .btn-outline, .btn-solid').forEach(function(element) {
    element.addEventListener('click', function(e) {
        const videoUrl = this.dataset.videoUrl;
        const videoId = this.dataset.videoId;
        const videoTitle = this.dataset.videoTitle || 'Lecteur Vidéo';

        if (videoUrl || videoId) {
            e.preventDefault();
        }

        if (videoUrl) {
            openVideoUrl(videoUrl, videoTitle);
            return;
        }
        
        if (videoId && videoTitle) {
            openVideo(videoId, videoTitle);
        }
    });
});

// Gestionnaire pour le bouton de fermeture
document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.overlay__close');
    if (closeButton) {
        closeButton.addEventListener('click', closeVideo);
    }
});
